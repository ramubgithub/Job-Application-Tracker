const API_KEY = import.meta.env.VITE_LOGO_API_KEY;

export default function useCompanyLogo(company) {
  if (!company || !company.trim()) return null;

  return `https://img.logo.dev/${company}.com?token=${API_KEY}`;
}