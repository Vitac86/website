export type LeadPayload = {
  name: string;
  phone: string;
  consent: boolean;
  company?: string;
};

export type LeadResult = {
  ok: boolean;
  error?: string;
};
