import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import ResourcesPage from './components/ResourcesPage/ResourcesPage'
import StoryInformation from './components/StoryInformation/StoryInformation'
import WorldBuilding from './components/WorldBuilding/WorldBuilding'
import CharacterSheet from './components/CharacterSheet/CharacterSheet'
import StatsRoll from './components/CharacterSheet/StatsRoll'
import DmOnly from './components/DmOnly/DmOnly'
import Feedback from './components/Feedback/Feedback'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
