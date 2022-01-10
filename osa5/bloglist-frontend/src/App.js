import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('kenraali gaggens') 
  const [password, setPassword] = useState('secret')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorMessageType, setErrorMessageType] = useState('info')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      const user = await loginService.login({ username, password,})
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try{
      const res = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(res))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} messageType={errorMessageType}/>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogComponent = () => {
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} messageType={errorMessageType} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:<input value={title} onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author:<input value={author} onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            url:<input value={url} onChange={({ target }) => setUrl(target.value)} />
          </div>
        <button type="submit">create</button>
        </form>

        <ul>
        {blogs.map(blog => <li key={blog.id}>
          <Blog key={blog.id} blog={blog} />
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