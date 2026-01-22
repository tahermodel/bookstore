export default function AboutPage() {
    return (
        <article className="max-w-2xl mx-auto py-12 md:py-24">
            <h1 className="text-xs font-bold uppercase tracking-widest mb-12 text-gray-400">
                Manifesto
            </h1>

            <div className="prose prose-lg prose-neutral prose-p:font-serif prose-p:text-2xl prose-p:leading-relaxed prose-headings:font-sans">
                <p>
                    We believe in the weight of objects. In an era of infinite digital replication,
                    we curate artifacts that demand presence.
                </p>
                <p>
                    Editorial is not a store. It is an archive of deliberate design,
                    brutalist typography, and analog permanence.
                </p>
                <hr className="border-gray-200 my-12 w-12" />
                <div className="text-base font-sans not-italic text-gray-600 space-y-4">
                    <p>
                        <strong>Shipping:</strong> Worldwide via tracked courier.<br />
                        <strong>Returns:</strong> All sales are final unless damaged in transit.<br />
                        <strong>Contact:</strong> studio@example.com
                    </p>
                </div>
            </div>
        </article>
    );
}