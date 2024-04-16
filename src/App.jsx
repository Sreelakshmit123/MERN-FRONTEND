import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Recipes from './pages/Recipes'
import Header from './components/Header'
import Footer from './components/Footer'
import Auth from './pages/Auth'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister/>} />
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
