import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const[newTitle, setNewTitle] = useState('')
  const[newAuthor, setNewAuthor] = useState('')
  const[newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div id="formContainer">
      <h2>Add new blog post</h2>
      <form id="formC" onSubmit={addBlog}>
        <div className="rows">
          <div className="column">
            <label className="theLabels">
                            Title:
            </label>
            <input
              id="title"
              className="theInputs"
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Title"
            />
          </div>
          <div className="column">
            <label className="theLabels">
                            Author:
            </label>
            <input
              id="author"
              className="theInputs"
              type="text"
              value={newAuthor}
              onChange={handleAuthorChange}
              placeholder="Author"
            />
          </div>
          <div className="column">
            <label className="theLabels">
                            Url:
            </label>
            <input
              id="url"
              className="theInputs"
              type="text"
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="Url"
            />
          </div>
        </div>
        <button type="submit" id='addBlogButton'>
          save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
