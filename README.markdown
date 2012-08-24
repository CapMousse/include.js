Include.js
==========

Include.js is a javascript loader. It can load normal javascript files but is more efficient with modules. With it small size (0,7kB gziped), your page will load faster and provide you a powerfull tool to create good and clean code.

Include don't work like other load, such as RequireJS, LABjs... Include provite only one method to do all the work : `include()`. You define modules, load modules and name modules with only one method.


How to
------
Simply add *Include.js* in your project and use it.

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

Example for `User/Profil` :
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

Tests
-----
Unit test are made with [Jasmine](http://pivotal.github.com/jasmine/) and can be run by launching SpecRunner.html on any browser.


Version
-------

#### 2.0-alpha
* Completely rewrite the code
* Support Web Module definition
* Real dependencies support

About
-----
Created by [Jérémy Barbe](htt://www.shwaark.com) (c) 2011
include.js is distributed under the MIT license.