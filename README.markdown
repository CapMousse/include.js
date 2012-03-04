Include.js
==========
A tiny but heavy on-demand async javascript loader (0.4k gziped)

How to
------
Simply add *Include.js* in your project and load it.

```javascript
include([
    'script1.js',
    'stylesheet.css',
    ['other/js/script3.js', function(){ "do something extraordinary when this file is loaded" }],
    ['other/css/stylesheet2.css', function(){ "do something extraordinary when this file is loaded" }],
    ['other/js/script3.js', function(){ "do something extraordinary when this file is loaded and the waited object is ready" }, 'ObjectInFile'],
    ['other/js/script4.js', function(fn){
      "Tell include.js when I'm done doing something extraordinary";
      //See, now we can handle dependencies
      include('other/js/script4sbestfriend', fn);
      //Now, once script4 is loaded, script4's best friend, who depends on script4 can be loaded too
      //...and once it's done loading, it will signal to its parent by running fn
    }]
], function(){
    //do something extraordinary when all files successfuly loaded
});
```

Version

#### 1.1.1
* Drop **cache** to prevent bug
* Fix callback file not workign
* Fix CSS doesn't trigger Onload/OnreadyStateChange
* Fix Object checking crash

#### 1.1.0
* Add CSS load support

#### 1.0.7
* Fix var
* Change compressor to UglifyJS

#### 1.0.6
* Fix : file callback call multiple time (IE9, Opera)
* Fox : domReady cpu intensive (return to old version)

#### 1.0.5
* Fix : File callback not called

#### 1.0.4
* Fix : Domready not realy waiting the dom to be ready

#### 1.0.3
* Fix : file array parsing prototype and try to load unknown files

#### 1.0.2
* Fix : Change callback check to older version (thanks mbarkhau)
* Fix : Change file load state condition to match expression

#### 1.0.1
* Fix : crash if no file callback specified
* Fix : IE8 Crash 
* Change : reduce file size

#### 1.0
* Change : project is now called *Include.js*
* Change : reduce file size

#### 0.9
* Fix : huge crash in IE8 & before
* Change : Move huge part of code
* Change : file size
* Change : remove unsused vars
* Change : remove return

#### 0.8.2
* Change : perf & compression improvement

#### 0.8.1
* Change : change method to test if object exists
* Change : File callback is called even if file is in cache

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
include.js is distributed under the MIT license.