import { useEffect, useState } from "react";
import { CategoryNavBar } from "../components/CategoryNavBar";
import { onSnapshot, query, where } from "firebase/firestore";
import { productsRef } from "../store/firebaseConfig";
import { Products } from "../components/Products";
import { ProductModal } from "../components/ProductModal";
import { CreateProduct } from "../components/CreateProduct";
import { AccountModal } from '../components/modals/AccountModal';
import { CartModal } from "../components/modals/CartModal";
import { FAQModal } from "../components/modals/FAQModal";
export const HomePage = () => {
    const [selection, setSelection] = useState('all');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [requestedProduct, setRequestedProduct] = useState('');
    const [showCreationModal, setShowCreationModal] = useState(false);
    /*
        Grab full collection 
        filter selection, unless its all, then we return true
        based on the filter, check if it should be pushed to filteredCategories
    */
    const handleViewItem = ({modalState, productID}) => {
        try {
            setShowModal(modalState);
            setRequestedProduct(productID);
        } catch(error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(query(productsRef, selection === 'all'? null : where('category', '==', selection)), (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({id: doc.id, ...doc.data()})
            });
            setFilteredCategories(items);
        });
        return () => unsubscribe();
    }, [selection]);

    useEffect(() => {
        setShowModal(false);
    }, [filteredCategories]);

    return (
        <>
            <CategoryNavBar selection = {selection} handleSelection = {(newSelection) => {setSelection(newSelection)}}/>
            {(requestedProduct && showModal) && <ProductModal productID = {requestedProduct} handleExit = {(exitState) => setShowModal(exitState)}/>}
            {showCreationModal && (<CreateProduct handleExit = {(modalState) => setShowCreationModal(modalState)}/>)}
            <AccountModal />
            <CartModal />
            <FAQModal />
            <div className="products-grid">
                {filteredCategories && (
                    <Products handleCreationView = {(modalState) => setShowCreationModal(modalState)} handleProductView = {({modalState, productID}) => handleViewItem({modalState, productID})}products = {filteredCategories} />
                )}
            </div>
        </>
    );
};


{/* <ProductModal
    image = {product.imgURL}
    price = {product.price}
    productName = {product.productName}
    description = {product.description}
    stock = {product.stock}
    id = {product.id}
/> */}

{/* <div className="products-grid">
{products && (
    <Products products = {products} accountType = {localStorage.getItem('accountType')}/>
)}
</div> } */}