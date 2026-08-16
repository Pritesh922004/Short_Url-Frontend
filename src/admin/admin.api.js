import axios from '../config/axios_instans.js';

const getAdminHeaders = () => {
    const adminToken = localStorage.getItem('adminToken');
    return adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
};

export const AdminLoginApi = async (user, password) => {
    const { data } = await axios.post('admin/login', { user, password });
    return data;
};

export const AdminVerifyApi = async () => {
    const { data } = await axios.get('admin/verify', {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminGetStatsApi = async () => {
    const { data } = await axios.get('admin/stats', {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminGetUsersApi = async () => {
    const { data } = await axios.get('admin/users', {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminDeleteUserApi = async (id) => {
    const { data } = await axios.delete(`admin/users/${id}`, {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminGetUrlsApi = async () => {
    const { data } = await axios.get('admin/urls', {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminDeleteUrlApi = async (id) => {
    const { data } = await axios.delete(`admin/urls/${id}`, {
        headers: getAdminHeaders()
    });
    return data;
};

export const AdminLogoutApi = async () => {
    try {
        const { data } = await axios.post('admin/logout', {}, {
            headers: getAdminHeaders()
        });
        return data;
    } catch {
        return { success: true };
    }
};
