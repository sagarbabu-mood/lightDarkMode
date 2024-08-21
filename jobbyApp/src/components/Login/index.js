import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errormsg: false, errorMs: ''}

  inputchanged = event => {
    this.setState({username: event.target.value})
  }

  passwordclicked = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken)
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errormsg: true, errorMs: error})
  }

  finalclicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errormsg, errorMs} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/login" />
    }
    return (
      <form className="loginBackground" onSubmit={this.finalclicked}>
        <div className="loginFormback">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="one">
            <label className="username" htmlFor="first">
              USERNAME
            </label>
            <input
              placeholder="Username"
              value={username}
              type="text"
              onChange={this.inputchanged}
              id="first"
              className="inputusername"
            />
          </div>

          <div className="two">
            <label className="password" htmlFor="second">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              onChange={this.passwordclicked}
              value={password}
              type="password"
              id="second"
              className="inputpassword"
            />
          </div>

          <button className="thebutton" type="submit">
            Login
          </button>
          {errormsg ? <p className="errorMsgcss">*{errorMs}</p> : null}
        </div>
      </form>
    )
  }
}
export default Login
