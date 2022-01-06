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
            console.log("we were here")
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

module.exports = {
    dummy, totalLikes, favoriteBlog
}