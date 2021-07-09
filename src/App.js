import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ErrorHandler } from './services'
import {
  getInstagramMedia
  // refreshToken
} from './services/instagram'
import { initMailClient } from './services/mail.js'
import { AppContext } from './contexts'
import { Header, BottomBar, MainSpinner, ToastContainer } from './components'
import { About, Directions, MasterClass } from './pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

const App = () => {
  const [instaData, setInstaData] = useState()
  const [masterClasses, setMasterClasses] = useState()
  const [isReady, setIsReady] = useState(false)
  const [toast, setToast] = useState(false)
  const onClose = () => {
    setToast(false)
  }
  const overflowHandling = (val) => {
    const html = document.documentElement
    html.style.overflow = val ? 'visible' : 'hidden'
  }

  const handleInstaMedia = async () => {
    try {
      overflowHandling()
      const {
        data: { data: instaData }
      } = await getInstagramMedia()
      const mcs = instaData.filter(({ caption }) => caption.includes('мк_артстудиянакотовского'))
      setTimeout(() => setIsReady(true), 500)
      setTimeout(() => {
        setInstaData(instaData)
        setMasterClasses(mcs)
      }, 1000)
    } catch (error) {
      ErrorHandler({ moduleName: 'App', cameFrom: 'handleInstaMedia', error })
    }
  }

  useEffect(() => {
    initMailClient()
    handleInstaMedia()
  }, [])

  useEffect(() => {
    if (isReady) {
      setTimeout(() => overflowHandling(isReady), 1000)
    }
  }, [isReady])

  return (
    <AppContext.Provider style={{ backgroundColor: 'green' }} value={{ instaData, masterClasses, isReady, setToast }}>
      <MainSpinner hideSpinner={isReady} />
      <ToastContainer toast={toast} onClose={onClose} />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/directions" component={Directions} />
          <Route path="/masterclass" component={MasterClass} />
        </Switch>
        <BottomBar />
      </Router>
    </AppContext.Provider>
  )
}

export default App
