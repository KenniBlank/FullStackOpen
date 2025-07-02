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

const mostBlogs = (blogs) => {
    const mostBlogAuthor = {
        author: "",
        blogs: 0,
    };

    let dict = {};
    [...new Set(blogs.map((blog) => blog.author))].forEach((author) => {
        dict[author] = 0;
    });

    blogs.forEach((blog) => {
        dict[blog.author] += 1;
    });

    for (const [key, value] of Object.entries(dict)) {
        if (mostBlogAuthor.blogs < value) {
            mostBlogAuthor.author = key;
            mostBlogAuthor.blogs = value;
        }
    }

    return mostBlogAuthor;
};

const mostLikes = (blogs) => {
    const mostLikedAuthor = {
        author: "",
        likes: 0,
    };

    let dict = {};
    [...new Set(blogs.map((blog) => blog.author))].forEach((author) => {
        dict[author] = 0;
    });

    blogs.forEach((blog) => {
        dict[blog.author] += blog.likes;
    });

    for (const [key, value] of Object.entries(dict)) {
        if (value > mostLikedAuthor.likes) {
            mostLikedAuthor.author = key;
            mostLikedAuthor.likes = value;
        }
    }

    return mostLikedAuthor;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
