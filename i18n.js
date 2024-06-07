module.exports = {
  locales: ['en', 'ru', 'bg'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/[lang]': ['common'],
  },
  defaultNS: 'common',
  localeDetection: false,
};
