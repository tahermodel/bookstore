import Link from "next/link";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string }>;
}) {
    const { session_id } = await searchParams;
    return (
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center gap-8">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-light tracking-tight">
                    Order Confirmed.
                </h1>
                <p className="text-gray-500 font-serif italic text-xl">
                    Your artifact is being prepared.
                </p>
            </div>

            <div className="text-xs font-mono text-gray-400">
                REF: {session_id?.slice(-8) || "PENDING"}
            </div>

            <Link href="/" className="border-b border-black pb-1 hover:opacity-50 transition-opacity text-sm">
                Return to Studio
            </Link>
        </section>
    );
}