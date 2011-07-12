Require.js
==========
A tiny javascript loader with cache control.

How to
------
Simplely add *require.js* in your project and load it.

    require([
        'script1.js',
        ['other/js/script3.js', function(){ //do something extraordinary when this file is loaded}]
        ['other/js/script3.js', function(){ //do something extraordinary when this file is loaded}, 'OjectInFile']
    ], function(){
        //do something extraordinary when all files successfuly loaded
    });

Version
-------
#### 0.8
* Change : normalize file parameter (name, callback, waited object)
* Change : Speed up the core

#### 0.7
* Change : Drop complete callback
* Change : Perf and compression improvement
* Fix : Already loaded script can be reloaded

#### 0.6
* Change : rewrite 80% of the code. Now 1kb and 5b with gzip.
* Remove : strict and error parametters
* Fix : File object name not working properply
* Fix : Remove unused var

#### 0.5.3
* Bugfix : main function not runing (oups bug)
* Change : domLoad event checked at first run.

#### 0.5.2
* Bugfix : Require loading directly scripts, not after DOMCOntentLoaded event
* Bugfix : function call before they where created

#### 0.5.1
* Change compression method
* Remove call(this) due to IE bug

#### 0.5
* Added : Third (optional) parametter to files, the object to be loaded

* Bugfix : Complete not always called, even with all files loaded
* Bugfix : IE7 crash
* Bugfix : Infinite callback spam

* New : supported by Backbone.App

#### 0.4.2
* Remove : Template support due for non usable content. Use a real javascript templating systeme like Underscore templates.

* Bugfix : Strict mode can't be change on params
* Bugfix : Cache not working correctly
* Bugfix : Load fetch undefined files

* Change : validate with [jslint](http://www.jslint.com/)


#### 0.4.1
* Change : Error now receive 2 parameters : Event and File
* Change : Asyc mode is now an option

* Bugfix : template id not correct (like id="dir/to/the/template)
* Bugfix : template not loaded correctly
* Bugfix : strict mode always on

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
Created by [Jérémy Barbe](htt://www.shwaark.com) (c) 2011
require.js is distributed under the MIT license.