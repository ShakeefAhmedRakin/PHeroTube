// FETCHING CATEGORY FUNCTION
const fetchCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const categoryData = await response.json();
  displayCategoryButton(categoryData);
};

const categoryContainer = document.getElementById("category-container");
// DISPLAY CATEGORY BUTTON FUNCTION
const displayCategoryButton = async (categoryData) => {
  categoryData.data.forEach((category) => {
    const categoryID = category.category_id;
    const categoryName = category.category;

    const categoryButton = document.createElement("button");
    categoryButton.classList =
      "btn normal-case font-medium text-lg bg-btnbg text-black hover:bg-btnbg";
    categoryButton.innerText = categoryName;
    categoryButton.setAttribute("onclick", `updateVideoSection(${categoryID})`);
    categoryButton.setAttribute("id", `${categoryID}`);
    categoryContainer.appendChild(categoryButton);
  });
  // SELECTING 'ALL' CATEGORY BY DEFAULT
  updateVideoSection(1000);
};

// DISPLAY VIDEOS BASED ON CATEGORY ID FUNCTION
const updateVideoSection = async (category_id) => {
  // UPDATING BUTTON COLOR
  categoryContainer.childNodes.forEach((button) => {
    if (button.getAttribute("id") === `${category_id}`) {
      button.classList.remove("hover:bg-btnbg");
      button.classList.remove("bg-btnbg");
      button.classList.remove("text-black");
      button.classList.add("hover:bg-primarycolor");
      button.classList.add("bg-primarycolor");
      button.classList.add("text-white");
    } else {
      button.classList.add("hover:bg-btnbg");
      button.classList.add("bg-btnbg");
      button.classList.add("text-black");
      button.classList.remove("hover:bg-primarycolor");
      button.classList.remove("bg-primarycolor");
      button.classList.remove("text-white");
    }
  });
};

fetchCategory();
