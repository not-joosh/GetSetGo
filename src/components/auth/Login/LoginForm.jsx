import { schema } from "./LoginValidation";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAuth } from "../../../hooks/useAuth";
export const LoginForm = () => {
    /*Auth Hook*/
    const {useLogin} = useAuth();

    /*FORM VALIDATION*/
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({email, password}) => {
        try {
            await useLogin(email, password);
        } catch(error) {
            console.log(error.message)
        }
    };

    return (
        <form className = 'log-in' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email"></label>

            <input type="text" name="email" placeholder="Email" {...register('email')}/>
            <p style = {{color: 'red'}}>{errors.email && errors.email.message}</p>
            <label htmlFor="password"></label>
        
            <input type="password" name="password" placeholder="Password" {...register('password')}/>
            <p style = {{color: 'red'}}>{errors.password && errors.password.message}</p>
            <input className = 'logIn' type = 'submit' value = 'Log In' />
        </form>
    );
};