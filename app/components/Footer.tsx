export function Footer() {
    return (
        <footer className="px-6 md:px-12 py-24 bg-stone-50 sm:pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                <h2 className="font-serif text-2xl text-stone-900">Editorial</h2>
                <div className="flex flex-col gap-4 text-xs uppercase tracking-widest text-stone-400">
                    <p>&copy; {new Date().getFullYear()}. All rights reserved. this is not a real store</p>
                </div>
            </div>
        </footer>
    );
}
