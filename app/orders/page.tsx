import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { OrderList } from "./OrderList";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

export default async function OrdersPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" }
    });

    return (
        <section className="min-h-[60vh] px-6 md:px-12 pt-16 pb-24 max-w-3xl mx-auto animate-fade-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Your Archive</h1>
                    <p className="text-stone-500 font-light">
                        {orders.length} {orders.length === 1 ? 'artifact' : 'artifacts'} acquired
                    </p>
                </div>

                <Link
                    href="/"
                    className="btn-secondary inline-flex items-center gap-2 group text-xs"
                >
                    <Package size={14} />
                    Browse More
                </Link>
            </header>

            <OrderList initialOrders={orders} />
        </section>
    );
}
