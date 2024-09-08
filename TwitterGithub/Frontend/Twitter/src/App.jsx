import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import Createpost from './Createpost'
import Signup from './Signup'
import Signin from './Signin'
import Sidebar from './Sidebar'
import Search from './Search'
import Profile from './Profile'
import Update from './Update'
import Userprofile from './Userprofile'

function App() {
  return (
    <>
      <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createpost' element={<Createpost/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/userprofile/:userid' element={<Userprofile/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
