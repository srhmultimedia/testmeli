import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemResult } from '../ItemResult/ItemResult';
import { SearchBox } from '../SearchBox/SearchBox';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import './SearchResults.scss';

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const [itemsToShow, setItemsToShow] = useState([]);
    const [categories, setCategories] = useState([]);

    const searchItems = async () => {
        const toSearch = searchParams.get("search");
        if (!toSearch) return;

        try {
            const response = await fetch(`/api/items?q=${toSearch}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { items, categories } = await response.json();
            const products = items.map(parseProduct);
            
            setItemsToShow(products);
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const parseProduct = (result: SearchResult) => {
        const { id, picture, price, title, city, free_shipping } = result;
        const formattedPrice = formatPrice(price.amount, price.currency);
        return {
            id,
            image: picture,
            price: formattedPrice,
            name: title,
            city,
            freeShipping: free_shipping
        };
    };

    const formatPrice = (value: number, currency: string) => {
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            currency
        });
        let price = formatter.format(value);
        let formatedPrice = price.replaceAll(",", ".");
        return formatedPrice;
    };

    useMemo(() => {
        setItemsToShow([]);
        setCategories([]);
        searchItems();
    }, [searchParams]);

    useEffect(() => {
        document.title = `Buscar Resultados para "${searchParams.get("search")}"`;
    }, [searchParams]);


    return (
        <>
            <SearchBox />
            <BreadCrumb categories={categories} />
            <section className="d-ib w-100">
                <ul className="container col-10 search-results search-layout">
                    {itemsToShow.map((item: any) => (
                        <ItemResult
                            key={item.id}
                            {...item}
                        />
                    ))}
                </ul>
            </section>
        </>
    );
}