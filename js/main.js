document.addEventListener("DOMContentLoaded", () => {
  //We get links to the elements with which we will work.
  //3 input fields and a button
  const inputDay = document.querySelector('.input-days');
  const inputMonth = document.querySelector('.input-months');
  const inputYear = document.querySelector('.input-years');

  const button = document.querySelector('.calculator__user-input-btn');

  //Add an input event handler to the day input field
  inputDay.addEventListener('input', function () {
    //If there were errors in the field, then with a new change we remove them
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }
    //If a day greater than 31 is specified, then we signal an error, otherwise we delete the error
    if (inputDay.value > 31) {
      inputDay.nextElementSibling.innerHTML = "Must be a valid day"
      inputDay.parentElement.classList.add("error");
    } else {
      inputDay.parentElement.classList.remove("error");
    }
  });

  //Add an input event handler to the mounth input field
  inputMonth.addEventListener('input', function () {
    //If there were errors in the field, then with a new change we remove them
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }
    //If a mounth greater than 12 is specified, then we signal an error, otherwise we delete the error
    if (inputMonth.value > 12) {
      inputMonth.nextElementSibling.innerHTML = "Must be a valid mounth"
      inputMonth.parentElement.classList.add("error");
    } else {
      inputMonth.parentElement.classList.remove("error");

    }
  });

  //Add an input event handler to the year input field
  inputYear.addEventListener('input', function () {
    //If there were errors in the field, then with a new change we remove them
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }
    //If the specified year is greater than the current year, we throw an error
    let Data = new Date();
    if (inputYear.value > Data.getFullYear()) {
      inputYear.nextElementSibling.innerHTML = "Must be in the past"
      inputYear.parentElement.classList.add("error");
    } else {
      inputYear.parentElement.classList.remove("error");
    }
  });
  //Here just made it so that when given a negative year. The current year was taken minus the given one
  inputYear.addEventListener('change', function () {
    let Data = new Date();
    if (inputYear.value < 0) {
      inputYear.value = -inputYear.value;
      inputYear.value = Data.getFullYear() - inputYear.value;
    }
  });

  //Handling the button click event
  button.addEventListener('click', function () {

    //Retrieving data from fields
    day = inputDay.value;
    month = inputMonth.value;
    year = inputYear.value;

    //Checking that the fields are filled
    if (!day) {
      inputDay.parentElement.classList.add("error");
      inputDay.nextElementSibling.innerHTML = "This field is required"
    }
    if (!month) {
      inputMonth.parentElement.classList.add("error");
      inputMonth.nextElementSibling.innerHTML = "This field is required"
    }
    if (!year) {
      inputYear.parentElement.classList.add("error");
      inputYear.nextElementSibling.innerHTML = "This field is required"
    }
    if (!day || !month || !year) {
      return;
    }

    let date = new Date(year, month - 1, day);
    let currentData = new Date();
    //Checking if the date is correct
    if (!(date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day) || (document.getElementsByClassName('error').length) || date > currentData || year < 0) {
      inputDay.parentElement.classList.add("error");
      inputDay.nextElementSibling.innerHTML = "Must be a valid date"
      inputMonth.parentElement.classList.add("error");
      inputMonth.nextElementSibling.innerHTML = ""
      inputYear.parentElement.classList.add("error");
      inputYear.nextElementSibling.innerHTML = "";
      return;
    }



    let age_year = currentData.getFullYear() - date.getFullYear();
    let age_mounth = 0;
    let age_day = 0;
    if (currentData < new Date(currentData.getFullYear(), month - 1, day)) {
      age_year = age_year - 1;
      age_mounth = currentData.getMonth() + 1;
      age_day = currentData.getDate();
    } else {
      if (currentData.getMonth() + 1 === month) {
        age_mounth = 0;
        age_day = currentData.getDate() - day;
        console.log(age_day);
      } else {
        age_mounth = currentData.getMonth() + 1 - month;
        if (currentData.getDate() < day) {
          age_mounth = age_mounth - 1;
          age_day = currentData.getDate() + new Date(currentData.getFullYear(), currentData.getMonth(), 0).getDate() - day;
        } else {
          age_day = currentData.getDate() - day;
        }
      }

    }

    //We display the calculated data in the result fields
    const outputYear = document.querySelector('.output-years').querySelector('span');
    const outputMonth = document.querySelector('.output-months').querySelector('span');
    const outputDay = document.querySelector('.output-days').querySelector('span');

    outputYear.innerHTML = age_year
    outputMonth.innerHTML = age_mounth
    outputDay.innerHTML = age_day


    const outputMonthInMonths = document.querySelector('.output-months-inMonth').querySelector('span');
    const outputDayInDays = document.querySelector('.output-days-inDay').querySelector('span');

    outputYear.innerHTML = age_year
    outputMonthInMonths.innerHTML = calculateAgeInMonths(`${year}-${month}-${day}`)
    outputDayInDays.innerHTML = calculateAgeInDays(`${year}-${month}-${day}`)


  });

  function calculateAgeInDays(birthdate) {
    // Parse the birthdate string to a Date object
    const birthDateObject = new Date(birthdate);

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - birthDateObject;

    // Convert the time difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  function calculateAgeInMonths(birthdate) {
    const birthDateObject = new Date(birthdate);
    const currentDate = new Date();

    const yearsDifference = currentDate.getFullYear() - birthDateObject.getFullYear();
    const monthsDifference = currentDate.getMonth() - birthDateObject.getMonth();

    const totalMonths = yearsDifference * 12 + monthsDifference;

    return totalMonths;
  }

});

