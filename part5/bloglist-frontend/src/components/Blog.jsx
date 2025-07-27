import { useState } from "react";

const Blog = ({ blog }) => {
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

    console.log(blog);

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}{" "}
            <button onClick={onClickFn}>{view ? "hide" : "view"}</button>
            {view ? (
                <>
                    <br />
                    {blog.url}
                    <br />
                    likes: {blog.likes} <button>like</button>
                    <br />
                    {blog.user.name}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Blog;
