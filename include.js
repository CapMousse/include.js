//     include.js 1.0.3
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment, name){
    
    /**
     * load asked file
     * @param files array of files to be loaded
     * @param callback general callback when all files are loaded
     */
    environment[name] = function(files, callback){
        var doc = document, body = "body", emptyFn = function(){},
            cache = {}, scriptCounter = 0, time = 1, element = doc.createElement('div');

        !files.pop&&(files=[files]);
        callback=callback||emptyFn;
        element.id = Date();

        /**
         * create a script node with asked file
         * @param   file            the file
         * @param   fileCallback    the callback for the current script
         * @param   obj             the object loaded in file
         * @param   script          placeholder for the script element
         * @return  void
         */
        function _create(file, fileCallback, obj, script){
            script = doc.createElement("script");
            scriptCounter++;

            script.onload = script.onreadystatechange = function(e, i){
                i = 0, e = this.readyState || e.type;

                //seach the loaded, load or complete expression
                if(!e.search("load|complete")){
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

        /**
         * count files loaded and launch callback
         * @param fileCallback  callback of the current file
         * @return void
         */
        function _countFiles(fileCallback){
            !--scriptCounter&&callback()+fileCallback()
        }

        /**
         * parse sent script and load them
         * @param i             placeholder for the loops
         * @param script        placeholder for all scripts
         * @param obj           placeholder for the aksed object
         * @param callbackFile  placholder for the callback function
         * @return void
         */
        function parseFiles(i, script, obj, callbackFile){
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
        }

        /**
         * check if the dom is ready
         * @return void
         */
        !function domCheck(){
            if(!doc[body]) return setTimeout(domCheck, time);
            doc[body].appendChild(element);
            if(!doc.getElementById(element.id)) return setTimeout(domCheck, time);
            doc[body].removeChild(element);
            parseFiles();
        }()
    }

}(this, 'include')