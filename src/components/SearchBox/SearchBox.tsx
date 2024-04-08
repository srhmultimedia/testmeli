import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoML from '../../assets/Logo_ML.png';
import './SearchBox.scss';

export function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    //const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (searchTerm.trim() === '') return;
        //setSearchParams({ search: searchTerm });
        navigate(`/items?search=${searchTerm}`);
    };

    return (
        <header>
            <div className={'container col-10 nav-header'}>
                <img src={logoML} alt="MercadoLibre" />
                <form className={'form-search'} role='search' onSubmit={handleSearch}>
                    <input
                        className={'input-search'}
                        placeholder={'Nunca dejes de buscar'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='search'
                    />
                    <button className={'button-search'} type='submit'>
                        <i className={'icon icon-search-18'} ></i>
                    </button>
                </form>
            </div>
        </header>
    );
}