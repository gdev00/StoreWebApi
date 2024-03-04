import { Product } from "./product";

export type Customer = {
    id: number;
    firstName: string;
    lastName: string;
}

export interface CustomerRequest extends Customer {

}

export type CustomerPurchases = {
    purchaseId: number;
    customerId: number;
    customer: Customer;
    productId: number;
    product: Product;
}

export type CustomerOrder = {
    customerId: number;
    productIds: number[]
}