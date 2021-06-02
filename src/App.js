import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorHandler } from './services'
import { getInstagramMedia, refreshToken } from './services/instagram'
import { AppContext } from './contexts'
import { Header, BottomBar } from './components'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

const App = () => {
  const [instaData, setInstaData] = useState()
  const [masterClasses, setMasterClasses] = useState()

  const handleInstaMedia = async () => {
    try {
      const {
        data: { data: instaData }
      } = await getInstagramMedia()
      const mcs = instaData.filter(({ caption }) => caption.includes('мк_артстудиянакотовского'))
      setInstaData(instaData)
      setMasterClasses(mcs)
    } catch (error) {
      ErrorHandler({ moduleName: 'App', cameFrom: 'handleInstaMedia', error })
    }
  }

  useEffect(handleInstaMedia, [])

  return (
    <AppContext.Provider value={{ instaData, masterClasses }}>
      <Router>
        <div
          style={{
            alighItems: 'space-between',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Header />
          <BottomBar />
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App
