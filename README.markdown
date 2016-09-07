# Include.js [![Build Status](https://travis-ci.org/CapMousse/include.js.svg?branch=master)](https://travis-ci.org/CapMousse/include.js)

**Include.js** is a tiny (1,2ko minified and gziped) Javascript loader. It can load normal javascript files or css but is more efficient with **web modules**.

When it's possible, it will use async loading to speed up you page and will ensure the good executions of your script. It support **nested dependencies**, a useful feature to create clean and flexible javascript application.

Include.js was tested on :

- Chrome √
- Opera √
- Safari √
- IE (> 6) √

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

Modules can have dependencies to work, as an array on second argument off `include()` :

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

And you can load CSS 
```javascript
include('path/to/css.css', function(){
  //do something when style is apply
})
```


## Already using a script loader ?

If you already use a script loader you can replace it with **Include.js** without problemes and without rewriting code. `define()` and `require()` are supported by **Include.js**. Let's be light !


## Developed by

- Jérémy Barbe
  - [jeremy.sh](http://jeremy.sh)
  - [@capitainemousse](https://twitter.com/capitainemousse)


Created by [Jérémy Barbe](http://jeremy.sh)  
**Include.js** is distributed under the MIT license.

## License

See LICENSE file