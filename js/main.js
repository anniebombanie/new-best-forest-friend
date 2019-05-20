//NAMESPACE: Stores "Best Forest Friend app"
const ffApp = {};

//OBJECT: Holds possible quiz results
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
};

// DOCUMENT READY: Initialise quiz when DOM is ready and loaded
$(function () {
  ffApp.init();
});

// METHOD (INIT): These event handlers run when the quiz has been initialized
ffApp.init = () => {
  $(`input[value="Let's Get Started!"]`).on(`click`, ffApp.scrollDown);
  $(`input[value="Next"]`).on(`click`, ffApp.nextBtnClicked);
  $(`input[type=submit]`).on(`click`, ffApp.submitBtnClicked);
  $('.btn-reset-quiz').on("click", function () {
    //scrolls to the top of the page
    $(window).scrollTop(0);
    //removes the results and reset btn area altogether
    $(`.container-display-result`).css(`display`, `none`);
    $(`.container-reset-quiz`).css(`display`, `none`);
  });
};

// METHOD: Scrolls down by 100%vh when button is clicked
ffApp.scrollDown = () => {
  window.scrollBy(0, window.innerHeight)
};

// METHOD: What happens when next button is clicked
ffApp.nextBtnClicked = function() {
  console.log(`next btn has been clicked`);
  //THIS is passed here as argument so that it binds to specific "Next" button instead of window
  ffApp.showError (this); 
  console.log(`THIS IS WHAT "THIS" IS ON NXTBTNCLICKED`, this);
};

//METHOD: Show error
ffApp.showError = function (nextBtnElement) {
  //passing parameter here (instead of THIS keyword) because otherwise binded t ???
  if (!ffApp.noRadioSelected($(nextBtnElement).data(`q-num`))) {
    console.log(`SHOW ERROR function has been activated`);

    //append this alert AFTER the next button
    $(nextBtnElement).after(`<div class="alert"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Please pick an answer!</p></div>`);
    console.log(nextBtnElement, `WHAT IS DATA`, $(nextBtnElement).data(`q-num`));
  } else {
    //this clears error message once radio has been selected NOT WORKING ???
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

// METHOD: Stores methods that runs when submit button is clicked
ffApp.submitBtnClicked = (e) => {
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

  //METHODS: To hold the html results that will be displayed when called
  const printBear = () => {
    $(`.container-display-result`).css(`display`, `block`)
      .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.bear.name}!</h2>`)
      .append(`<img src='${ffApp.results.bear.img}' alt='${ffApp.results.bear.alt}'><p>${ffApp.results.bear.description}</p></div>`);
    $(`.container-reset-quiz`).css(`display`, `block`);
    };
  const printRabbit = () => {
    $(`.container-display-result`).css(`display`, `block`)
      .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.rabbit.name}</h2>`)
      .append(`<img src='${ffApp.results.rabbit.img}' alt='${ffApp.results.rabbit.alt}'><p>${ffApp.results.rabbit.description}</p></div>`);
    $(`.container-reset-quiz`).css(`display`, `block`);
    };
  
  //if answer has been selected for both questions, show result. Else, display error message
  if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
    ffApp.scrollDown();
    //display appropriate result onto page based on counter results
    if (ffApp.results.bear.counter > ffApp.results.rabbit.counter) {
      printBear();
    } else if (ffApp.results.bear.counter < ffApp.results.rabbit.counter) {
      printRabbit();
    } else if (ffApp.results.bear.counter === 1 && ffApp.results.rabbit.counter === 1) {
      //create box to store new array, holding values of "results" objects
      const animalPropertiesArr = Object.values(ffApp.results);
      //generate a random number of 0 or 1 that we need to store in "randomAnimalChoice"
      const randomAnimalChoice = Math.floor(Math.random() * animalPropertiesArr.length);
      //if 1 comes up, make it a Rabbit, if 0, then Bear
      if (randomAnimalChoice === 1) {
        printRabbit();
      } else {
        printBear();
      }
    }
  } else {
    $(`input[value="Yes, please!"]`).after(`<i class="fas fa-exclamation-triangle" aria-hidden="true"><p class="alert">Whoops- you're an eager beaver but please answer all the questions above!</p>`);
    //removes/resets the error message when clicked again NOT WORKING ???
    $(`input[value="Yes, please!"]`).after(``);  
  }
};