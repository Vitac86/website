export type LeadPayload = {
  name: string;
  phone: string;
  consent: boolean;
  company?: string;
  page?: string;
  utm?: Record<string, string>;
};

export type LeadResult = {
  ok: boolean;
  error?: string;
};
