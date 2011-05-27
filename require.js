//     require.js 0.1
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

(function(){
    
    //check if already defined
    if(window.require)
        return;

    // Initial Setup
    // -------------
    var require,
        scripts = document.getElementsByTagName('script'),
        body = document.body,
        cache = {},
        queue = {},
        endFunc = function(){},
        scriptCounter = 0,
        loadedCounter = 0,
        strictFiles = false;
        
    /*
    * require
    * Load all files list in object
    * @param arr : array of file
    * @param fnc : callback when all files are loaded
    * @param strict optional : if true, file this/path.js != path.js
    * @return Require
    */   
    require = function(arr, fnc, strict){
        var windowLoad = window.onload || function(){};
        
        strictFiles = strict || false;
        
        window.onload = function(){
            windowLoad();
            
            arr = arr.push() ? arr : [arr];
            endFunc = fnc;
            
            for(var j in scripts){                
                if(scripts[j].src){
                    cache[getName(scripts[j].src)] = j;
                }
            }
            
            for(var i in arr){
                var script = getName(arr[i]);
                
                if(cache[script] || queue[script]) continue;
                
                create(arr[i], i);
                scriptCounter++;
            }
            
            if(scriptCounter === 0)
                endFunc();
       };
    };
    
    /*
     * function create
     * create a script node with asked file
     * @param file : the file
     * @param index: index of file
     * @return the dom object
     */
    function create(file, index){
        var script = document.createElement('script');
        
        script.onload = script.onerror = function(event){    
            if(event.type == "error")
                console.log("File "+file+" cannot be loaded");

            loadedCounter++;
            delete queue[getName(file)];
            cache[getName(file)] = index;

            if(loadedCounter == scriptCounter)
                endFunc();
            
            return true;
        };
        
        queue[getName(file)] = index;
        script.async = 1;
        script.src = file;
        body.appendChild(script);
    }    
    
    /*
     * function getName
     * get script name
     * @param file : the file uri
     * @return the script name
     */
    function getName(file){
        return strictFiles ? file.toString().split('/').pop() : file;
    }
    
    window.require = require;
})();