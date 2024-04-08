/// <reference types="vite/client" />

interface ICategory {
    id: string;
    name: string
}

interface IProduct {
    picture: string;
    condition: string;
    title: string;
    price: string;
    description: string;
}

interface SearchResult {
    id: string;
    picture: string;
    price: {
        amount: number;
        currency: string;
    };
    title: string;
    city: string;
    free_shipping: boolean;
}