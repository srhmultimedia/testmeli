import { useMemo, useEffect, useState } from 'react';
import { SearchBox } from '../SearchBox/SearchBox'
import { useParams } from 'react-router-dom'
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { Preloader } from '../Preloader/Preloader';
import './ProdcutDetail.scss'

export function ProductDetail() {

    let { id } = useParams();
    const [infoProduct, setInfoProduct] = useState<IProduct | null>(null);
    const [categories, setCategories] = useState([]);

    const infoItem = async () => {
        try {
            const response = await fetch(`/api/items/${id}`);
            const result = await response.json();
            let condition = (result.item.condition === "new") ?  "Nuevo" : "Usado";
            setCategories(result.item.categories);
            setInfoProduct({
                picture: result.item.picture,
                condition: condition,
                title: result.item.title,
                price: result.item.price.amount,
                description: result.item.description
            });
        } catch (error) {
            console.error('Error fetching product information:', error);
        }
    }

    useMemo(() => {
        infoItem();
    }, [id])

    useEffect(() => {
        if (infoProduct) {
            document.title = `${infoProduct.title}`;
        }
    }, [infoProduct]);

    return (
        <>
            <SearchBox />
            <BreadCrumb categories={categories} />
            {infoProduct ? (
                <section className='d-ib w-100'>
                    <div className="pdp-container container col-10">
                        <section className="pdp-info">
                            <div className="pdp-info-column-left">
                                <div className="pdp-img">
                                    <img src={infoProduct.picture} alt={infoProduct.title}></img>
                                </div>
                                <section className="pdp-desc">
                                    <h2 className="pdp-desc-title">Descripción del producto</h2>
                                    <p>{infoProduct.description}</p>
                                </section>
                            </div>
                            <div className="pdp-info-column-right col-3">
                                <span className="pdp-info-state">{infoProduct.condition} - 234 vendidos</span>
                                <h1 className="pdp-info-name">{infoProduct.title}</h1>
                                <span className="pdp-info-price">${infoProduct.price}</span>
                                <button className="pdp-info-button">Comprar</button>
                            </div>
                        </section>
                    </div>
                </section>
            ) : (
                <Preloader />
            )}
        </>
    )
}