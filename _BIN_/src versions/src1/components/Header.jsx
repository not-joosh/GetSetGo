import { Logo } from '../components/Logo';
import { SearchBar } from '../components/SearchBar';
import { accountIcon, carIcon as cartIcon, faqIcon } from '../assets/config';
import { useState } from 'react';
import { AccountModal } from './modals/AccountModal';

export const Header = () => {
    const [selection, setSelection] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleClick = (selection) => {
        setSelection(selection);
        setShowModal(!showModal);
    };

    return (
        <>
            <header>
                <Logo />    
                <SearchBar />
                <img className="account-icon" src= {accountIcon} onClick={() => handleClick('account')} />
                <img className="cart-icon" src= {cartIcon} onClick={() => handleClick('cart')} />
                <img className="faq-icon" src = {faqIcon} onClick={() => handleClick('faq')} />
            </header>
            <div>
                {selection === 'account' && showModal && (
                    <AccountModal handlExit = {() => {setShowModal(false)}}/>
                    // <div>hello</div>
                )}

            </div>
        </>
        
    );
};