import { Link } from "react-router-dom";
import { HOME, LANDINGPAGE } from "../lib/routes";
import { useEffect } from "react";
import { auth } from "../store/firebaseConfig";
import { useNavigate } from "react-router-dom";
import logoIcon from '../assets/icons/getsetgo-logo.webp';
export const Logo = () => {
    const navigate = useNavigate();
    useEffect(() => {   
        if(!auth.currentUser?.email) navigate(LANDINGPAGE);
    }, []);
    return (
        <header>
            <Link to = {HOME}>
                <img className ="logo" src = {logoIcon}/>
            </Link>
        </header>
    );
};