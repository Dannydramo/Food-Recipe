const btnClick = document.querySelector(".btn");
let food_Item = document.querySelector(".food_item");

food_Item.addEventListener("click", getFood);

btnClick.addEventListener("click", () => {
  const userInput = document.querySelector(".userInp").value.trim();
  if ((userInput = "")) {
    food_Item.innerHTML = "Please Enter A Valid Meal";
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let foodMeals = "";
        if (data.meals) {
          data.meals.forEach((meals) => {
            foodMeals += `
            <div class="food" data-id=${meals.idMeal}>
            <div class="">
             <img src=${meals.strMealThumb} class="img_item">
            </div>
             <div class="food_details">
                 <h2>${meals.strMeal}</h2>
                 <a href="#" class="btn_recipe">View Recipe</a>
             </div>
         </div>
            `;
          });
        } else {
          food_Item.innerHTML = "Sorry We Couldn't Fetch Your MEal";
        }
        food_Item.innerHTML = foodMeals;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});

function getFood(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn_recipe")) {
    let mealDetails = e.target.parentElement.parentElement;
    console.log(mealDetails);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDetails.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => fetchMealDetails(data.meals));
  }
}

const showModal = document.querySelector(".modal_item");
const modalPreview = document.querySelector(".modal_preview");

function fetchMealDetails(meal) {
  let mealMenu = meal[0];

  let count = 1;
  let ingredients = [];

  for (let i in mealMenu) {
    let ingredient = "";
    let measure = "";
    if (i.startsWith("strIngredient") && mealMenu[i]) {
      ingredient = mealMenu[i];
      measure = mealMenu["strMeasure" + count];
      count += 1;
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  let html = `
                    <div>
                       <div class="foodMeal">
                       <img src=${mealMenu.strMealThumb} class="foodImg">
                       <h2>${mealMenu.strMeal}</h2>
                       </div>
                        <p class="menu_category">${mealMenu.strCategory}</p>
                       <div class="list_ing">
                          
                       </div>
                        <div class="meal_instruction">
                            <p>${mealMenu.strInstructions}</p>
                        </div>
                        
                       
                    </div>
    `;

  modalPreview.innerHTML = html;
  showModal.classList.add("show_modal");
  const list_ing = document.querySelector(".list_ing");

  let ul = document.createElement("ul");
  console.log(ingredients);
  ingredients.forEach((item) => {
    li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
    list_ing.appendChild(ul);
  });
}

const closeImg = document.querySelector(".close_img");

closeImg.addEventListener("click", () => {
  showModal.classList.remove("show_modal");
});
