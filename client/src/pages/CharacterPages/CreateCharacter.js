import React from 'react'
import charactersLogic from '../../utils/characterLogic'
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
          '<a href="/"><button class="btn-flat toast-action center-align">Log in to create your character</button></a>'
      })
    }

    M.AutoInit()
    M.updateTextFields()
  }

  state = {
    error: null,
    character_name: this.context.character_name,
    character_class: this.context.character_class,
    character_level: this.context.character_level,
    character_appearance: this.context.character_appearance,
    character_background: this.context.character_background,
    character_alignment: this.context.character_alignment,
    character_race: this.context.character_race,
    character_maxhp: this.context.character_maxhp,
    character_skillproficiency: this.context.character_skillproficiency,
    character_movementspeed: this.context.character_movementspeed,
    character_languages: this.context.character_languages,
    character_equipment: this.context.character_equipment,
    str_score: this.context.str_score,
    dex_score: this.context.dex_score,
    con_score: this.context.con_score,
    int_score: this.context.int_score,
    wis_score: this.context.wis_score,
    cha_score: this.context.cha_score,
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
    let helpName = $('#character_name')
    let helpcharacter_class = $('#character_class')
    //let helpcharacter_level = $('#character_level')
    //let helpcharacter_appearance = $('#character_appearance')
    //let helpcharacter_background = $('#character_background')
    //let helpAlign = $('#character_alignment')
    //let helpcharacter_race = $('#character_race')
    let helpStr = $('#str_score)')
    let helpDex = $('#dex_score)')
    let helpCon = $('#con_score)')
    let helpInt = $('#int_score)')
    let helpWis = $('#wis_score)')
    let helpCha = $('#cha_score)')
    

    const charObject = {
      name: this.state.character_name,
      character_class: this.state.character_class,
      character_level: this.state.character_level,
      character_appearance: this.state.character_appearance,
      character_background: this.state.character_background,
      character_alignment: this.state.character_alignment,
      character_race: this.state.character_race,
      str_score: this.state.str_score,
      dex_score: this.state.dex_score,
      con_score: this.state.con_score,
      int_score: this.state.int_score,
      wis_score: this.state.wis_score,
      cha_score: this.state.cha_score
    }

    if (!charObject.name) {
      $('#character_name')
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Character name is required.')
      $('#character_name').addClass('invalid')
      badForm = true
    } else {
      helpName
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpName.removeClass('invalid')
    }

    if (!charObject.character_class) {
      helpcharacter_class
        .siblings('.helper-text')
        .text('`')
        .attr('data-error', 'Character class is required.')
      helpcharacter_class.addClass('invalid')
      badForm = true
    } else {
      helpcharacter_class
        .siblings('.helper-text')
        .attr('data-error', '')
        .text('')
      helpcharacter_class.removeClass('invalid')
    }

    if (charObject.str_score) {
      if (Number(charObject.str_score) >= 21)  {
        helpStr
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that strong.')
        helpStr.addClass('invalid')
        badForm = true
      } else {
        helpStr
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpStr.removeClass('invalid')
      }
    }

    if (charObject.dex_score) {
      if (Number(charObject.dex_score) >= 21)  {
        helpDex
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that swift.')
        helpDex.addClass('invalid')
        badForm = true
      } else {
        helpDex
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpDex.removeClass('invalid')
      }
    }
    if (charObject.con_score) {
      if (Number(charObject.con_score) >= 21)  {
        helpCon
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that tanky.')
        helpCon.addClass('invalid')
        badForm = true
      } else {
        helpCon
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpCon.removeClass('invalid')
      }
    }
    if (charObject.int_score) {
      if (Number(charObject.int_score) >= 21)  {
        helpInt
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that smart.')
        helpInt.addClass('invalid')
        badForm = true
      } else {
        helpInt
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpInt.removeClass('invalid')
      }
    }
    if (charObject.wis_score) {
      if (Number(charObject.wis_score) >= 21)  {
        helpWis
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that wise.')
        helpWis.addClass('invalid')
        badForm = true
      } else {
        helpWis
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpWis.removeClass('invalid')
      }
    }
    if (charObject.cha_score) {
      if (Number(charObject.cha_score) >= 21)  {
        helpCha
          .siblings('.helper-text')
          .text('`')
          .attr('data-error', 'You cant possibly be that smart.')
        helpCha.addClass('invalid')
        badForm = true
      } else {
        helpCha
          .siblings('.helper-text')
          .attr('data-error', '')
          .text('')
        helpCha.removeClass('invalid')
      }
    }

    if (badForm) {
      return false
    }

    return true
  }

  handleFormSubmit = event => {
    event.preventDefault()

    if (this.formValidation()) {
      const charObject = {
        character_name: this.state.character_name,
        character_class: this.state.character_class,
        character_level: this.state.character_level,
        character_appearance: this.state.character_appearance,
        character_background: this.state.character_background,
        character_alignment: this.state.character_alignment,
        character_race: this.state.character_race,
        character_maxhp: this.state.character_maxhp,
        character_skillproficiency: this.state.character_skillproficiency,
        character_movementspeed: this.state.character_movementspeed,
        character_languages: this.state.character_languages,
        character_equipment: this.state.character_equipment,
        str_score: this.state.str_score,
        dex_score: this.state.dex_score,
        con_score: this.state.con_score,
        int_score: this.state.int_score,
        wis_score: this.state.wis_score,
        cha_score: this.state.cha_score,
        complexity: this.state.complexity,
        token: this.state.token
      }

      if (this.context.userId) {
        charObject._id = this.context._id
      }

      charactersLogic.saveGame(charObject).then(resp => {
        this.context.update({
          character_name: '',
          character_class: '',
          character_level: '',
          character_appearance: '',
          character_background: '',
          character_alignment: '',
          character_race: '',
          character_maxhp: '',
          character_skillproficiency: '',
          character_movementspeed: '',
          character_languages: '',
          character_equipment: '',
          str_score: '',
          dex_score: '',
          con_score: '',
          int_score: '',
          wis_score: '',
          cha_score: '',
          complexity: ''
        })
        this.setState(
          {
            character_name: '',
            character_class: '',
            character_level: '',
            character_appearance: '',
            character_background: '',
            character_alignment: '',
            character_race: '',
            character_maxhp: '',
            character_skillproficiency: '',
            character_movementspeed: '',
            character_languages: '',
            character_equipment: '',
            str_score: '',
            dex_score: '',
            con_score: '',
            int_score: '',
            wis_score: '',
            cha_score: '',
            complexity: ''
          },
          () => {
            M.updateTextFields()
            $('.clearFields').removeClass('valid')
            M.toast({
              html:
                '<span>Char created!</span>'
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
                    id='character_name'
                    type='text'
                    name='character_name'
                    onChange={this.handleInputChange}
                    value={this.state.character_name}
                    className='clearFields'
                  ></input>
                  <label htmlFor='character_name'>Name of Game</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='character_class'
                    type='number'
                    min='1'
                    step='1'
                    name='character_class'
                    onChange={this.handleInputChange}
                    value={this.state.character_class}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_class'>Minimum Players</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_level'
                    type='number'
                    min='0'
                    step='1'
                    name='character_level'
                    onChange={this.handleInputChange}
                    value={this.state.character_level}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_level'>Maximum Players</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_appearance'
                    type='number'
                    min='1'
                    step='1'
                    name='character_appearance'
                    onChange={this.handleInputChange}
                    value={this.state.character_appearance}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_appearance'>Minimum Playtime</label>
                  <span className='helper-text'></span>
                </div>
                <div id='add-game-input' className='input-field col s3'>
                  <input
                    id='character_background'
                    type='number'
                    min='1'
                    step='1'
                    name='character_background'
                    onChange={this.handleInputChange}
                    value={this.state.character_background}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_background'>Maximum Playtime</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='character_alignment'
                    type='number'
                    min='1'
                    step='1'
                    name='character_alignment'
                    onChange={this.handleInputChange}
                    value={this.state.character_alignment}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_alignment'>Minimum Age</label>
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
                    id='character_race'
                    type='number'
                    min='0'
                    step='.01'
                    name='character_race'
                    onChange={this.handleInputChange}
                    value={this.state.character_race}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_race'>character_race</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_skillproficiency'
                    type='text'
                    name='character_skillproficiency'
                    onChange={this.handleInputChange}
                    value={this.state.character_skillproficiency}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_skillproficiency'>character_skillproficiency URL</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='character_maxhp'
                    type='text'
                    name='character_maxhp'
                    onChange={this.handleInputChange}
                    value={this.state.character_maxhp}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_maxhp'>character_maxhp URL</label>
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