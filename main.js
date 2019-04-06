let input = document.getElementById("userinput");
const initialState = {
  end: "april 8, 2019 12:00:00",
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  replacedElements: {
    days: "0",
    hours: "0",
    minutes: "0",
    seconds: "0"
  },
  replacedElementsArr: [
    "days",
    "hours",
    "minutes",
    "seconds",
  ]
};
let end = new Date(sessionStorage["end"] || initialState.end);

let todaysDate = () => {
  let now = new Date();
  document.getElementById("now").innerHTML =
    "Todays Date: " +
    initialState.dayNames[now.getDay()] +
    ", " +
    initialState.monthNames[now.getMonth()] +
    " " +
    now.getDate() +
    ", " +
    now.getFullYear();
  return now;
};

let toggleView = element => {
  var x = document.getElementById(element);
  if (x.style.display === "none") {
    x.style.display = "grid";
  } else {
    x.style.display = "none";
  }
};
todaysDate();

setDate = input => {
  if (input.value === "") {
    return;
  }
  end = new Date(input.value + "T00:00:00");
  sessionStorage["end"] = end;
  if (document.getElementById("cd").style.display === "none") {
    toggleView("cd");
    x = setInterval(showDate, 1000);
  }
};
let showDate = () => {
  document.getElementById("end").innerHTML =
    "End Date: " +
    initialState.dayNames[end.getDay()] +
    ", " +
    initialState.monthNames[end.getMonth()] +
    " " +
    end.getDate() +
    ", " +
    end.getFullYear();

  let now = new Date();
  let elapsed = end - now;

  initialState.replacedElements.days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  initialState.replacedElements.hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  initialState.replacedElements.minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  initialState.replacedElements.seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  for (let index = 0; index < initialState.replacedElementsArr.length; index++) {
    const element = initialState.replacedElementsArr[index];
    const firstChar = element.charAt(0);
    document.getElementById(element).innerHTML = initialState.replacedElements[element] + firstChar;
  }

  if (elapsed < 0) {
    clearInterval(x);
    document.getElementById("end").innerHTML = "The countdown has finished";
    toggleView("cd");
  }
};
let x = setInterval(showDate, 1000);
