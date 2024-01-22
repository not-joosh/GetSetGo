import { useState, useEffect } from 'react';
import { Logo } from '../components/Logo';
import { Tagline } from '../components/Tagline';
import { LoginForm } from '../components/auth/Login/LoginForm';
import { SignUpForm } from '../components/auth/Signup/SignupForm';
import { useNavigate } from 'react-router-dom';
import { auth } from '../store/firebaseConfig';
import { HOME } from '../lib/routes';
import { loginBG } from '../assets/config';
import { BackDrop } from '../components/BackDrop';
export const LandingPage = () => {
    const [showSignUp, setShowSignup] = useState(false);
    const navigate = useNavigate();
    
    const toggleForm = () => {
        setShowSignup(!showSignUp);
    };

    useEffect(() => { // Rerouting them if they are already logged in...
        if(auth.currentUser?.email) navigate(HOME);
    }, []);

    useEffect(() => { 
        document.getElementById("sign-up").classList.toggle("active");
    }, [showSignUp]);
    return (
        <>
            <BackDrop image = {loginBG}/>
            <Logo />
            <Tagline />
            <div className = 'box'>
                <LoginForm />
                {!showSignUp && <button id="signup-btn" className="signUp" onClick = {() => {toggleForm()}}>Sign Up</button>}
            </div>
            <SignUpForm handleExit={() => {toggleForm()}}/>
            <p className="shopOn">SHOP ONLINE!</p>
            <p className="shopNow">Shop Spree Now!</p>
            <p className="allRights">&#169; All Rights Reserved Series of 2023</p>
        </>
    );
};