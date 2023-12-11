import { useContext } from 'react'
import './App.css'
import { AuthContext } from './context/AuthContextProvider'
import { ThemeProvider } from '@emotion/react'
import ThemeButton from './components/ThemeButton'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/welcome/RegisterPage'
import LoginPage from './pages/welcome/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  const { current_theme, handle_theme } = useContext(AuthContext);

  return (
    <ThemeProvider theme={current_theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </BrowserRouter>
        <ThemeButton handleToggleTheme={handle_theme}/>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
