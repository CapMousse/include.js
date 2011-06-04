Require.js
==========
A tiny javascript/javascript template loader with cache control.

How to
------
Simplely add *require.js* in your project and load it.

    require({
        files : [
            'script1.js',
            'template.tpl',
            ['other/js/script3.js', function(){ //do something extraordinary when this file is loaded}]
        ],
        success : function(){
            //do something extraordinary when all files successfuly loaded
        },
        //optional
        complete : function(){
            //do something extraordinary when all files parsed
        },
        //optional
        error : function(){
            //do something bad when a file can't be loaded
        },
        //optional
        strict : true //two files with same name can't be loaded. Even in different dir.
    });

Version
-------
#### 0.4
* Added : you can now load .tpl files

* Bugfix : crash on IE7
* Bugfix : can't use multiple time require
* Bugfix : files loaded 2 times

#### 0.3
* Added : file can now have a specific callback
* Added : complete, success, error callback

* Bugfix : ie crash
* Bugfix : sometime callback lauched even if a file is not loaded

#### 0.2
* Bugfix : cache not working properply
* Added : strict mode: file test.js is not like test/test.js

#### 0.1
* First release

About
-----
Created by Jérémy Barbe (c) 2011
require.js is distributed under the MIT license.