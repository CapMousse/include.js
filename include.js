//     include.js 1.0.1
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){
    /**
     * Include
     * Load all files list in object
     * @param    array   array of files to be loaded
     *   [
     *       "filename"
     *       or
     *       ["filename", callback] 
     *       or
     *       ["filename", "loaded object", callback] 
     *       or
     *       ["filename","filename","filename","filename"]
     *   ]
     * 
     * @params  callback    function launched when all files are loaded
     * 
     * @return   void
     */   
    environment.include = function(files, callback){
        var doc = document, body = "body", emptyFn = function(){}, 
            cache = {}, scriptCounter = 0, time = 1;

        !files.pop&&(files=[files]);
        !callback&&(callback=emptyFn);
    
        /**
         * function create
         * create a script node with asked file
         * @param   file          the file
         * @param   fileCallback  callback for the current file
         * @param   obj           the object loaded in file
         * @param   script        empty var used to create a script element
         * @return  void
         */
        function _create(file, fileCallback, obj, script){
            if(!file.search || cache[file]) return;
            
            script = doc.createElement("script");
            scriptCounter++;
            
            script.onload = script.onreadystatechange = function(e, i){
                i = 0, e = this.readyState || e.type;
                
                if(e == "loaded" || e == "complete" || e == "load"){
                    obj && obj.search ?
                        //wait the javascript to be parsed to controll if object exists
                        (file = function(){
                            environment[obj] ? _countFiles(fileCallback) : setTimeout(file, time);
                            ++i>time&&(file=emptyFn)
                        })():
                        _countFiles(fileCallback)
                }
            };
            
            script.async = fileCallback.call ? !0 : !1;
            script.src = file;
            
            doc[body].appendChild(script)
        }
        
        /**
         * function countFiles
         * count files loaded and launch callback
         * @param fileCallback  callback for the current file
         * @return void
         */
        function _countFiles(fileCallback){
            fileCallback.call ? fileCallback() : emptyFn();
            !--scriptCounter&&callback();
        }

        
        /**
         * ceck if the dom is ready and launch the loading script
         * @param i             empty var for the "for" loop
         * @param script        empty var for all the script
         * @param obj           empty var for the asked object to launch a callback
         * @param callbackFile  empty var for the callback function
         * @return void
         */
        !function domCheck(i, script, obj, callbackFile){
            if(!doc[body]) return setTimeout(domCheck, time);

            script = doc.getElementsByTagName("script");
            callbackFile = emptyFn;

            for(i in script) script[i].src&&(cache[script[i].src]=i);

            for(i in files)
                files[i].pop?
                    files[i][1].search('.js') ? 
                        (files[i].map(_create)):
                        (script = files[i][0], callbackFile = files[i][1], obj = files[i][2]):
                    (script = files[i]),
                cache[script] && script ?
                    callbackFile():
                    _create(script, callbackFile, obj);

            !scriptCounter&&callback()
        }()
    }
}(this)