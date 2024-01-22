// {image, price, productName, description, handleClose}

import { useState, useEffect } from 'react';

export const ProductModal = ({image, price, productName, description, isOnSale, id}) => {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const handleClick = () => {
        setShowModal(!showModal)
    };

    const addToCart = (idIN) => {
        try {
            if(quantity > 0)
                console.log('added to cart');
        } catch(error) {
            console.log(error.message);
        }
    };  

    useEffect(() => {
        console.log(productName + 'is'+ isOnSale);
    }, [])
    return (
        <>
            <div className="products">
                <button className="product-box" onClick={handleClick}>
                    <img src = {image}/>
                    <div>{price}</div>
                    <div>{productName}</div>
                </button>  
                {showModal && (
                    <>
                        <div className="background"></div>
                        <div className="small-container single-product">
                            <div className="row">
                                <div className="col-2">
                                    <div className="small-img-row">
                                        <div className="small-img-col"></div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <br /><br />
                                    <h1 className="product-name">{productName}</h1>
                                    <h2 className="add-description">DESCRIPTION</h2><br />
                                    <p>{description}</p>
                                    <br />
                                    <h4>₱{price}{isOnSale === true && <span>{' '}ON SALE {isOnSale}</span>}</h4><br />
                                    <a href="#"className="btn">BUY NOW</a>
                                    <button href="#"className="btn" onClick = {() => {addToCart(id)}}>ADD TO CART</button><br />
                                    <p1>Quantity</p1>
                                    <input type="number" value = {quantity} onChange={(event) => {if(event.target.value >= 0) setQuantity(event.target.value)}}/>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div> 
        </>
    );
};

{/*// <div classNameName="popup" id="product-details">
                    //     <div classNameName="overlay"></div>
                    //     <div classNameName="content">
                    //         <div classNameName="closebtn" onClick={handleClick}>&#215;</div>
                    //         <h1 classNameName="product-name">{productName}</h1>
                    //         <img src = {image}/>
                    //         <h1>{price}</h1>
                    //         <p classNameName="product-name">{description}</p>
                    //     </div>
                    // </div>*/}