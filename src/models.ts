export interface CheckoutSessionLineItem {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
}

export interface CheckoutSession {
    uuid: string;
    line_items: CheckoutSessionLineItem[];
    total_amount: string;
    success_url: string;
    cancel_url: string;
    client_reference_id: string;
    webhook_url: string;
    checkout_page_token: string;
    url: string;
    expires_at: Date;
    active: boolean;
    status: string;
    metadata: Record<string, any>;
}

