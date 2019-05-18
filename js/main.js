/* Pseudo Code:

1. User clicks on “Let’s Get Started” button
2. Page scrolls down to the first question.
3. User selects answer.
4. Icon next to answer changes colour to show it’s been selected.
5. User clicks on “Next” button.
6. Page scrolls down to next question.
7. If nothing has been selected, error output “Please pick an answer!”
8. Repeat steps 3 - 7.
9. User clicks “Meet my new best friend!”
10. If user has scrolled down without selecting an answer somewhere and clicks on this button, error output “Please answer all the questions to find your new friend.” (Put required = true)
11. Page scrolls down to show new friend, dynamically.
12. Button underneath to re - start(clears all fields, back to top of page): “I want a new forest friend”
*/

/*
Logic Notes:

- Use.filter, .attr and .map to grab animals with correct name class.
- Function to say that if .bear.length > .rabbit return .bear
  - If class A.length === class.B.length return random

 1. bind click event to submit button
 2. prevent default behaviour of button
 3.capture choice 1 using val and put into new variable
 4. capture choice 2 using val and put into new variable
5. output whichever is higher
6. if draw, pick from random array in object
 7. print to page
  */

  // capture users choice and store in an array
// look into the app and filter for the largest array
// return that array as a result
// if array are draw, pick a random result from the drawn items
// forestFriendApp.filterChoice = (usersChoice) => {
//   for (let i = 0); i < usersChoice; i++) {

//   }
  //use one submit button to capture all the values and then use if else to sort and filter







//NAMESPACE: To store "Forest Friend Quiz"
const ffQuiz = {};

//OBJECT OF POSSIBLE QUIZ RESULTS
ffQuiz.results = {
  bear: {
    name: `bear`,
    img: `./assets/bear.jpg`,
    alt: `illustration of a bear.`,
    description: `You are fearless and confident and your larger-than-life character inspires respect and admiration. Together with your new best forest friend, BEAR, you'll be sure to have no problems getting through the forest safe and sound.`
    },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.jpg`,
    alt: `illustration of a rabbit.`,
    description: `You remind persistent in tough situations and are considerate of others. While navigating thtough the forest, you stay alert and together with your new best forest friend, RABBIT, you'll avoid any dangers that might happen to pop up.`
  }
}

// METHOD: When app initalises, run these methods
ffQuiz.init = () => {
  $(`.btn__scroll--down`).on(`click`, ffQuiz.scrollDown);
  $(`input[type=submit]`).on(`click`, ffQuiz.runQuiz);
}

// METHOD: Scroll down to element when button is clicked
ffQuiz.scrollDown = () => {
  console.log(`scroll down button pushed`);
  window.scrollBy(0, window.innerHeight / 2)
}

// METHOD: Holds methods that runs when submit button is clicked
ffQuiz.runQuiz = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  ffQuiz.captureChoice();
  ffQuiz.animalCounter();
  ffQuiz.displayFriend();
}
// METHOD: Captures user choice
ffQuiz.captureChoice = (e) => {
  //create object to hold user choice. Prefix with ffQuiz to be globally accessible
  ffQuiz.userChoice = {};
  //get user's choice from which input button is checked and store as new key-value pair in userChoice object
  ffQuiz.userChoice.choice1 = $(`input[name=q-diet]:checked`).val();
  ffQuiz.userChoice.choice2 = $(`input[name=q-stranger]:checked`).val();
  console.log(`capture userchoice: ${ffQuiz.userChoice.choice1}, ${ffQuiz.userChoice.choice2}`);
}

// METHOD: Count user choice
ffQuiz.animalCounter = () => {
  //to count how many choice of each animal we have, we need to start the counter at 0.
  ffQuiz.bearCount = 0;
  ffQuiz.rabbitCount = 0;
  //then we use a loop to iterate through the ffQuiz object to count how many of each animal was selected
  for (i in ffQuiz.userChoice) {
    if (ffQuiz.userChoice[i] === `bear`) {
      ffQuiz.bearCount++;
    } else if (ffQuiz.userChoice[i] === `rabbit`) {
      ffQuiz.rabbitCount++;
      console.log(`animal counter: bear ${ffQuiz.bearCount}, rabbit: ${ffQuiz.rabbitCount}`)
    }
   }
  }

// Object.keys(test)
//   .filter(key => /alex/.test(key)
//     .forEach(key => console.log(key, test[key]));

// METHOD: Display new forest friend based on user's choice
//must add math.random
ffQuiz.displayFriend= () => {
  console.log(`display friend button pushed`);

  const displayBear = $(`.container__display-result`)
    .html(`<p>Your new forest friend is: ${ffQuiz.results.bear.name}!</p>`)
    .append(`<img src='${ffQuiz.results.bear.img}' alt='${ffQuiz.results.bear.alt}'>`)
    .append(`<p>${ffQuiz.results.bear.description}</p>`);
  const displayRabbit = $(`.container__display-result`)
    .html(`<p>Your new forest friend is: ${ffQuiz.results.rabbit.name}!</p>`)
    .append(`<img src='${ffQuiz.results.rabbit.img}' alt='${ffQuiz.results.rabbit.alt}'>`)
    .append(`<p>${ffQuiz.results.rabbit.description}</p>`);

  if (ffQuiz.bearCount > ffQuiz.rabbitCount) {   
    displayBear      
  } else if (ffQuiz.bearCount < ffQuiz.rabbitCount) {
    displayRabbit
  } else if (ffQuiz.bearCount === ffQuiz.rabbitCount) {
    //create a box to put new array and grab the values of results objects and store them there
    const animalPropertiesArr = Object.values(ffQuiz.results);
      console.log(animalPropertiesArr);
      //this will generate a random number of 0 or 1 that we need to store
    const randomAnimalChoice = Math.floor(Math.random() * animalPropertiesArr.length);
    if (randomAnimalChoice === 1) {
      displayBear
    } else {
      displayRabbit
    }
  } else { 
    $(`.container__display-result`)
      .html(`<p>Please answer all the questions to find out who your new best friend is!</p>`)
  }
}

// DOCUMENT READY
$(document).ready(function(){
  ffQuiz.init()
});
