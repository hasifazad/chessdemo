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
import Profile from './pages/Profile'
import UsersListPage from './admin-pages/UsersListPage'
import ChatContext from './context/ChatContext'
import PlayWithLink from './components/PlayWithLink'
import PostPage from './pages/PostPage'
import MatchContext from './context/MatchContext'
import QuickPlayPage from './pages/QuickPlayPage'
import LandingPage from './pages/LandingPage'



function App() {

  return (
    <UserContext>
      <ChatContext>
        <MatchContext>
          <React.Fragment>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path='/home' element={<HomePage />} />
                  <Route path='/play' element={<QuickPlayPage />} />
                  <Route path='/game' element={<GamePage />} />
                  <Route path='/ranking' element={<RankingPage />} />
                  <Route path='/creategame' element={<CreateGamePage />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='/admin/users-list' element={<UsersListPage />} />
                  <Route path='/playwithlink' element={<PlayWithLink />} />
                  <Route path='/posts' element={<PostPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </React.Fragment>
        </MatchContext>
      </ChatContext>
    </UserContext>
  )
}

export default App