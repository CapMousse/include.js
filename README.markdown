Include.js
===

**Include.js** is a *javascript loader*. It can load normal javascript files but is more efficient with **web modules**.

**Include.js** don't work like other javascript load, such as RequireJS, LABjs...

- It's a light javascript file, speed up page loading !
- It provide only one method to do all the work `include()`: define module, load scripts …
- It's for browser, not for server such as *Node.js*

How to
------
First, add **Include.js** to your project.

Then create your *module*, here named `User/Profil`:
```javascript
include(
  'User/Profil', //name of the module
  [
    'User/Interface',  //
    'User/Security',   // dependencies
    'User/Api'         //
  ], 
  function(Interface, Security, Api){  //
    return {                           //
      Interface : new Interface,       // module
      Security : new Security,         //
      Api: new Api                     //
    };                                 //
  }
);
```

Now, on your page, juste load it with other module !

```javascript
include([
    'User/Profil',
    'User/Account',
    'Sidebar/Search'
], function(profil, account, search){
    //do something extraordinary when all files successfuly loaded
});
```

Each file can have multiple dependencies. Include.js will automaticly load them and wait until all is ready before launching your code !


Tests
-----
Unit test are made with [Jasmine](http://pivotal.github.com/jasmine/) and can be run by launching SpecRunner.html on any browser.


Version
-------

#### 2.0
* Completely rewrite the code
* Support Web Module definition
* Real dependencies support
* Create unit test

About
-----
Created by [Jérémy Barbe](htt://www.shwaark.com) (c) 2011  
**Include.js** is distributed under the MIT license.