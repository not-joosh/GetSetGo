import * as yup from 'yup';

export const schema = yup.object().shape({
    fullName: yup.string().required("Full name field required..."),
    userName: yup.string().min(3).required(),
    email: yup.string().email("Email just be a valid email...").required("Email field required..."),
    password: yup.string().min(6, "Password must contain at least 6 characters...").required("Password field required..."),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match...").required("Please confirm your password..."),
    birthdate: yup.date().required(),
});