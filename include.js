//     include.js 1.0.7
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment){
    
    /**
     * load asked file
     * @param files array of files to be loaded
     * @param callback general callback when all files are loaded
     */
    environment['include'] = function(files, callback){
        var doc = document, body = "body", emptyFn = function(){},
            cache = {}, scriptCounter = 0, time = 1;

        !files.pop&&(files=[files]);
        callback=callback||emptyFn;

        /**
         * create a script node with asked file
         * @param   file            the file
         * @param   fileCallback    the callback for the current script
         * @param   obj             the object loaded in file
         * @param   script          placeholder for the script element
         * @return  void
         */
        function _create(file, fileCallback, obj, script, loaded){
            script = doc.createElement("script");
            scriptCounter++;

            script.onload = script.onreadystatechange = function(e, i){
                i = 0, e = this.readyState || e.type;

                //seach the loaded, load or complete expression
                if(!e.search("load|complete") && !loaded){
                    obj ?
                        //wait the javascript to be parsed to controll if object exists
                        (file = function(){
                            environment[obj] ? _countFiles(fileCallback) : setTimeout(file, time);
                            ++i>time&&(file=emptyFn)
                        })():
                        _countFiles(fileCallback)

                    loaded = time;
                }
            };

            script.async = !0;
            script.src = file;

            doc[body].appendChild(script)
        }

        /**
         * count files loaded and launch callback
         * @param fileCallback  callback of the current file
         * @return void
         */
        function _countFiles(fileCallback){
            fileCallback();
            !--scriptCounter&&callback()
        }

        /**
         * parse sent script and load them
         * @param i             placeholder for the loops
         * @param script        placeholder for all scripts
         * @param obj           placeholder for the aksed object
         * @param callbackFile  placholder for the callback function
         * @return void
         */
        !function include(i, script, obj, callbackFile){
            if(!doc[body]) return setTimeout(include, time);

            script = doc.getElementsByTagName("script");
            callbackFile = emptyFn;

            for(i in script) script[i].src&&(cache[script[i].src]=i);

            for(i=files.length;i--;)
                files[i].pop?
                    (script = files[i][0], callbackFile = files[i][1], obj = files[i][2]):
                    (script = files[i]),
                cache[script] ?
                    callbackFile():
                    _create(script, callbackFile, obj);

            !scriptCounter&&callback()
        }()
    }

}(this)