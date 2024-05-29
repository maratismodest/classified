const success = {
  updated: 'Объявление поднято в поиске!',
  deleted: 'Объявление удалено!',
  archive: 'Объявление в архиве!',
};

const errors = {
  wentWrong: 'Что-то пошло не так!',
  noCase: 'Нет таких значений',
};

enum ItemModalText {
  edit = 'Редактировать объявление?',
  delete = 'Объявление не актуально?',
}

export { success, errors, ItemModalText };
