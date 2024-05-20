import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Recipes from './pages/Recipes'
import Auth from './pages/Auth'
import FavoriteRecipes from './pages/FavoriteRecipes'
import AddYourRecipes from './pages/AddYourRecipes'
import Profile from './components/Profile'
import Personalrecipes from './components/Personalrecipes'
import RecipesView from './components/RecipesView'
import AdminDashboard from './components/AdminDashboard'
import { tokenAuthenticationContext } from './Context API/TokenAuthen'
import React, { useContext } from 'react'
import AllRecipesAdmin from './components/AllRecipesAdmin'
import AddRecipesAdmin from './components/AddRecipesAdmin'
import AdminRecipes from './components/AdminRecipes'
import Soups from './pages/Soups'
import Lunch from './pages/Lunch'
import Dessert from './pages/Dessert'
import Drinks from './pages/Drinks'
import Snacks from './pages/Snacks'

function App() {
  const {isAuthorised,setIsAuthorised}= useContext(tokenAuthenticationContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/recipes' element={<Recipes/>} />
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth insideRegister/>} />
        <Route path='/favorite' element={<FavoriteRecipes/>} />
        <Route path='/newrecipes' element={<AddYourRecipes/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/personalrecipes' element={isAuthorised?<Personalrecipes/>:<Auth/>}/>

        <Route path='/category-soups' element={<Soups/>} />
        <Route path='/category-lunch' element={<Lunch/>} />
        <Route path='/category-dessert' element={<Dessert/>} />
        <Route path='/category-snacks' element={<Snacks/>}/>
        <Route path='/category-drinks' element={<Drinks/>} />

        <Route path='/view/:id' element={<RecipesView/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/allrecipesadmin' element={<AllRecipesAdmin/>}/>
        <Route path='/addrecipesadmin' element={<AddRecipesAdmin/>}/>
        <Route path='/adminrecipes' element={<AdminRecipes/>}/>

        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
    

    </>
  )
}

export default App
