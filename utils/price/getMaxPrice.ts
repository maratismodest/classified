import { Post } from '@prisma/client';

export const getMaxPrice = (list: Post[]) =>
  list.reduce((prev, item) => (item.price > prev ? item.price : prev), list[0].price);
