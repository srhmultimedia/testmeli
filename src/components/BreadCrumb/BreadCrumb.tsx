import './BreadCrumb.scss'

export function BreadCrumb({ categories }: { categories: ICategory[] }) {

    return (
        <>
            <section className={'d-ib w-100'}>
                <ul className='breadCrumb-container container col-10'>
                    {categories.map((category: any) =>
                        <li className='breadCrumb-item' key={category.id}>{category.name}</li>
                    )}
                </ul>
            </section>
        </>
    )
}