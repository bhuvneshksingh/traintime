

### `npm install`

## Available  npm scripts

### `npm run build-css`

Find all scss files and build from them css.

### `npm run watch-css`

Find all scss and monitors all the changes in them after gerate new css files automatically.

### `npm run start`

Run the app in development mode using webpack dev server and babel.

### `npm run dev-start`

Run the app in development mode using react scripts (without babel)

### `npm run start:dev`

Run the app in development mode using react scripts (without babel)

### `npm run build`

Build css and production bundle - (collects all codes into one )

### `npm run precommit`

It formates code before the commit happens with a help of ES Lint and Prettier

### `npm run storybook`

Run storybook

### `npm run build-storybook`

Build storybook

 ---------------

#h1dependencies :#h1

material-ui, react redux, react router, react thunk.

#h1dev-dependencies: #h1
babel, storybook, ESLint, Webpack

Project structure: 
⋅⋅* Unordered sub-list. 

1..storybook
2..public
3..src
..1. ordered list
actions,= redux actions
api, = javascript files to connect to api server
app, = page of the site, all pages of the site
assets, = media files, icons, pictures, 
components, = components that are used to build/create pages 
icons, = customs svg icons 
middlware, = middleware for react, redux
reducers, = react reducers
scss, = global styles 
stories, = storybook pages
utils, = various filters, all **javascript** files that are not directly connected to components on pages can be stored here. 

#h1 git branch model #h1
root master, working production code
later on branch for development = there will be current development version of site

-----------------------------------------------------------------------------

account-banner = on the main page it is shown as let's create your own event and let's people help to find you
to find exact information from the website i need to go to postman and find in selected department the text
---------------------------------

#h1 how to make changes on the website #h1

there is another server now called"sport-app-server" there we can find all the content and we can make changes. 
so example account-banner from the main screen "let's help people to find you"

from postman i go to right search window and change settings from AWS to local and than search in API queries and there search based on the group. "in our case service get default service data" and press send to see in postman changes. 

from here i need to make git commit in VS code of the server 
than send it to bitbucket which i start through mobaxterm where i type git pull in order to get changes from another server/ VScode folder 
and than i start the server in my sport-app VS code. and i also need to type npm start in Mobaxterm.

sport-app-server, that represents for us our back-end 

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

--------------------------------------------------------------

how is organized data-flow. 
first launch of an App = in file tab-item.js we create Store, than we initialize (state with data{current user location data} in Store ). Initialization of {current user location} is effectuated through async actions. Then we grab the data and send them to Home page. 

Each page in the folder of APP appears as a smart component . Smart component is to be understood, that works with Redux, where there is a business logic of work. Smart component send actions. Smart component can save (states). 
