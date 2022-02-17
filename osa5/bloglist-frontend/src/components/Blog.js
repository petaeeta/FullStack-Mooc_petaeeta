import React, { useState } from 'react'

const Blog = ({ blog, likePost, removePost, user }) => {
  const[visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hiddenComponent = () => {
    return(
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }

  const visibleComponent = () => {
    return(
      <div style={blogStyle}>
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>

        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.user[0]?.username}
        </div>
        {user.username === blog.user[0]?.username ? removeButton() : null}
      </div>
    )
  }

  const removeButton = () => {
    return (
      <div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    )
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to remove post: ${blog.title}?`))
    {
      removePost(blog.id)
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    const newObject = {
      ...blog,
      likes: blog.likes+1
    }
    likePost(blog.id, newObject)
  }


  return(visible ? visibleComponent() : hiddenComponent())
}

export default Blog