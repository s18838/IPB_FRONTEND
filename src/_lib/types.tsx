export enum Role {
    _, User, Cook
}

export enum OrderStatus {
    Pending, Ready
}

export interface User {
    id: number;
    role: Role;
    name: string;
    surname: string;
}

export interface Dish {
    id: number;
    name: string;
    price: number;
}

export interface OrderItem {
    dish: Dish;
    quantity: number;
}

export interface Order {
    id: number;
    clientId: number;
    orderItems: OrderItem[];
    status: OrderStatus;
}
