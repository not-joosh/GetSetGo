import { BackDrop } from '../components/BackDrop';
import { Header } from '../components/Header';
import { CategoryNavBar } from '../components/CategoryNavBar';
import { homepageBG } from '../assets/config';
import { useState, useEffect } from 'react';
import { auth } from '../store/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { LANDINGPAGE } from '../lib/routes';
import { useProduct } from '../hooks/useProduct';
import { Products } from '../components/Products';
import { useUser } from '../hooks/useUser';
export const HomePage = () => {

    const [category, setCategory] = useState('food');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const {fetchProducts} = useProduct();
    const {fetchUserInformation} = useUser();

    const handleClick = (categoryIN) => {
        setCategory(categoryIN)
    };

    const handleFetch = async() => {
        try {
            console.log('FETCHING INFORMATION!');
            const arrOfProducts = await fetchProducts(category);
            setProducts(arrOfProducts);
        } catch(error) {
            console.log(error.message);
        }
    };

    const handleAccountGrab = async() => {
        try {
            const queryAccounType = await fetchUserInformation('accountType');
            localStorage.setItem('accountType', queryAccounType);
        } catch(error) {
            console.log(error.message);
        } 
    };
    
    useEffect(() => {
        if(!auth.currentUser?.email) navigate(LANDINGPAGE);
        handleFetch();
        handleAccountGrab();
    }, []);

    useEffect(() => {
        handleFetch();
    }, [category]);

    return (    
        <>
            <BackDrop image={homepageBG}/>
            <Header />
            <CategoryNavBar 
                handleSelection = {handleClick}
                selection = {category}  
            />
            {products && (
                <Products products = {products} accountType = {localStorage.getItem('accountType')}/>
            )}
        </>
    );
};