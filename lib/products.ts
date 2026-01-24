export interface Product {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    price: number;
    description: string;
    image: string;
}

export const products: Product[] = [
    {
        id: "prod_01",
        slug: "before-the-coffee-gets-cold",
        title: "Before the Coffee Gets Cold",
        subtitle: "Charming yet melancholic novel.",
        price: 3500,
        description: "Before the Coffee Gets Cold is a work of contemporary Japanese fiction that blends elements of magical realism with a poignant, character-driven 'slice of life' narrative.",
        image: "/images/book-0.jpg",
    },
    {
        id: "prod_02",
        slug: "monograph-vol-1",
        title: "Monograph Vol. 1",
        subtitle: "A study in brutalist typography.",
        price: 4500,
        description: "Printed on 120gsm Munken Lynx. 200 pages of archival quality architectural photography and essays on the decline of digital permanence.",
        image: "/images/book-1.png",
    },
    {
        id: "prod_03",
        slug: "analog-bundle",
        title: "The Analog Bundle",
        subtitle: "Physical tools for digital detox.",
        price: 8500,
        description: "Includes the Monograph, a raw brass pen, and our signature field notes. Packaged in a vacuum-sealed anti-static bag.",
        image: "/images/bundle.png",
    }
];

export function getProduct(slug: string) {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
    return products.find((p) => p.id === id);
}