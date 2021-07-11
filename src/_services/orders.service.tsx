import { Order, OrderItem, User } from '../_lib/types';
import { get, post } from '../_lib/_utils/api';
import { appendAuthorizationHeader, appendContentTypeHeader } from '../_lib/_utils/append-header';
import { authenticationService } from './authentication.service';

export const ordersService = {
    getAllOrder,
    getOrder,
    createOrder,
    prepareOrder
};

function getAllOrder(): Promise<Order[]> {
    return get<Order[]>(`orders`)
};

function getOrder(): Promise<Order[]> {
    return get<Order[]>(`orders?clientId=${authenticationService.currentUserValue?.id ?? -1}`)
};

function createOrder(orderItems: OrderItem[]): Promise<{}> {
    const user: User | null = authenticationService.currentUserValue;
    const headers: Headers  = new Headers();
    appendContentTypeHeader(headers);
    appendAuthorizationHeader(headers);
    const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
            clientId: user ? user.id : -1,
            items: orderItems.map(e => ({ 
                quantity: e.quantity,
                dishId: e.dish.id
            }))
        })
    };
    return post<{}>('orders', requestOptions);
};

function prepareOrder(order: Order): Promise<{}> {
    const headers: Headers  = new Headers();
    appendContentTypeHeader(headers);
    appendAuthorizationHeader(headers);
    const requestOptions: RequestInit = {
        method: 'PUT',
        headers
    };
    return post<{}>(`orders/${order.id}`, requestOptions);
};
