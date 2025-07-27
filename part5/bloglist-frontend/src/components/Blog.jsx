import { useState } from "react";

const Blog = ({ blog, updateLikes, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const [view, setView] = useState(false);

    const onClickFn = () => {
        setView(!view);
    };

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}{" "}
            <button onClick={onClickFn}>{view ? "hide" : "view"}</button>
            {view ? (
                <>
                    <br />
                    {blog.url}
                    <br />
                    likes: {blog.likes}{" "}
                    <button
                        onClick={() => {
                            updateLikes(blog.id, blog.likes);
                        }}
                    >
                        like
                    </button>
                    <br />
                    {blog.user.name}
                    <br />
                    <button
                        onClick={() =>
                            removeBlog(
                                blog.id,
                                `Remove blog ${blog.title} by ${blog.author}`,
                            )
                        }
                    >
                        Remove
                    </button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Blog;
