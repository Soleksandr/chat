import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { Layout } from './components/Layout'
import { initialState, Provider } from './store'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider initialState={initialState}>
        <Layout />
      </Provider>
    </ThemeProvider>
  )
}

export default App
