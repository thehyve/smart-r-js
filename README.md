# SmartR JS 

SmartR-JS is an Angular JS plugin version of SmartR (https://github.com/transmart/SmartR) which currently works well with transmart-base-ui (https://github.com/thehyve/transmart-base-ui). 

# Getting Started

To get you started you can simply clone this repository and install the dependencies:

## Prerequisites

You need git to clone this repository. You can get git from http://git-scm.com/.
We also use a number of node.js tools to initialize and test. You must have node.js and its package 
manager (npm) installed. https://docs.npmjs.com/getting-started/installing-node 

## Clone repository

Clone this repository using git:

git clone https://github.com/thehyve/smart-r-js.git
```bash
$ cd smart-r-js
```

## Development
Run following from the project root

- Install tools
```
$ npm install 
```
- Install libs
```
$ bower install 
```

## Building and Testing

* `gulp build` to build an optimized version of your application in `/dist`
* `gulp test` to launch your unit tests with Karma

## Usage

To install smart-r-js as component in other angular web app, you can bower install it with command below

```bash
$ bower install --save-dev thehyve/smart-r-js
```

The component is installed, and make sure file is loaded in the html header to load the script. We also have to add the 
component's module as a dependency to our app's main list of dependencies. Open up the JavaScript file defining your 
top-level app, and add the following:

```js
angular.module('myApp', [
  // ...
  'smartRApp'
]).
config(function () {
  // ...
```
