import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().email("Must be a valid email...").required("Email field is Required..."),
    password: yup.string().required("Password field is Required..."),
});