/**
 * Hook to get localized section IDs for product pages
 */
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedSectionAnchor } from '../utils/routeMapping';

export function useLocalizedSectionId(sectionKey: string): string {
  const { language } = useLanguage();
  return getLocalizedSectionAnchor(sectionKey, language);
}





