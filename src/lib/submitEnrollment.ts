/** Live Google Apps Script Web App — bound to your existing Fluency Sprint sheet */
export const GOOGLE_SHEETS_API_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_URL ??
  'https://script.google.com/macros/s/AKfycbyx61mMOSWMnYv9spPRE-zgmDFfjPhPeCdtHk4CI0qxOQmu-a7qfZcMgUZOJylB1W7w/exec';

export interface EnrollmentPayload {
  name: string;
  email: string;
  phone: string;
  course: string;
}

export async function submitEnrollment(
  data: EnrollmentPayload
): Promise<{ ok: boolean; error?: string }> {
  const url = GOOGLE_SHEETS_API_URL;
  const payload: EnrollmentPayload = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    course: data.course.trim(),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.course) {
    return { ok: false, error: 'Please complete all required fields before submitting.' };
  }

  const body = JSON.stringify(payload);
  const requestInit: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  };

  try {
    const response = await fetch(url, { ...requestInit, mode: 'cors' });
    if (response.ok) {
      try {
        const json = await response.json();
        if (json?.result === 'error') {
          return { ok: false, error: json.error ?? 'Submission failed. Please try again.' };
        }
      } catch {
        /* non-JSON success body is fine */
      }
      return { ok: true };
    }
  } catch {
    /* CORS may block reading response; try no-cors fallback */
  }

  try {
    await fetch(url, { ...requestInit, mode: 'no-cors' });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Unable to reach the server. Check your connection and try again.',
    };
  }
}
