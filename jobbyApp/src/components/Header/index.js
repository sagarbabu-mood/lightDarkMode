import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="wholediv">
      <li>
        <Link to="/">
          <img
            alt="website logo"
            className="jobbyimage"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          />
        </Link>
      </li>
      <div className="po">
        <li>
          <Link className="homepara" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="homepara" to="/jobs">
            Jobs
          </Link>
        </li>
      </div>
      <li>
        <button type="button" className="buttonstyle" onClick={logoutClicked}>
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
