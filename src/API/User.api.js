import axios from '../config/axios_instans.js';

export const SignIn = async (email, password) => {
    return await axios.post('user/signin', { email, password });
}

export const SignUp = async (name, email, password) => {
    return await axios.post('user/signup', { name, email, password });
}

export const VerifyUser = async()=>{
    const { data } = await axios.get('user/verify');
    return data;
}

export const SignOutUser = async () => {
    return await axios.get('user/signout');
}