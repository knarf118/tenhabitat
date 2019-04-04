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
let removeElement = element => {
  element && element.parentNode && element.parentNode.removeChild(element);
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

  let days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  let hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days + "d ";
  document.getElementById("hours").innerHTML = hours + "h ";
  document.getElementById("minutes").innerHTML = minutes + "m ";
  document.getElementById("seconds").innerHTML = seconds + "s ";

  if (elapsed < 0) {
    clearInterval(x);
    document.getElementById("end").innerHTML = "The countdown has finished";
    toggleView("cd");
  }
};
let x = setInterval(showDate, 1000);
