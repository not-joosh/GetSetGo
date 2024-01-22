import { useEffect, useState } from "react";
import '../stylesheets/AdminProductStyles.css'
export const Products = ({products, handleProductView, handleCreationView}) => {
    const [accountType, setAccountType] = useState(); 
    useEffect(() => {
        const fetchedAccountType = localStorage.getItem('accountType');
        if(!fetchedAccountType) return;
        setAccountType(fetchedAccountType);
    }, []);
    return (
        <>  
            {accountType === 'admin' && <div className="product-box" onClick = {() => handleCreationView(true)}>+</div>}
            {products.map((product) => {
                if(product.stock > 0) return (
                    <>
                        <div className="products" onClick = {() => handleProductView({modalState: true, productID: product.id})}>
                            <img className = 'product-img' src = {product.imgURL}/>
                            <>{product.productName} | {product.price} PHP</>
                        </div>
                    </>
                );
            })}  
        </>
    );
};

// {products && (
//     <>
//         {accountType === 'admin' && <button className="product-box" onClick = {promptCreation}>+</button>}
//         {products.map((product) => {
            // if(product.stock > 0) return (
            //     <div className="product-box">
            //     {/* <img src = {product.imgURL}/>
            //     //     <div>{product.price}</div>
            //     //     <div>{product.productName}</div> */}

            //         <ProductModal
            //             image = {product.imgURL}
            //             price = {product.price}
            //             productName = {product.productName}
            //             description = {product.description}
            //             isOnSale = {product.isOnSale}
            //             id = {product.id}
            //         />
            //     </div>
            // )
//         })}