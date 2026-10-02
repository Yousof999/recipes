import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/Navbar/navbar';
import type { Recipe } from '../../types';
import './home.css';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = (await response.json()) as { recipes: Recipe[] };
        setRecipes(data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadRecipes();
  }, []);

  return (
    <>
      <NavBar />
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Discover Delicious Recipes</h1>
            <p>Explore a variety of tasty dishes from around the world</p>
          </div>
        </section>

        <section className="recipes-section">
          <div className="container">
            {loading ? (
              <div className="loading">Loading recipes...</div>
            ) : (
              <div className="recipes-grid">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                    <div className="card-image-wrapper">
                      <img src={recipe.image} alt={recipe.name} className="card-image" />
                      <div className="card-overlay">
                        <Link to={`/category/${recipe.name}/recipe/${recipe.id}`} className="view-btn text-decoration-none">
                          View Recipe
                        </Link>
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{recipe.name}</h3>
                      <div className="recipe-info">
                        <span className="recipe-meta">⏱ {recipe.prepTimeMinutes} min</span>
                        <span className="recipe-meta">👥 {recipe.servings} servings</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}