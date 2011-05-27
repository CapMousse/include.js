Require.js
==========
A tiny javascript loader with cache control.

How to
------
Simplely add *require.js* in your project and load it.
To use it simplery add ```require('your/file.js', callback())```
To load mutiple script, send and array like:
```
require([
    'script1.js',
    'js/script2.js',
    'other/js/script3.js
],function(){
    //do something extraordinay
});
```

Version
-------
#### 0.2
* Bugfix : cache not working properply
* Added : strict mode: file test.js is not like test/test.js

#### 0.1
* First release

About
-----
Created by Jérémy Barbe (c) 2011
require.js is distributed under the MIT license.