//     include.js 1.1.2
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

(function(environment){

    /**
     * load asked file
     * @param files array of files to be loaded
     * @param callback general callback when all files are loaded
     */
    environment['include'] = function(files, callback){
        var doc = document, body = "body", emptyFn = function(){},
            scriptCounter = 0, time = 1;

        !files.pop&&(files=[files]);
        callback=callback||emptyFn;

        /**
         * create a script/link node with asked file
         * @param   {String}    file            the file
         * @param   {Function}  fileCallback    the callback for the current script
         * @param   {String}    obj             the object loaded in file
         * @param   {void}      script          placeholder for the script element
         * @return  void
         */
        function _create(file, fileCallback, obj, script, loaded, isStyle){
            isStyle = (/\.css$/.test(file));

            if(isStyle){
                script = doc.createElement("link");
                script.href = file;
                script.rel = "stylesheet";
                script.type = "text/css";
                doc['head'].appendChild(script);
                fileCallback();
            }else{
                scriptCounter++;
                script = doc.createElement("script");

                script.onload = script.onreadystatechange = function(e, i){
                    i = 0; e = this.readyState || e.type;

                    //seach the loaded, load or complete expression
                    if(!e.search("load|complete") && !loaded){
                        obj ?
                            //wait the javascript to be parsed to controll if object exists
                            (file = function(){
                                environment[obj] ? _countFiles(fileCallback) : setTimeout(file, time);
                                ++i>time&&(file=emptyFn)
                            })():
                            _countFiles(fileCallback);

                        loaded = time;
                    }
                };

                script.async = !0;
                script.src = file;
                doc[body].appendChild(script);
            }
        }

        /**
         * count files loaded and launch callback
         * @param fileCallback  callback of the current file
         * @return void
         */
        function _countFiles(fileCallback){
            function waitFn() {!--scriptCounter&&callback()}
            fileCallback.length ? fileCallback(waitFn) : (fileCallback(), waitFn())
        }

        /**
         * parse sent script and load them
         * @param i             placeholder for the loops
         * @param script        placeholder for all scripts
         * @param obj           placeholder for the aksed object
         * @param callbackFile  placholder for the callback function
         * @return void
         */
        (function include(i, script, obj, callbackFile){
            if(!doc[body]) return setTimeout(include, time);

            for(i=files.length;i--;){
                callbackFile = emptyFn;
                obj = !1;

                files[i].pop?
                    (script = files[i][0], callbackFile = files[i][1], obj = files[i][2]):
                    (script = files[i]);

                _create(script, callbackFile, obj);
            }

            !scriptCounter&&callback()
        })()
    }

})(this);
