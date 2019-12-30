  
import React from 'react'
import SignIn from '../SignIn'
import M from 'materialize-css'
import './style.css'

class Home extends React.Component {
  componentDidMount () {
    M.AutoInit()
    M.Toast.dismissAll()
  }

  redirect = location => {
    this.props.history.push(location)
  }

  render () {
    return (
      <div className='contenedor'>
        <div className='vert-nav-form'>
          <input
            type='radio'
            className='radio-btn'
            id='Slide1'
            name='slider'
            titulo='Home'
            autoFocus='autofocus'
          />
          <input
            type='radio'
            className='radio-btn'
            id='Slide2'
            name='slider'
            titulo='MyLibrary'
          />
          <input
            type='radio'
            className='radio-btn'
            id='Slide3'
            name='slider'
            titulo='ExploreGames'
          />

          <div className='labels'>
            <label className='Slide' htmlFor='Slide1' id='Slide1'>
              <div className='content'>
                <h1>
                  <strong />
                  <SignIn locRedirect={this.redirect} />
                </h1>
              </div>
              <div className='icon'>
                <span />
                <span />
              </div>
            </label>
            <label className='Slide' htmlFor='Slide2' id='Slide2'>
              <div className='content'>
                <h1 className='my-library-title'>MY LIBRARY</h1>
                <p className='take-me-there'>
                  <a className='homeLink' href='./mylibrary'>
                    take me there.
                  </a>
                </p>
              </div>
            </label>
            <label className='Slide' htmlFor='Slide3' id='Slide3'>
              <div className='content'>
                <h1 className='explore-games-title'>EXPLORE GAMES</h1>
                <p className='take-me-there'>
                  <a className='homeLink' href='./exploregames'>
                    take me there.
                  </a>
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default Home