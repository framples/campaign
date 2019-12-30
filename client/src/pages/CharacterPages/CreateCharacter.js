import React from 'react'
import charactersLogic from '../../utils/characterLogic'
import ls from 'local-storage'
import M from 'materialize-css'
import { AppContext } from '../../appContext'
import $ from 'jquery'
import './style.css'

class CreateCharacter extends React.Component {
  static contextType = AppContext

  componentDidMount() {
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
      if (Number(charObject.str_score) >= 21) {
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
      if (Number(charObject.dex_score) >= 21) {
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
      if (Number(charObject.con_score) >= 21) {
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
      if (Number(charObject.int_score) >= 21) {
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
      if (Number(charObject.wis_score) >= 21) {
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
      if (Number(charObject.cha_score) >= 21) {
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

  render() {
    return (
      <div id='createcharacter'>
        <div className='container center'>
          <h1 className='addcharacters-title' style={{ color: 'white' }}>
            Create Character
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
                    placeholder='Bojulu of Shadowmark'
                  ></input>
                  <label htmlFor='character_name'>Name</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='character_class'
                    type='text'
                    name='character_class'
                    onChange={this.handleInputChange}
                    value={this.state.character_class}
                    className='validate clearFields'
                    placeholder='Barbarian'
                  ></input>
                  <label htmlFor='character_class'>Class(es)</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_race'
                    type='text'
                    name='character_race'
                    onChange={this.handleInputChange}
                    value={this.state.character_race}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_race'>Race</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_level'
                    type='number'
                    min='1'
                    max='20'
                    step='1'
                    name='character_level'
                    placeholder='7'
                    onChange={this.handleInputChange}
                    value={this.state.character_level}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_level'>Level</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_appearance'
                    type='text'
                    name='character_appearance'
                    onChange={this.handleInputChange}
                    value={this.state.character_appearance}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_appearance'>Appearance Description! (Be detailed!)</label>
                  <span className='helper-text'></span>
                </div>
                <div id='add-game-input' className='input-field col s3'>
                  <input
                    id='character_background'
                    type='text'
                    name='character_background'
                    onChange={this.handleInputChange}
                    value={this.state.character_background}
                    className='validate clearFields'
                    placeholder='Outlander'
                  ></input>
                  <label htmlFor='character_background'>Background</label>
                  <span className='helper-text'></span>
                </div>
              </div>
              <div className='row'>
                <div id='character_alignment' className='input-field col s3'>
                  <select
                    id='character_alignment'
                    name='character_alignment'
                    onChange={this.handleInputChange}
                    value={this.state.character_alignment}
                    className='validate clearFields'
                  >
                    <option id='character_alignment placeholder' defaultValue='' value=''>
                      Alignment
                    </option>
                    <option value='Lawful Good'>Lawful Good</option>
                    <option value='Lawful Neutral'>Lawful Neutral</option>
                    <option value='Lawful Evil'>Lawful Evil</option>
                    <option value='Neutral Good'>Neutral Good</option>
                    <option value='True Neutral'>True Neutral</option>
                    <option value='Neutral Evil'>Neutral Evil</option>
                    <option value='Chaotic Good'>Chaotic Good</option>
                    <option value='Chaotic Neutral'>Chaotic Neutral</option>
                    <option value='Chaotic Evil'>Chaotic Evil</option>
                  </select>
                  <label htmlFor='character_alignment'></label>
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
                  <label htmlFor='character_skillproficiency'>Proficiencies(Skills only)</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s3'>
                  <input
                    id='character_movementspeed'
                    type='text'
                    name='character_movementspeed'
                    onChange={this.handleInputChange}
                    value={this.state.character_movementspeed}
                    className='validate clearFields'
                    placeholder='30'
                  ></input>
                  <label htmlFor='character_alignment'>Movement Speed</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_languages'
                    type='text'
                    name='character_languages'
                    onChange={this.handleInputChange}
                    value={this.state.character_languages}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_languages'>Languages</label>
                  <span className='helper-text'></span>
                </div>
                <div className='input-field col s3'>
                  <input
                    id='character_equipment'
                    type='text'
                    name='character_equipment'
                    onChange={this.handleInputChange}
                    value={this.state.character_equipment}
                    className='validate clearFields'
                    placeholder='Battle Axe'
                  ></input>
                  <label htmlFor='character_skillproficiency'>Equipment(Weapons)</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='character_maxhp'
                    type='number'
                    name='character_maxhp'
                    onChange={this.handleInputChange}
                    value={this.state.character_maxhp}
                    className='validate clearFields'
                  ></input>
                  <label htmlFor='character_maxhp'>Max HitPoints</label>
                </div>
              </div>
              <div id='str_score' className='input-field col s3'>
                  <select
                    id='str_score'
                    name='str_score'
                    onChange={this.handleInputChange}
                    value={this.state.str_score}
                    className='validate clearFields'
                  >
                    <option id='str_score placeholder' defaultValue='' value=''>
                      Strength
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='str_score'></label>
                </div>
                <div id='dex_score' className='input-field col s3'>
                  <select
                    id='dex_score'
                    name='dex_score'
                    onChange={this.handleInputChange}
                    value={this.state.dex_score}
                    className='validate clearFields'
                  >
                    <option id='dex_score placeholder' defaultValue='' value=''>
                      Dexterity
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='dex_score'></label>
                </div>
                <div id='con_score' className='input-field col s3'>
                  <select
                    id='con_score'
                    name='con_score'
                    onChange={this.handleInputChange}
                    value={this.state.con_score}
                    className='validate clearFields'
                  >
                    <option id='con_score placeholder' defaultValue='' value=''>
                      Constitution
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='con_score'></label>
                </div>
                <div id='int_score' className='input-field col s3'>
                  <select
                    id='int_score'
                    name='int_score'
                    onChange={this.handleInputChange}
                    value={this.state.int_score}
                    className='validate clearFields'
                  >
                    <option id='int_score placeholder' defaultValue='' value=''>
                      Intelligence
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='int_score'></label>
                </div>
                <div id='wis_score' className='input-field col s3'>
                  <select
                    id='wis_score'
                    name='wis_score'
                    onChange={this.handleInputChange}
                    value={this.state.wis_score}
                    className='validate clearFields'
                  >
                    <option id='wis_score placeholder' defaultValue='' value=''>
                      Wisdom
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='wis_score'></label>
                </div>
                <div id='cha_score' className='input-field col s3'>
                  <select
                    id='cha_score'
                    name='cha_score'
                    onChange={this.handleInputChange}
                    value={this.state.cha_score}
                    className='validate clearFields'
                  >
                    <option id='str_score placeholder' defaultValue='' value=''>
                      Charisma
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                  </select>
                  <label htmlFor='cha_score'></label>
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