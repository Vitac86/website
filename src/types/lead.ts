export type LeadPayload = {
  name: string;
  phone: string;
  consent: boolean;
  email?: string;
  industry?: string;
  task?: string;
  company?: string;
  page?: string;
  source?: string;
  utm?: Record<string, string>;
};

export type LeadResult = {
  ok: boolean;
  error?: string;
};
