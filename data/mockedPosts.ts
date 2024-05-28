
import {Post} from "@prisma/client";

const mockedPosts: Post[] = [
  {
    id: 1,
    latitude: "42.6936554",
    longitude: "23.3119826",
    price: 100000,
    preview: '/images/1.jpg',
    description: 'Однушка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    rooms: 1,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    userId: '71233480'
  },
  {
    id: 2,
    latitude: "42.6900000",
    longitude: "23.3100000",
    price: 200000,
    preview: '/images/2.jpg',
    description: 'Двушка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    rooms: 2,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    userId: '71233480'
  },
  {
    id: 3,
    latitude: "42.6978028",
    longitude:"23.3183634",
    price: 300000,
    preview: '/images/1.jpg',
    description: 'Трешка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    rooms: 3,
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    userId: '71233480'
  },
]

export default mockedPosts;
