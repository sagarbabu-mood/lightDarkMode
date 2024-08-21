import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Home extends Component {
  findjobsclicked = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="HomeMaindiv">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="para">
            Millions of people are searching for jobs,salary <br />{' '}
            information,company reviews.Find the jobs that fits your <br />{' '}
            abilities and potential
          </p>
          <Link to="/jobs">
            <button className="buttonstyle" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
