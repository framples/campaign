import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AppContext } from "./appContext"
import SideNav from './components/SideNav/SideNav'
import AppContainer from'./components/AppContainer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import ResourcesPage from './pages/ResourcesPage/ResourcesPage'
import StoryInformation from './pages/StoryInformation/StoryInformation'
import WorldBuilding from './pages/WorldBuilding/WorldBuilding'
import CharacterSheet from './pages/CharacterPages/CharacterSheet'
import StatsRoll from './pages/CharacterPages/StatsRoll'
import DmOnly from './pages/DmOnly/DmOnly'
import Feedback from './pages/Feedback/Feedback'
import Footer from './pages/Footer/Footer'

class App extends Component {
  render() {
    return (
      <AppContext.Provider value ={this.state}>
      <Router>
        <div>
          <Route render={(history) =>
          <SideNav history ={history} />
          } />
         <AppContainer>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path ="/story" component={StoryInformation} />
            <Route exact path ="/resources" component={ResourcesPage} />
            <Route exact path ="/worldbuilding" component={WorldBuilding} />
            <Route exact path ="/charactersheet" component={CharacterSheet} />
            <Route exact path ="/statsroll" component={StatsRoll} />
            <Route exact path ="/dm" component={DmOnly} />
            <Route exact path ="/feedback" component={Feedback} />
            </AppContainer>
            <Footer />
          </div>
      </Router>
      </AppContext.Provider>
    )
  }
}

export default App
