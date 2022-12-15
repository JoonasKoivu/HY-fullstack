import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'Test Title',
    username: 'Test Username',
    author: 'Test Author',
    url: 'Test Url',
    likes: 10,
  }
  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('#Title')
  expect(title).toBeDefined()

  const author = container.querySelector('#Author')
  expect(author).toBeDefined()

  const url = container.querySelector('#Url')
  expect(url).toBeNull()
})

test('clicking the view button shows more info about the blog', async () => {
  const blog = {
    title: 'Test Title',
    user: {
      username: 'Test Username',
    },
    author: 'Test Author',
    url: 'Test Url',
    likes: 10,
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = container.querySelector('#View')
  await user.click(button)

  const url = container.querySelector('#Url')
  const likes = container.querySelector('#Likes')
  const username = container.querySelector('#Username')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(username).toBeDefined()

})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test Title',
    user: {
      username: 'Test Username',
    },
    author: 'Test Author',
    url: 'Test Url',
    likes: 10,
  }
  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()

  const viewButton = container.querySelector('#View')
  await user.click(viewButton)
  const likeButton = container.querySelector('#LikeButton')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})