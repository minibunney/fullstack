import React from 'react'
import '@testing-library/jest-dom'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlog from './AddBlog'


const blog = {
    author: "testAuthor",
    id: "64d904f6cbc746e253453ed0",
    likes: 1350,
    title: "editMe",
    url: "testUrl",
    user: {
        id: "64c982c350d0acd263a57489",
        name: "Ville",
        username: "ville"
    }
}
const blogUser = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ciIsImlkIjoiNjRkOTA3ODI0MDcxZmUzZTI3ODQ4ZDdlIiwiaWF0IjoxNjkyNTI5MzU1fQ.Uve8PNWgzqQR85j74QWGM_xZFZPc9o2a_t8c6ZRI5yI",
    username: "arthur",
    name: "test"
}

describe('blog', () => {
    //5.13
    test('renders content title by author', () => {
        render(<Blog blog={blog} user={blogUser} />)
        const element = screen.getByText('editMe by testAuthor')
        expect(element).toBeDefined()
    })
    //5.14
    test('clicking the button opens blog', async () => {
        render(<Blog blog={blog} user={blogUser} />)
        const user = userEvent.setup()
        const button = screen.getByText('📖 Open')
        await user.click(button)
        const element = screen.getByText('editMe', { exact: false })
        //screen.debug(element)
        expect(element).toHaveTextContent(/editMe/i)
        expect(element).toHaveTextContent(/testUrl/i)
        expect(element).toHaveTextContent(/likes 1350/i)
        expect(element).toHaveTextContent(/testUrl/i)
        expect(element).toHaveTextContent(/by testAuthor/i)

    })
    //5.15
    test('clicking the like button twice incements likes twice', async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog} user={blogUser} addLike={mockHandler} />)
        const user = userEvent.setup()
        const button = screen.getByText('📖 Open')
        await user.click(button)
        const likeButton = screen.getByText('👍 like')
        await likeButton.click(button)
        await likeButton.click(button)
        const element = screen.getByText('editMe', { exact: false })
        //screen.debug(element)
        expect(element).toHaveTextContent(/editMe/i)
        expect(element).toHaveTextContent(/testUrl/i)
        expect(element).toHaveTextContent(/likes 1352/i)
        expect(element).toHaveTextContent(/testUrl/i)
        expect(element).toHaveTextContent(/by testAuthor/i)

    })
    //5.16
    test('AddBlog callbacks with right data on save', async () => {
        const mockHandler = jest.fn()
        const { container } = render(<AddBlog addBlog={mockHandler} />)
        const user = userEvent.setup()

        const createButton = screen.getByRole('button', { name: 'Create new blog 📝' })
        const authorInput = container.querySelector('#newBlogAuthor')
        const titleInput = container.querySelector('#newBlogTitle')
        const urlInput = container.querySelector('#newBlogUrl')
        const saveButton = screen.getByText('💾 save')

        await user.click(createButton)
        await user.type(authorInput, 'testAuthor')
        await user.type(titleInput, 'testTitle')
        await user.type(urlInput, 'testUrl')
        await user.click(saveButton)

        expect(mockHandler.mock.calls).toEqual([[{ "author": "testAuthor", "title": "testTitle", "url": "testUrl" }]])

    })
})

