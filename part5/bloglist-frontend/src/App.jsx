import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useRef } from "react";

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
}) => {
    return (
        <form onSubmit={handleLogin}>
            Username:{" "}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            Password:{" "}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

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

const Notification = ({ notification, setNotification }) => {
    if (!(notification.message && notification.className)) return null;
    setTimeout(() => {
        setNotification({
            className: "",
            message: "",
        });
    }, 5000);

    return <div className={notification.className}>{notification.message}</div>;
};

const App = () => {
    const [blogs, setBlogs] = useState([]);

    const [username, setUsername] = useState("john_doe");
    const [password, setPassword] = useState("secure123");
    const [user, setUser] = useState(null);

    const [notification, setNotification] = useState({
        className: "", // either err or msg
        message: "",
    });

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const token = JSON.parse(window.localStorage.getItem("user"));
        setUser(token);
        blogService.setToken(token);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            setUsername("");
            setPassword("");
            const response = await loginService.login({
                username: username,
                password: password,
            });
            setUser(response);
            blogService.setToken(response);
            window.localStorage.setItem("user", JSON.stringify(response));

            setNotification({
                className: "msg",
                message: "Logged In Successfully",
            });
        } catch (err) {
            setNotification({
                className: "err",
                message: `Invalid username or password.\n Error: ${err.message}`,
            });
        }
    };

    const createBlogRef = useRef(null);

    return (
        <div>
            <h2>blogs</h2>
            {notification && (
                <Notification
                    notification={notification}
                    setNotification={setNotification}
                />
            )}
            {user ? (
                <>
                    {user.name} logged in{" "}
                    <button
                        onClick={() => {
                            setUser(null);
                            window.localStorage.removeItem("user");

                            setNotification({
                                className: "msg",
                                message: "Logged Out Successfully",
                            });
                        }}
                    >
                        Log Out
                    </button>
                    <Togglable buttonLabel="New Blog" ref={createBlogRef}>
                        <CreateBlog
                            setNotification={setNotification}
                            blogs={blogs}
                            setBlogs={setBlogs}
                            onClick={() => {
                                createBlogRef.current.toggleVisibility();
                            }}
                        />
                    </Togglable>
                </>
            ) : (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            )}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
