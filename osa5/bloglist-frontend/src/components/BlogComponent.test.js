/* eslint-disable */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogComponent from './BlogComponent'
import userEvent from '@testing-library/user-event'

describe('<BlogComponent />', () => {

let container

const createPost = jest.fn()
beforeEach(() => {
    container = render(<BlogComponent createPost={createPost}/>)

})


test('Creating a blog is called with correct values', () => {
    const button = screen.getByText('create')

    const authorInput = screen.getByPlaceholderText('write here the author')
    userEvent.type(authorInput, 'exampleauthor')

    const urlInput = screen.getByPlaceholderText('write here the url')
    userEvent.type(urlInput, 'exampleurl')

    const titleInput = screen.getByPlaceholderText('write here the title')
    userEvent.type(titleInput, 'exampletitle')

    userEvent.click(button)
    expect(createPost.mock.calls).toHaveLength(1)
    expect(createPost.mock.calls[0][0].title).toBe('exampletitle')
    expect(createPost.mock.calls[0][0].author).toBe('exampleauthor')
    expect(createPost.mock.calls[0][0].url).toBe('exampleurl')
})
})