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

//ARRAY OF POSSIBLE QUIZ RESULTS
const animals = [
  {
    name: `bear`,
    url: `./../bear.jpg`,
    description: `bear lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sunt quia mollitia, eum corrupti alias inventore, dolorem consectetur labore iure ipsam, cumque doloremque dolores unde maiores ad officiis eaque itaque.`
  },
  {
    name: `rabbit`,
    url: `./../rabbit.jpg`,
    description: `rabbit lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil alias quisquam quos assumenda ipsum voluptates dignissimos. Ex suscipit deserunt cupiditate, accusantium perferendis dolore perspiciatis culpa, ut aliquam, soluta sapiente.`
  }
];

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

const forestFriendApp = {};
//use one submit button to capture all the values and then use if else to sort and filter

forestFriendApp.init = () => {

  $(`.btn-scroll`).on(`click`, forestFriendApp.scrollDown);
  $(`input[type=submit]`).on(`click`, forestFriendApp.captureChoice);
  $(`input[type=submit]`).on(`click`, forestFriendApp.counter);
}

// METHOD 1: Scroll down when button is clicked
forestFriendApp.scrollDown = () => {
  console.log(`button pushed - scroll down`);
  window.scrollBy(0, window.innerHeight / 2)
}

// METHOD 2: Capture user choice
forestFriendApp.captureChoice = (e) => {
  //prevent default behaviour of submit button
  e.preventDefault();
  //get user's choice and store as new array value in forestFriendApp
  forestFriendApp.choice1 = $(`input[name=question1]:checked`).val();
  forestFriendApp.choice2 = $(`input[name=question2]:checked`).val();
  console.log(forestFriendApp.choice2, forestFriendApp.choice2);
}

// METHOD 3: Counter
// To count how many choice of each animal we have, we need to start the counter at 0
forestFriendApp.counter = () => {
  let bearCount = 0;
  let rabbitCount = 0;
  // Then we use a loop to iterate through the forestFriendApp object to count how many of each animal was selected
  for (key in forestFriendApp) {
    if (forestFriendApp[key] === `bear`) {
      bearCount++
      console.log(bearCount);
    } else if (forestFriendApp[key] === `rabbit`) {
      rabbitCount++
      console.log(rabbitCount);
    }
  };
}

$(`input[type=submit]`).on(`click`, forestFriendApp.displayFriend)
//capture users choice and store in an array
//look into the app and filter for the largest array
// return that array as a result
// if array are draw, pick a random result from the drawn items
// forestFriendApp.filterChoice = (usersChoice) => {
//   for (let i = 0); i < usersChoice; i++) {

//   }


forestFriendApp.displayFriend= () => {
  console.log(`button pushed - show new friend`);
  $(`.display-friend-content`)
    .html(`<p>Your new forest friend is ${animals.name}</p>`)
    .append(`<p>${animals.description}</p>`)
}

// DOCUMENT READY
$(document).ready(function(){
  forestFriendApp.init()
});


/*

const App = {
  choice1: 'bear',
  choice2: 'bear',
  choice3: 'rabbit',
  choice4: 'owl',
  choice5: 'rabbit'
}

let bear = 0,
    rabbit = 0,
    other = 0

for (key in App) {
  if (App[key] === 'bear') {
    bear++
  } else if(App[key] === 'rabbit') {
    rabbit++
  } else {
    other++
  };
}

*/