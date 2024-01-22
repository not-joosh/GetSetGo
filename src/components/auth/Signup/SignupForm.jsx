
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./SignupValidation";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";
export const SignUpForm = ({handleExit}) => {
    const { useRegister } = useAuth();
    /*FORM VALIDATION*/
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({fullName, userName, password, email, confirmPassword, birthdate, gender}) => {
        try {
            await useRegister(fullName, userName, password, email, birthdate, gender);
        } catch(error) {
            console.log(error.message);
        }
    };
    return (
        <div className="container" id="sign-up">
            <div className="overlay"></div>
            <div className="content">
                <div className="closebtn" onClick = {handleExit} style = {{cursor: 'pointer'}}>&#215;</div>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="user-details">
                        <div className="input-box">
                            <label className="details">Full Name</label>
                            <input type="text" placeholder="Enter your name" required {...register('fullName')}/>
                        </div>
                        <div className="input-box">
                            <label className="details">Username</label>
                            <input type="text" placeholder="Enter your username" required {...register('userName')}/>
                        </div>
                        <div className="input-box">
                            <label className="details">Email</label>
                            <input type="email" placeholder="Enter your email" required {...register('email')}/>
                        </div>
                        <div className="input-box">
                            <label className="details">Birthdate</label>
                            <input type="date" placeholder="Enter your birthdate" required {...register('birthdate')}/>
                        </div>
                        <div className="input-box">
                            <label className="details">Password</label>
                            <input type="password" placeholder="Enter your password" required {...register('password')}/>
                        </div>
                        <div className="input-box">
                            <label className="details">Confirm Password</label>
                            <input type="password" placeholder="Confirm your password" required {...register('confirmPassword')}/>
                        </div>
                    </div>
                    <div className="gender-details">
                        <input type="radio" name="gender" id="dot-1" value="male" {...register('gender')} />
                        <input type="radio" name="gender" id="dot-2" value="female" {...register('gender')} />
                        <input type="radio" name="gender" id="dot-3" value="prefer-not-to-say" {...register('gender')} />
                        <label className="gender-title">Gender</label>
                        <div className="category">
                            <label htmlFor="dot-1"> 
                                <span className="dot one"></span>
                                <span className="gender">Male</span>
                            </label>
                            <label htmlFor="dot-2">
                                <span className="dot two"></span>
                                <span className="gender">Female</span>
                            </label>
                            <label htmlFor="dot-3">
                                <span className="dot three"></span>
                                <span className="gender">Prefer not to say</span>
                            </label>    
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>   
    );
};