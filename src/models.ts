
export interface CheckoutSession {
    uuid: string;
    paymentRequestToken: string;
    lineItems: Array<CheckoutSessionLineItem>;
    successURL: string;
    cancelURL: string;
    clientReferenceID: string;
    expires_at: string;
    metadata: Object;
    totalAmount: number;
    active: boolean;
    status: 'created' | 'viewed' | 'paid';
    showCompany: boolean;
}

export interface CheckoutSessionLineItem {
    uuid: string;
    price: number;
    name: string;
    quantity: number;
    description: string;
    imageURL: string;
}
