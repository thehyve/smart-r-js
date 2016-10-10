# Base UI Component Seed

This project is an application skeleton for a typical AngularJS reusable component with Angular 1.x. You can use it to 
quickly bootstrap your component projects. The seed contains a sample AngularJS component and is preconfigured to 
install the Angular framework and a bunch of development and testing tools for instant web development gratification.


# Getting Started

To get you started you can simply clone this repository and install the dependencies:

## Prerequisites

You need git to clone this repository. You can get git from http://git-scm.com/.
We also use a number of node.js tools to initialize and test. You must have node.js and its package 
manager (npm) installed. https://docs.npmjs.com/getting-started/installing-node 

## Clone repository

Clone this repository using git:

git clone https://github.com/thehyve/base-ui-component-seed.git
```bash
$ cd base-ui-component-seed
```
If you just want to start a new project without commit history and with your own project name, then you can do:
```bash
$ git clone --depth=1  https://github.com/thehyve/base-ui-component-seed.git <your-project-name>
```
The `depth=1`  tells git to only pull down one commit worth of historical data.

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

This skeleton already has a working and ready to use sample component. To install this component in other web app, you 
can bower install like this

```bash
$ bower install thehyve/base-ui-component-seed
```

or if you have it as new project in different name:

```bash
$ bower install <your-project-name>
```

The component is installed, and make sure file is loaded in the html header to load the script. We also have to add the 
component's module as a dependency to our app's main list of dependencies. Open up the JavaScript file defining your 
top-level app, and add the following:

```js
angular.module('myApp', [
  // ...
  'ts.my-module'
]).
config(function () {
  // ...
```

Use the sample component in your project view:

```html
<my-component></my-component>
```

You are supposed to see following label rendered in your app:
### MY COMPONENT


## Register as bower component

Registering your package allows others to install it with a short name, like bower install <my-package-name>.

To register a new package:

- The package name must adhere to the bower.json spec.
- There must be a valid bower.json in the project’s root directory.
- Your package should use semver Git tags. The v prefix is allowed.
- Your package must be publically available at a Git endpoint (e.g., GitHub). Remember to push your Git tags!
- For private packages (e.g. GitHub Enterprise), please consider running a private Bower registry.
- Then use bower register:

```bash
$ bower register <your-project-name> <git-endpoint>
# for example
$ bower register example git://github.com/user/example.git
```

Now anyone can run bower install <your-project-name>, and get your library installed. The Bower registry does not have 
authentication or user management at this point in time. It’s on a first come, first served basis.

# References:

- https://docs.angularjs.org/guide
- https://docs.npmjs.com/
- https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
- https://bower.io/docs/creating-packages/
