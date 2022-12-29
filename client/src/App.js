import React from 'react'
import GamePage from './pages/GamePage'
// import ChessBoard from './components/ChessBoard'
import HomePage from './pages/Home'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import RankingPage from './pages/RankingPage'
import CreateGamePage from './pages/CreateGamePage'
import ChatPage from './pages/ChatPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserContext from './context/UserContext'
import PrivateRoute from './PrivateRoute'
import MyTimer from './components/Timer'


function App() {

  return (
    <UserContext>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/game' element={<GamePage />} />
              <Route path='/ranking' element={<RankingPage />} />
              <Route path='/creategame' element={<CreateGamePage />} />
              <Route path='/' element={<ChatPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </UserContext>
  )
}

export default App