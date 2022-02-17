/* eslint-disable */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {

let container

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

const user = {
    username: "Mr.test"
}
const likePost = jest.fn()
beforeEach(() => {
    container = render(<Blog blog={blog} user={user} likePost={likePost}/>)

})


test('Blog renders title and author but not likes or url', () => {

    const element = screen.getByText('ExampleBlog for blogtests - tester')
    expect(element).toBeDefined()
    expect(screen.queryByText('likes')).toBeNull()
    expect(screen.queryByText('test.com')).toBeNull()
})

test('Blog renders likes and url as well after button press.', () => {
    const button = screen.getByText('view')
    userEvent.click(button)
    expect(screen.queryByText('likes')).toBeDefined()
    expect(screen.queryByText('test.com')).toBeDefined()
})

test('Like-button is pressed exactly twice', () => {
    const button = screen.getByText('view')
    userEvent.click(button)
    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    expect(likePost.mock.calls).toHaveLength(1)
    userEvent.click(likeButton)
    expect(likePost.mock.calls).toHaveLength(2)
})
})