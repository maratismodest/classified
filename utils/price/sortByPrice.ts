export default function sortByPrice<T>(list: Array<T & { price: number }>) {
  return list.sort((a, b) => a.price - b.price);
}
