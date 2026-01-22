import { OrderList } from "./OrderList";

export default function OrdersPage() {
    return (
        <section className="min-h-[60vh] px-6 md:px-12 pt-24 pb-24 max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif text-stone-900 mb-8">Order History</h1>

            <OrderList />
        </section>
    );
}
