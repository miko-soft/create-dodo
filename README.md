# create-dodo
> A good way to start a new project with the DoDo Framework.


# What is the DoDo Framework
The DoDo is easy to learn JavaScript framework which helps developers to build reactive applications
It can be used for dynamic web pages, electron desktop apps, browser extensions, mobile applications,   ...etc.

- one page (one route) applications - **appOne**
- single page applications - **spa**
- desktop applications (Windows, Linux, Mac) - **desktop-electronforge**
- chrome extensions - **extension-chrome**


Dodo Framework distinguishes itself by not relying on UI components, in contrast to Angular 2+, Vue, and React. Instead, it adopts a Model-View-Controller (MVC) architecture, setting it apart with a unique, simpler, and more flexible approach. The Dodo draws inspiration from Angular 1, shaping its conception in a manner reminiscent of this influential framework.

It's built in modern ES 6+ Javascript.

Find more at [http://dodo.mikosoft.info](http://dodo.mikosoft.info)


## How to start a new project ?
To initiate the development of a new Dodo Project, effortlessly follow these commands:
```bash
$ npm init dodo@latest
  -- enter project title, description, author name and choose boilerplate template

$ cd [project-name]

(when "One Page App" or "Single Page App" template is choosen)
$ npm run dev
  - Open your application in the browser by navigating to http://localhost:3001. The web page will automatically refresh with each code change.

(when "ElectronJS Desktop App" template is choosen)
$ npm run start
  - Electron app will be opened and refreshed on every change

(when "Chrome Extension" template is choosen)
$ npm run build
  - Build complete chrome extension ready for upload on chrome://extensions
```


## Boilerplate Templates
The DoDo Framework boilerplate templates are organized within the [https://github.com/miko-soft/create-dodo-boilerplates](create-dodo-boilerplates) repository, each residing in distinct branches.
Choose from a variety of code boilerplate templates to kickstart your project with Dodo:
- **One Page App** -- *appOne* - Start an One Page Application with a single controller and no routes. (OPA)
- **Single Page App** -- *spa* - Effortlessly begin building browser-based Single Page Application (SPA)
- **ElectronJS Desktop App** -- *desktop-electronforge* - Initiate the development of desktop applications using the Dodo framework with ElectronJS Forge integration. (DEA)
- **Chrome Extension** -- *extension-chrome* - Craft chrome extensions designed to operate within the Chrome browser. (ECA)
- *Cordova Mobile App* -- *mobile-cordova* - Quickly launch cross-platform mobile applications with Cordova and Dodo. (IN DEVELOPMENT)


## Documentation
Explore tutorials and examples on [http://dodo.mikosoft.info](http://dodo.mikosoft.info) for comprehensive learning and practical insights.


### Licence
Copyright (c) [MikoSoft](http://mikosoft.info) licensed under [MIT](./LICENSE).
