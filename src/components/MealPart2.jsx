import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Home.css';

const APP_ID = import.meta.env.VITE_APP_RECIPE_ID;
const APP_KEY = import.meta.env.VITE_APP_RECIPE_KEY;

const RecipeContainer = {
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  width: "300px",
  boxShadow: "0 3px 10px 0 #aaa",
  marginBottom: "20px",
};

const CoverImage = {
  objectFit: "cover",
  height: "200px",
};

const RecipeName = {
  fontSize: "18px",
  fontWeight: "600",
  color: "black",
  margin: "10px 0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const SeeMoreText = {
  color: "white",
  fontSize: "18px",
  textAlign: "center",
  border: "solid 1px #eb3300",
  borderRadius: "3px",
  padding: "10px 15px",
  cursor: "pointer",
};

const RecipeComponent = (props) => {
  const { label, image, url } = props.recipe;

  return (
    <div style={RecipeContainer}>
      <img style={CoverImage} src={image} alt={label} />
      <h2 style={RecipeName}>{label}</h2>
      <button style={SeeMoreText} onClick={() => window.open(url)}>
        See Complete Recipe
      </button>
    </div>
  );
};

const Container = {
  display: "flex",
  flexDirection: "column",
  marginTop: "100px", // Adjust this value to create space for the navbar
};

const AppName = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const Header = {
  backgroundColor: "#ff0235",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  padding: "20px",
  fontSize: "35px",
  fontWeight: "bold",
  boxShadow: "0 3px 6px 0 #555",
  width: "800px",
  marginLeft: "140px",
};

const SearchBox = {
  display: "flex",
  flexDirection: "row",
  padding: "10px 10px",
  borderRadius: "1px",
  marginLeft: "0px",
  width: "50%",
  backgroundColor: "white",
};

const SearchInput = {
  color: "black",
  fontSize: "20px",
  fontWeight: "bold",
  border: "none",
  outline: "none",
  marginLeft: "15px",
};

const RecipeListContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  padding: "30px",
  gap: "20px",
  justifyContent: "space-evenly",
};

const Placeholder = {
  width: "120px",
  height: "120px",
  margin: "200px",
  opacity: "50%",
};

const MealPart2 = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  return (
    <div style={Container}>
      <div style={Header}>
        <div style={AppName}>
          Recipe Finder
        </div>
        <div style={SearchBox}>
          <input
            style={SearchInput}
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      <div style={RecipeListContainer}>
        {recipeList.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <img style={Placeholder} src="/react-recipe-finder/hamburger.svg" alt="Search" />
        )}
      </div>
    </div>
  );
};

export default MealPart2;
