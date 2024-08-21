import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class JobItem extends Component {
  render() {
    const {eachjob} = this.props
    const {
      companyLogo,
      employementType,
      jobDescription,
      id,
      location,
      packageDetails,
      rating,
      title,
    } = eachjob

    return (
      <Link className="custom-link" to={`/jobs/${id}`}>
        <li className="wholeee" onClick={this.jobitemclicked}>
          <div className="imgandcontentdiv">
            <div>
              <img className="jobitemimage" alt={id} src={companyLogo} />
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
                <p className="locationpara">{employementType}</p>
              </div>
            </div>

            <div>
              <p>{packageDetails}</p>
            </div>
          </div>

          <hr />

          <h1 className="des">Description</h1>
          <p className="jobdes">{jobDescription}</p>
        </li>
      </Link>
    )
  }
}
export default withRouter(JobItem)
