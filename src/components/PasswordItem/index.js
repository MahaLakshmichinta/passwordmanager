import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDelete, onChangeCheckbox} = props
  const {id, website, username, password} = passwordDetails
  const firstLetter = website.split('').slice(0, 1)
  const starImage =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const deleteBtn =
    'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

  const deletePasswordItem = () => {
    onDelete(id)
  }

  return (
    <li className="list-item-container">
      <div className="first-letter-container">
        <p>{firstLetter[0].toUpperCase()}</p>
      </div>
      <div className="website-details-container">
        <p className="details">{website}</p>
        <p className="details">{username}</p>
        {onChangeCheckbox ? (
          <p className="details">{password}</p>
        ) : (
          <img alt="stars" src={starImage} className="stars-img" />
        )}
      </div>
      <button
        type="button"
        className="button-container"
        testid="delete"
        onClick={deletePasswordItem}
      >
        <img alt="delete" src={deleteBtn} className="delete-icon" />
      </button>
    </li>
  )
}
export default PasswordItem
