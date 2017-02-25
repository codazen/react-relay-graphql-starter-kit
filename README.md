React-Relay-GraphQL Starter Kit
======
This starter kit is a basic project setup that can be used to create web applications leveraging key core technologies.

Core technologies
------
* Frontend
  * [React](https://facebook.github.io/react/ "React")
  * [Relay](https://facebook.github.io/relay/ "Relay")
  * Routing
    * [react-router](https://github.com/ReactTraining/react-router "react-router")
    * [react-router-relay](https://github.com/relay-tools/react-router-relay "react-router-relay")
* Backend
  * [Node.js](https://nodejs.org/en/ "Node.js") / [Express](http://expressjs.com/ "Express")
  * [GraphQL](http://graphql.org/ "GraphQL")
* Testing
  * [Jest](https://facebook.github.io/jest/ "Jest")
  * [Enzyme](http://airbnb.io/enzyme/index.html "Enzyme")
  * [graphql-tools](http://dev.apollodata.com/tools/graphql-tools/ "graphql-tools")
  * [casual](https://github.com/boo1ean/casual "casual")
* Tools
  * [Webpack 2](https://webpack.js.org/ "Webpack 2")
  * [Babel](https://babeljs.io/ "Babel")
  * [Flow](https://flowtype.org/ "Flow")
  * [ESLint](http://eslint.org/ "ESLint")
  * [Yarn](https://yarnpkg.com/en/ "Yarn")

Extensions
------

Installation
------
```
yarn
```

Running
------
For Windows:
```
npm run update-schema
npm start
```
For Linux:
```
npm run update-schema
npm run start:linux
```
Go to http://localhost:8080/ to view the application.  
Go to http://localhost:8080/graphql to view GraphiQL.

Production Build
------
```
npm run build
```
Outputs the client bundle in the `public` directory  
Outputs the transpiled server code in the `lib` directory

License
------
MIT
