/* eslint-disable */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('Blog renders title and author but not likes or url', () => {

    const blog = {
        title: "ExampleBlog for blogtests",
        author: "tester",
        url: "test.com",
        user: [
        {
        username: "Mr.test",
        name: "Test Testerson",
        id: "61dacefcb343276e1b61889b"
        }
        ],
        likes: 15,
        id: "620c00421500f514c1d5e6e9"
        }

    render(<Blog blog={blog} />)
    const element = screen.getByText('ExampleBlog for blogtests - tester')
    screen.debug(element)
    expect(element).toBeDefined()
    expect(screen.queryByText('likes')).toBeNull()
    expect(screen.queryByText('test.com')).toBeNull()
})