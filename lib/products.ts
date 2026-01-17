export interface Product {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    price: number; // in cents
    description: string;
    image: string; // Path to image in /public
}

export const products: Product[] = [
    {
        id: "prod_01",
        slug: "monograph-vol-1",
        title: "Monograph Vol. 1",
        subtitle: "A study in brutalist typography.",
        price: 4500,
        description: "Printed on 120gsm Munken Lynx. 200 pages of archival quality architectural photography and essays on the decline of digital permanence.",
        image: "/images/book-1.jpg",
    },
    {
        id: "prod_02",
        slug: "analog-bundle",
        title: "The Analog Bundle",
        subtitle: "Physical tools for digital detox.",
        price: 8500,
        description: "Includes the Monograph, a raw brass pen, and our signature field notes. Packaged in a vacuum-sealed anti-static bag.",
        image: "/images/bundle.jpg",
    }
];

export function getProduct(slug: string) {
    return products.find((p) => p.slug === slug);
}