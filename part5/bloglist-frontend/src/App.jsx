import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LoginForm = ({
    username,
    password,
    setUsername,
    setPassword,
    setUser,
}) => {
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            setUsername("");
            setPassword("");
            const response = await loginService.login({
                username: username,
                password: password,
            });
            console.log(response);
            setUser(response);
        } catch (err) {
            console.log("Invalid: ", err.message);
        }
    };

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

const App = () => {
    const [blogs, setBlogs] = useState([]);

    const [username, setUsername] = useState("john_doe");
    const [password, setPassword] = useState("secure123");
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    return (
        <div>
            <h2>blogs</h2>
            {user ? (
                <>
                    <p>{user.name} logged in</p>
                </>
            ) : (
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                />
            )}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
