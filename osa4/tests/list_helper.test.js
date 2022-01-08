const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

    const listWithOneBlog = [
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5
        }
    ]

    const blogs = [
        {
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7
        },
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5
        },
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12
        },
        {
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10
        },
        {
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0
        },
        {
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2
        }  
      ]

describe('total likes', () => {

    test('of empty list if zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite', () => {
    test('of many blogs', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            }
        )
    })

    test('of a list with one blog', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
            {
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                likes: 5
            }
        )
    })

    test('of a list with no blogs', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })
})
