import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  BookOpen,
  Send,
  Check,
  ShieldCheck,
  ArrowRight,
  Settings,
  Loader2,
  Upload,
  ImageIcon,
  CreditCard,
  ExternalLink,
} from 'lucide-react';

const INSTAPAY_LINK = 'https://ipn.eg/S/alielbshbishy/instapay/7IVK1s';
const INSTAPAY_USERNAME = 'alielbshbishy@instapay';
import { Course, RegistrationFormData } from '../types';
import GoogleSheetsInstructions from './GoogleSheetsInstructions';
import { motion, AnimatePresence } from 'motion/react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

interface RegistrationModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  availableCourses: Course[];
}

type ModalStep = 'payment' | 'enrollment' | 'success';

export default function RegistrationModal({
  course,
  isOpen,
  onClose,
  availableCourses,
}: RegistrationModalProps) {
  const [step, setStep] = useState<ModalStep>('payment');
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    courseId: 'essential',
  });
  const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});
  const [screenshotError, setScreenshotError] = useState<string | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState(
    'https://script.google.com/macros/s/AKfycbwo3Wg_O0H0UX27FoeAlH5ECoAjwVCwfP3Hoka8uI8YwnWCPwG8A7ryxBtVMeqLbqi7/exec'
  );
  const [showSettings, setShowSettings] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCourse =
    availableCourses.find((c) => c.id === formData.courseId) ?? course;

  useEffect(() => {
    if (course) {
      setFormData((prev) => ({ ...prev, courseId: course.id }));
    }
  }, [course, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const resetModal = useCallback(() => {
    setStep('payment');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courseId: course?.id ?? 'essential',
    });
    setErrors({});
    setScreenshotError(null);
    setPaymentFile(null);
    setPaymentPreview(null);
    setErrorText(null);
    setIsDragOver(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [course]);

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const isValidFile = (file: File) => {
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);
  };

  const handleFileSelect = (file: File | null) => {
    setScreenshotError(null);
    if (!file) return;
    if (!isValidFile(file)) {
      setScreenshotError('Please upload a JPG, JPEG, or PNG image.');
      return;
    }
    setPaymentFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPaymentPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const validateForm = () => {
    const tempErrors: Partial<RegistrationFormData> = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      tempErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^01[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Please provide a valid Egyptian phone (e.g. 01012345678)';
    }
    setErrors(tempErrors);
    if (!paymentFile) {
      setScreenshotError('Please upload your payment screenshot before submitting.');
    }
    return Object.keys(tempErrors).length === 0 && !!paymentFile;
  };

  const isFormComplete =
    formData.fullName.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    /^01[0-9]{9}$/.test(formData.phone.replace(/\s/g, '')) &&
    !!paymentFile;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegistrationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorText(null);

    const targetUrl =
      googleSheetsUrl.trim() ||
      'https://script.google.com/macros/s/AKfycbwo3Wg_O0H0UX27FoeAlH5ECoAjwVCwfP3Hoka8uI8YwnWCPwG8A7ryxBtVMeqLbqi7/exec';

    const courseTitle = selectedCourse ? selectedCourse.title : formData.courseId;

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: courseTitle,
        paymentScreenshot: paymentFile?.name ?? '',
        paymentScreenshotRef: paymentPreview
          ? `${paymentFile?.name} (${Math.round((paymentFile?.size ?? 0) / 1024)}KB uploaded)`
          : '',
      };

      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStep('success');
    } catch (err) {
      console.error('Apps script post failed:', err);
      setErrorText('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-brand-dark-950/85 backdrop-blur-md cursor-zoom-out"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-xl glass-panel bg-brand-dark-900/95 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-gold animate-shimmer bg-[length:200%_auto]" />

          {step === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 flex items-center justify-center relative shadow-[0_0_40px_rgba(0,242,254,0.15)]">
                <div className="w-12 h-12 rounded-full bg-brand-cyan flex items-center justify-center text-brand-dark-950 shadow-xl">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
                  Enrollment Submitted Successfully
                </h3>
                <p className="text-sm font-sans text-brand-cyan font-medium">
                  {selectedCourse?.title} — {formData.fullName}
                </p>
                <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto leading-relaxed">
                  Thank you for choosing Fluency Sprint. Our team will verify your InstaPay payment and contact you at{' '}
                  <span className="text-white">{formData.email}</span> within 24 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-white/5 hover:bg-brand-cyan hover:text-brand-dark-950 border border-white/10 hover:border-brand-cyan transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                Close
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <>
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                    {step === 'payment' ? 'Complete Payment' : 'Enroll Now'}
                  </h3>
                  {selectedCourse && (
                    <p className="text-xs text-gray-400 font-sans">
                      {selectedCourse.title} — {selectedCourse.price}
                      {selectedCourse.pricePeriod}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      showSettings
                        ? 'border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan'
                        : 'border-white/10 text-white/50 hover:text-white'
                    }`}
                    title="Configure Google Sheets"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
                {showSettings && (
                  <div className="p-4 rounded-xl border border-brand-cyan/20 bg-brand-cyan/2 flex flex-col gap-3">
                    <span className="text-xs font-accent font-bold text-brand-cyan tracking-wider uppercase">
                      Google Sheets API Endpoint
                    </span>
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={googleSheetsUrl}
                      onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 focus:border-brand-cyan text-xs font-mono py-2.5 px-3 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none"
                    />
                    <GoogleSheetsInstructions />
                  </div>
                )}

                {step === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {selectedCourse && (
                      <div className="p-4 rounded-xl border border-white/10 bg-white/2 space-y-2">
                        <p className="text-xs font-accent text-brand-cyan uppercase tracking-wider font-semibold">
                          Selected Course
                        </p>
                        <p className="text-sm text-white font-display font-medium">{selectedCourse.title}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">{selectedCourse.description}</p>
                      </div>
                    )}

                    <div className="p-5 rounded-2xl border border-brand-cyan/20 bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-brand-cyan" />
                        </div>
                        <div>
                          <h4 className="text-sm font-display font-semibold text-white">InstaPay Payment</h4>
                          <p className="text-[11px] text-gray-400">Secure mobile wallet transfer</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                          <span className="text-[10px] text-gray-500 font-accent uppercase tracking-wider">
                            Send money to
                          </span>
                          <p className="text-sm text-brand-cyan font-mono mt-1">{INSTAPAY_USERNAME}</p>
                        </div>

                        <a
                          href={INSTAPAY_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-brand-cyan/15 border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/25 hover:shadow-[0_0_20px_rgba(0,242,254,0.2)] transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Pay via InstaPay
                        </a>
                      </div>

                      <p className="text-xs text-gray-300 text-center leading-relaxed bg-white/3 p-3 rounded-lg border border-white/5">
                        Click the link to send your payment, then continue enrollment once complete. Powered by InstaPay.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('enrollment')}
                      className="w-full py-4 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-cyan to-brand-purple text-brand-dark-950 hover:shadow-[0_0_25px_rgba(0,242,254,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      I&apos;ve Completed Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 'enrollment' && (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    id="registration-form"
                  >
                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="text-xs text-brand-cyan hover:text-white transition-colors flex items-center gap-1"
                    >
                      ← Back to payment
                    </button>

                    <div className="space-y-1.5">
                      <label htmlFor="reg-fullName" className="block text-xs font-accent font-semibold text-gray-400 tracking-wide uppercase">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          id="reg-fullName"
                          name="fullName"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full bg-black/30 border py-3 pl-11 pr-4 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                            errors.fullName ? 'border-red-500/50' : 'border-white/10 focus:border-brand-cyan'
                          }`}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-400 text-[11px]">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="reg-email" className="block text-xs font-accent font-semibold text-gray-400 tracking-wide uppercase">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          id="reg-email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full bg-black/30 border py-3 pl-11 pr-4 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                            errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-brand-cyan'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-[11px]">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="reg-phone" className="block text-xs font-accent font-semibold text-gray-400 tracking-wide uppercase">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          id="reg-phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="01012345678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full bg-black/30 border py-3 pl-11 pr-4 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none ${
                            errors.phone ? 'border-red-500/50' : 'border-white/10 focus:border-brand-cyan'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-[11px]">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="reg-courseId" className="block text-xs font-accent font-semibold text-gray-400 tracking-wide uppercase">
                        Selected Course
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <select
                          id="reg-courseId"
                          name="courseId"
                          value={formData.courseId}
                          onChange={handleInputChange}
                          className="w-full bg-brand-dark-950 border border-white/10 py-3 pl-11 pr-4 rounded-xl text-sm text-white focus:outline-none focus:border-brand-cyan h-11"
                        >
                          {availableCourses.map((c) => (
                            <option key={c.id} value={c.id} className="bg-brand-dark-900">
                              {c.title} — {c.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-accent font-semibold text-gray-400 tracking-wide uppercase">
                        Upload Payment Screenshot <span className="text-brand-cyan">*</span>
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 glass-panel ${
                          isDragOver ? 'upload-zone-active' : 'border-white/15 hover:border-brand-cyan/40'
                        } ${paymentPreview ? 'border-brand-cyan/40 bg-brand-cyan/5' : ''}`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                          className="hidden"
                          onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                        />
                        {paymentPreview ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-3"
                          >
                            <img
                              src={paymentPreview}
                              alt="Payment screenshot preview"
                              className="max-h-36 rounded-lg border border-white/10 object-contain"
                            />
                            <div className="flex items-center gap-2 text-brand-cyan text-xs font-accent font-semibold">
                              <Check className="w-4 h-4" />
                              Screenshot uploaded — {paymentFile?.name}
                            </div>
                            <p className="text-[10px] text-gray-500">Tap to replace</p>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-center">
                            <div className="w-14 h-14 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center">
                              <Upload className="w-6 h-6 text-brand-cyan" />
                            </div>
                            <p className="text-sm text-white font-medium">Drag & drop your payment screenshot</p>
                            <p className="text-[11px] text-gray-500">or click to browse — JPG, JPEG, PNG</p>
                            <div className="flex items-center gap-1 text-[10px] text-gray-600">
                              <ImageIcon className="w-3 h-3" />
                              Required for enrollment
                            </div>
                          </div>
                        )}
                      </div>
                      {screenshotError && (
                        <p className="text-red-400 text-[11px] flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-400" />
                          {screenshotError}
                        </p>
                      )}
                    </div>

                    {errorText && (
                      <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-2.5 px-3 rounded-lg">
                        {errorText}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormComplete}
                      className="w-full py-4 rounded-xl font-accent font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-cyan to-brand-purple text-brand-dark-950 hover:shadow-[0_0_25px_rgba(0,242,254,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting enrollment...
                        </>
                      ) : (
                        <>
                          Submit Enrollment
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    {!isFormComplete && !paymentFile && (
                      <p className="text-[10px] text-gray-500 text-center">
                        Please upload your payment screenshot before submitting.
                      </p>
                    )}
                  </motion.form>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
