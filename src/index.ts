import axios, { AxiosResponse, AxiosError } from 'axios';

import { CheckoutSession, CheckoutSessionLineItem } from './models';

export default class Client {
    private readonly BASE_URL = 'https://api.notrix.io';

    constructor(private readonly secretApiKey: string) { }

    private authHeaders(): Record<string, string> {
        return { Authorization: `Token ${this.secretApiKey}` };
    }

    private async makeRequest<T>(
        method: string,
        path: string,
        params?: Record<string, any>,
        data?: Record<string, any>
    ): Promise<T> {
        const url = `${this.BASE_URL}/${path}`;
        const headers = { ...this.authHeaders() };

        try {
            const response: AxiosResponse<T> = await axios({ method, url, headers, params, data });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                throw axiosError.response?.data || axiosError.message;
            } else {
                throw (error as Error).message;
            }
        }
    }

    async createCheckoutSession(
        items: CheckoutSessionLineItem[],
        successUrl: string,
        cancelUrl: string,
        client_reference_id: string = "",
        webhook_url: string = ""
    ): Promise<CheckoutSession> {
        let params: Record<string, any> = {
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items,
        }
        if (client_reference_id.length > 0) {
            params["client_reference_id"] = client_reference_id
        }
        if (webhook_url.length > 0) {
            params["webhook_url"] = webhook_url
        }

        const response = await this.makeRequest<CheckoutSession>('post', 'console/checkout-sessions/', {}, params);

        return response;
    }

    async isPaid(checkoutPageToken: string): Promise<boolean> {
        const response = await this.makeRequest<{ payment_confirmed: boolean }>('get', 'console/check-payment-status/', { token: checkoutPageToken }, {});

        return response.payment_confirmed;
    }
}

