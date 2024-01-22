
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useProduct } from '../hooks/useProduct';

const schema = yup.object().shape({
    productName: yup.string().required('Product Name Required...'),
    description: yup.string().required('Description Required...'),
    price: yup.number().positive('Must be a positive price...').required('Price Required...'),
    stock: yup.number().positive('Must be a positive quantity...').required('Stock Name Required...'),
    category: yup.string().required('Product Name Required...'),
    productName: yup.string().required('Product Name Required...'),
    imageFILE: yup
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

export const CreateProduct = ({handleExit}) => {

    const {createProduct} = useProduct();

    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const handleCreateProduct = async (formData) => {
        try {
            if(formData.category === 'Select an Category') throw new Error('Select a category');
            // console.log(formData.imageFILE[0])
            await createProduct(
                formData.productName, formData.description, formData.price, 
                formData.stock, formData.category, formData.imageFILE
            );
            reset();         
        } catch(error) {
            console.log(error.message);
        }
    };

    useEffect(() => {       
        console.log(errors)
    }, [errors]);

    return (
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
            <form onSubmit = {handleSubmit(handleCreateProduct)}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        placeholder="Product name..."
                        {...register('productName')}
                    />
                </label>
                <br />

                <label>
                    Description:
                    <textarea
                        placeholder="Description..."
                        {...register('description')}
                    ></textarea>
                    </label>
                <br />

                <br />
                <label>
                    Price:
                    <input
                        type="number"
                        step="1"
                        placeholder="0 PHP"
                        {...register('price')}
                    />
                </label>
                <br />

                <label>
                    Stock:
                    <input
                        type="number"
                        placeholder="0 PHP"
                        {...register('stock')}
                    />
                </label>        

                <br />
                    <label>
                    Category:
                    <select
                        {...register('category')}   
                    >
                        <option style = {{display: 'none'}}> Select an Category </option>
                        <option value = 'food'> Food </option>
                        <option value = 'fashion'> Fashion </option> 
                        <option value = 'electronics'> Electronics </option>
                        <option value = 'personal'> Personal </option>
                        <option value = 'health'> Health </option>
                        <option value = 'household'> Household </option>
                    </select>
                </label>

                <br />
                <label>
                    IMG:
                    <input
                        type="file"
                        {...register('imageFILE')}
                    />
                </label>
                <br />
                <input type = 'submit' value = 'Create Product' />
            </form>
            </div>
        </>
    );
};