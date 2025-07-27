import { useState, useEffect } from "react";

import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { useRef } from "react";

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

    const updateLikes = async (
        id,
        initialLikes,
        amountOfLikesToUpdateBy = 1,
    ) => {
        const data = {
            id,
            likes: initialLikes + amountOfLikesToUpdateBy,
        };
        const response = await blogService.updateBlog(data);

        setBlogs(
            blogs.map((blog) =>
                blog.id === response.id
                    ? { ...blog, likes: response.likes }
                    : blog,
            ),
        );
    };

    const removeBlog = async (id, msg) => {
        if (window.confirm(msg)) {
            try {
                const response = await blogService.deleteBlog(id);
                if (response.status === 204)
                    setBlogs(blogs.filter((blog) => blog.id !== id));
            } catch (err) {
                setNotification({
                    className: "err",
                    message: err.message ? err.message : "Error removing blog",
                });
            }
        }
    };

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
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateLikes={updateLikes}
                        removeBlog={removeBlog}
                    />
                ))}
        </div>
    );
};

export default App;
