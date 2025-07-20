const Blog = require("../models/blog");
const User = require("../models/user");

const initialUsersToBeCreated = [
    {
        username: "Hyouin Kyouma",
        name: "Rintarou Okabe",
        password: "El Psy Congroo",
    },
    {
        username: "Christina",
        name: "Makise Kurisu",
        password: "Genius Girl",
    },
    {
        username: "Daru",
        name: "Itaru Hashida",
        password: "Hacker",
    },
    {
        username: "Okarin's Hostage",
        name: "Mayuri Shiina",
        password: "TuTuRu",
    },
    {
        username: "Part-time Warrior",
        name: "Suzuha Amane",
        password: "My life has been a waste",
    },
];

const initialBlogs = [
    {
        title: "The Organization is Watching",
        author: "Rintarou Okabe",
        url: "https://futuregadgetlab.com/blog/organization-surveillance",
        likes: 42,
    },
    {
        title: "Time Travel and Microwave Bananas",
        author: "Makise Kurisu",
        url: "https://amadeuslab.net/blog/time-travel-theory",
        likes: 99,
    },
    {
        title: "D-Mail Protocol Specification",
        author: "Itaru Hashida",
        url: "https://supahh4x0r.org/docs/dmail-protocol",
        likes: 21,
    },
    {
        title: "The Tragedy of World Line Beta",
        author: "Mayuri Shiina",
        url: "https://tuturu.jp/articles/world-line-pain",
        likes: 17,
    },
    {
        title: "Reading Steiner Explained",
        author: "Rintarou Okabe",
        url: "https://okarinslab.org/reading-steiner",
        likes: 56,
    },
    {
        title: "Convergence Points and Inevitability",
        author: "Suzuha Amane",
        url: "https://2036resistance.org/convergence-points",
        likes: 35,
    },
];

const myMap = new Map();
for (const user of initialUsersToBeCreated) {
    myMap.set(user.name, {
        username: user.username,
        password: user.password,
    });
}

const allBlogsInDB = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const allUsersInDB = async () => {
    const users = await User.find({});
    return users.map((blog) => blog.toJSON());
};

module.exports = {
    initialUsersToBeCreated,
    initialBlogs,
    allBlogsInDB,
    allUsersInDB,
    myMap,
};
