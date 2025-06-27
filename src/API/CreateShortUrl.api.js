import axios from '../config/axios_instans.js';

export const CreateShortUrl = async (url,slug) => {
    return await axios.post('ShortUrl/Create',{ url , slug});
}
export const FetchUrls = async () => {
    const {data} = await axios.get('ShortUrl/all');
    return data;
}

export const DeleteUrl = async (id) => {
    return await axios.post('delete',{id});
}