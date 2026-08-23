import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Category from './pages/category/category'
import Recipe from './pages/recipe/recipe'

function App() {
  return(
    <>
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<Category />} path='/category/:tag'></Route>
        <Route element={<Recipe />} path='/category/:tag/recipe/:id'></Route>
      </Routes>
    </>
  )
}

export default App
