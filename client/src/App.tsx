import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContextProvider'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/welcome/RegisterPage'
import LoginPage from './pages/welcome/LoginPage'
import Dashboard from './pages/dashboard/Dashboard'
import Welcome from './pages/welcome/Welcome'
import EditEntryPage from './pages/edit-entry/EditEntryPage'
import EntryFormPage from './pages/entry/EntryFormPage'
import PrivateUser from './pages/user/PrivateUser'
import PublicUser from './pages/user/PublicUser'
import ThemeButton from './components/ThemeButton'
import Backdrop from './components/Backdrop'
import ErrorAlert from './components/ErrorAlert'
import SuccessAlert from './components/SuccessAlert'
import { useCheckToken } from './hooks/useCheckToken'

function App() {
  const { current_theme } = useContext(AuthContext);
  const checkToken = useCheckToken();

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <ThemeProvider theme={current_theme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/" element={<Welcome />}/>
            <Route path="/entry_form" element={<EntryFormPage/>}/>
            <Route path="/edit/:id" element={<EditEntryPage />}/>
            <Route path="/home/:username" element={<PrivateUser />}/>
            <Route path="/:username" element={<PublicUser />}/>
          </Routes>
        </BrowserRouter>
        <Backdrop />
        <ErrorAlert />
        <SuccessAlert />
        <ThemeButton />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
