import {LatLngExpression, LatLngTuple} from "leaflet";

export type Coordinates = LatLngExpression | LatLngTuple



interface Apartment {
  id: number,
  coordinates: Coordinates,
  title: string;
  description: string;
  price: number;
  image: string;
  images: string;
  properties: {
    rooms: number,
    meters: number,
    floor: number,
    totalFloors: number,
    balcony: boolean,
    elevator: boolean,
    parking: boolean,
    heating: boolean,
    furniture: boolean,
  }
}

export interface Seo {
  title: string;
  description: string;
}

// export interface GetSlugPath {
//   params: { slug: string };
// }

export type {Apartment}
