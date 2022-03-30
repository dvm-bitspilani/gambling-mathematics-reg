const nameErr = "The name should be less than 40 characters";
const idErr = "Enter a valid BITS ID";
const emailErr = "Enter a valid BITS Email";

const leaderErrs = {
	name: document.getElementById("leader-name-err"),
	id: document.getElementById("leader-id-err"),
	email: document.getElementById("leader-email-err")
};
const teammateErrs = {
	name: document.getElementById("teammate-name-err"),
	id: document.getElementById("teammate-id-err"),
	email: document.getElementById("teammate-email-err")
};

const form = document.getElementById("main-form");
const nameElems = document.querySelectorAll(".input-name");
const idElems = document.querySelectorAll(".input-id");
const emailElems = document.querySelectorAll(".input-email");
const inputs = document.querySelectorAll(".input-field");
const teammates = document.querySelectorAll(".teammate-entry");
let participants = [];

const validateNames = i => {
	let isValid = true;
	let nameVal = nameElems[i].value;
	if (!(nameVal.length <= 40) || !(nameVal.length > 0)) {
		if (i === 0) {
			leaderErrs.name.innerText = nameErr;
		} else {
			teammateErrs.name.innerText = nameErr;
		}

		isValid = false;
	} else {
		if (i === 0) {
			leaderErrs.name.innerText = "";
		} else {
			teammateErrs.name.innerText = "";
		}
	}
	return isValid;
};

const validateIDs = i => {
	let isValid = true;
	let id = idElems[i].value;
	const testID = new RegExp("^20(15|16|17|18|19|20|21)[AB][A1-9](PS|[AB][A1-9]|TS)[0-9]{4}[PGH]$");
	if (!testID.test(id)) {
		if (i === 0) {
			leaderErrs.id.innerText = idErr;
		} else {
			teammateErrs.id.innerText = idErr;
		}

		isValid = false;
	} else {
		if (i === 0) {
			leaderErrs.id.innerText = "";
		} else {
			teammateErrs.id.innerText = "";
		}
	}
	return isValid;
};

const validateEmails = i => {
	let isValid = true;
	let email = emailElems[i].value;
	const testEmail = new RegExp("[fhp]20(15|16|17|18|19|20|21)[0-9]{4}@(pilani|goa|hyderabad).bits-pilani\.ac\.in");
	if (!testEmail.test(email)) {
		if (i === 0) {
			leaderErrs.email.innerText = emailErr;
		} else {
			teammateErrs.email.innerText = emailErr;
		}

		isValid = false;
	} else {
		if (i === 0) {
			leaderErrs.email.innerText = "";
		} else {
			teammateErrs.email.innerText = "";
		}
	}
	return isValid;
};

const validateForm = i => {
	return (validateNames(i) && validateIDs(i) && validateEmails(i));
};

const submitForm = () => {
	fetch("reqres.in/api/users", {
		method: "POST", headers: {
			"Content-Type": "application/json"
		}, data: JSON.stringify({teammates: participants})
	});
};

for (let i = 0; i < 2; i++) {
	teammates[i].addEventListener("change", evt => {
		if (validateForm(i)) {
			console.log("Valid");
		} else {
			console.log("Invalid");
		}
	});
}

form.addEventListener("submit", evt => {
	evt.preventDefault();
	if (validateForm(0) && validateForm(1)) {
		participants = [{
			name: nameElems[0].value, id: idElems[0].value, email: emailElems[0].value
		}, {
			name: nameElems[1].value, id: idElems[1].value, email: emailElems[1].value
		}];
		inputs.forEach((input) => input.value = "");
	}
});