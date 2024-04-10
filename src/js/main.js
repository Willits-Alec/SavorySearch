import { insertHeaderAndFooter, login } from './utils.mjs';
import { isLoggedIn } from './utils.mjs';

// Call the function to insert header and footer content
insertHeaderAndFooter();

// Check if the user is logged in
if (isLoggedIn()) {
    // User is logged in, perform actions accordingly
    console.log('User is logged in.');
} else {
    // User is not logged in, perform actions accordingly
    console.log('User is not logged in.');
}

// Function to fetch and display search results by meal name
async function searchMealByName(name) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        displaySearchResults(data.meals);
    } catch (error) {
        console.error('Error searching for meal:', error);
    }
}

// Function to display search results as cards
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (!results) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(meal => {
        const mealCard = createMealCard(meal);
        searchResultsContainer.appendChild(mealCard);
    });
}

// Function to create a meal card
function createMealCard(meal) {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    const cardHTML = `
        <div class="meal-card-content">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${getIngredientsList(meal)}
            </ul>
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            <button class="save-recipe-btn" onclick="saveRecipe(${JSON.stringify(meal)})">Save Recipe</button>

        </div>
    `;
    mealCard.innerHTML = cardHTML;

    return mealCard;
}


// Function to get ingredients list HTML
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        if (ingredient && measure) {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}

// Function to handle search input
function handleSearchInput() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a search term.');
        return;
    }

    // Call the searchMealByName function with the user's search term
    searchMealByName(searchTerm);
}

// Event listener for search input
document.getElementById('search-input').addEventListener('change', handleSearchInput);

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get username and password from form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform login
    login(username, password);
});

// Function to display saved recipes
function displaySavedRecipes() {
    const savedRecipesContainer = document.getElementById('saved-recipes');
    savedRecipesContainer.innerHTML = ''; // Clear previous saved recipes

    // Retrieve saved recipes from local storage
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));

    if (!savedRecipes || savedRecipes.length === 0) {
        savedRecipesContainer.innerHTML = '<p>No recipes saved yet.</p>';
        return;
    }

    savedRecipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.textContent = recipe.name; // Display recipe name, adjust as needed
        savedRecipesContainer.appendChild(recipeElement);
    });
}

// Call the function to display saved recipes when the account page is loaded
document.addEventListener('DOMContentLoaded', displaySavedRecipes);

// Function to save a recipe to local storage
function saveRecipe(recipe) {
    // Retrieve saved recipes from local storage
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    // Check if the recipe is already saved
    const existingRecipeIndex = savedRecipes.findIndex(savedRecipe => savedRecipe.id === recipe.id);
    if (existingRecipeIndex === -1) {
        // Add the recipe to the saved recipes array
        savedRecipes.push(recipe);

        // Save the updated array back to local storage
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        alert('Recipe saved successfully!');
    } else {
        alert('Recipe already saved!');
    }
}



