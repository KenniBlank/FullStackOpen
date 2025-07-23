import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
    token = newToken;
};

const getAll = async () => {
    const request = await axios.get(baseUrl);
    return request.data;
};

const createBlog = async (newBlog) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

export default { getAll, createBlog, setToken };
