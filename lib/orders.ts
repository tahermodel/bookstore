import { Product } from "./products";

const ORDERS_COOKIE_KEY = 'editorial_orders';

export interface Order {
    sessionId: string;
    productId: string;
    date: string;
}

export function saveOrder(sessionId: string, productId: string) {
    if (typeof window === 'undefined') return;

    const currentOrders = getOrders();

    if (currentOrders.some(o => o.sessionId === sessionId)) return;

    const newOrder: Order = {
        sessionId,
        productId,
        date: new Date().toISOString()
    };

    const updatedOrders = [newOrder, ...currentOrders];
    localStorage.setItem(ORDERS_COOKIE_KEY, JSON.stringify(updatedOrders));
}

export function getOrders(): Order[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(ORDERS_COOKIE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}
