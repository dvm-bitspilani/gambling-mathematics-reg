const form = document.getElementById("main-form");
const nameElems = document.querySelectorAll(".input-name");
const emailElems = document.querySelectorAll(".input-email");
const inputs = document.querySelectorAll(".input-field");
const teammates = document.querySelectorAll(".teammate-entry");
const teamName = document.getElementById("team-name");

let data = {};

const validateUnique = () => {
  let isValid = true;
  if (emailElems[0].value === emailElems[1].value) {
    alert("The emails of teammates need to be unique");
    isValid = false;
  }
  return isValid;
};

const validateForm = (i) => {
  return validateUnique();
};

const submitForm = async () => {
  try {
    let res = await fetch(
      "https://bits-apogee.org/gamblingmaths/create_team/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      }
    );
    console.log(res);
    if (res.ok) {
      alert("Registered Successfully");
    } else {
      alert("There was an error");
    }
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
      leader_name: nameElems[0].value,
      leader_email: emailElems[0].value,
      team_name: teamName.value,
      members: [
        { member_name: nameElems[1].value, member_email: emailElems[1].value },
      ],
    };
    submitForm();
    inputs.forEach((input) => (input.value = ""));
  } else {
    console.log("Invalid");
  }
});
