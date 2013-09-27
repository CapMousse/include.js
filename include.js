// =============================================================================
// Project:        Include.js - Javascript loader
// Copyright:      ©2011-2013 Jérémy Barbe (http://shwaark.com) and contributors
// Licence:        Licence under MIT license
// =============================================================================

(function (environment) {

    /**
     * List a existings modules
     * @type {Object}
     */
    var modules = {};

    /**
     * Array of waiting modules
     * @type {Array}
     */
    var waitingModules = [];

    /**
     * Count created script for control
     * @type {Number}
     */
    var scriptCounter = 1;

    /**
     * Base element check for IE 6-8
     * @type {Node}
     */
    var baseElement = document.getElementsByTagName('base')[0];

    /**
     * Head element
     * @type {Node}
     */
    var head = document.getElementsByTagName('head')[0];

    /**
     * Loop trougth an array of element with the given function
     * @param  {Array|NodeList}    array    array to loop       
     * @param  {Function} callback function to execute with each element
     */
    function each(array, callback) {
        var i;

        for (i = 0; i < array.length; i++) {
            if (array[i] !== undefined && callback(array[i], i, array) === false) {
                break;
            }
        }
    }

    /**
     * Check if a module is loaded
     */
    function checkModuleLoaded() {
        each(waitingModules, function (module, i) {
            var name         = module[0],
                dependencies = module[1],
                exec         = module[2],
                args         = [];

            each(dependencies, function (dependencie, n) {
                n = dependencie.push ? dependencie[0] : dependencie

                if (modules[n] !== undefined) {
                    args.push(modules[n]);
                }
            });

            if (dependencies.length === args.length || dependencies.length === 0) {
                exec = exec.apply(this, args);
                module.push(true);

                if (name !== null) {
                    modules[name] = exec;
                }

                if (name === null && i+1 === waitingModules.length) {
                    waitingModules = [];
                    scriptCounter = 1;
                }
            }
        });
    }

    /**
     * On Load event
     * @param  {Event}      event  event of the load
     */
    function onLoad(event) {
        var target = (event.currentTarget || event.srcElement),
            name,
            count;

        //Check if the script is realy loaded and executed ! (Fuck you IE with your "Loaded but not realy, wait to be completed")
        if (event.type !== "load" && target.readyState != "complete") {
            return;
        }

        name = target.getAttribute('data-module');
        count = target.getAttribute('data-count');
        target.setAttribute('data-loaded', true);

        // Old browser need to use the detachEvent method
        if (target.attachEvent) {
            target.detachEvent('onreadystatechange', onLoad);
        } else {
            target.removeEventListener('load', onLoad);
        }

        // Is this script add a waiting module ? If not, that's a "normal" script file
        if (count > waitingModules.length) {
            modules[name] = scriptCounter--;
        } else if (waitingModules[0][0] === null) {
            waitingModules[0][0] = name;
        }

        checkModuleLoaded();
    }

    /**
     * Attach events to a script tags
     * @param {Element} script     script to attach event
     */
    function attachEvents(script) {
        if (script.attachEvent) {
            script.attachEvent('onreadystatechange', onLoad);
        } else {
            script.addEventListener('load', onLoad, false);
        }
    }

    /**
     * Check if a script already load
     * @param  {String} moduleName module to load
     */
    function checkScripts(moduleName) {
        var script = false;

        each(document.getElementsByTagName('script'), function (elem) {
            if (elem.getAttribute('data-module') && elem.getAttribute('data-module') === moduleName) {
                script = elem;
                return false;
            }
        });

        return script;
    }

    /**
     * Create a script element to load asked module
     * @param  {String} moduleName name of the module
     * @param  {String} moduleFile fiel to include
     */
    function create(moduleName, moduleFile) {
        //SetTimeout prevent the "OMG RUN, CREATE THE SCRIPT ELEMENT, YOU FOOL" browser rush
        setTimeout(function(){
            var script = checkScripts(moduleName);
            if (script) {
                return;
            }

            scriptCounter++;

            script = document.createElement('script');

            script.async = true;
            script.type = "text/javascript";
            script.src = moduleFile;
            script.setAttribute('data-module', moduleName);
            script.setAttribute('data-count',  scriptCounter);
            script.setAttribute('data-loaded', false);

            if (baseElement) {
                //prevent IE 6-8 bug (script executed before appenchild execution. Yeah, that's realy SUCK)
                baseElement.parentNode.insertBefore(script, baseElement);
            } else {
                head.appendChild(script);
            }

            attachEvents(script);
        }, 0);
    }

    /**
     * Parse a file to include
     * @param  {String} file  file to parse
     */
    function parseFiles(file) {
        var moduleName = file.push ? file[0] : file;
        var moduleFile = file.push ? file[1] : file;

        //Don't load module already loaded
        if (modules[moduleName]) {
            checkModuleLoaded();
            return;
        }
        

        if (!/\.js/.test(moduleFile) && !/^http/.test(moduleFile)) {
            moduleFile = moduleFile.replace('.', '/');
            moduleFile = moduleFile + '.js';
        }

        create(moduleName, moduleFile);
    }

    /**
     * @param {String}   name     the name of the module
     * @param {Array}    deps     dependencies of the module
     * @param {Function} module   module definition
     */
    environment['include'] = environment['require'] = environment['define'] = function (name, deps, module) {
        if (typeof name !== "string") {
            module = deps;
            deps = name;
            name = null;
        }

        if (typeof deps !== "object") {
            module = deps;
            deps = [];
        }

        waitingModules.unshift([name, deps, module]);

        checkModuleLoaded();

        if (deps.length) {
            each(deps, parseFiles);
        }
    };

})(this);
