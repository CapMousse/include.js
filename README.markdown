# Include.js

**Include.js** is a tiny (800b minified and gziped) Javascript loader. It can load normal javascript files but is more efficient with **web modules**.

When it's possible, it will use async loading to speed up you page and will ensure the good executions of your script. It support **nested dependencies**, a useful feature to create clean and flexible javascript application.

Include.js was tested on :

- Chrome √
- Opera √
- Safari √
- IE √ (IE 7+)

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

Modules can also be loaded from other url, and named :

```javascript
include('App.Nasa', [['Rover', 'http://your/url/here/script/rover/'], 'App.Planet'], function(Rover, Planet){
  return {
    rover   : Rover.name,
    planet  : Planet.name,
    success : true 
  }
});
```


## Already using a script loader ?

If you already use a script loader you can replace it with **Include.js** without problemes and without rewriting code. `define()` and `require()` are supported by **Include.js**. Let's be light !

## Tests

Unit test are made with [Jasmine](http://pivotal.github.com/jasmine/) and can be run by launching `Tests/SpecRunner.html` on any browser.


## About

Created by [Jérémy Barbe](htt://www.shwaark.com)  
**Include.js** is distributed under the MIT license.