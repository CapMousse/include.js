//     require.js 0.6
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){

    // Initial Setup
    // -------------
    var require, _parseScripts, _parseFiles, _create, _countFiles,
        domLoaded = false, doc = document, undef = "undefined",
        emptyFn = function(){}, cache = {}, scriptCounter = 0, errorCounter = 0,
        domCheck, success, complete, files, scripts;

    /*
    * require
    * Load all files list in object
    * @param    params   object
    * params is an object which contain all informations for require.
    * {
    *   'files' : [
    *       'filename'
    *       or
    *       ['filename', callback] 
    *       or
    *       ['filename', 'loaded object', callback] 
    *   ],
    *   complete    function    launched when all files script are created
    *   success     function    launched when all files are successfully loaded
    * }
    * 
    * @return Require
    */   
    require = function(params){      
        files = !!params.files.pop ? params.files : [params.files];
        success = params.success || emptyFn;
        complete = params.complete || emptyFn;
        scriptCounter = errorCounter = 0;

        if(domLoaded) return _parseFiles();

        setTimeout(domCheck = function(){
            if(!doc.body) return setTimeout(domCheck, 1);

            domLoaded = true;
            _parseScripts();
            _parseFiles();
        }, 1);
    };

    /* 
     * function _parseScript
     *
     * Parse all scripts from body and add them to cache.
     * 
     * @return void 
     */
    _parseScripts = function(){
        var scripts = doc.getElementsByTagName('script'), i;

        for(i in scripts){
            if(parseInt(i) && !!scripts[i].src){
                cache[scripts[i].src] = i;
            }
        }
    };

    /* 
     * function _parseFiles
     *
     * Parse all required files to load them if they don't exists   
     *
     * @return void 
     */
    _parseFiles = function(){
        var i,j, file, callback = emptyFn, obj = null;

        for(i in files){        
            !!files[i].pop ? 
                (file = files[i][0]) :
                (file = files[i]);
            
            (!!files[i].pop && files[i][1][0]) ? 
                (obj = files[i][2] || files[i][1]) : 
                (!!files[i].pop ? callback = files[i][1] : null );

            if(!!cache[file]) continue;

            _create(file, i, callback, obj);
            scriptCounter++;
        }

        if(!scriptCounter){
            complete();
            success();
        }
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
            
            error = (e.type == "error") ? ++errorCounter+scriptCounter-- : error;

            if(obj && !error){
                //wait the javascript to be parsed to controll if object exists
                setTimeout(t = function(){
                    (!!eval('window.'+obj)) ? _countFiles(file, index, callback) : setTimeout(t, 10);
                    (i > 10) ? ++errorCounter+--scriptCounter : i++;
                }, 10);
            }else if(!error){   
                _countFiles(file, index, callback);
            }
        };
        
        script.async = true;
        script.src = file;
        
        doc.body.appendChild(script);
    };
    
    /*
     * function countFiles
     * count files loaded and launch callback
     * @param file
     * @param index
     * @return void
     */
    _countFiles = function(file, index, callback){
        cache[file] = index;
        callback();

        if(!--scriptCounter){
            complete();

            if(!errorCounter) success();
        }
    };
    
    typeof module != undef && module.exports ? 
    (modules.exports.require = require) : (environment.require = require);
    
}(this);