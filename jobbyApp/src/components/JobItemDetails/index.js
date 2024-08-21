import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {finalData: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getjobitemdetailsprofile()
  }

  getjobitemdetailsprofile = async () => {
    const {finalData} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const finaldata = {
        companyLogo: data.job_details.company_logo_url,
        companyWebsiteurl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePeranum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        similarJobs: data.similar_jobs.map(every => ({
          companyLogoUrl: every.company_logo_url,
          employementType: every.employment_type,
          id: every.id,
          jobDescription: every.job_description,
          location: every.location,
          rating: every.rating,
          title: every.title,
        })),
      }
      this.setState({
        finalData: finaldata,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  theitemstarted = () => {
    const {apiStatus, finalData} = this.state
    const {
      companyLogo,
      id,
      title,
      rating,
      location,
      employmentType,
      packagePeranum,
      jobDescription,
      skills,
      lifeAtCompany,
      similarJobs,
      companyWebsiteurl,
    } = finalData
    const skillsnew = finalData.skills
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div data-testid="loader" className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <div className="againwhole">
            <div className="wholeee">
              <div className="imgandcontentdiv">
                <div>
                  <img
                    className="jobitemimage"
                    alt="job details company logo"
                    src={companyLogo}
                  />
                </div>

                <div className="titlediv">
                  <h1 className="title">{title}</h1>
                  <div className="ratingdiv">
                    <AiFillStar className="starimag" />
                    <p className="rating">{rating}</p>
                  </div>
                </div>
              </div>

              <div className="jobdetailsdivone">
                <div className="leftside">
                  <div className="locationdiv">
                    <IoLocationSharp className="type-icon" />
                    <p className="locationpara">{location}</p>
                  </div>
                  <div className="locationdiv">
                    <BsBriefcaseFill />
                    <p className="locationpara">{employmentType}</p>
                  </div>
                </div>

                <div>
                  <p>{packagePeranum}</p>
                </div>
              </div>

              <hr />
              <div>
                <h1 className="des">Description</h1>
                <a href={companyWebsiteurl}>
                  Visit <FaExternalLinkAlt />
                </a>
              </div>

              <p className="jobdes">{jobDescription}</p>
              <h1 className="title">Skills</h1>
              <ul className="skills-list">
                {skills.map(eachSkill => {
                  const {imageUrl, name} = eachSkill
                  return (
                    <li className="skill-item" key={name}>
                      <img src={imageUrl} alt={name} className="skill-image" />
                      <p className="skill-name">{name}</p>
                    </li>
                  )
                })}
              </ul>
              <h1 className="title">Life at Company</h1>
              <div className="jobjkl">
                <p className="jobdes">{lifeAtCompany.description}</p>
                <img
                  alt="life at company"
                  className="desclifeat"
                  src={lifeAtCompany.imageUrl}
                />
              </div>
            </div>
            <h1 className="des">Similar Jobs</h1>
            <ul className="againulop">
              {finalData.similarJobs.map(eachjob => {
                const {companyLogoUrl, employementType} = eachjob
                return (
                  <li key={eachjob.id} className="thyuio">
                    <div className="imgandcontentdiv">
                      <div>
                        <img
                          className="similar job company logo"
                          alt={eachjob.id}
                          src={eachjob.companyLogoUrl}
                        />
                      </div>

                      <div className="titlediv">
                        <h1 className="title">{eachjob.title}</h1>
                        <div className="ratingdiv">
                          <AiFillStar className="starimag" />
                          <p className="rating">{eachjob.rating}</p>
                        </div>
                      </div>
                    </div>

                    <h1 className="des">Description</h1>

                    <p className="jobdes">{eachjob.jobDescription}</p>
                    <div className="leftside">
                      <div className="locationdiv">
                        <IoLocationSharp className="type-icon" />
                        <p className="locationpara">{eachjob.location}</p>
                      </div>
                      <div className="locationdiv">
                        <BsBriefcaseFill />
                        <p className="locationpara">{employmentType}</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
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
              onClick={this.getjobitemdetailsprofile}
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
    return (
      <div>
        <Header />
        {this.theitemstarted()}
      </div>
    )
  }
}
export default JobItemDetails
