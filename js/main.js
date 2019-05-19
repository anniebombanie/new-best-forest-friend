//NAMESPACE: Store "Best Forest Friend App" (No let/const in front of methods stored inside as they exist as objects)
const bffApp = {};

//OBJECT OF POSSIBLE QUIZ RESULTS
bffApp.results = {
  bear: {
    name: `bear`,
    img: `./assets/bear.svg`,
    alt: `illustration of a bear.`,
    description: `Like your new forest friend, BEAR, you are fearless and confident with a larger-than-life character. Danger in the forest? Pffttp- you laugh in the face of danger.`,
    counter: 0
    },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.svg`,
    alt: `illustration of a rabbit.`,
    description: `While navigating thtough the forest, you stay alert and vigilant. Together with your new best forest friend, RABBIT, you'll avoid any dangers that might pop up.`,
    counter: 0
  }
}

// METHOD: When app initalises, run these methods using event handlers
bffApp.init = () => {
  $(`.btn__scroll--down`).on(`click`, bffApp.scrollDown);
  $(`input[type=submit]`).on(`click`, bffApp.compileResult);
  $(`input[value="Next"]`).on(`click`, bffApp.showError);
  //when reset button gets clicked, scrolls to top
  $('.btn__scroll--top').on("click", function () {
    $(window).scrollTop(0);
  });
};

//counter for how many questions are have been checked
bffApp.qNum = 1;

bffApp.nextBtnClicked = () => {
  noRadioSelected()
};

// METHOD: Scrolls down to element when button is clicked
bffApp.scrollDown = () => {
  // console.log(`scroll down button pushed`);
  window.scrollBy(0, window.innerHeight)
};

//checks if the radio button is selected- returns boolean (0 = false, 1 = true)
function noRadioSelected() {
  // OLD CODE return ($(`input[type=radio]:checked`).length > 0);

  const radios = Array.from($(`input[type=radio]`));

  let numChecked = 0;
  radios.forEach(radio => {
    if (radio.checked) {
      numChecked +=1;
    }
  });

  if (numChecked === bffApp.qNum) {
    bffApp.qNum += 1;
    return true;
  } else {
    return false;
  };
};


bffApp.showError = function () {
    if (!noRadioSelected()) {
      $(this).next('.error-next-btn').text('Pick an answer!');
    };
};
// };

// METHOD: Stores methods that runs when submit button is clicked
bffApp.compileResult = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  bffApp.resetCounter();
  bffApp.captureChoice();
  bffApp.choiceCounter();
  bffApp.printResult();
};

//METHOD: Resets counter to 0. (Can't use ONCE function with submit button because reset fields doesn't reload DOM and puts submit button out of action)
bffApp.resetCounter = () => {
  bffApp.results.bear.counter = 0;
  bffApp.results.rabbit.counter = 0;
};

// METHOD: Captures user choice
bffApp.captureChoice = () => {
  //create object to hold user choice. Prefix with bffApp to be globally accessible
  bffApp.userChoice = {};
  //get user choice from checked input button and store as new key-value pair in "userChoice" object
  bffApp.userChoice.choice1 = $(`input[name=q-diet]:checked`).val();
  bffApp.userChoice.choice2 = $(`input[name=q-stranger]:checked`).val();
  console.log(`capture userchoice: ${bffApp.userChoice.choice1}, ${bffApp.userChoice.choice2}`);
};

// METHOD: Counts user choice
bffApp.choiceCounter = () => {
  //use for-in loop to iterate through "userChoice" to count how many of each animal was selected, then update "counter" value by 1 each time
  for (i in bffApp.userChoice) {
    if (bffApp.userChoice[i] === `bear`) {
      bffApp.results.bear.counter++;
    } else if (bffApp.userChoice[i] === `rabbit`) {
      bffApp.results.rabbit.counter++;
   };
  };
};

// METHOD: Displays result (new forest friend)
bffApp.printResult= () => {
  // console.log(`display friend button pushed`);

  //create methods to hold the html results that will be displayed when called
  const printBear = () => {
    $(`.container__display-result`)
      .html(`<p>Your new forest friend is:</p>
      <h2>${bffApp.results.bear.name}!</h2>`)
      .append(`<img src='${bffApp.results.bear.img}' alt='${bffApp.results.bear.alt}'>`)
      .append(`<p>${bffApp.results.bear.description}</p>`);
    $(`.container__reset`).css(`display`, `block`);
    };
  const printRabbit = () => {
    $(`.container__display-result`)
      .html(`<p>Your new forest friend is:</p>
      <h2>${bffApp.results.rabbit.name}</h2>`)
      .append(`<img src='${bffApp.results.rabbit.img}' alt='${bffApp.results.rabbit.alt}'>`)
      .append(`<p>${bffApp.results.rabbit.description}</p>`);
    $(`.container__reset`).css(`display`, `block`);
    };
  
  //if answer has been selected for both questions, show result. else, display error message
  if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
    
    //display appropriate result onto page based on counter results
    if (bffApp.results.bear.counter > bffApp.results.rabbit.counter) {
      printBear();
    }
    else if (bffApp.results.bear.counter < bffApp.results.rabbit.counter) {
      printRabbit();
    } else if (bffApp.results.bear.counter === 1 && bffApp.results.rabbit.counter === 1) {

      //create box to store new array and grab the values of "results" objects (= "animal" objects)
      const animalPropertiesArr = Object.values(bffApp.results);
      //generate a random number of 0 or 1 that we need to store in "randomAnimalChoice"
      const randomAnimalChoice = Math.floor(Math.random() * animalPropertiesArr.length);
      //if 1 comes up, make it a Rabbit, if 0, then Bear
      if (randomAnimalChoice === 1) {
        printRabbit();
      } else {
        printBear();
      };
    };
  } else {
  $(`.container__display-result`)
    .html(
      `<div class="wrapper">
            <p class="alert">Please answer all the questions to find out who your new best friend is!</p>
          </div>`);
  };
};

// DOCUMENT READY
$(function () {
  //initialise quiz when DOM is ready and loaded
  bffApp.init();
});