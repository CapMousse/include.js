//     include.js 1.2
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

(function(environment){

    /**
     * load asked file
     * @param files array of files to be loaded
     * @param callback general callback when all files are loaded
     */
    environment.include = function(files, callback){
        var doc = document, tags = "getElementsByTagName", head = doc[tags]('head')[0], emptyFn = function(){}, cache = {},
            scriptCounter = 0, time = 1, ar = [], sc = "script", lk = "link", j;

        !files.pop&&(files=[files]);
        callback=callback||emptyFn;

        /**
         * create a script/link node with asked file
         * @param   {String}    file            the file
         * @param   {Function}  fileCallback    the callback for the current script
         * @param   {Undefined} script          placeholder for the script element
         * @param   {Undefined} isStyle         placeholder for the style detection
         * @return  void
         */
        function _create(file, fileCallback, script, isStyle){
            isStyle = (/\.css$/.test(file));

            if(isStyle){
                script = doc.createElement(lk);
                script.href = file;
                script.rel = "stylesheet";
                script.type = "text/css";
                head.appendChild(script);
                fileCallback();
            }else{
                scriptCounter++;
                script = doc.createElement(sc);

                script.onload = function(){
                    finish(script, fileCallback);
                };

                script.onreadystatechange = function(){
                    //search the loaded or complete expression
                    /loaded|complete/.test(this.readyState)&&finish(script, fileCallback);

                };

                script.async = !0;
                script.src = file;

                //prevent IE6 bug
                head.insertBefore(script, head.firstChild);
            }
        }

        /**
         * Execute callback of each loaded files
         *
         * @param {Element} script
         * @param {Function} callBack
         *
         * @return void
         */
        function finish(script, callBack) {
            _countFiles(callBack);
            cache[script.src.split('/').pop()] = 1;

            /*
             * memory leak fix
             * tanks to jtsoi & jQuery team
             * https://github.com/CapMousse/include.js/issues/5
             */
            script.onload = script.onreadystatechange = null;
            //script.parentNode&&script.parentNode.removeChild(script);
            script = ar._;
        }

        /**
         * count files loaded and launch callback
         * @param {Function} fileCallback  callback of the current file
         * @return void
         */
        function _countFiles(fileCallback){
            function waitFn() {!--scriptCounter&&callback()}
            fileCallback.length ? fileCallback(waitFn) : (fileCallback(), waitFn());
        }

        /**
         * Transform a NodeList to an array
         * Use this becose of IE bug
         * @param {NodeList} nodeList
         * @param i
         * @param arr
         */
        function nodeToArray(nodeList, i, arr){
            //we only need a for without body to parse nodelish to array. Simple and fast ! (and super strange for newbies)
            for(i=nodeList.length,arr=[];i--;arr.unshift(nodeList[i]));
            return arr
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
            if(!doc.body) return setTimeout(include, time);

            //transform Nodelist to array and concat them
            ar = [].concat(
                nodeToArray(doc[tags](sc)),
                nodeToArray(doc[tags](lk))
            );

            for(i=ar.length;i--;){
                j = ar[i].src || ar[i].href;
                j&&(cache[j.split('/').pop()] = j);
            }

            for(i=files.length;i--;){
                callbackFile = emptyFn;
                obj = !1;

                files[i].pop?
                    (script = files[i][0], callbackFile = files[i][1], obj = files[i][2]):
                    (script = files[i]);

                //don't load script if already loaded
                cache[script.split('/').pop()]||_create(script, callbackFile, obj);
            }


            !scriptCounter&&callback()
        })()
    }

})(this);