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
};

export const FetchThreatAudit = async (id) => {
    const { data } = await axios.get(`ShortUrl/audit/${id}`);
    return data;
};

export const InspectUrlApi = async (url) => {
    const { data } = await axios.post('ShortUrl/inspect', { url });
    return data;
};