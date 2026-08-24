import axios from '../config/axios_instans.js';

export const SignIn = async (email, password) => {
    return await axios.post('user/signin', { email, password });
};

export const SignUp = async (name, email, password, otp) => {
    return await axios.post('user/signup', { name, email, password, otp });
};

export const SendSignupOtpApi = async (email) => {
    return await axios.post('user/send-signup-otp', { email });
};


export const VerifyUser = async () => {
    const { data } = await axios.get('user/verify');
    return data;
};

export const SignOutUser = async () => {
    return await axios.get('user/signout');
};

export const SendOtpApi = async (email) => {
    return await axios.post('user/send-otp', { email });
};

export const VerifyOtpApi = async (email, otp) => {
    return await axios.post('user/verify-otp', { email, otp });
};

export const ResetPasswordApi = async (email, otp, newPassword) => {
    return await axios.post('user/reset-password', { email, otp, newPassword });
};