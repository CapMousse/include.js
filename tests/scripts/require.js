//     require.js 0.5.2
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

(function(){
    
    //check if already defined
    if(window.require){ return; }

    // Initial Setup
    // -------------
    var require,

        //Configurable var
        strictFiles = true,
        async = false,
         
        scripts = document.getElementsByTagName('script'), contentLoaded = 'DOMContentLoaded',
        cache = {}, queue = {}, emptyFn = function(){},
        success, error, complete,
        scriptCounter, loadedCounter, errorCounter, files;
        
    /*
    * require
    * Load all files list in object
    * @param    params   object
    * params is an object which contain all informations for require.
    * {
    *   'files' : [
    *       ['filename', callback] 
    *       or 
    *       'filename'
    *   ],
    *   complete    function    launched when all files script are created
    *   success     function    launched when all files are successfully loaded
    *   error       function    launched when file can't be loaded,
    *   strict      boolean     use strict mode
    *   async       boolean     use async mode
    * }
    * 
    * @return Require
    */   
    require = function(params){
        var i,j;
        
        strictFiles = params.strict || false;
        async = params.async || true;               
        files = params.files instanceof Array ? params.files : [params.files];
        success = params.success || emptyFn;
        error = params.error || emptyFn;
        complete = params.complete || emptyFn;
        scriptCounter = loadedCounter = errorCounter = 0;
        queue = {};
        
        document.addEventListener(contentLoaded, function parse(){
            document.removeEventListener(contentLoaded, parse, false);

            for(j in scripts){
                if(scripts.hasOwnProperty(j)){
                    if(scripts[j].src){
                        cache[getName(scripts[j].src)] = j;
                    }
                }
            }

            for(i in files){
                if(files.hasOwnProperty(i)){                
                    var file, script,
                        callback = emptyFn, 
                        obj = null;
                    
                    if(files[i] instanceof Array){
                        file = files[i][0];
                        script = getName(files[i][0]);
                        
                        if(typeof files[i][1] === "string"){
                            obj = files[i][1];
                        }else{
                            callback = files[i][1];
                        }
                        
                        obj = obj || files[i][2] || null;
                    }else{
                        file = files[i];
                        script = getName(files[i]);
                    }

                    if(typeof cache[script] !== "undefined" || typeof queue[script] !== "undefined"){
                        continue;
                    }
                    
                    create(file, i, callback, obj);
                    scriptCounter++;
                }
            }

            if(scriptCounter === 0){
                complete();
                success();
            }
        });
    };
    
    /*
     * function create
     * create a script node with asked file
     * @param   file      the file
     * @param   index     index of file
     * @param   callback  callback for the current file
     * @param   obj       the object loaded in file
     * @return  void
     */
    function create(file, index, callback, obj){
        var script = document.createElement('script'),
            fileName = getName(file);
        
        script.onload = script.onerror = function(event){
            var t, i;
            
            if(event.type === "error"){
                errorCounter++;
                error(event, file);
            }else{
                callback();
            }            
            
            if(obj !== null){
                t = setInterval(function(){
                    if(typeof eval('window.'+obj) !== "undefined"){
                        countFiles(file, index);
                        clearInterval(t);
                    }else if(i > 10){
                        errorCounter++;
                        error(obj, file);
                        countFiles(file, index);
                        clearInterval(t);
                    }
                    
                    i++;
                }, 10);
            }else{
                countFiles(file, index);
            }
            
            return true;
        };
        
        queue[fileName] = index;
        
        script.async = async;
        script.src = file;
        
        document.body.appendChild(script);
    }
   
    /*
     * function getName
     * get script name
     * @param file : the file uri
     * @param strict : force strict mode
     * @return the script name
     */
    function getName(file, strict){
        strict = strict || strictFiles;
        
        var name = file.toString().split('/').pop();
        name = name.split('.');
        name.pop();
        name = name.join('-');

        return strictFiles || strict ? name : file;
    }
    
    /*
     * function countFiles
     * count files loaded and launch callback
     * @param file
     * @param index
     * @return void
     */
    function countFiles(file, index){        
        loadedCounter++;
        delete queue[getName(file)];
        cache[getName(file)] = index;

        if(loadedCounter === scriptCounter){
            complete();

            if(errorCounter === 0){
                success();
            }
        }
        
        return true;
    }
    
    window.require = require;
    
});