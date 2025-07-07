const { test, describe } = require("node:test");
const blogs = require("./test_helper").initialBlogs;
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});

const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
    },
];

describe("total likes", () => {
    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    test("when list has more than one blog, equals sum of likes of all blogs", () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 36);
    });
});

describe("Favorite Blog", () => {
    test("favorite blog, when blog empty", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), undefined);
    });

    test("favorite blog, when only one blog is passed equal same blog", () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog(listWithOneBlog),
            listWithOneBlog[0],
        );
    });

    test("favorite blog, when multiple blogs", () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]);
    });
});

describe("Most Blogs", () => {
    test("most blogs, when blogs empty", () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), {
            author: "",
            blogs: 0,
        });
    });

    test("most blogs, when one blog passed", () => {
        assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
            author: "Edsger W. Dijkstra",
            blogs: 1,
        });
    });

    test("most blogs, when multiple blogs are passed", () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
            author: "Robert C. Martin",
            blogs: 3,
        });
    });
});

describe("Most Likes", () => {
    test("most likes, when blogs empty", () => {
        assert.deepStrictEqual(listHelper.mostLikes([]), {
            author: "",
            likes: 0,
        });
    });

    test("most likes, when only one blogs passed", () => {
        assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
            author: "Edsger W. Dijkstra",
            likes: 5,
        });
    });

    test("most likes, when multiple blogs passed", () => {
        assert.deepStrictEqual(listHelper.mostLikes(blogs), {
            author: "Edsger W. Dijkstra",
            likes: 17,
        });
    });
});
