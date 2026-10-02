import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/Navbar/navbar';
import type { Recipe } from '../../types';
import './recipe.css';

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Recipe ID is required');
      return;
    }

    const loadRecipe = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }

        const data = (await response.json()) as Recipe;
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading recipe');
      } finally {
        setLoading(false);
      }
    };

    void loadRecipe();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="recipe-container">
        {loading ? (
          <div className="loading">Loading recipe...</div>
        ) : error ? (
          <div className="error">Error loading recipe: {error}</div>
        ) : recipe ? (
          <>
            <section className="recipe-hero">
              <div className="hero-image">
                <img src={recipe.image} alt={recipe.name} />
              </div>
              <div className="hero-overlay" />
            </section>

            <section className="recipe-details-section">
              <div className="container">
                <div className="recipe-card">
                  <div className="recipe-header">
                    <h1 className="recipe-title">{recipe.name}</h1>
                    <div className="recipe-badges">
                      <span className="badge cuisine">🍽️ {recipe.cuisine}</span>
                      <span className="badge difficulty">{recipe.difficulty}</span>
                      <span className="badge rating">⭐ {recipe.rating}</span>
                    </div>
                  </div>

                  <div className="quick-stats">
                    <div className="stat-box">
                      <span className="stat-icon">⏱️</span>
                      <div className="stat-content">
                        <p className="stat-label">Prep Time</p>
                        <p className="stat-value">{recipe.prepTimeMinutes} min</p>
                      </div>
                    </div>
                    <div className="stat-box">
                      <span className="stat-icon">🍳</span>
                      <div className="stat-content">
                        <p className="stat-label">Cook Time</p>
                        <p className="stat-value">{recipe.cookTimeMinutes ?? 0} min</p>
                      </div>
                    </div>
                    <div className="stat-box">
                      <span className="stat-icon">👥</span>
                      <div className="stat-content">
                        <p className="stat-label">Servings</p>
                        <p className="stat-value">{recipe.servings}</p>
                      </div>
                    </div>
                    <div className="stat-box">
                      <span className="stat-icon">🔥</span>
                      <div className="stat-content">
                        <p className="stat-label">Calories</p>
                        <p className="stat-value">{recipe.caloriesPerServing}</p>
                      </div>
                    </div>
                  </div>

                  <div className="recipe-body">
                    <div className="recipe-main">
                      <div className="recipe-section">
                        <h2 className="section-title">📋 Ingredients</h2>
                        <ul className="ingredients-list">
                          {recipe.ingredients?.map((ingredient, index) => (
                            <li key={`${ingredient}-${index}`} className="ingredient-item">
                              <span className="ingredient-icon">✓</span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="recipe-section">
                        <h2 className="section-title">👨‍🍳 Instructions</h2>
                        <ol className="instructions-list">
                          {recipe.instructions?.map((instruction, index) => (
                            <li key={`${instruction}-${index}`} className="instruction-item">
                              <span className="step-number">{index + 1}</span>
                              <p>{instruction}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <aside className="recipe-sidebar">
                      <div className="sidebar-box">
                        <h3 className="sidebar-title">🥗 Nutrition Info</h3>
                        <div className="nutrition-info">
                          <div className="nutrition-item">
                            <span className="nutrition-label">Calories</span>
                            <span className="nutrition-value">{recipe.caloriesPerServing}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Protein</span>
                            <span className="nutrition-value">{recipe.proteinPerServing ?? 'N/A'}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Carbs</span>
                            <span className="nutrition-value">{recipe.carbs ?? 'N/A'}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Fat</span>
                            <span className="nutrition-value">{recipe.fat ?? 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {recipe.tags && recipe.tags.length > 0 && (
                        <div className="sidebar-box">
                          <h3 className="sidebar-title">🏷️ Tags</h3>
                          <div className="tags-container">
                            {recipe.tags.map((tag, index) => (
                              <span key={`${tag}-${index}`} className="tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </aside>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="error">Recipe not found</div>
        )}
      </div>
    </>
  );
}