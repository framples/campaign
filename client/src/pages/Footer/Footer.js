import React from 'react'

function Footer () {
  return (
    <footer className='page-footer #f44336 red'>
      <div className='container' style={{ paddingTop: '0.5em' }}>
        <div className='row footerMargin'>
          <ul className='col s12 center footerMargin'>
            <a
              href='https://www.github.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='footerIcons'
                src='https://www.freeiconspng.com/uploads/github-icon-9.png'
                alt='github'
              ></img>
            </a>
            <a
              style={{ color: 'white', fontSize: '32px' }}
              href='https://www.gmail.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              @
            </a>
            <a
              href='https://www.linkedin.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='footerIcons'
                src='https://www.freeiconspng.com/uploads/displaying-19-gallery-images-for-linkedin-logo-png-25.png'
                alt='linkedin'
              ></img>
            </a>
          </ul>
        </div>
        <div className='row center white-text copyright'>
          {' '}
          © 2019 Copyright Project 3
        </div>
      </div>
    </footer>
  )
}

export default Footer