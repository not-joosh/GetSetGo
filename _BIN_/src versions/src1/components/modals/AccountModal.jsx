import { accountSidePanel } from "../../assets/config";
import { auth } from "../../store/firebaseConfig";
import { useEffect } from "react";
export const AccountModal = ({handleExit}) => {
    useEffect(() => {
        console.log(auth.currentUser?.email);
    }, []);
    return (
        <div id="accountPanel" className="sidepanel" style = {{zIndex: '5', position: 'absolute'}}>
            <button className="closebtn" onClick = {handleExit}>&#215;</button>
            <img className="account-sidepanel" src = {accountSidePanel} />
            <h1>MY ACCOUNT</h1>
            <button className="profile-pic"></button>
            <div className="info">
                <p className="name-label">NAME:</p>
                <p className="nameOwner">Insert Name</p>
                <p className="email-label">EMAIL:</p>
                <p className="emailOwner">insert.email@gmail.com</p>
                <p className="gender-label">GENDER:</p>
                <p className="genderOwner">Male</p>
                <p className="birthdate-label">BIRTHDATE:</p>
                <p className="birthdateOwner">01/01/2023</p>
            </div>
            <button className="history">VIEW HISTORY</button>
            <button className="logOut">LOG OUT</button>
        </div>
    );
};