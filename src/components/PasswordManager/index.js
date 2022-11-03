import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordItemsList: [],
    searchInput: '',
    passwordShow: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newItemsList = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }
      this.setState(prevState => ({
        passwordItemsList: [...prevState.passwordItemsList, newItemsList],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onDelete = id => {
    const {passwordItemsList} = this.state
    const newPasswordList = passwordItemsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      passwordItemsList: newPasswordList,
    })
  }

  getFilterList = () => {
    const {passwordItemsList, searchInput} = this.state
    const filterListItems = passwordItemsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filterListItems
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({passwordShow: !prevState.passwordShow}))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordShow,
      searchInput,
    } = this.state

    const updatedResultList = this.getFilterList()
    const passwordCount = updatedResultList.length

    return (
      <div className="app-container">
        <div className="password-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="password-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="image-password"
            />
            <form
              className="input-search-container"
              onSubmit={this.onAddPasswordItem}
            >
              <h1 className="heading">Add New Password</h1>
              <div className="input-website-container">
                <div className="input-website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-logo"
                  />
                </div>
                <div className="user-input-logo">
                  <input
                    type="text"
                    className="input-type"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    value={websiteInput}
                  />
                </div>
              </div>

              <div className="input-website-container">
                <div className="input-website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-logo"
                  />
                </div>
                <div className="user-input-logo">
                  <input
                    type="text"
                    className="input-type"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                    value={usernameInput}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-logo"
                  />
                </div>
                <div className="user-input-logo">
                  <input
                    type="password"
                    className="input-type"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                    value={passwordInput}
                  />
                </div>
              </div>
              <div className="button-container">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="user-password-container">
            <div className="password-container">
              <div className="text-count-container">
                <h1 className="password-heading">Your Passwords</h1>
                <div className="count-card">
                  <p className="para-count">{passwordCount}</p>
                </div>
              </div>
              <div className="input-container">
                <div className="input-website">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-logo"
                  />
                </div>
                <div className="user-input-logo">
                  <input
                    type="search"
                    className="input-type"
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                    value={searchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.onChangeCheckbox}
                value={passwordShow}
              />
              <label className="show-password" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            {updatedResultList.length === 0 ? (
              <div className="no-password-container">
                <img
                  className="password-manager-image"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            ) : (
              <ul className="output-list-container">
                {updatedResultList.map(eachItem => (
                  <PasswordItem
                    passwordDetails={eachItem}
                    key={eachItem.id}
                    onDelete={this.onDelete}
                    onChangeCheckbox={passwordShow}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
