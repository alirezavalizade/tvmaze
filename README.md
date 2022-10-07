# Application overview

![app-logic-overview](./public/app-logic-overview.gif?raw=true)

## Tech stack

### React

I chose react.js to start this project because I like the features and its built-in state management power by context, but really, there is no difference for me which library is used in the project. They all have their own pros and cons. It's like you ask someone, "Apple or Orange?":D They are both good!

### Tailwind CSS

I like Tailwind because it helps to not repeat yourself and really helps to build something faster. Love it! the only issue I see that is sometime the code get messy because of long class names but I like the power that it gives you.

### xstate

Using state machines to build the application logic I believe that the application logic should live outside of any UI components. Complexity is Xstate's breakfast :) its really easy to understand your code and lets you achieve something complex in an easy way. It resolved a lot of problems for me:

- resolve the difficulty of understanding any code with or without visualizer
- resolve the difficulty of enhancing any code that was created before (legacy code).
- visualizer: above you can see an example of inspector that you can use to see the exact state of your application. You can also interact with it.
- it makes testing easier.
- there won't be any bottom-up code!
- machines are documents! You don't need to write documents any more.
- it keeps the logic out of the components which makes easier to test your UI components as well!

NOTE: I let the inspector be active in the live application so that you can also see it live while working with the app.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
