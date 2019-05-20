//NAMESPACE: Store "Best Forest Friend App" (No let/const in front of methods stored inside as they exist as objects)
const ffApp = {};

//OBJECT OF POSSIBLE QUIZ RESULTS
ffApp.results = {
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

// FUNCTION: Functions that handle events are called event handlers
ffApp.init = () => {
  $(`input[value="Next"]`).on(`click`, ffApp.nextBtnClicked);
  $(`input[type=submit]`).on(`click`, ffApp.compileResult);
  // $(`input[value="Next"]`).on(`click`, ffApp.showError);
  //when reset button gets clicked, scrolls to top
  $('.btn-reset-quiz').on("click", function () {
    $(window).scrollTop(0);
    $(`.container-reset-quiz`).css(`display`, `none`);
  });
};

/*
function name() {
  ...
}

// using function explictly binds the THIS keyword to when it is called (ES5 used .bind function to bind to a value)
const name = function() {
  ...
}

// using arrow function binds the THIS keyword to when it is declared
const name = () => {
  return 1
}
*/


ffApp.nextBtnClicked = function() {
  console.log(`next btn clicked - THIS WORKS`);
  ffApp.showError (this); //to do with where its called and passing so parameters 
  console.log(`THIS IS WHAT THIS IS ON NXTBTNCLICKED`, this);
  };

  //METHOD: Show error
  ffApp.showError = function (nextBtnElement) {
    //passing parameter here instead of THIS keyword because THIS is just difficult to scope
    if (!ffApp.noRadioSelected($(nextBtnElement).data(`q-num`))) {
      console.log(`SHOW ERROR function has been activated`);

      //append this alert AFTER the next button
      $(nextBtnElement).after(`<div class="alert"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Please pick an answer!</p></div>`);
      console.log(nextBtnElement, `WHAT IS DATA`, $(nextBtnElement).data(`q-num`));
    } else {
      //this clears error message once radio has been selected
      $(nextBtnElement).after(``);
      console.log(`CLEAR ALERT has been activated`);
      ffApp.scrollDown();
    }
  };

//METHOD: Checks if the radio button is selected and creates an array of these fieldsets
ffApp.noRadioSelected = (qKey) => {
  console.log(`no radio selcted running- THIS WORKS`);
  //variable to store array of actual html inputs// gets an array like object and using from, converts to an array

  const radios = Array.from($(`.container-${qKey} input[type=radio]`));
  console.log(`RETURNING RADIOS ARRAY:`, radios, $(`input[type=radio]`));

  // radios.some(radio => radio.checked)
  return radios.some(radio => { //instead of foreach because for each you'll have to mutate anything and write many times for each radio instance
    return radio.checked;
  });
};


// METHOD: Scrolls down to element when button is clicked
ffApp.scrollDown = () => {
  // console.log(`scroll down button pushed`);
  window.scrollBy(0, window.innerHeight)
};

// METHOD: Stores methods that runs when submit button is clicked
ffApp.compileResult = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  ffApp.resetCounter();
  ffApp.captureChoice();
  ffApp.choiceCounter();
  ffApp.printResult();
};

//METHOD: Resets counter to 0. (Can't use ONCE function with submit button because reset fields doesn't reload DOM and puts submit button out of action)
ffApp.resetCounter = () => {
  ffApp.results.bear.counter = 0;
  ffApp.results.rabbit.counter = 0;
};

// METHOD: Captures user choice
ffApp.captureChoice = () => {
  //create object to hold user choice. Prefix with ffApp to be globally accessible
  ffApp.userChoice = {};
  //get user choice from checked input button and store as new key-value pair in "userChoice" object
  ffApp.userChoice.choice1 = $(`input[name=q-diet]:checked`).val();
  ffApp.userChoice.choice2 = $(`input[name=q-stranger]:checked`).val();
  console.log(`capture userchoice: ${ffApp.userChoice.choice1}, ${ffApp.userChoice.choice2}`);
};

// METHOD: Counts user choice
ffApp.choiceCounter = () => {
  //use for-in loop to iterate through "userChoice" to count how many of each animal was selected, then update "counter" value by 1 each time
  for (i in ffApp.userChoice) {
    if (ffApp.userChoice[i] === `bear`) {
      ffApp.results.bear.counter++;
    } else if (ffApp.userChoice[i] === `rabbit`) {
      ffApp.results.rabbit.counter++;
   };
  };
};

// METHOD: Displays result (new forest friend)
ffApp.printResult= () => {
  // console.log(`display friend button pushed`);

  //create methods to hold the html results that will be displayed when called
  const printBear = () => {
    $(`.container-display-result`)
      .html(`<p>Your new forest friend is:</p>
      <h2>${ffApp.results.bear.name}!</h2>`)
      .append(`<img src='${ffApp.results.bear.img}' alt='${ffApp.results.bear.alt}'>`)
      .append(`<p>${ffApp.results.bear.description}</p>`);
    $(`.container-reset-quiz`).css(`display`, `block`);
    };
  const printRabbit = () => {
    $(`.container-display-result`)
      .html(`<p>Your new forest friend is:</p>
      <h2>${ffApp.results.rabbit.name}</h2>`)
      .append(`<img src='${ffApp.results.rabbit.img}' alt='${ffApp.results.rabbit.alt}'>`)
      .append(`<p>${ffApp.results.rabbit.description}</p>`);
    $(`.container-reset-quiz`).css(`display`, `block`);
    };
  
  //if answer has been selected for both questions, show result. else, display error message
  if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
    
    //display appropriate result onto page based on counter results
    if (ffApp.results.bear.counter > ffApp.results.rabbit.counter) {
      printBear();
    }
    else if (ffApp.results.bear.counter < ffApp.results.rabbit.counter) {
      printRabbit();
    } else if (ffApp.results.bear.counter === 1 && ffApp.results.rabbit.counter === 1) {

      //create box to store new array and grab the values of "results" objects (= "animal" objects)
      const animalPropertiesArr = Object.values(ffApp.results);
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
    $(`input[value="Yes, please!"]`).append(`<i class="fas fa-exclamation-triangle" aria-hidden="true"><p class="alert">Please answer all the questions to find out who your new best friend is!</p>`);
  };
};

// DOCUMENT READY
$(function () {
  //initialise quiz when DOM is ready and loaded
  ffApp.init();
});