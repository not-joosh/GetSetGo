import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { onSnapshot, query, where } from "firebase/firestore";
import { cartIcon, deleteIcon } from "../../assets/config";
import { useModal } from "../../hooks/useModal";
import { auth, usersRef } from "../../store/firebaseConfig";
import { useEffect, useState } from "react";
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';
import '../../stylesheets/UserHomeStyles.css'


const schema = yup.object().shape({
    address: yup.string().required()
});

export const CartModal = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const { removeFromCart } = useCart();
    const { closeCart } = useModal();
    const {placeOrder} = useOrder();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const handleOrder = async (address) => {
        try {
            if(total <= 0) alert('Cart is Empty!');
            await placeOrder(address);
            closeCart();
        } catch(error) {console.log(error.message)}
    };

    const handleRemoveFromCart = async (productID) => {
        try {
            await removeFromCart(productID);
        } catch(error) {console.log(error.message)}
    };

    useEffect(() => {
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');
        if(userID) return;
        const unsubscribe = onSnapshot(query(usersRef, where('id', '==', userID)), (snapshot) => {
            const userData = snapshot.docs[0].data();
            if(userData.cart.length() < 0) return;
            let localTotal = 0;
            userData.cart.map((productObj) => {
                localTotal += productObj.price
            });
            setTotal(localTotal);
            setCart(userData.cart);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const userID = auth.currentUser?.uid || localStorage.getItem('userID');
        if(!userID) return;
        const unsubscribe = onSnapshot(query(usersRef, where('id', '==', userID)), (snapshot) => {
            const userData = snapshot.docs[0].data();
            if(userData.cart.length < 0) return;
            let localTotal = 0;
            userData.cart.map((productObj) => {
                localTotal += productObj.price
            });
            setTotal(localTotal);
            setCart(userData.cart);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(errors);
    }, [errors]);
    return (
        <>
            <div id="cartPanel" className ="sidepanel">
                <a href="javascript:void(0)" className ="closebtn" onClick={() => closeCart()}>
                    &#215;
                </a>
                <img className ="cart-sidepanel" src={cartIcon} />
                <h1>CART</h1>
                <div className ="cart-box">
                    {cart && cart.map((product) => {
                        return (
                            <div className ="cart-product">
                                <p className ="cart-product-name">{product.productName}<button className ="cart-delete-product" onClick = {() => handleRemoveFromCart(product.id)}><img className ="delete-icon" src= {deleteIcon} /></button></p>
                                <p className ="cart-product-price">{product.price} {" "}     PHP</p>
                            </div>
                        );
                    })}
                    <div className ="cart-total">
                        <p vlass="total">TOTAL: {total} PHP</p>
                    </div>
                </div>
                <form action="#" onSubmit={handleSubmit(handleOrder)}>
                <div className ="payment-box">
                    <div className ="payment-methods">
                        <div className ="cod">COD
                            <div className ="address-input-box">
                                <label className ="address">Address:</label>
                                <input type="text" placeholder="Enter delivery address" required {...register('address')}/>
                                {/* {errors.address && (<p style = {{color: 'red'}}>{errors.address}</p>)} */}
                            </div>
                        </div>
                    </div>
                </div>
                <button type = 'submit' className="check-out">CHECK OUT</button>
                </form>
            </div>
        </>
    );
};

/*

<div className ="payment-box">
    <div className ="payment-methods">
        <div className ="cod">COD
        <form action="#">
            <div className ="address-input-box">
                <label className ="address">Address:</label>
                <input type="text" placeholder="Enter delivery address" required />
            </div>
        </form>
        </div>
    </div>
</div>

*/
