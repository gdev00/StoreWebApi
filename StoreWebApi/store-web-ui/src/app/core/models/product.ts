export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ProductRequest extends Product {
}

export interface ProductItem extends Product {
    select: boolean;
  }
  