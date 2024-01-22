import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HOME, LANDINGPAGE } from "../lib/routes";
import { mainLogo, accountIcon, cartIcon, faqIcon } from "../assets/config";
import { auth } from '../store/firebaseConfig';
import '../stylesheets/Navbar.css';
import { useModal } from "../hooks/useModal";
export const Navbar = () => {   
    const [accountType, setAccountType] = useState();
    const {openAccount, openCart, openFAQ} = useModal();
    const navigate = useNavigate();

    useEffect(() => { // Verification Renavigation
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');
        if(!userID) navigate(LANDINGPAGE);
        const fetchedType = localStorage.getItem('accountType');
        setAccountType(fetchedType);
    }, []);

    return (
        <>
            <div id="overlay">
                <header>
                    <img class="logo" src = {mainLogo} onClick = {() => navigate(HOME)}/>
                    <div class="search">
                        <input class="searchBar" type="text" placeholder="Search" />
                    </div>
                    {<img class="account-icon" src = {accountIcon} onClick = {() => openAccount()}/>}
                    {accountType != 'admin' && <img class="cart-icon" src = {cartIcon} onClick = {() => openCart()} />}
                    {accountType != 'admin' && <img class="faq-icon" src = {faqIcon} onClick = {() => openFAQ()} />}
                </header>
            </div>
        </>
    );
};