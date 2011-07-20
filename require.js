//     require.js 0.7
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){

    // Initial Setup
    // -------------
    var require, _create, _countFiles,
        doc = document, body = "body",
        emptyFn = function(){}, cache = {}, scriptCounter = 0, errorCounter = 0,
        domCheck, success, files;

    /**
     * require
     * Load all files list in object
     * @param    array   array of files to be loaded
     *   [
     *       'filename'
     *       or
     *       ['filename', callback] 
     *       or
     *       ['filename', 'loaded object', callback] 
     *   ]
     * 
     * @params  callback    function launched when all files are loaded
     * 
     * @return   void
    **/   
    require = function(array, callback){
        var i, j, file, fileCallback = emptyFn , obj = 0, scripts;
        files = !!array.pop ? array : [array];
        success = callback || emptyFn;
        scriptCounter = errorCounter = 0;

        (domCheck = function(){
            if(!doc[body]) return setTimeout(domCheck, 1);

            scripts = doc.getElementsByTagName('script');

            for(i in scripts){
                if(!!scripts[i].src){
                    cache[scripts[i].src] = i;
                }
            }

            for(i in files){
                if(!!files[i].pop){
                    file = files[i][0];
                    fileCallback = files[i][1] || fileCallback;
                    obj = files[i][2] || obj;
                }else{
                    file = files[i]
                }

                if(!cache[file]){
                    _create(file, i, fileCallback, obj);
                    scriptCounter++;
                }else{
                    fileCallback();
                }
            }

            if(!scriptCounter){ 
                success();
            }
        })();
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
    _create = function(file, index, callback, obj){
        var script = doc.createElement('script');
        
        script.onload = script.onerror = function(e){
            var t, i, error = false;
            
            error = (e.type == "error") ? ++errorCounter : error;

            if(obj && !error){
                //wait the javascript to be parsed to controll if object exists
                (t = function(){
                    (obj in environment) ? _countFiles(file, index, callback) : setTimeout(t, 10);
                    (i > 10) ? ++errorCounter : i++;
                })();
            }else if(!error){   
                _countFiles(file, index, callback);
            }
        };
        
        script.async = true;
        script.src = file;
        
        doc[body].appendChild(script);
    };
    
    /*
     * function countFiles
     * count files loaded and launch callback
     * @param file
     * @param index
     * @return void
     */
    _countFiles = function(file, index, callback){
        callback();

        if(!--scriptCounter && !errorCounter){
            success();
        }
    };
    
    typeof module != "undefined" && module.exports ? 
    (modules.exports.require = require) : (environment.require = require);
    
}(this);