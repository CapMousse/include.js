//     include.js 1.0
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

!function(environment, include){
    /*
     * Include
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
    include = function(array, callback){
        var i, j, file, obj, scripts, success, files,
        doc = document, body = "body", emptyFn = function(){}, 
        callbackFile , cache = {}, scriptCounter = 0, time = 10;

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
        function _create(file, fileCallback, obj){
            var script = doc.createElement('script'), complete = 0;     
            scriptCounter++;
            
            script.onload = script.onreadystatechange = function(){
                var t, i = 0;

                if(!complete && (!this.readyState || this.readyState === 'loaded')){
                    complete = 1;

                    !obj ?
                        _countFiles(fileCallback) :
                        //wait the javascript to be parsed to controll if object exists
                        (t = function(){
                            (obj in environment) ? _countFiles(fileCallback) : setTimeout(t, time);
                            (++i>time)&&(t=emptyFn);
                        })();
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
        function _countFiles(fileCallback){
            fileCallback();

            !--scriptCounter&&success();
        };



        (function domCheck(){
            if(!doc[body]) return setTimeout(domCheck, time);

            scripts = doc.getElementsByTagName('script');

            for(i in scripts){
                !!scripts[i].src&&(cache[scripts[i].src] = i)
            }

            for(i in files){
                if(!!files[i].pop){
                    file = files[i][0];
                    callbackFile = files[i][1] || emptyFn;
                    obj = files[i][2] || obj;
                }else{
                    file = files[i]
                }

                (cache[file]) ?
                    (callbackFile()):
                    (_create(file, callbackFile, obj));
            }

            !scriptCounter&&success();
        })();
    };

    environment.include = include;
}(this);