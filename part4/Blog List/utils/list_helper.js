const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const totalLikes = (sum, blog) => {
        return (sum += blog.likes);
    };

    return blogs.reduce(totalLikes, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined;

    const favoriteBlog = blogs.reduce((favBlog, blog) => {
        return (favBlog = favBlog.likes > blog.likes ? favBlog : blog);
    });

    return favoriteBlog;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
