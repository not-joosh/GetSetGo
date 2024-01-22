import { useEffect, useState } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { accountSidePanel } from "../../assets/config";
import { useModal } from "../../hooks/useModal";
import { auth, usersRef, pastOrdersRef } from "../../store/firebaseConfig";
import{ useAuth } from '../../hooks/useAuth';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    imgFILE: yup
    .mixed()
    .required('Image is Required')
    .test(
        'fileSize',
        'The file is too large or has not been uploaded.',
        function (value) {
            if (!value) {
                return true;
            };
            return (value)[0]?.size <= 2000000;
        }
    ),
});

export const AccountModal = () => {
    const [name, setName] = useState('None...');
    const [birthDate, setBirthDate] = useState('None...');
    const [email, setEmail] = useState('None...');
    const [gender, setGender] = useState('None...');
    const [accountType, setAccountType] = useState('user');
    const [profilePicture, setProfilePicture] = useState('None...');
    const [imgName, setImgName] = useState('None...');
    const [orders, setOrders] = useState([]);
    const {useLogout} = useAuth();
    const {closeAccount, uploadProfilePicture} = useModal();

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

    const handleUploadImage = async ({imgFILE}) => {
        try {
            await uploadProfilePicture(imgName, imgFILE, profilePicture);
            reset();
        } catch(error) {console.log(error.message);}
    };

    useEffect(() => {
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');  
        if(!userID) return;
        const unsubscribe = onSnapshot(query(pastOrdersRef, where('userID', '==', userID)), (snapshot) => {
            const localOrders = [];
            snapshot.forEach((doc) => {
                localOrders.push({id: doc.id, ...doc.data()})
            });
            setOrders(localOrders);
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');  
        const fetchedAccountType = localStorage.getItem('accountType');
        if(!fetchedAccountType) return;    
        setAccountType(fetchedAccountType);
        if(!userID) return;
        const unsubscribe = onSnapshot(query(usersRef, where('id', '==', userID)), (snapshot) => {
            const userData = snapshot.docs[0].data();
            const dateObj = new Date(userData.birthdate.seconds * 1000);
            const wombDate = '' + dateObj.toISOString().split('T')[0];
            setBirthDate(wombDate);
            setProfilePicture(userData.profileImgURL);
            // console.log(userData.profileImgURL);
            setImgName(userData.profileImgName);
            setName(userData.fullname);  
            setEmail(userData.email);
            setGender(userData.gender);
        }); ;
        return () => unsubscribe();
    }, []);
    return (
        <>
            <div id="accountPanel" className ="sidepanel">
                <a href="javascript:void(0)" className ="closebtn" onClick = {() => {closeAccount()}}>&#215;</a>
                <img className ="account-sidepanel" src={accountSidePanel} />
                <h1>MY ACCOUNT</h1>

                <form onSubmit={handleSubmit(handleUploadImage)}>
                    <input type = 'file' {...register('imgFILE')}/>
                    <input type = 'submit' />
                </form>
                
                <img type = 'file' className ="profile-pic" src = {profilePicture} onClick = {() => {/*THIS IS THE ONE THAT NEEDS TO BE CLICKED...*/}}/>
                <div className ="info">
                    <p className ="name-label">NAME:</p>
                    <p className ="nameOwner">{name}</p>    
                    <p className ="email-label">EMAIL:</p>
                    <p className ="emailOwner">{email}</p>
                    <p className ="gender-label">GENDER:</p>
                    <p className ="genderOwner">{gender}</p>
                    <p className ="birthdate-label">BIRTHDATE:</p>  
                    <p className ="birthdateOwner">{birthDate}</p>
                    {accountType != 'admin' && (
                        <>
                            <p class="history-list">HISTORY</p>
                            <div class="history-box">
                                {orders && orders.map((orderObj) => {
                                    // console.log(order);
                                    return (
                                        <>
                                            {orderObj.order.map((product) => {
                                                return (
                                                    <>
                                                        <div class="history-product">
                                                            <p class="history-product-name">{product.productName}</p>
                                                            <p class="history-product-price">{product.price} {" "} PHP</p>
                                                            <hr/>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
                {/* 01/01/2023 */}
                <button type = 'button' className ="logOut" onClick = {async() => useLogout()}>LOG OUT</button>
            </div>
        </>
    );
};