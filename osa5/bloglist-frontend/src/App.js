import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogComponent from './components/BlogComponent'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorMessageType, setErrorMessageType] = useState('info')

  const newPostRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs([...blogs].sort((a,b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessageType('info')
      setErrorMessage(`Login successful! Welcome ${user.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception) {
      setErrorMessageType('error')
      setErrorMessage('Login failed: wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setErrorMessageType('info')
      setErrorMessage('Logged out.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch(exception){
      setErrorMessageType('error')
      setErrorMessage('Logout failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createPost = async (blogObject) => {
    try{

      const res = await blogService.create(blogObject)
      setBlogs(blogs.concat(res))
      console.log(blogs)
      newPostRef.current.toggleVisibility()
      setErrorMessageType('info')
      setErrorMessage(`A new blog ${res.title} by ${res.author} added.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch(exception){
      setErrorMessageType('error')
      setErrorMessage('Create-operation failed. Check that fields are valid')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likePost = async (id, blogObject) => {
    try{
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => b.likes - a.likes))
    }
    catch(exception){
      setErrorMessageType('error')
      setErrorMessage('Like-failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removePost = (id) => {
    try{
      blogService.remove(id)
      console.log(blogs)
      setBlogs(blogs.filter(blog => blog.id !== id))
      console.log(blogs)
      setErrorMessageType('info')
      setErrorMessage('Post was removed successfully!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch(exception){
      setErrorMessageType('error')
      setErrorMessage('Like-failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} messageType={errorMessageType}/>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const blogComponent = () => {
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} messageType={errorMessageType} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <Togglable buttonLabel="New note" ref={newPostRef}>
          <BlogComponent createPost={createPost}/>

        </Togglable>

        <ul>
          {blogs.map(blog => <li key={blog.id}>
            <Blog key={blog.id} blog={blog} likePost={likePost} removePost={removePost} user={user}/>
          </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : blogComponent()}
    </div>
  )
}

export default App