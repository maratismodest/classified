import {LatLngExpression, LatLngTuple} from "leaflet";

export type Coordinates = LatLngExpression | LatLngTuple

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
  userId: string;
  preview: string;
  images: string;
  categoryId: number;
  published: boolean;
  rooms: number;
}


export interface EditPostDTO {
  readonly id: number;
  description: string;
  price: number;
  readonly userId: string;
  preview: string;
  images: string;
  categoryId: number;
  published?: boolean;
  rooms?: number
}

export interface CategoryDTO {
  readonly id: number;
  name: string;
  label: string;
  image: string;
}

export interface BanDTO {
  readonly id: number;
  readonly userId: number;
  readonly description?: string;
}

// types.ts
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setParams: ({text}: { text: string }) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: any;
  close: () => void;
  ready: () => void;
  sendData: (str: string) => void;
  onEvent: (actionName: string, onSendData: unknown) => void;
  offEvent: (actionName: string, onSendData: unknown) => void;
}
