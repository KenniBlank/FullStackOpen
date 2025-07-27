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

const returnConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${token.token}`,
        },
    };
};

const createBlog = async (newBlog) => {
    const config = returnConfig();
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const updateBlog = async (updateBlogInfo) => {
    const { id } = updateBlogInfo;
    if (!id) return "err";

    const response = await axios.put(
        `${baseUrl}/${id}`,
        updateBlogInfo,
        returnConfig(),
    );
    return response.data;
};

const deleteBlog = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, returnConfig());
    console.log(response);
    return response;
};

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
