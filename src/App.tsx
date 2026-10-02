import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Category from './pages/category/category';
import Recipe from './pages/recipe/recipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:tag" element={<Category />} />
      <Route path="/category/:tag/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default App;
