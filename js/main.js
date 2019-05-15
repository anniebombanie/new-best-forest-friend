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


Logic Notes:

- Use.filter, .attr and.map to grab animals with correct name class.
- Function to say that if .bear.length > .rabbit return .bear
  - If class A.length === class.B.length return random
  */


  

// Your new forest friend is: ${ }