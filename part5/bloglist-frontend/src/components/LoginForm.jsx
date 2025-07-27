import PropTypes from "prop-types";

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

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
