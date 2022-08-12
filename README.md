# React Project Change Your Car - Antoan Petrov

This is a small website where people can share sell or buy cars.
Using React for Front-end, Firebase for Back-end and HTML & CSS for UI

# Info and functionalities:

## Components:

- Authentication component - contains Login, Register and Profile components
- Cars component - contains CarItem, Create, Edit and list of all cars
- Cart component
- Home component
- Layout component - contains Header and Footer components
- UI component - Card, Input, Modal, PageNotFound
- Storage - Auth Context, Cart Context, Cart Provider, URLs

## Permissions

### Guests:

Can see all post of users, check their details and add them to cart.

They can login or register.

### Logged-in/Rigistered Users:

Can post cars.

Can see all of their posts in their profile.

In their profiles owners can edit or delete their posts.


## Paths:

- POST - Signing up - /register - ('username', 'email', 'password', 'rePassword') - Guests
- POST - Signing in - /login - ('email', 'password') - Guests
- POST - Logging out - /logout -  - Logged in users
- GET - Get all posts - /cars-catalog - - Guests and Users
- POST - Share new post - /create-post - 'name', 'imageUrl', 'description', 'price' - Logged in users
- GET - See post details - /details/:carId - - Guests and Users
- PUT - Edit own posts details - /edit/:carId - 'name', 'imageUrl', 'description', 'price' - Logged in users (owner of post)
- PUT - Add to cart - /cars-catalog - Guests and Users (can add more then one cars, including their own)
- DELETE - Delete a post - /profile - Owner of posts
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Sources
for loading spinner : https://contactmentor.com/how-to-add-loading-spinner-react-js/
