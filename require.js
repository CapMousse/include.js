//     require.js 0.9
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){
    /*
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
    var require = function(array, callback){
        var i, j, file, obj, scripts, success, files,
        doc = document, body = "body", emptyFn = function(){}, 
        fileCallback = emptyFn , cache = {}, scriptCounter = 0, time = 10;

        files = !array.pop ? [array] : array;
        success = callback || emptyFn;
    
        /*
         * function create
         * create a script node with asked file
         * @param   file      the file
         * @param   index     index of file
         * @param   callback  callback for the current file
         * @param   obj       the object loaded in file
         * @return  void
         */
        function _create(file, callback, obj){
            var script = doc.createElement('script'), complete = 0;
            
            scriptCounter++;
            
            script.onload = script.onreadystatechange = function(e){
                var t, i;

                if(!complete && (!this.readyState || this.readyState === 'complete')){
                    complete = 1;

                    if(!obj){
                        _countFiles(callback);
                    }else{
                        //wait the javascript to be parsed to controll if object exists
                        (t = function(){
                            (obj in environment) ? _countFiles(callback) : setTimeout(t, time);
                            (i > time) ? errorCounter++ : i++;
                        })();
                    }
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
         * @return void
         */
        function _countFiles(callback){
            callback();

            if(!--scriptCounter){
                success();
            }
        };



        (function domCheck(){
            if(!doc[body]) return setTimeout(domCheck, time);

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

                (!cache[file]) ?
                    (_create(file, fileCallback, obj)): 
                    (fileCallback());
            }

            if(!scriptCounter){ 
                success();
            }
        })();
    };
    
    environment.require = require;
}(this);