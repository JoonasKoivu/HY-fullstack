import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({
      username: username,
      password: password,
    })
  }

  return (
    <div id="formContainer">
      <h2>Login to use the bloglist</h2>
      <form d="formC" onSubmit={handleLogin}>
        <div className="rows">
          <div className="column">
            <label className="theLabels">
                            username
            </label>
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="column">
            <label className="theLabels">
                            password
            </label>
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button
            id='loginButton'
            type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  )
}
export default LoginForm