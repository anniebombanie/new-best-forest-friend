//NAMESPACE: Stores "Best Forest Friend app"
const ffApp = {};

//OBJECT: Holds possible quiz results
ffApp.results = {
  bear: {
    name: `bear`,
    img: `./assets/bear.svg`,
    class: `img-result img-result-bear`,
    alt: `illustration of a bear.`,
    description: `Like your new forest friend, <span="txt-strong">BEAR</span>, you are fearless and confident with a larger-than-life character. Danger in the forest? Pffttp- you laugh in the face of danger.`,
    counter: 0,
    // print:()=>{}
    },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.svg`,
    class: `img-result img-result-rabbit`,
    alt: `illustration of a rabbit.`,
    description: `While navigating thtough the forest, you stay alert and vigilant. Together with your new forest friend, <span="txt-strong">RABBIT</span>, you'll avoid any dangers that might pop up.`,
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
  $(`.fa-chevron-down`).on(`click`, ffApp.scrollDown, console.log(`clicked- this isn't working`));
  $('.btn-reset-quiz').on("click", ffApp.resetBtnClicked);
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

//METHOD: Show error if no radio button selected
ffApp.showError = function (nextBtnElement) {
  //storing current question key
  const qKey = $(nextBtnElement).data(`q-num`);
  
  //passing parameter here (instead of THIS keyword) because otherwise binded t ???
  if (ffApp.radioSelected(qKey)) {
    //clear the alert scoped to this container 
    $(`.container-${qKey} .alert`).remove();
    console.log(`CLEAR ALERT has been activated`);
    ffApp.scrollDown();
  } //check if instance of error already exists(if no alert), if not, append error (stops multiple errors being shown)
  else if (!$(`.container-${qKey} .alert`).length) {
    console.log(`SHOW ERROR function has been activated`);
    //append this alert AFTER the next button
    $(nextBtnElement).after(`<div class="alert container-flex"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Please pick an answer!</p></div>`);
    console.log(nextBtnElement, `WHAT IS DATA`, $(nextBtnElement).data(`q-num`));
  }
};

//METHOD: Checks if the radio button is selected and creates an array out of the question inputs
ffApp.radioSelected = (qKey) => {
  console.log(`no radio selcted running- THIS WORKS`);
  //variable to store array of actual html inputs > returns an array-like object $(`input[type=radio]`) and converts to an array using .from
  const radios = Array.from($(`.container-${qKey} input[type=radio]`));
  console.log(`RETURNING RADIOS ARRAY:`, radios, $(`input[type=radio]`));

  //.some tests that at least one radio is checked and returns boolean (.foreach will iterate through ALL of them) ???
  return radios.some(radio => {
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

//METHOD: Resets counter to 0. (Can't use ONCE function with submit button because reset doesn't reload DOM and puts submit button out of action)
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
    $(`.container-display-result`).css(`display`, `flex`)
      .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.bear.name}</h2><img src='${ffApp.results.bear.img}' alt='${ffApp.results.bear.alt}' class='${ffApp.results.bear.class}'><i class="fas fa-chevron-down btn-scroll-down" title="click to scroll down"></i><p>${ffApp.results.bear.description}</p></div>`);
    $(`.container-reset-quiz`).css(`display`, `flex`);
    };
  const printRabbit = () => {
    $(`.container-display-result`).css(`display`, `flex`)
      .html(`<div class="wrapper"><p>Your new forest friend is:</p>
      <h2>${ffApp.results.rabbit.name}</h2><img src='${ffApp.results.rabbit.img}' alt='${ffApp.results.rabbit.alt}' class='${ffApp.results.bear.class}'><i class="fas fa-chevron-down btn-scroll-down" title="click to scroll down"></i><p>${ffApp.results.rabbit.description}</p></div>`);
    $(`.container-reset-quiz`).css(`display`, `flex`);
    };
  
  //if answer has been selected for both questions, show result. Else, display error message
  if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
    $(`.alert`).remove();
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
    } //scroll down to result AFTER it has been populated, not before (or else mini-scroll)
    ffApp.scrollDown();
  } else if (!$(`.container-submit .alert`).length) {
    $(`input[value="Yes, please!"]`).after(`<div class="alert container-flex"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><p>Whoops- you're an eager beaver but please answer all the questions above!</p>`);
  }
};

//METHOD: Resets the quiz
ffApp.resetBtnClicked = () => {
  console.log(`THIS IS INPUT VALUE:`, $(`input[value="Yes, please!"]`));
  //removes the results and reset btn areas altogether
  $(`.container-display-result`).css(`display`, `none`);
  $(`.container-reset-quiz`).css(`display`, `none`);
  //scrolls to the top of the page
  $(window).scrollTop(0);
};