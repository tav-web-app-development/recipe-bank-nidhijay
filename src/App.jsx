import React, { useEffect } from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <h1>Recipe App</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Recipes</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2024 Recipe App. All rights reserved.</p>
    </div>
  );
}

function RecipeList({ recipes }) {
  return (
    <div className="recipe-container">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe" onClick={() => document.title = recipe.title}>
          <h2>{recipe.title}</h2>
          <p><strong>Description:</strong> {recipe.description}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Directions:</strong> {recipe.directions}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch('https://api.example.com/recipes');
        const data = await response.json();
        return data.recipes;
      } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
      }
    }

    async function mountComponent() {
      const recipes = await fetchRecipes();
      setRecipes(recipes);
    }

    function unmountComponent() {
      console.log('Unmounted');
    }

    mountComponent();

    return () => unmountComponent();
  }, []);

  const [recipes, setRecipes] = React.useState([]);

  return (
    <div>
      <Navbar />
      <RecipeList recipes={recipes} />
      <Footer />
    </div>
  );
}

export default App;

