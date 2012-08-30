# Include.js

Include.js is a Javascript loader. It can load normal javascript files but is more efficient with **web modules**.

It don't work like other javascript load, such as RequireJS, LABjs...

1. It's a light javascript file, **800Kb Gziped and compressed with Closure Compiler**, speed up page loading !
2. It provide only **one method** to do all the work `include()`: define module, load scripts …
3. It's **for browser**, not for server such as *Node.js*

. Chrome ................... √
. Opera .................... √
. Safari ................... √
. IE ....................... √ (IE 7+)

## How to use

To create a module, create a new javascript file and use `include()` as a wrapper :

```javascript
include(function(){
  return {
    name : "Mars Curiosity"
  }
})
```

You can name your module with the first argument of `include()`.  Name are like `PHP` namespace : `Dir/FileName.js` -> `Dir.FileName`

```javascript
include('App.Planet', function(){
  return {
    name      : "Mars",
    gravity   : 0.376,
    saletties : 2
  }
})
```

Modules can use dependencies to work, as an array on second place on `include()` :

```javascript
include('App.Nasa', ['App/Rover.js', 'App.Planet'], function(Rover, Planet){
  return {
    rover   : Rover.name,
    planet  : Planet.name,
    success : true 
  }
});
```

## Tests

Unit test are made with [Jasmine](http://pivotal.github.com/jasmine/) and can be run by launching `Tests/SpecRunner.html` on any browser.


## About

Created by [Jérémy Barbe](htt://www.shwaark.com)  
**Include.js** is distributed under the MIT license.