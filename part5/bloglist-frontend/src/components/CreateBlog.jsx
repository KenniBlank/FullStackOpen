import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ setNotification, blogs, setBlogs, onClick }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const createBlog = async (event) => {
        event.preventDefault();

        try {
            const obj = {
                title: title,
                author: author,
                url: url,
            };

            const response = await blogService.createBlog(obj);
            setBlogs(blogs.concat(response));
            console.log(response);

            setNotification({
                className: "msg",
                message: `a new blog ${response.title} by ${response.author} added`,
            });
        } catch (err) {
            setNotification({
                className: "err",
                message: `Error creating new blog\nError: ${err.message}`,
            });
        }
    };

    return (
        <form onSubmit={createBlog}>
            title:{" "}
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={({ target }) => {
                    setTitle(target.value);
                }}
            />
            <br />
            author:{" "}
            <input
                type="text"
                placeholder="author"
                value={author}
                onChange={({ target }) => {
                    setAuthor(target.value);
                }}
            />
            <br />
            url:{" "}
            <input
                type="text"
                placeholder="http://......."
                value={url}
                onChange={({ target }) => {
                    setUrl(target.value);
                }}
            />
            <br />
            <button type="submit" onClick={onClick}>
                Create
            </button>
        </form>
    );
};

export default CreateBlog;
