const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (first, second) => {
        return first + second
    }
    if (blogs.length === 1){
        return blogs[0].likes
    }
    return blogs.length === 0 ? 0 : blogs.map((blog) => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}
    let favorite = {}
    blogs.forEach(blog => {
        if(Object.keys(favorite).length === 0 || favorite.likes < blog.likes){
            favorite = {...blog}
        }
    })
    const result = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return result
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}
    const allAuthors = blogs.map((element) => element.author)
    const mostBlogs = lodash
    .maxBy(
      Object.entries(lodash.countBy(allAuthors, (author) => author))
      .map((element) => {
        const [author, blogs] = element
        return { author, blogs }
      }),
      (element) => element.blogs
    )
    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}
    const authorBlogs = lodash.groupBy(blogs, (element) => element.author)
    let authorLikes = []
    for (const author in authorBlogs) {
      authorLikes.push({
        author,
        likes: lodash
        .sum(authorBlogs[author]
        .map((element) => element.likes))
      })
    }
    return lodash.maxBy(authorLikes, (element) => element.likes)
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}