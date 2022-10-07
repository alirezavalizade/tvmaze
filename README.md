# Live demo

[Click here](https://glittery-bonbon-7e37d8.netlify.app/)

# Hey reviewer! This is the applications logic created by state machines

![app-logic-overview](./public/app-logic-overview.gif?raw=true)

## Tech stack - [live demo here](https://glittery-bonbon-7e37d8.netlify.app/)

### React

I chose react.js to start this project because I like the features and its built-in state management power by context and hooks, but really, there is no difference for me which library is used in the project. They all have their own pros and cons. It's like you ask someone, "Apple or Orange?":D They are both good!

### Tailwind CSS

I like Tailwind because it helps to not repeat yourself and really helps to build something faster. Love it! the only issue I see that is sometime the code get messy because of long class names but I like the power that it gives you. everything is built from scratch. created reusable components in ui directory like Button, Icon Button etc.

### xstate for logic

Using state machines to build the application logic I believe that the application logic should live outside of any UI components. Complexity is Xstate's breakfast :) its really easy to understand your code and lets you achieve something complex in an easy way. It resolved a lot of problems for me:

- resolve the difficulty of understanding any code with or without visualizer
- resolve the difficulty of enhancing any code that was created before (legacy code).
- visualizer: above you can see an example of inspector that you can use to see the exact state of your application. You can also interact with it.
- it makes testing easier.
- there won't be any bottom-up code!
- machines are documents! You don't need to write documents any more.
- it keeps the logic out of the components which makes easier to test your UI components as well!
- it's independent of any ui library and thanks to the use ful hooks you can have optimistic ui updates which helps to have better performance in your application because your app wont get re-renders and the virtual-dom wont start get diffing process.

NOTE: I let the inspector be active in the live application so that you can also see it live while working with the app.

### react-virtualized

Thanks for tvmaze data, the browser couldn't handle render longs lists :) that's why for long lists and data I choose virtualized list.

### Jest for testing

I included small test for machines. If I have more time I'd write more tests and cover all states and also components. Instead I decided to work on details :)

### framer-motion for animations

# Screenshot of the app

![app-screenshot](./public/screenshot.png?raw=true)
![app-screenshot](./public/filter.png?raw=true)
![app-screenshot](./public/show-detail.png?raw=true)
![app-screenshot](./public/no-result-found.png?raw=true)

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
