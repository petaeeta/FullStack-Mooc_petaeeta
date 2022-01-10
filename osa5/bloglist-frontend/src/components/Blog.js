import React from 'react'
const Blog = ({blog}) => (
  <div>
    <div> <strong>Title:</strong> {blog.title}</div>
    <div> <strong>Author:</strong> {blog.author}</div>
  </div>  
)

export default Blog