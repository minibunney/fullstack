const _ = require('lodash')
const logger = require('./logger')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const maxLikes = (blogs) => {
    const max = blogs.reduce((blogA, blogB) => (blogA.likes > blogB.likes) ? blogA : blogB, 1)
    return max
}

const favoriteBlog = (blogs) => {
    return maxLikes(blogs)
}

const mostBlogs = (blogs) => {
    const auths = _.map(blogs, 'author')
    const largestAuthor = _.head(_(auths)
        .countBy()
        .entries()
        .maxBy(_.last))
    // const occurence = _.countBy(auths)
    // logger.info("values", _.max(_.values(_.countBy(auths))))
    // logger.info("values2",)
    // logger.info("list_helper.mostBlogs.blogs", blogs)
    // logger.info("list_helper.mostBlogs.auths", auths)
    // logger.info("list_helper.mostBlogs.largestAuthor", largestAuthor)
    // logger.info("list_helper.mostBlogs.occurence", occurence)
    // logger.info("list_helper.mostBlogs.occurence.largestAuthor", occurence.largestAuthor)    
    return { author: largestAuthor, blogs: _(auths).countBy().values().max() }
}

const mostBlogsObject =
{
    author: "Robert C. Martin",
    blogs: 3
}

const mostLikes = (blogs) => {
    const holyMostLikesBatman = _.maxBy(_(blogs)
        .groupBy('author')
        .map((a, key) => ({
            'author': key,
            'likes': _.sumBy(a, 'likes')
        }))
        .value(), 'likes')
    //logger.info("list_helper.mostLikes.holyMostLikesBatman", holyMostLikesBatman)
    return holyMostLikesBatman

}
const mostLikesObject = {
    author: "Edsger W. Dijkstra",
    likes: 17
}
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
const mostLikedBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostBlogsObject,
    listWithOneBlog,
    blogs,
    mostLikes,
    mostLikesObject, mostLikedBlog
}