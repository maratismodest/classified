import {Apartment, Coordinates} from "@/types";

const mockedCoordinates: Coordinates[] = [
  [42.69780280574229, 23.31836348393321],
  [42.69638938640342, 23.320734335616685],
  [42.69591358320678, 23.321908388059914],
  [42.69007149911213, 23.32685573593039],
  [42.69605561895303, 23.316421055735024],
  [42.69321242881835, 23.31533420963259],
  [42.698713105036425, 23.318232671597773],
  [42.70020837118824, 23.32082782918034],
  [42.69855255203708, 23.325931012653008],
  [42.69616948705237, 23.327274433086064]
]

const apartments: Apartment[] = [
  {
    id: 1,
    coordinates: [42.6936554, 23.3119826],
    title: 'Однушка',
    price: 100000,
    image: '/images/1.jpg',
    description: 'Однушка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    properties: {
      rooms: 1,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 2,
    coordinates: [42.6900000, 23.3100000],
    title: 'Двушка',
    price: 200000,
    image: '/images/2.jpg',
    description: 'Двушка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    properties: {
      rooms: 2,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 3,
    coordinates: [42.69780280574229, 23.31836348393321],
    title: 'Трешка',
    price: 300000,
    image: '/images/1.jpg',
    description: 'Трешка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    properties: {
      rooms: 3,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 4,
    coordinates: [42.69638938640342, 23.320734335616685],
    title: 'Двушка',
    price: 200000,
    image: '/images/2.jpg',
    description: 'Двушка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    properties: {
      rooms: 2,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 5,
    coordinates: [42.69591358320678, 23.321908388059914],
    title: 'Однушка',
    price: 100000,
    image: '/images/1.jpg',
    description: 'Однушка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    properties: {
      rooms: 1,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 6,
    coordinates: [42.69007149911213, 23.32685573593039],
    title: 'Трешка',
    price: 300000,
    image: '/images/2.jpg',
    description: 'Трешка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    properties: {
      rooms: 3,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 7,
    coordinates: [42.69605561895303, 23.316421055735024],
    title: 'Однушка',
    price: 100000,
    image: '/images/1.jpg',
    description: 'Однушка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    properties: {
      rooms: 1,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 8,
    coordinates: [42.69321242881835, 23.31533420963259],
    title: 'Двушка',
    price: 200000,
    image: '/images/2.jpg',
    description: 'Двушка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    properties: {
      rooms: 2,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 9,
    coordinates: [42.698713105036425, 23.318232671597773],
    title: 'Трешка',
    price: 300000,
    image: '/images/1.jpg',
    description: 'Трешка в центре города',
    images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
    properties: {
      rooms: 3,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
  {
    id: 10,
    coordinates: [42.70020837118824, 23.32082782918034],
    title: 'Двушка',
    price: 200000,
    image: '/images/2.jpg',
    description: 'Двушка в центре города',
    images: '/images/2/1.jpg||/images/2/2.jpg||/images/2/3.jpg',
    properties: {
      rooms: 2,
      meters: 0,
      floor: 0,
      totalFloors: 0,
      balcony: false,
      elevator: false,
      parking: false,
      heating: false,
      furniture: false
    }
  },
]

export default apartments;
