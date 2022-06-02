import './index.css'
import {Component} from 'react'

class LightDarkMode extends Component {
  state = {isDarkMode: true}

  onClickToChangeMode = () => {
    this.setState(prevState => ({isDarkMode: !prevState.isDarkMode}))
  }

  render() {
    const {isDarkMode} = this.state
    const modeClassName = isDarkMode ? 'dark-mode' : 'light-mode'
    const buttonMode = isDarkMode ? 'Light Mode' : 'Dark Mode'

    return (
      <div className="light-dark-mode-bg-container">
        <div className="light-dark-mode-page-container">
          <div className={`light-dark-mode-card-container ${modeClassName}`}>
            <h1 className="main-heading">Click To Change Mode</h1>
            <button
              type="button"
              onClick={this.onClickToChangeMode}
              className="button"
            >
              {buttonMode}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LightDarkMode
