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
const ffApp = {};

//ARRAY OF POSSIBLE QUIZ RESULTS
ffApp.animals = {
  bear: {
    name: `bear`,
    img: `./assets/bear.jpg`,
    alt: `illustration of a bear.`,
    description: `bear lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sunt quia mollitia, eum corrupti alias inventore, dolorem consectetur labore iure ipsam, cumque doloremque dolores unde maiores ad officiis eaque itaque.`
    },
  rabbit: {
    name: `rabbit`,
    img: `./assets/rabbit.jpg`,
    alt: `illustration of a rabbit.`,
    description: `rabbit lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil alias quisquam quos assumenda ipsum voluptates dignissimos. Ex suscipit deserunt cupiditate, accusantium perferendis dolore perspiciatis culpa, ut aliquam, soluta sapiente.`
  }
}

ffApp.init = () => {
  //When app initalises, run these methods
  $(`.btn-scroll`).on(`click`, ffApp.scrollDown);
  $(`input[type=submit]`).on(`click`, ffApp.captureChoice);
}

// METHOD 1: Scroll down vh % when button is clicked
ffApp.scrollDown = () => {
  console.log(`scroll down button pushed`);
  window.scrollBy(0, window.innerHeight / 2)
}

// METHOD 2: Capture user choice
ffApp.captureChoice = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  //create empty object to store user choice
  ffApp.userChoice = {};
  //get user's choice from which input button is checked and store as new key-value pair in userChoice object
  ffApp.userChoice.choice1 = $(`input[name=question1]:checked`).val();
  ffApp.userChoice.choice2 = $(`input[name=question2]:checked`).val();
  console.log(`capture userchoice: ${ffApp.userChoice.choice1}, ${ffApp.userChoice.choice2}`);
  ffApp.animalCounter();
  ffApp.displayFriend();
}

// METHOD 3: Count user choice
ffApp.animalCounter = () => {
  // To count how many choice of each animal we have, we need to start the counter at 0. This needs to be globally accessible by another method (displayFriend) so prefix with ffApp
  ffApp.bearCount = 0;
  ffApp.rabbitCount = 0;
  // Then we use a loop to iterate through the ffApp object to count how many of each animal was selected
  for (i in ffApp.userChoice) {
    if (ffApp.userChoice[i] === `bear`) {
      ffApp.bearCount++;
    } else if (ffApp.userChoice[i] === `rabbit`) {
      ffApp.rabbitCount++;
      console.log(`animal counter: bear ${ffApp.bearCount}, rabbit: ${ffApp.rabbitCount}`)
    }
   }
  }

// Object.keys(test)
//   .filter(key => /alex/.test(key)
//     .forEach(key => console.log(key, test[key]));

// METHOD 4: Display new forest friend based on user's choice
//must add math.random
ffApp.displayFriend= () => {
  console.log(`display friend button pushed`);
  if (ffApp.bearCount > ffApp.rabbitCount) {
    $(`.display-friend-content`)
      .html(`<p>Your new forest friend is ${ffApp.animals.bear.name}</p>`)
      .append(`<img src='${ffApp.animals.bear.img}' alt='${ffApp.animals.bear.alt}'>`)
      .append(`<p>${ffApp.animals.bear.description}</p>`)
  } else if (ffApp.bearCount < ffApp.rabbitCount) {
    $(`.display-friend-content`)
      .html(`<p>Your new forest friend is ${ffApp.animals.rabbit.name}</p>`)
      .append(`<img src='${ffApp.animals.rabbit.img}' alt='${ffApp.animals.rabbit.alt}'>`)
      .append(`<p>${ffApp.animals.rabbit.description}</p>`)
  } else if (ffApp.bearCount === ffApp.rabbitCount) {
    //create a box to put new array and grab the values of animals objects and store them there
    const animalPropertiesArr = Object.values(ffApp.animals);
      console.log(animalPropertiesArr);
      //this will generate a random number of 0 or 1 that we need to store
    const randomAnimalChoice = Math.floor(Math.random() * animalPropertiesArr.length);
    if (randomAnimalChoice === 1) {
      $(`.display-friend-content`)
        .html(`<p>Your new forest friend is ${ffApp.animals.bear.name}</p>`)
        .append(`<img src='${ffApp.animals.bear.img}' alt='${ffApp.animals.bear.alt}'>`)
        .append(`<p>${ffApp.animals.bear.description}</p>`)
    } else {
      $(`.display-friend-content`)
      .html(`<p>Your new forest friend is ${ffApp.animals.rabbit.name}</p>`)
      .append(`<img src='${ffApp.animals.rabbit.img}' alt='${ffApp.animals.rabbit.alt}'>`)
      .append(`<p>${ffApp.animals.rabbit.description}</p>`)
    }
  } else { 
    $(`.display-friend-content`)
      .html(`<p>Please answer all the questions to find out who your new friend is.</p>`)
  }
}

// DOCUMENT READY
$(document).ready(function(){
  ffApp.init()
});
