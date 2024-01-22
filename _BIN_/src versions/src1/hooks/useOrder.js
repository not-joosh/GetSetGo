/*STRUCTURE: 
Orders
    Product[]
    totalPrice
    timestamp
*/

export const useOrder = () => {
    const completeOrder = () => {
        try {
            /*
            
            */
        } catch(error) {
            console.log(error.message);
        }
    };  

    const checkOut = () => { 
        try {
            /*
                LOGIC:
            */
        } catch(error) {
            console.log(error.message);
        }
    };
    return {checkOut, completeOrder};
};