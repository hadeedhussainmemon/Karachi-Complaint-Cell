'use client';
import { useLanguage } from '@/components/LanguageProvider';
import { TranslationKey } from '@/lib/translations';

export default function T({ tKey, className }: { tKey: TranslationKey, className?: string }) {
  const { t } = useLanguage();
  if (className) return <span className={className}>{t(tKey as any)}</span>;
  return <>{t(tKey as any)}</>;
}
