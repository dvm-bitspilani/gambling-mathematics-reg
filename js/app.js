const nameErr = "The name should be less than 40 characters";

const leaderErr = document.getElementById("leader-name-err");
const teammateErr = document.getElementById("teammate-name-err");

const form = document.getElementById("main-form");
const nameElems = document.querySelectorAll(".input-name");
const emailElems = document.querySelectorAll(".input-email");
const inputs = document.querySelectorAll(".input-field");
const teammates = document.querySelectorAll(".teammate-entry");
const teamName = document.getElementById("team-name");

let data = {};

const validateName = (i) => {
  let isValid = true;
  let nameVal = nameElems[i].value;
  if (!(nameVal.length <= 40) || !(nameVal.length > 0)) {
    if (i === 0) {
      leaderErr.innerText = nameErr;
    } else {
      teammateErr.innerText = nameErr;
    }

    isValid = false;
  } else {
    if (i === 0) {
      leaderErr.innerText = "";
    } else {
      teammateErr.innerText = "";
    }
  }
  return isValid;
};

const validateUnique = () => {
  let isValid = true;
  if (emailElems[0].value === emailElems[1].value) {
    alert("The emails of teammates need to be unique");
    isValid = false;
  }
  return isValid;
};

const validateForm = (i) => {
  return validateName(i) && validateUnique();
};

const submitForm = async () => {
  try {
    let response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    console.log(response);
    let out = await response.json();
    console.log(out); 
  } catch (err) {
    console.log(`Failed ${err}`);
  }
};

// bits-apogee.org/gamblingmaths/create_team
// {leader_name, team_name, leader_email, members: []}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (validateForm(0) && validateForm(1)) {
    console.log("Valid");
    data = {
      // leader_name: nameElems[0].value,
      // leader_email: emailElems[0].value,
      // team_name: teamName.value,
      // members: [{ name: nameElems[1].value, email: emailElems[1].value }],
      name: nameElems[0].value,
      role: "leader",
    };
    console.log(data);
    submitForm();
    inputs.forEach((input) => (input.value = ""));
  } else {
    console.log("Invalid");
  }
});
