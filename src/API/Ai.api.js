import axios from '../config/axios_instans.js';

/**
 * Send code snippet for AI Review
 */
export const reviewCodeAPI = async ({ code, language, instruction }) => {
    const { data } = await axios.post('api/ai/code-review', {
        code,
        language,
        instruction
    });
    return data;
};

/**
 * Send document or raw text for AI Translation
 */
export const translateDocAPI = async (payload) => {
    const response = await axios.post('api/ai/translate-doc', payload);
    return response.data;
};
