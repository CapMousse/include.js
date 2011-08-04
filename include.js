//     include.js 1.0.1
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){
    /*
     * Include
     * Load all files list in object
     * @param    array   array of files to be loaded
     *   [
     *       "filename"
     *       or
     *       ["filename", callback] 
     *       or
     *       ["filename", "loaded object", callback] 
     *   ]
     * 
     * @params  callback    function launched when all files are loaded
     * 
     * @return   void
    **/   
    function include(files, callback){
        var doc = document, body = "body", emptyFn = function(){}, 
            cache = {}, scriptCounter = 0, time = 1;

        !files.pop&&(files=[files]);
        !callback&&(callback=emptyFn);
        /*
         * function create
         * create a script node with asked file
         * @param   file      the file
         * @param   index     index of file
         * @param   callback  callback for the current file
         * @param   obj       the object loaded in file
         * @return  void
         */
        function _create(file, fileCallback, obj, script){
            script = doc.createElement("script");     
            scriptCounter++;
            
            script.onload = script.onreadystatechange = function(e, i){
                i = 0, e = this.readyState || e.type;

                if(e == "complete" || e == "load"){
                    obj ?
                        //wait the javascript to be parsed to controll if object exists
                        (file = function(){
                            environment[obj] ? _countFiles(fileCallback) : setTimeout(file, time);
                            ++i>time&&(file=emptyFn)
                        })():
                        _countFiles(fileCallback)
                }
            };
            
            script.async = !0;
            script.src = file;
            
            doc[body].appendChild(script)
        }
        
        /*
         * function countFiles
         * count files loaded and launch callback
         * @param file
         * @return void
         */
        function _countFiles(fileCallback){
            !--scriptCounter&&callback()+fileCallback()
        }



        !function domCheck(i, script, obj, callbackFile){
            if(!doc[body]) return setTimeout(domCheck, time);

            script = doc.getElementsByTagName("script");
            callbackFile = emptyFn;

            for(i in script) script[i].src&&(cache[script[i].src]=i);

            for(i in files)
                files[i].pop?
                    (script = files[i][0], callbackFile = files[i][1], obj = files[i][2]):
                    (script = files[i]),
                cache[script] ?
                    callbackFile():
                    _create(script, callbackFile, obj);

            !scriptCounter&&callback()
        }()
    }

    environment.include = include
}(this)