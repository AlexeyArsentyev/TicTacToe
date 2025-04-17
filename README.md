To run tests:
npm install
npm run test

To run the program:
npm install
npm start

First, I transfered the whole project to Typescript. Just by itself it allows to eliminate a significant chunk of errors, such as missing props and wrong types of variables passed.

I improved the original game design, just made it more pleasent to play. Added a name form and a reset button that returns you to the name selection screen.

For testing I used Jest + React testing library. Pretty basic stack, its simple and works reliably, exactly what i need.

In tests, I covered:

-Form rendering before the start of the game, the game itself after the form is submitted. It's pretty much necessary to check if the main layout is displayed properly.

-Squares and all interactions with them. When pressed, they should call the appropriate function and update. Its also important to check when they should not update, for example when the game is finished, another player cant make a move.

-Function that scans the board and determines the winner if there is any. The most important part of any game, let's be honest, so we test a lot of possible scenarios. (I could have made an algorithm that would cover all of them, but that's a bit redundant)

-Names being set and updated correctly, especially after a restart for example. If user doesnt enter the name, the default one is set. Names are kept between game with a possibility of change. This allows to just press Start to begin a new game and not interupt the flow.

-History features by simulating a small game. When user goes back and changes his turn, history and board should update correctly. There is still ptentially a room for error, more comprehensive test should be done in future, because this one includes only one scripted scenario.

What SHOULD be done later:

-More edge case tests, for example, if both players are winning at the same time, a Draw should be returned. (It could be possible if the game would be multiplayer and we will receive a syncing error for example)

-If the project grows bigger, snapshot and end-to-end testing could be beneficial.

Thank you for reading all of this :)
