export interface CustomerColumns {
    id: number;
    firstName: string;
    lastName: string;
  }

  
export interface ProductColumns {
    id: number;
    name: string;
    description: string;
    price: number;
  }

  export const productHeader: string[] = ['name', 'description', 'price'];
  export const customerHeader: string[] = ['firstName', 'lastName'];
  
  