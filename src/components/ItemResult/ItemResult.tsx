import './ItemResult.scss'

export function ItemResult({ id = "", image = "", price = 0, name = "", city = "", freeShipping = false }) {

    return (

        <li className={'search-layout__item'}>
            <a href={`/items/${id}`}>
                <div className='search-layout__image'>
                    <img src={image} />
                </div>
                <div className='search-layout__content'>
                    <div className='search-layout__price'>
                        <span>${price}</span>
                        {(freeShipping) ? <i className={'icon icon-shipping-18'}></i> : ""}
                    </div>
                    <h2 className='search-layout__name'>{name}</h2>
                </div>
                <div className='search-layout__city col-2'>
                    <span>{city}</span>
                </div>
            </a>
        </li>

    )
}