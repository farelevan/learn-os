import { apiClient } from "./client";

export interface CertificateData {
  id: string;
  userId: string;
  title: string;
  subTitle?: string | null;
  type: "PROFESSIONAL" | "COURSE";
  certNumber: string;
  issuedDate: string;
  pdfUrl?: string | null;
}

export const certificatesService = {
  async getMyCertificates(): Promise<CertificateData[]> {
    return apiClient<CertificateData[]>("/certificates/my-certificates");
  },
};
