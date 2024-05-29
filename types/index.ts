import { LatLngExpression, LatLngTuple } from 'leaflet';

export type Coordinates = LatLngExpression | LatLngTuple;

export interface Seo {
  title: string;
  description: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface GetIdPath {
  params: { id: string };
}

export interface GetSlugPath {
  params: { slug: string };
}

export interface CreatePostDTO {
  description: string;
  price: number;
  userId: number;
  preview: string;
  images: string;
  categoryId: number;
  published: boolean;
  rooms: number;
  latitude: string;
  longitude: string;
  furnished: boolean;
  meters: number;
}

export interface EditPostDTO {
  readonly id: number;
  description: string;
  price: number;
  readonly userId: number;
  preview: string;
  images: string;
  categoryId: number;
  published?: boolean;
  rooms?: number;
}

export interface CategoryDTO {
  readonly id: number;
  name: string;
  label: string;
  image: string;
}
