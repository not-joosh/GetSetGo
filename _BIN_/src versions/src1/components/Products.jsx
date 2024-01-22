import { ProductModal } from "./modals/ProducModal";
export const Products = ({products, accountType}) => {

    const promptCreation = () => {
        try {
            
        } catch(error) {
            console.log(error.message);
        }
    };
    
    return (
        <>
            {products && (
                <>
                    {accountType === 'admin' && <button className="product-box" onClick = {promptCreation}>+</button>}
                    {products.map((product) => {
                        if(product.stock > 0) return (
                            <ProductModal
                                image = {product.imgURL}
                                price = {product.price}
                                productName = {product.productName}
                                description = {product.description}
                                isOnSale = {product.isOnSale}
                                id = {product.id}
                            />
                        )
                    })}
                </>
            )}
        </>
    );
};