# create-dodo
> A good way to start single page application (SPA) project with the DoDo Framework.


# What is the DoDo Framework
The DoDo is easy to learn JavaScript framework which helps developers to build reactive, single page applications.

It can be used for dynamic web pages, electron desktop apps, browser extensions, mobile applications,   ...etc.

Dodo Framework distinguishes itself by not relying on UI components, in contrast to Angular 2+, Vue, and React. Instead, it adopts a Model-View-Controller (MVC) architecture, setting it apart with a unique, simpler, and more flexible approach. The Dodo draws inspiration from Angular 1, shaping its conception in a manner reminiscent of this influential framework.

It's built in modern ES 6+ Javascript.

Find more at [http://dodo.mikosoft.info](http://dodo.mikosoft.info)


## How to start a new project ?
To initiate the development of a new Dodo Project, effortlessly follow these commands:
```bash
$ npm init dodo
  -- enter project title, description, author name and choose boilerplate template

$ cd [project-name]

(when "spa" template is choosen)
$ npm run dev
  - Open your application in the browser by navigating to http://localhost:3001. The web page will automatically refresh with each code change.

(when "desktop-electronforge" template is choosen)
$ npm run start
  - Electron app will be opened and refreshed on every change
```
Access your application in the browser at http://localhost:3001 .


## Boilerplates
The DoDo Framework boilerplate templates are organized within the [https://github.com/miko-soft/create-dodo-boilerplates](create-dodo-boilerplates) repository, each residing in distinct branches.
Choose from a variety of code boilerplate templates to kickstart your project with Dodo:
- **spa** -- *Single Page App* - Effortlessly begin building browser-based Single Page Application (SPA)
- **desktop-electronforge** -- *ElectronJS Desktop App* - Initiate the development of desktop applications using the Dodo framework with ElectronJS Forge integration.
- *extension-chrome* -- *Chrome Extension* - Craft Chrome Extensions designed to operate within the Chrome browser. (IN DEVELOPMENT)
- *mobile-cordova* -- *Cordova Mobile App* - Quickly launch cross-platform mobile applications with Cordova and Dodo. (IN DEVELOPMENT)


## Documentation
Explore tutorials and examples on [http://dodo.mikosoft.info](http://dodo.mikosoft.info) for comprehensive learning and practical insights.


### Licence
Copyright (c) [MikoSoft](http://mikosoft.info) licensed under [MIT](./LICENSE).
