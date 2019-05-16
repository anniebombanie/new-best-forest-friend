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
      description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, aut necessitatibus natus accusamus saepe, laborum distinctio aliquid, dolorem voluptatum culpa at? Ipsam obcaecati, cumque molestias iusto sed inventore perferendis dignissimos a dolorum esse consequuntur iure sunt tempore debitis exercitationem deserunt.`
    },
    {
      name: `rabbit`,
      url: `./../rabbit.jpg`,
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil alias quisquam quos assumenda ipsum voluptates dignissimos. Ex suscipit deserunt cupiditate, accusantium perferendis dolore perspiciatis culpa, ut aliquam, soluta sapiente.`
    }
];

/*
Logic Notes:

- Use.filter, .attr and.map to grab animals with correct name class.
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

}

// HELPER FUNCTIONS (METHODS)
forestFriendApp.scrollDown = () => {
  console.log(`button pushed`);
  //make sure scroll 100vh
}

forestFriendApp.captureVal = (e) => {
  e.preventDefault();
  //get the value of first question and store it in a variable
  const quest1 = $(`input[name=question1]:checked`).val();
  console.log(quest1);
  //get the value of second question and store it in a variable
  const quest2 = $(`input[name=question2]:checked`).val();
  console.log(quest2);
}

// const displayForestFriend = options;

$(document).ready(function(){
  forestFriendApp.init()
});
// Your new forest friend is: ${ }