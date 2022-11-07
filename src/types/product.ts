export type Product = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
};

export interface ProductResult {
  product: Product;
}
export interface ProductsResult {
  products: Product[];
  totalCount: number;
}

export interface LoginPayload {
  id: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
}
