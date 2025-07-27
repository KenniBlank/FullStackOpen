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

export default LoginForm;
