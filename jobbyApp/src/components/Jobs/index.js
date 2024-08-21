import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profilNeed: '',
    profileapistatus: apiStatusConstants.initial,
    employementType: [],
    salaryRange: '',
    searchinput: '',
    jobsList: [],
    jobsapistatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getprofile()
    this.getjobitems()
  }

  getprofile = async () => {
    this.setState({profileapistatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const profiledetails = {
        profileImage: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profilNeed: profiledetails,
        profileapistatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({profileapistatus: apiStatusConstants.failure})
    }
  }

  renderprofiledetails = () => {
    const {profileapistatus, profilNeed} = this.state
    const {profileImage, name, shortBio} = profilNeed

    switch (profileapistatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="profiledetails">
            <img alt="profile" className="profileimg" src={profileImage} />
            <h1 className="name">{name}</h1>
            <p className="Bioo">{shortBio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <button
            type="button"
            onClick={this.getprofile}
            className="buttonstyle"
          >
            Retry
          </button>
        )

      default:
        return null
    }
  }

  employeeTypedetermine = event => {
    const {employementType} = this.state
    const valuee = event.target.value
    if (employementType.includes(valuee)) {
      const filtereddvalue = employementType.filter(
        eachitem => eachitem !== valuee,
      )
      this.setState({employementType: filtereddvalue}, this.getjobitems)
    } else {
      this.setState(
        prevState => ({
          employementType: [...prevState.employementType, event.target.value],
        }),
        this.getjobitems,
      )
    }
  }

  salaryRangeUpdated = event => {
    const {salaryRange} = this.state
    const valueee = event.target.value
    this.setState({salaryRange: valueee}, this.getjobitems)
  }

  searchinputele = event => {
    this.setState({searchinput: event.target.value})
  }

  getjobitems = async () => {
    const {employementType, salaryRange, searchinput} = this.state
    this.setState({jobsapistatus: apiStatusConstants.inProgress})
    const employeeLast = employementType.join(',')

    const joburl = `https://apis.ccbp.in/jobs?employment_type=${employeeLast}&minimum_package=${salaryRange}&search=${searchinput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(joburl, options)
    const data = await response.json()
    if (response.ok === true) {
      const formatteddata = data.jobs.map(eachiems => ({
        companyLogo: eachiems.company_logo_url,
        employementType: eachiems.employment_type,
        id: eachiems.id,
        jobDescription: eachiems.job_description,
        location: eachiems.location,
        packageDetails: eachiems.package_per_annum,
        rating: eachiems.rating,
        title: eachiems.title,
      }))
      console.log(formatteddata)
      this.setState({
        jobsList: formatteddata,
        jobsapistatus: apiStatusConstants.success,
      })
    }
  }

  renderjobitemdetails = () => {
    const {jobsapistatus, jobsList} = this.state
    switch (jobsapistatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        if (jobsList.length === 0) {
          return (
            <div>
              <img
                alt="no jobs"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters.</p>
            </div>
          )
        }
        return (
          <ul className="theulop">
            {jobsList.map(eachjob => (
              <JobItem key={eachjob.id} eachjob={eachjob} />
            ))}
          </ul>
        )

      case apiStatusConstants.failure:
        return (
          <div>
            <img
              alt="failure view"
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            />
            <h1>Oops Something Went Wrong</h1>
            <p>we cannot seem to find the page you are looking for</p>
            <button
              onClick={this.getjobitems}
              className="buttonstyle"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {employementType, salaryRange, jobsList} = this.state
    return (
      <div>
        <Header />
        <div className="whole">
          <div className="divone">
            <div>{this.renderprofiledetails()}</div>
            <hr className="horizontalLine" />
            <h1 className="employmentTypeHeading">Type of Employment</h1>
            <ul className="ullistone">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId} className="eachLi">
                  <input
                    value={each.employmentTypeId}
                    onChange={this.employeeTypedetermine}
                    id={each.employmentTypeId}
                    type="checkbox"
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="employmentlabel"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>

            <hr className="horizontalLine" />
            <h1 className="employmentTypeHeading">Salary Range</h1>
            <ul className="ullistone">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId} className="eachLi">
                  <input
                    value={each.salaryRangeId}
                    id={each.salaryRangeId}
                    type="radio"
                    onClick={this.salaryRangeUpdated}
                    checked={salaryRange === each.salaryRangeId}
                  />
                  <label
                    htmlFor={salaryRangesList.salaryRangeId}
                    className="employmentlabel"
                    value={each.label}
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="divtwo">
            <div className="searchdiv">
              <input
                placeholder="Search"
                className="searchinput"
                type="search"
                onChange={this.searchinputele}
              />
              <button
                className="searchbutton"
                type="button"
                data-testid="searchButton"
                onClick={this.getjobitems}
              >
                <BsSearch alt="k" className="search-icon" />
              </button>
            </div>
            {this.renderjobitemdetails()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
