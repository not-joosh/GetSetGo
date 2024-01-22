import { useEffect, useState } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { productsRef, auth } from "../store/firebaseConfig";
import { useProduct } from '../hooks/useProduct'
import { useCart } from "../hooks/useCart";
export const ProductModal = ({handleExit, productID}) => {
    const [product, setProduct] = useState();
    const [accountType, setAccountType] = useState('user');
    const {deleteProduct} = useProduct();
    const {addToCart} = useCart();
    const handleDeletion = async () => {
        try {
            await deleteProduct(product.id);
            console.log('Successfully Deleted!');
        } catch(error) {
            console.log(error.message);
        }
    };
    const handleAddToCart = async () => {
        try {
            await addToCart(product);
            handleExit(false);
        } catch(error) {
            console.log(error.nessage);
        }
    };
    useEffect(() => {
        if(!productID) return;
        const unsubscribe = onSnapshot(query(productsRef, where('id', '==', productID)), (snapshot) => {
            const productData = snapshot.docs[0].data();
            setProduct(productData);
        });
        return () => unsubscribe();
    }, [productID])

    useEffect(() => {
        const fetchedAccountType = localStorage.getItem('accountType');
        if(!fetchedAccountType) return
        setAccountType(fetchedAccountType);
    }, [])

    return (
        <>
            {product && (
                <>
                    <div style = {{
                        zIndex: '15',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }} onClick = {() => handleExit(false)}></div>
                    <div className = 'modalContent'>
                        <img src = {product.imgURL} height={'100vh'} weighht={'100vh'}/>
                        <h1>{product.productName}</h1>
                        <div>{product.price} PHP </div>
                        <p>{product.description}</p>
                        <div>STOCK: {product.stock}</div>
                        {accountType === 'admin' && (<button style = {{color: 'red', cursor: 'pointer'}} onClick = {() => handleDeletion()}>DELETE</button>)}
                        {accountType === 'user' && (<button style = {{color: 'blue', cursor: 'pointer'}} onClick = {() => handleAddToCart()}>ADD TO CART</button>)}
                    </div>
                </>
            )}
        </>
    );
};