#History

## 2.3.0 / 2013-12-20

- [refactoring] Remove all trailing `/` for global var `DIR`



## 2.2.5 / 2013-12-17

- [update packages] `node.class`->1.1.4



## 2.2.4 / 2013-12-17

- [update packages] `node.class`->1.1.3



## 2.2.3 / 2013-12-16

- [update packages]  `request`->2.30.0



## 2.2.2 / 2013-12-12

- [update packages] `cli-color`->0.2.3, `inflection`->1.3.2, `node.class`->1.1.1, `node.flow`->1.2.3, `request`->2.29.0, `node.extend`->1.0.8, `should`->2.1.1



## 2.2.1 / 2013-6-2

- [update packages] `cli-color`->0.2.2, `inflection`->1.2.6, `node.flow`->1.2.2, `request`->2.21.0, `node.extend`->1.0.7, `should`->1.2.2



## 2.2.0 / 2012-10-8

- [refactoring] For name confict, switch `typeof` back to `is`



## 2.1.7 / 2012-09-27

- [update packages] `should`->1.2.0
- [bug fix] Typo in generator



## 2.1.6 / 2012-09-17

- [bug fix] Handler context scope



## 2.1.5 / 2012-09-16

- [refactoring] Add error handling detail



## 2.1.4 / 2012-09-16

- [bug fix] Exit on error



## 2.1.3 / 2012-09-16

- [new feature] Add merge fn to `utils`



## 2.1.2 / 2012-09-14

- [bug fix] Standalone test runner



## 2.1.1 / 2012-09-14

- [refactoring] Add detail error msg



## 2.1.0 / 2012-09-13

- [bug fix] Action context scope
- [refactoring] Does not need to call out manually



## 2.0.4 / 2012-09-13

- [refactoring] Pretty print json in `fixture`
- [bug fix] Nested params in `build_uri`



## 2.0.3 / 2012-09-12

- [bug fix] Add missing `fixture` to utils



## 2.0.2 / 2012-09-12

- [bug fix] `routes` should be `actions` in configs
- [bug fix] Remove useless packages



## 2.0.1 / 2012-09-12

- [bug fix] Wrong generator format



## 2.0.0 / 2012-09-12

- [refactoring] New project structure, split request & response in different files



## 1.1.1 / 2012-08-23

- [refactoring] Update logger color



## 1.1.0 / 2012-08-14

- [new feature] Automatically add `routes->methods` mapping log



## 1.0.1 / 2012-07-23

- [update packages] inflection->1.2.2, node.flow->1.1.3, should->1.0.0
- [refactoring] Use `fs` instead of `path` for node v0.8.x



## 1.0.0 / 2012-07-19

- [update packages] node.flow->1.1.2



## 0.6.1 / 2012-07-14

- [refactoring] Update generator for array of routes to excute



## 0.6.0 / 2012-06-22

- [new feature] Take array of routes to excute all tests at once
- [refactoring] UTILS.typeof


## 0.5.1 / 2012-05-25

- [bug fix] Custom routes



## 0.5.0 / 2012-05-14

- [new feature] Add uid & ran_no to utils
- [new feature] Multi-routes support
- [update packages] should->0.6.3, request->2.9.202


## 0.4.0 / 2012-05-10

- [new feature] Add uid & ran_no to utils
- [update packages] should->0.6.3, request->2.9.202



## 0.3.0 / 2012-04-30

- [refactoring] Rename UTILS.is to UTILS.typeof and returns lowercased string instead



## 0.2.1 / 2012-04-16

- [update packages] infletion->1.2.0



## 0.2.0 / 2012-04-16

- [new feature] New regex in utils



## 0.1.0 / 2012-04-11

- [bug fix] Wrong package name in generator
- [new feature] Generate action map in routes as well



## 0.0.4 / 2012-04-10

- [bug fix] Missing args in init generator



## 0.0.3 / 2012-04-10

- [bug fix] Typo
- [bug fix] Missing slash in configs.js
- [bug fix] Missing slash in index.js
- [bug fix] Error handle in route builder
- [bug fix] Missing http protocol in config
- [bug fix] Generator prefix
- [bug fix] Missing module in generator and template syntax tuning
- [refactoring] Rename cli tool `init` to `new`



## 0.0.2 / 2012-04-09

- [bug fix] Wrong generators in bin file



## 0.0.1 / 2012-04-09

  - Initial release
