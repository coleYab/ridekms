import { LanguageProvider } from '@/features/kms/components/language-provider';

export default function KmsLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
