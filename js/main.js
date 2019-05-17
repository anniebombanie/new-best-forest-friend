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

//Store quiz results in a array filled with objects
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
  $(`input[type=submit]`).on(`click`, forestFriendApp.captureVal);
  
  $(`input[type=submit]`).on(`click`, forestFriendApp.displayFriend)
}

// HELPER FUNCTIONS (METHODS)
forestFriendApp.scrollDown = () => {
  console.log(`button pushed - scroll down`);
  window.scrollBy(0, window.innerHeight / 2)
}

forestFriendApp.captureVal = (e) => {
  e.preventDefault();
  //get the value of questions and store in a new key in forestFriendApp
  forestFriendApp.q1 = $(`input[name=question1]:checked`).val();
  console.log(forestFriendApp.q1);
  //get the value of second question and store it in a variable
  forestFriendApp.q2 = $(`input[name=question2]:checked`).val();
  console.log(forestFriendApp.q2);
}

forestFriendApp.storeVal = () => {

}

forestFriendApp.displayFriend= () => {
  console.log(`return friend`);
  $(`.display-friend-content`)
    .html(`<p>Your new forest friend is ${animals.name}</p>`)
    .append(`<p>${animals.description}</p>`)
}

$(document).ready(function(){
  forestFriendApp.init()
});
