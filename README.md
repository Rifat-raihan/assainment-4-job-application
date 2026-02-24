1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

answer:--
getElementById  gets one element by id.
getElementsByClassName  gets all elements with that class.
querySelector  gets first match using CSS selector.
querySelectorAll  gets all matches.

2. How do you create and insert a new element into the DOM?
answer:--

I use createElement(), set text, then use append().

3. What is Event Bubbling? And how does it work?
answer:--
Event goes from child to parent.
Click on button  it also triggers div and body.

4. What is Event Delegation in JavaScript? Why is it useful?
answer:--

Instead of adding event to every child, I add one event to the parent.
When I click a child, the parent handles it.

It’s easier and I don’t need to write many event listeners.


5. What is the difference between preventDefault() and stopPropagation() methods?
answer:--
preventDefault() stops default action.
stopPropagation() stops the event from going to parent.