# Include.js [![Build Status](https://travis-ci.org/CapMousse/include.js.svg?branch=master)](https://travis-ci.org/CapMousse/include.js)

**Include.js** is a tiny (1,3ko minified and gziped) Javascript loader. It can load normal javascript files or css but is more efficient with **web modules**.

When it's possible, it will use async loading to speed up you page and will ensure the good executions of your script. It support **nested dependencies**, a useful feature to create clean and flexible javascript application.

Include.js was tested on :

- Chrome √
- Firefox √
- Opera √
- Safari √
- IE (> 6) √

## Define modules

In the old javascript days, to create a module, you would add a simple wrapper on your code, like a auto-called anonymous functiom.

```javascript
(function(env){
  //your code here
})(window);
```

Now, to define a module meeting the [AMD standard](http://requirejs.org/docs/whyamd.<html id="definition"></html>), just use `include()` as the wrapper of your code.

With AMD definition, you can create module having dependencies realy easily, executing code only when the dependencies are available.

```javascript
//define a new module with include
include(['dep1', 'dep2'], function (dep1, dep2) {

  //define the module value with return
  return dep2({
    name: dep1('Mars Curiosity')
  });
});
```

## Named modules

Modules without a name are automatically named with their file name. This is what makes modules very portable and easily usable in others projetcs.

Naming module manually must be avoided to prevent conflicts or loading missing module. Only use module naming in controlled cases or for better performances.

```javascript
//define a named module with dependencies
include('name', ['dep1', 'dep2'], function (dep1, dep2) {
  return dep2({
    name: dep1('Mars Curiosity')
  });
});
```

## External dependencies

You can also load external dependencies, useful to speed up website loading time and prevent parsing to be blocked.

External dependencies can be AMD module or normal javascripts. If no module is found, argument send to the callback will be the index of the script in the dependencies array instead of the module function.

```javascript
include(['//website/jquery.js', '//website/amd-module.js'], function (indexOfJquery, amdModule) {
  $('#block').text(amdModule());
});
```

## Load CSS

You can also load css like any other module. The callback will be called when the browser will have parsed the style.

```javascript
include(['/styles/alternative.css', '//website/external-css.js'], function (css1, css2) {
  //css1 and css2 will be null
});
```

## Already using a script loader ?

If you already use a script loader you can replace it with Include.js without problemes and without rewriting code. `define()` and `require()` are supported by Include.js. Let's be light !


## Developed by

- Jérémy Barbe
  - echo@jeremy.sh
  - [jeremy.sh](http://jeremy.sh)
  - [@capitainemousse](https://twitter.com/capitainemousse)

## License

See LICENSE file