import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackDrop } from "../../_BIN_/src versions/src1/components/BackDrop";
import { LoginForm } from '../components/auth/Login/LoginForm';
import { Tagline } from '../components/informative/Tagline';
import { auth } from "../store/firebaseConfig";
import { HOME } from "../lib/routes";
import { Logo } from "../components/informative/Logo";
import { SignUpForm } from '../components/auth/Signup/SignupForm';
import { homepageBG, loginBG } from '../assets/config';
import '../stylesheets/LoginStyle.css';
export const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {      
        // setShowSignUp(!showSignUp);
        document.getElementById("sign-up").classList.toggle("active");
    };

    // useEffect(() => { 
    //     document.getElementById("sign-up").classList.toggle("active");
    // }, [showSignUp]);        

    useEffect(() => {
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');
        if(userID) navigate(HOME)
    }, []);

    return (    
        <>
            <BackDrop image = {loginBG}/>
            <Logo />
            <Tagline />
            <div className = 'box'>
                <LoginForm />   
                <button id="signup-btn" className="signUp" onClick = {() => {toggleForm()}}>Sign Up</button>
            </div>
            <SignUpForm handleExit={() => {toggleForm()}}/>
            <p className="shopOn">SHOP ONLINE!</p>
            <p className="shopNow">Shop Spree Now!</p>
            <p className="allRights">&#169; All Rights Reserved Series of 2023</p>
        </>
    );
};