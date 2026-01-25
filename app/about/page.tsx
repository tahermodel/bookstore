import Link from "next/link";
import { ArrowRight, Package, Shield, Truck } from "lucide-react";

export default function AboutPage() {
    return (
        <article className="animate-fade-in">
            {/* Hero */}
            <header className="px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-24 bg-stone-900 text-stone-50">
                <div className="max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-6 block">
                        Our Philosophy
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
                        Objects of <span className="italic text-stone-400">deliberate</span> design.
                    </h1>
                </div>
            </header>

            {/* Manifesto */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-2xl mx-auto">
                    <div className="prose prose-lg prose-stone prose-p:font-serif prose-p:text-xl prose-p:leading-relaxed prose-p:text-stone-600">
                        <p className="text-2xl text-stone-900 font-medium">
                            We believe in the weight of objects.
                        </p>
                        <p>
                            In an era of infinite digital replication, we curate artifacts that demand presence.
                            Each item in our archive is selected for its materiality, its craft, and its refusal to be ephemeral.
                        </p>
                        <p>
                            Editorial is not a store. It is an archive of brutalist typography, analog permanence,
                            and designs that will outlast their creators.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 md:px-12 py-16 md:py-24 bg-stone-50">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white rounded-lg border border-stone-100 hover:shadow-lg transition-shadow">
                        <Truck className="text-stone-400 mb-4" size={28} />
                        <h3 className="font-medium text-stone-900 mb-2">Worldwide Shipping</h3>
                        <p className="text-sm text-stone-500">Tracked courier delivery to your destination.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg border border-stone-100 hover:shadow-lg transition-shadow">
                        <Shield className="text-stone-400 mb-4" size={28} />
                        <h3 className="font-medium text-stone-900 mb-2">Secure Payments</h3>
                        <p className="text-sm text-stone-500">Protected checkout via Stripe.</p>
                    </div>
                    <div className="p-8 bg-white rounded-lg border border-stone-100 hover:shadow-lg transition-shadow">
                        <Package className="text-stone-400 mb-4" size={28} />
                        <h3 className="font-medium text-stone-900 mb-2">Premium Packaging</h3>
                        <p className="text-sm text-stone-500">Each item carefully wrapped for transit.</p>
                    </div>
                </div>
            </section>

            {/* Policies */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8">Policies</h2>
                    <div className="text-sm text-stone-600 space-y-3">
                        <p><strong className="text-stone-900">Returns:</strong> All sales are final unless damaged in transit.</p>
                        <p><strong className="text-stone-900">Contact:</strong> ownworkZ23@gmail.com</p>
                    </div>

                    <Link href="/" className="btn-primary inline-flex items-center gap-3 mt-12 group">
                        <span>Browse Archive</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </article>
    );
}