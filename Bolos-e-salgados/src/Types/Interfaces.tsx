export interface ICard {
  id: number;
  attributes: {
    name: string;
    price: number;
    image: {
      data: {
        attributes: {
          url: string;
          name: string;
        };
      }[];
    };
  };
}

export interface IProduct {
  id: number;
  attributes: {
    category: string;
    description: string;
    image: {};
    name: string;
    price: 1500;
  };
}
export interface Ikit {
  title: string;
  description: string;
  image: {
    name: string;
    url: string;
  };
}
export interface IProductData {
  cup: IProduct[];
  doces: IProduct[];
  salgados: IProduct[];
}

export interface Banner {
  banner_title: string;
  Banner_img: string;
}

export interface IfeaturedData {
  description: string;
  id: number;
  title: string;
}

export interface IPagesProps {
  error: Boolean;
  banner: Banner;
  kit?: Ikit;
  featured: {
    featuredData: IfeaturedData[];
    productData: IProductData;
  };
}

export interface IshowImage {
  id: number;
  attributes: {
    alternativeText: string;
    url: string;
  };
}

export type IshowImageArray = IshowImage[];

interface FaqContent {
  title: string;
  image: {
    url: string;
    alt: string;
  };
  id: number;
  description: string;
}
export interface IFaqProps {
  error: boolean;
  message: string;
  data: {
    content: FaqContent[];
    banner: {
      banner_title: string;
      banner_image: {
        url: string;
        alt: string;
      };
    };
  };
}

export interface IUser {
  email: string;
  id: number;
  username: string;
  empresa: string;
  endereco: string;
  cidade: string;
}

export interface IUserProps {
  user: IUser;
}

export interface TexteareaProps {
  name: string;
  error: string;
  id: string;
  value: string;
  onChange: () => void;
}

export interface IOpen {
  isData: boolean;
  isPayments: boolean;
}
