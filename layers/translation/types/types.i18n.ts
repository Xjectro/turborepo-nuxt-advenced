export interface ILocaleItem {
  code: string;
  name: string;
  dir: string;
  flag: string;
}

export interface II18nStore {
  fallbackLocale: string;
  locale: string;
  locales: ILocaleItem[];
}
