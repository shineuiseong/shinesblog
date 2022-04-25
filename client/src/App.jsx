import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { dark } from './styles/Themes'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { useRef } from 'react'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Landing from 'page/Landing/Landing'
import Blog from 'page/Blog/Blog'
import PostRegister from 'page/PostRegister/PostRegister'
import SettingContainer from 'components/SettingContainer/SettingContainer'

function App() {
  const containerRef = useRef(null)
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <AnimatePresence>
            <main data-scroll-container ref={containerRef}>
              <Router>
                <Switch>
                  <Route exact path={['/', '/main']}>
                    <Landing />
                  </Route>
                  <Route path="/blog">
                    <Blog />
                  </Route>
                  <Route path="/register">
                    <PostRegister />
                  </Route>
                  <Route path="/setting">
                    <SettingContainer />
                  </Route>
                </Switch>
              </Router>
            </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  )
}

export default App
