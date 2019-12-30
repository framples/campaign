import React from 'react'
import LogoAnimation from '../../pages/LogoAnimation'
import userLogic from '../../utils/API/userLogic'
import ls from 'local-storage'
import $ from 'jquery'
import M from 'materialize-css'
import { AppContext } from '../../appContext'
import './style.css'

class Login extends React.Component {
  static contextType = AppContext

  state = {
    error: null,
    username: '',
    password: '',
    newUsername: '',
    newPassword: '',
    newConfirmPassword: '',
    newFirstName: '',
    newLastName: ''
  }

  componentDidMount () {
    M.AutoInit()
    M.updateTextFields()
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value
    const name = event.target.name

    if (value.slice(value.length - 1) === ' ') {
      alert('No spaces allowed')
      return
    }

    // Updating the input's state
    this.setState({
      [name]: value
    })
  }

  signInValidation = () => {
    let badForm = false
    const userObj = {
      username: this.state.username,
      password: this.state.password
    }
    const usernameInputElem = $('#usernameInput')
    const passwordInputElem = $('#passwordInput')

    if (!userObj.username) {
      $(usernameInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'Please enter your username')
      $(usernameInputElem).addClass('invalid')
      badForm = true
    } else {
      $(usernameInputElem)
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      $(usernameInputElem).removeClass('invalid')
    }

    if (userObj.password.length === 0) {
      $(passwordInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'Please enter your password')
      $(passwordInputElem).addClass('invalid')
      badForm = true
    } else {
      $(passwordInputElem)
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      $(passwordInputElem).removeClass('invalid')
    }

    if (badForm) {
      return false
    }
    return true
  }

  handleSignIn = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault()

    if (this.signInValidation()) {
      const userObj = {
        username: this.state.username,
        password: this.state.password
      }

      userLogic
        .userSignIn(userObj)
        .then(response => {
          const fullName = response.firstName + ' ' + response.lastName
          ls.set('myCharacter_userToken', response.currentToken)
          ls.set('myCharacter_userFullName', fullName.trim())
          this.props.locRedirect('/mylibrary')
        })
        .catch(err => alert(err.response.data))
    }
  }

  signUpValidation = () => {
    let badForm = false

    const userObj = {
      username: this.state.newUsername,
      password: this.state.newPassword,
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName
    }

    const newUsernameInputElem = $('#new_username')
    const newPasswordInputElem = $('#new_password')
    const newConfirmPasswordInputElem = $('#confirm_password')

    if (!userObj.username) {
      $(newUsernameInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'You must enter a username')
      $(newUsernameInputElem).addClass('invalid')
      badForm = true
    } else if (userObj.username.length <= 3) {
      $(newUsernameInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'Username must be at least 4 characters')
      $(newUsernameInputElem).addClass('invalid')
      badForm = true
    } else {
      $(newUsernameInputElem)
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      $(newUsernameInputElem).removeClass('invalid')
    }

    if (userObj.password.length === 0) {
      $(newPasswordInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'You must enter a password')
      $(newPasswordInputElem).addClass('invalid')
      badForm = true
    } else if (userObj.password.length <= 7) {
      $(newPasswordInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'Password must be at least 8 characters')
      $(newPasswordInputElem).addClass('invalid')
      badForm = true
    } else {
      $(newPasswordInputElem)
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      $(newPasswordInputElem).removeClass('invalid')
    }

    if (userObj.password !== this.state.newConfirmPassword) {
      $(newConfirmPasswordInputElem)
        .siblings('.helper-text')
        .text('-')
        .attr('data-error', 'Your passwords do not match')
      $(newConfirmPasswordInputElem).addClass('invalid')
      badForm = true
    } else {
      $(newConfirmPasswordInputElem)
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      $(newConfirmPasswordInputElem).removeClass('invalid')
    }

    if (badForm) {
      return false
    }
    M.Modal.getInstance($('#signUpModal')).close()
    return true
  }

  handleSignUp = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault()

    if (this.signUpValidation()) {
      const userObj = {
        username: this.state.newUsername,
        password: this.state.newPassword,
        firstName: this.state.newFirstName,
        lastName: this.state.newLastName
      }

      userLogic
        .userSignUp(userObj)
        .then(response => {
          const newUser = {
            username: userObj.username,
            password: userObj.password
          }

          userLogic
            .userSignIn(newUser)
            .then(resp => {
              const fullName = resp.firstName + ' ' + resp.lastName
              ls.set('myCharacter_userToken', resp.currentToken)
              ls.set('myCharacter_userFullName', fullName.trim())
              this.props.locRedirect('/mylibrary')
            })
            .catch(error => alert(error.response.data))
        })
        .catch(err => alert(err.response.data))
    }
  }

  render () {
    return (
      <main>
        <div className='row'>
          <div className='col s12 m6 l6 app-name'>
            <LogoAnimation />
          </div>
          <div className='col s12 m6 l6 sign-in-form'>
            <div className='container form'>
              <div id='form-header' className='row'>
                <h1 id='one'>BOARD</h1>
              </div>
              <div className='row username'>
                <div className='input-field col s12 m12 l12'>
                  <input
                    id='usernameInput'
                    pattern='.{4,}'
                    type='text'
                    value={this.state.username}
                    name='username'
                    onChange={this.handleInputChange}
                    placeholder=''
                    className='username sign-in'
                    autoComplete='username'
                    required
                  />
                  <label className='active'>Username</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row password'>
                <div className='input-field col s12 m12 l12 '>
                  <input
                    id='passwordInput'
                    pattern='.{8,}'
                    type='password'
                    value={this.state.password}
                    name='password'
                    onChange={this.handleInputChange}
                    placeholder=''
                    className='password sign-in'
                    autoComplete='current-password'
                    required
                  />
                  <label className='active'>Password</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <button
                className='waves-effect waves-light btn #455a64 blue-grey darken-2 searching'
                onClick={this.handleSignIn}
              >
                LOG IN
              </button>
              <div id='signUpDiv' className='row'>
                <p>Don't have an account?</p>
                <p>
                  <a className='modal-trigger link sign-up' href='#signUpModal'>
                    <span data-content='SIGN UP'>SIGN UP</span>
                  </a>
                </p>
              </div>
              <br />
            </div>
            <br />
          </div>
          <div id='signUpModal' className='modal'>
            <div className='modal-content center'>
              <h4 id='modal-title'>Sign Up</h4>
              <div id='modal-form' className='row'>
                <form className='col s8 offset-s2'>
                  <div className='row'>
                    <div id='signup-input' className='input-field col s6'>
                      <input
                        id='first_name'
                        type='text'
                        className='firstname'
                        value={this.state.newFirstName}
                        name='newFirstName'
                        onChange={this.handleInputChange}
                        autoComplete='name'
                      />
                      <label id='modal-label' htmlFor='first_name'>
                        First Name
                      </label>
                    </div>
                    <div id='signup-input' className='input-field col s6'>
                      <input
                        id='last_name'
                        type='text'
                        className='lastname'
                        value={this.state.newLastName}
                        name='newLastName'
                        onChange={this.handleInputChange}
                        autoComplete='family-name'
                      />
                      <label id='modal-label' htmlFor='last_name'>
                        Last Name
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div id='signup-input' className='input-field col s12'>
                      <input
                        id='new_username'
                        type='text'
                        className='new_username'
                        value={this.state.newUsername}
                        name='newUsername'
                        onChange={this.handleInputChange}
                        autoComplete='username'
                      />
                      <label id='modal-label' htmlFor='new_username'>
                        Username
                      </label>
                      <span className='helper-text'></span>
                    </div>
                  </div>
                  <div className='row'>
                    <div id='signup-input' className='input-field col s12'>
                      <input
                        id='new_password'
                        type='password'
                        className='new_password'
                        value={this.state.newPassword}
                        name='newPassword'
                        onChange={this.handleInputChange}
                        autoComplete='new-password'
                      />
                      <label className='modal-label' htmlFor='new_password'>
                        Password
                      </label>
                      <span className='helper-text'></span>
                    </div>
                  </div>
                  <div className='row'>
                    <div id='signup-input' className='input-field col s12'>
                      <input
                        id='confirm_password'
                        type='password'
                        className='new_password'
                        value={this.state.newConfirmPassword}
                        name='newConfirmPassword'
                        onChange={this.handleInputChange}
                        autoComplete='new-password'
                      />
                      <label className='modal-label' htmlFor='confirm_password'>
                        Confirm Password
                      </label>
                      <span className='helper-text'></span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div id='submit-modal'>
              <a
                href='#!'
                className='waves-effect btn-small #f44336 red center'
                onClick={this.handleSignUp}
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
export default Login