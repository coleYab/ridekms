'use client';

import { useLanguage, languages } from './language-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Icons } from '@/components/icons';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.value === language);

  return (
    <div className='flex items-center gap-2'>
      <Icons.globe className='h-4 w-4 text-muted-foreground' />
      <Select value={language} onValueChange={(v) => setLanguage(v as typeof language)}>
        <SelectTrigger className='w-[140px]'>
          <SelectValue>
            <span className='flex items-center gap-2'>
              <span>{currentLang?.flag}</span>
              <span>{currentLang?.label}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <span className='flex items-center gap-2'>
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
