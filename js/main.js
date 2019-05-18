//NAMESPACE: Store "Forest Friend Quiz"
const ffQuiz = {};

//OBJECT OF POSSIBLE QUIZ RESULTS
ffQuiz.results = {
  bear: {
    name: `bear`,
    img: `./assets/bear.jpg`,
    alt: `illustration of a bear.`,
    description: `You are fearless and confident and your larger-than-life character inspires respect and admiration. Together with your new best forest friend, BEAR, you'll be sure to have no problems getting through the forest safe and sound.`,
    counter: 0
    },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.jpg`,
    alt: `illustration of a rabbit.`,
    description: `You remind persistent in tough situations and are considerate of others. While navigating thtough the forest, you stay alert and together with your new best forest friend, RABBIT, you'll avoid any dangers that might happen to pop up.`,
    counter: 0
  }
}

//when reset button gets clicked, scrolls to top
$('.btn__scroll--top').on("click", function () {
  $(window).scrollTop(0);
});

// METHOD: When app initalises, run these methods using event handlers
ffQuiz.init = () => {
  $(`.btn__scroll--down`).on(`click`, ffQuiz.scrollDown);
  $(`input[type=submit]`).on(`click`, ffQuiz.runQuiz);
}

// METHOD: Scrolls down to element when button is clicked
ffQuiz.scrollDown = () => {
  // console.log(`scroll down button pushed`);
  window.scrollBy(0, window.innerHeight / 2)
}

// METHOD: Stores methods that runs when submit button is clicked
ffQuiz.runQuiz = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  ffQuiz.resetCounter();
  ffQuiz.captureChoice();
  ffQuiz.choiceCounter();
  ffQuiz.printResult();
};

//METHOD: Resets counter to 0. (Can't use ONCE function with submit button because reset fields doesn't reload DOM and puts submit button out of action)
ffQuiz.resetCounter = () => {
  ffQuiz.results.bear.counter = 0;
  ffQuiz.results.rabbit.counter = 0;
};

// METHOD: Captures user choice
ffQuiz.captureChoice = () => {
  //create object to hold user choice. Prefix with ffQuiz to be globally accessible
  ffQuiz.userChoice = {};
  //get user choice from checked input button and store as new key-value pair in "userChoice" object
  ffQuiz.userChoice.choice1 = $(`input[name=q-diet]:checked`).val();
  ffQuiz.userChoice.choice2 = $(`input[name=q-stranger]:checked`).val();
  console.log(`capture userchoice: ${ffQuiz.userChoice.choice1}, ${ffQuiz.userChoice.choice2}`);
};

// METHOD: Counts user choice
ffQuiz.choiceCounter = () => {
  //use for-in loop to iterate through "userChoice" to count how many of each animal was selected, then update "counter" value by 1 each time
  for (i in ffQuiz.userChoice) {
    if (ffQuiz.userChoice[i] === `bear`) {
      ffQuiz.results.bear.counter++;
    } else if (ffQuiz.userChoice[i] === `rabbit`) {
      ffQuiz.results.rabbit.counter++;
    } else {
      $(this).find('.error').text('Pick an answer!');
    };
   };
  };

// METHOD: Displays result (new forest friend)
ffQuiz.printResult= () => {
  // console.log(`display friend button pushed`);

  //create methods to hold the html results that will be displayed when called
  const printBear = () => {
    $(`.container__display-result`)
      .html(`<p>Your new forest friend is: ${ffQuiz.results.bear.name}!</p>`)
      .append(`<img src='${ffQuiz.results.bear.img}' alt='${ffQuiz.results.bear.alt}'>`)
      .append(`<p>${ffQuiz.results.bear.description}</p>`);
    $(`.container__reset`).css(`display`, `block`);
    };
  const printRabbit = () => {
    $(`.container__display-result`)
      .html(`<p>Your new forest friend is: ${ffQuiz.results.rabbit.name}!</p>`)
      .append(`<img src='${ffQuiz.results.rabbit.img}' alt='${ffQuiz.results.rabbit.alt}'>`)
      .append(`<p>${ffQuiz.results.rabbit.description}</p>`);
    $(`.container__reset`).css(`display`, `block`);
    };
  
  //make it required for input fields to be clicked
  if ($('input[name=q-diet]:checked').val() && $('input[name=q-stranger]:checked').val()) {
    
    //display appropriate result onto page based on counter results
    if (ffQuiz.results.bear.counter > ffQuiz.results.rabbit.counter) {
      printBear();
    }
    else if (ffQuiz.results.bear.counter < ffQuiz.results.rabbit.counter) {
      printRabbit();
    } else if (ffQuiz.results.bear.counter === 1 && ffQuiz.results.rabbit.counter === 1) {

      //create box to store new array and grab the values of "results" objects (= "animal" objects)
      const animalPropertiesArr = Object.values(ffQuiz.results);
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
  ffQuiz.init();
});
