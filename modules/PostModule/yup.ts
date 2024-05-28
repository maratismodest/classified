import { array, boolean, InferType, number, object, string } from 'yup';

const required = 'Поле обязательно для заполнения';
const positive = 'Цена должна быть больше 0';
const too_short = 'Слишком короткое';
const too_long = 'Слишком длинное';
const required_image = 'Добавить хотя бы одно фото!';
const too_many_images = 'Не больше 4 фотографий!';

export const schema = object({
  categoryId: number().required(required).integer().typeError(required),
  price: number().required(required).positive(positive).integer().typeError(required),
  // title: string().required(required).min(4, too_short).max(100, too_long),
  description: string().required(required).min(10, too_short).max(800, too_long),
  agreement: boolean().oneOf([true], required),
  images: array()
    .of(string())
    .min(1, required_image)
    .max(4, too_many_images)
    .required(required_image),
  post: boolean(),
  rooms: number().required(required).min(1, too_short).max(3, too_long).positive(positive).integer().typeError(required),
});

export const defaultValues = {
  categoryId: undefined,
  price: undefined,
  description: undefined,
  images: [],
  agreement: true,
  post: true,
  rooms: undefined,
};

export type IFormInput = InferType<typeof schema>;
