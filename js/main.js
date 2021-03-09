//NAMESPACE: Stores "Best Forest Friend app" (put everything here from start to decrease mutation)
const ffApp = {
  // METHOD (INIT): These event handlers run when the quiz has been initialized
  init: () => {
    $(`input[value="Let's Get Started!"]`).on(`click`, ffApp.scrollDown);
    $(`input[value="Next"]`).on(`click`, ffApp.nextBtnClicked);
    $(`input[type=submit]`).on(`click`, ffApp.submitBtnClicked);
    $('.btn-reset-quiz').on("click", ffApp.resetBtnClicked);
  },

  // METHOD: Scrolls down by 100%vh when button is clicked
  scrollDown: () => {
    window.scrollBy(0, window.innerHeight)
  },

  // METHOD: What happens when next button is clicked
  nextBtnClicked: function () {
    //THIS is passed here as argument so that it binds to specific "Next" button instead of window
    ffApp.showError(this);
  },

  //METHOD: Shows error if no radio button selected
  showError: function (nextBtnElement) {
    //storing current question key to localise error-handling to individual question
    const qKey = $(nextBtnElement).data(`q-num`);
    //passing parameter here (instead of THIS keyword which will return window object)
    if (ffApp.radioSelected(qKey)) {
      //clear the alert scoped to this container and scroll down
      $(`.container-${qKey} .alert`).remove();
      ffApp.scrollDown();
    } //if no error exists, append error (stops multiple errors being shown on multiple clicks)
    else if (!$(`.container-${qKey} .alert`).length) {
      //append this alert AFTER the next button
      $(nextBtnElement).after(`<div class="alert container-flex"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Please pick an answer!</p></div>`);
    }
  },

  //METHOD: Checks if the radio button is selected and creates an array out of the question inputs
  radioSelected: (qKey) => {
    //variable to store array of actual html inputs > returns an array-like object $(`input[type=radio]`) and converts to an array using .from
    const radios = Array.from($(`.container-${qKey} input[type=radio]`));
    //checks that at least one radio is checked and return boolean
    return radios.some(radio => {
      return radio.checked;
    })
  },

  // METHOD: Stores methods that runs when submit button is clicked
  submitBtnClicked: (e) => {
    //prevent default behaviour of submit button
    e.preventDefault();
    ffApp.resetCounter();
    ffApp.choiceCounter();
    ffApp.printResult();
  },

  //METHOD: Resets counter to 0 so that clicking multiple times does not give wrong result
  resetCounter: () => {
    ffApp.results.bear.counter = 0;
    ffApp.results.rabbit.counter = 0;
  },

  // METHOD: Counts user choice
  choiceCounter: () => {
    //use for-in loop to iterate through "userChoice" to count how many of each animal was selected, then update "counter" value by 1 each time
    for (i in ffApp.userChoice) {
      if (ffApp.userChoice[i] === `bear`) {
        ffApp.results.bear.counter++;
      } else if (ffApp.userChoice[i] === `rabbit`) {
        ffApp.results.rabbit.counter++;
      }
    }
  },

  // METHOD: Displays result (new forest friend)
  printResult: () => {
    //METHODS: To hold the html results that will be displayed when called
    const printBear = () => {
      $(`.container-display-result`).css(`display`, `flex`)
        .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.bear.name}</h2><img src='${ffApp.results.bear.img}' alt='${ffApp.results.bear.alt}' class='${ffApp.results.bear.class}'><p>${ffApp.results.bear.description}</p></div>`);
      $(`.container-reset-quiz`).css(`display`, `flex`);
    };
    const printRabbit = () => {
      $(`.container-display-result`).css(`display`, `flex`)
        .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.rabbit.name}</h2><img src='${ffApp.results.rabbit.img}' alt='${ffApp.results.rabbit.alt}' class='${ffApp.results.bear.class}'><p>${ffApp.results.rabbit.description}</p></div>`);
      $(`.container-reset-quiz`).css(`display`, `flex`);
    };

    //if answer has been selected for both questions, show result. Else, display error message
    if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
      //first, clear any previous error messages from before
      $(`.alert`).remove();
      //display appropriate result onto page based on counter results
      if (ffApp.results.bear.counter > ffApp.results.rabbit.counter) {
        printBear();
      } else if (ffApp.results.bear.counter < ffApp.results.rabbit.counter) {
        printRabbit();
      } else {
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
      } //scroll down to result AFTER it has been populated, not before (or else mini-scroll)
      ffApp.scrollDown();
    } else if //checks if alert already exists and if so, do not populate another one
      (!$(`.container-submit .alert`).length) {
      $(`input[value="Yes, please!"]`).after(`<div class="alert container-flex"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Whoops- you're an eager beaver... Please answer all the questions above!</p>`);
    }
  },

  //METHOD: Resets the quiz
  resetBtnClicked: () => {
    //removes the results and reset btn areas altogether
    $(`.container-display-result`).css(`display`, `none`);
    $(`.container-reset-quiz`).css(`display`, `none`);
    //scrolls to the top of the page
    $(window).scrollTop(0);
  }
};

// DOCUMENT READY: Initialise quiz when DOM is ready and loaded
$(function () {
  ffApp.init();
});