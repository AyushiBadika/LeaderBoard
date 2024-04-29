//add player form
const form = document.querySelector(".addPlayerForm");
const formError = document.querySelector(".formError");
const championsCards = document.querySelector(".championsCards");
const leaderboard = document.querySelector(".leaderboard");
const leaderboardHeader = document.querySelector(".leaderboard-header");
const countryDropdown = document.querySelector(".countryDropdown");
const countrySelect = document.getElementById("countrySelect");

// Create a default option
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "Select a country";
countrySelect.add(defaultOption);

//countries fetch
let countriesAll = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.text = country.name.common;
      countrySelect.add(option);
    });
    countriesAll = data;
  });
let currentCountryFlag = "";
const getCountryFlag = function (country) {
  countriesAll.forEach((data) => {
    if (data.name.common == country) {
      console.log("RETRUNING FROM ", data, " AND flag = ", data.flags.png);
      currentCountryFlag = data.flags.png;
    }
  });
};

//creating playData
const playerData = [
  {
    FirstName: "Ayushi",
    LastName: "badika",
    country: "India",
    score: 90,
  },
  {
    FirstName: "Anushree",
    LastName: "badika",
    country: "India",
    score: 90,
  },
  {
    FirstName: "Sneha",
    LastName: "badika",
    country: "India",
    score: 90,
  },
  {
    FirstName: "Kiran",
    LastName: "badika",
    country: "India",
    score: 90,
  },
  {
    FirstName: "Dashrath",
    LastName: "badika",
    country: "India",
    score: 90,
  },
];

const AddPlayer = function () {
  if (
    !(
      form[0].value === "" ||
      form[1].value === "" ||
      form[2].value === "" ||
      form[3].value === ""
    )
  ) {
    formError.innerHTML = "";
    const newPlayerData = {
      FirstName: form[0].value,
      LastName: form[1].value,
      dateAndTime: fetchDateAndTime(),
      country: form[2].value,
      score: form[3].value,
    };
    console.log("SELECT VALUE :; ", newPlayerData);
    playerData.push(newPlayerData);
  }
};

const updateDashBoard = function () {
  //sorting player data
  playerData.sort((a, b) => b.score - a.score);

  //clearing current dom
  leaderboard.innerHTML = "";
  championsCards.innerHTML = "";

  console.log("tenge lenge", playerData.length);
  if (playerData.length <= 3) {
    leaderboardHeader.style.display = "none";
  } else {
    leaderboardHeader.style.display = "grid";
  }

  playerData.forEach((data, index) => {
    getCountryFlag(data.country);
    if (index == 0 || index == 1 || index == 2) {
      //full name
      const fullName = document.createElement("h3");
      fullName.classList.add("cName");
      fullName.innerHTML = `${data.FirstName} ${data.LastName}`;

      //country
      const country = document.createElement("p");
      country.classList.add("cCountry");
      country.innerHTML = `${data.country} <img src="${currentCountryFlag}" />`;

      //score
      const score = document.createElement("p");
      score.classList.add("cScore", "scoreBox");
      score.innerHTML = `${data.score}`;

      //date
      const date = document.createElement("p");
      date.classList.add("cDate");
      date.innerHTML = fetchDateAndTime();

      //deleteBtn
      const deleteBtn = document.createElement("p");
      deleteBtn.classList.add("cDelete", "deleteBtn");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteBtn.style.cursor = "pointer";

      //plusBtn
      const plus5 = document.createElement("p");
      plus5.classList.add("cIncreaseScore", "plus5");
      plus5.innerHTML = "+5";
      plus5.style.cursor = "pointer";

      //minusBtn
      const minus5 = document.createElement("p");
      minus5.classList.add("cDecreaseScore", "minus5");
      minus5.innerHTML = "-5";
      minus5.style.cursor = "pointer";

      const scoreCombined = document.createElement("div");
      scoreCombined.className = "cScoreCombined";
      scoreCombined.append(minus5, score, plus5);

      //championCard
      const championCard = document.createElement("div");
      championCard.className = "championCard";

      //trophyImage
      const trophyImage = document.createElement("img");

      trophyImage.src =
        index == 0
          ? "images/gold.png"
          : index == 1
          ? "images/silver.png"
          : "images/bronze.png";

      championCard.append(
        trophyImage,
        fullName,
        country,
        scoreCombined,
        date,
        deleteBtn
      );

      championsCards.append(championCard);
    } else {
      //position
      const position = document.createElement("p");
      position.className = "position";
      position.innerHTML = `${index + 1}th`;

      //full name
      const fullName = document.createElement("h3");
      fullName.classList.add("name");
      fullName.innerHTML = `${data.FirstName} ${data.LastName}`;

      //country
      const country = document.createElement("p");
      country.classList.add("country");
      country.innerHTML = `${data.country} <img src="${currentCountryFlag}" />`;

      //score
      const score = document.createElement("p");
      score.classList.add("score", "scoreBox");
      score.innerHTML = `${data.score}`;

      //date
      const date = document.createElement("p");
      date.classList.add("date");
      date.innerHTML = fetchDateAndTime();

      //deleteBtn
      const deleteBtn = document.createElement("p");
      deleteBtn.classList.add("delete", "deleteBtn");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteBtn.style.cursor = "pointer";

      //plusBtn
      const plus5 = document.createElement("p");
      plus5.classList.add("increaseScore", "plus5");
      plus5.innerHTML = "+5";
      plus5.style.cursor = "pointer";

      //minusBtn
      const minus5 = document.createElement("p");
      minus5.classList.add("decreaseScore", "minus5");
      minus5.innerHTML = "-5";
      minus5.style.cursor = "pointer";

      const scoreCombined = document.createElement("div");
      scoreCombined.className = "scoreCombined";
      scoreCombined.append(minus5, score, plus5);

      const list = document.createElement("div");
      list.className = "leaderboardList";
      list.append(position, fullName, country, scoreCombined, date, deleteBtn);
      leaderboard.append(list);
    }
  });

  //update score
  const scoreBoxAll = document.querySelectorAll(".scoreBox");

  //plus button
  const plus5 = document.querySelectorAll(".plus5");
  plus5.forEach((plus, index) => {
    plus.addEventListener("click", () => {
      playerData[index].score = Number(playerData[index].score) + 5;
      scoreBoxAll[index].innerText = playerData[index].score;
      updateDashBoard();
    });
  });

  //minus button
  const minus5 = document.querySelectorAll(".minus5");
  minus5.forEach((minus, index) => {
    minus.addEventListener("click", () => {
      playerData[index].score = Number(playerData[index].score) - 5;
      scoreBoxAll[index].innerText = playerData[index].score;
      updateDashBoard();
    });
  });

  //deleteBtn working
  const deleteBtnAll = document.querySelectorAll(".deleteBtn");
  deleteBtnAll.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      playerData.splice(index, 1);
      updateDashBoard();
    });
  });

  //clearing form after adding player
  form[0].value = "";
  form[1].value = "";
  form[2].value = "";
  form[3].value = "";
};

//fetching date and time
const fetchDateAndTime = function () {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

window.addEventListener("load", () => {
  updateDashBoard();
  formError.innerHTML = "";
});

//form submittion
form.addEventListener("submit", (e) => {
  console.log("lllllll");
  e.preventDefault();
  if (
    form[0].value === "" ||
    form[1].value === "" ||
    form[2].value === "" ||
    form[3].value === ""
  ) {
    formError.innerHTML = "All fields Are required";
  }
  AddPlayer();
  updateDashBoard();
});
