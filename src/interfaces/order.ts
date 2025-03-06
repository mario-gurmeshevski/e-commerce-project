export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface CartSummary {
    subtotal: number;
    shipping: number;
    total: number;
}


export interface IOrder {
    id: string;
    orderId: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    municipality: string;
    postalCode: number;
    phoneNumber: number;
    email: string;
    cart: {
        items: CartItem[];
        priceSummary: CartSummary;
    };
    status: boolean;
}