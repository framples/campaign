import React from 'react'
import gameLogic from '../../utils/API/gameLogic'
import ls from 'local-storage'
import M from 'materialize-css'
import { AppContext } from '../../appContext'
import $ from 'jquery'
import './style.css'

class CreateCharacter extends React.Component {
  static contextType = AppContext

  componentDidMount () {
    M.Toast.dismissAll()
    const userToken = ls.get('myCharacter_userToken')

    if (userToken) {
      this.setState({ token: userToken })
    } else {
      M.toast({ inDuration: 1000, html: 'Oops! You seem to be logged out.' })
      M.toast({
        inDuration: 1000,
        html:
          '<a href="/"><button class="btn-flat toast-action center-align">Log in to add to your library</button></a>'
      })
    }

    M.AutoInit()
    M.updateTextFields()
  }

  state = {
    error: null,
    gameName: this.context.gameName,
    minPlayers: this.context.minPlayers,
    maxPlayers: this.context.maxPlayers,
    minPlaytime: this.context.minPlaytime,
    maxPlaytime: this.context.maxPlaytime,
    minAge: this.context.minAge,
    rating: this.context.rating,
    rules: this.context.rules,
    image: this.context.image,
    complexity: '',
    token: ''
  }

  handleInputChange = event => {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  formValidation = () => {
    let badForm = false
    let helpName = $('#gameName')
    let helpMinPlayers = $('#minPlayers')
    let helpMaxPlayers = $('#maxPlayers')
    let helpMinPlaytime = $('#minPlaytime')
    let helpMaxPlaytime = $('#maxPlaytime')
    let helpAge = $('#minAge')
    let helpRating = $('#rating')

    const gameObj = {
      name: this.state.gameName,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      minPlaytime: this.state.minPlaytime,
      maxPlaytime: this.state.maxPlaytime,
      minAge: this.state.minAge,
      rating: this.state.rating
    }

    if (!gameObj.name) {
      $('#gameName')
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Name is required')
      $('#gameName').addClass('invalid')
      badForm = true
    } else {
      helpName
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpName.removeClass('invalid')
    }

    if (!gameObj.minPlayers) {
      helpMinPlayers
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Min Players is required')
      helpMinPlayers.addClass('invalid')
      badForm = true
    } else {
      helpMinPlayers
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpMinPlayers.removeClass('invalid')
    }

    if (gameObj.maxPlayers) {
      if (Number(gameObj.maxPlayers) < Number(gameObj.minPlayers)) {
        helpMaxPlayers
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'Max Players < Min Players')
        helpMaxPlayers.addClass('invalid')
        badForm = true
      } else {
        helpMaxPlayers
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpMaxPlayers.removeClass('invalid')
      }
    }

    if (!gameObj.minPlaytime) {
      helpMinPlaytime
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Min Playtime is required')
      helpMinPlaytime.addClass('invalid')
      badForm = true
    } else {
      helpMinPlaytime
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpMinPlaytime.removeClass('invalid')
    }

    if (gameObj.maxPlaytime) {
      if (Number(gameObj.maxPlaytime) < Number(gameObj.minPlaytime)) {
        helpMaxPlaytime
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'Max Playtime < Min Playtime')
        helpMaxPlaytime.addClass('invalid')
        badForm = true
      } else {
        helpMaxPlaytime
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpMaxPlaytime.removeClass('invalid')
      }
    }

    if (!gameObj.minAge) {
      helpAge
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Min Age is required')
      helpAge.addClass('invalid')
      badForm = true
    } else {
      helpAge
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpAge.removeClass('invalid')
    }

    if (!gameObj.rating) {
      helpRating
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Rating is required')
      helpRating.addClass('invalid')
      badForm = true
    } else {
      helpRating
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpRating.removeClass('invalid')
    }

    if (badForm) {
      return false
    }

    return true
  }

  handleFormSubmit = event => {
    event.preventDefault()

    if (this.formValidation()) {
      const gameObj = {
        name: this.state.gameName,
        minPlayers: this.state.minPlayers,
        maxPlayers: this.state.maxPlayers,
        minPlaytime: this.state.minPlaytime,
        maxPlaytime: this.state.maxPlaytime,
        minAge: this.state.minAge,
        rating: this.state.rating,
        rules: this.state.rules,
        image: this.state.image,
        complexity: this.state.complexity,
        token: this.state.token
      }

      if (this.context.userId) {
        gameObj._id = this.context._id
      }

      if (!gameObj.maxPlaytime) {
        gameObj.maxPlaytime = gameObj.minPlaytime
      }

      if (!gameObj.maxPlayers) {
        gameObj.maxPlayers = gameObj.minPlayers
      }

      if (!gameObj.image) {
        gameObj.image =  "https://image.flaticon.com/icons/png/512/103/103226.png";
      }

      gameLogic.saveGame(gameObj).then(resp => {
        this.context.update({
          gameName: '',
          minPlayers: '',
          maxPlayers: '',
          minPlaytime: '',
          maxPlaytime: '',
          minAge: '',
          rating: '',
          rules: '',
          image: '',
          complexity: ''
        })
        this.setState(
          {
            gameName: '',
            minPlayers: '',
            maxPlayers: '',
            minPlaytime: '',
            maxPlaytime: '',
            minAge: '',
            rating: '',
            rules: '',
            image: '',
            complexity: ''
          },
          () => {
            M.updateTextFields()
            $('.clearFields').removeClass('valid')
            M.toast({
              html:
                '<span>Game added!</span>'
                // <a href="/mylibrary"><button class="btn-flat toast-action">Go to Library</button></a>
            })
          }
        )
      })
    }
  }

  render () {
    return (
      <div id='addgames'>
        <div className='container center'>
          <h1 className='addgames-title' style={{ color: 'white' }}>
            Add Games
          </h1>
          <div className='row'>
            <form className='col s12'>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='gameName'
                    type='text'
                    name='gameName'
                    onChange={this.handleInputChange}
                    value={this.state.gameName}
                    className='clearFields'
                  ></input>
                  <label htmlFor='gameName'>Name of Game</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='minPlayers'
                    type='number'
                    min='1'
                    step='1'
                    name='minPlayers'
                    onChange={this.handleInputChange}
                    value={this.state.minPlayers}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='minPlayers'>Minimum Players</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='maxPlayers'
                    type='number'
                    min='0'
                    step='1'
                    name='maxPlayers'
                    onChange={this.handleInputChange}
                    value={this.state.maxPlayers}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='maxPlayers'>Maximum Players</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='minPlaytime'
                    type='number'
                    min='1'
                    step='1'
                    name='minPlaytime'
                    onChange={this.handleInputChange}
                    value={this.state.minPlaytime}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='minPlaytime'>Minimum Playtime</label>
                  <span className='helper-text'></span>
                </div>
                <div id='add-game-input' className='input-field col s3'>
                  <input
                    id='maxPlaytime'
                    type='number'
                    min='1'
                    step='1'
                    name='maxPlaytime'
                    onChange={this.handleInputChange}
                    value={this.state.maxPlaytime}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='maxPlaytime'>Maximum Playtime</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='minAge'
                    type='number'
                    min='1'
                    step='1'
                    name='minAge'
                    onChange={this.handleInputChange}
                    value={this.state.minAge}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='minAge'>Minimum Age</label>
                  <span className='helper-text'></span>
                </div>
                <div id='complexity-input' className='input-field col s3'>
                  <select
                    id='complexity'
                    name='complexity'
                    onChange={this.handleInputChange}
                    value={this.state.complexity}
                    className='validate clearFields'
                  >
                    <option id='complexity-placeholder' defaultValue='' value=''>
                      Complexity
                    </option>
                    <option value='Light'>Light</option>
                    <option value='Medium'>Medium</option>
                    <option value='Heavy'>Heavy</option>
                  </select>
                  <label htmlFor='complexity'></label>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='rating'
                    type='number'
                    min='0'
                    step='.01'
                    name='rating'
                    onChange={this.handleInputChange}
                    value={this.state.rating}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='rating'>Rating</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='image'
                    type='text'
                    name='image'
                    onChange={this.handleInputChange}
                    value={this.state.image}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='image'>Image URL</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='rules'
                    type='text'
                    name='rules'
                    onChange={this.handleInputChange}
                    value={this.state.rules}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='rules'>Rules URL</label>
                </div>
              </div>
            </form>
            <div className='row'>
              <div className='col s6'>
                <button
                  className='btn waves-effect waves-light #f44336 red'
                  name='action'
                  onClick={this.handleFormSubmit}
                >
                  Save Game<i className='material-icons right'>add_circle</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCharacter