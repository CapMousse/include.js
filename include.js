//     include.js 2.0-alpha
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.
//     
var include;
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
     * Base element check for IE 6-8
     * @type {[type]}
     */
    var baseElement = document.getElementsByTagName('base')[0];

    /**
     * Loop trougth an array of element with the given function
     * @param  {Array}    array    array to loop       
     * @param  {Function} callback function to execute with each element
     */
    function each(array, callback) {
        var i;

        for (i = 0; i < array.length; i++) {
            if (array[i] && callback(array[i], i, array)) {
                break;
            }
        }
    }

    function cleanWaiting() {
        var toClean = [];

        each(waitingModules, function (module, i) {
            if (module[3] === true) {
                toClean.push(i);
            }
        });

        each(toClean, function (clean, i) {
            waitingModules.splice(clean - i, 1);
        });
    }

    /**
     * Check if a module is loaded
     */
    function checkModuleLoaded() {
        each(waitingModules, function (module, i) {
            var dependencies = module[0],
                args         = [],
                name         = module[2],
                exec;

            if (module[3] === true) {
                return;
            }

            each(dependencies, function (dependencie) {
                if (modules[dependencie] !== undefined) {
                    args.push(modules[dependencie]);
                }
            });

            if (dependencies.length === args.length || dependencies.length === 0) {
                exec = module[1].apply(this, args);
                module.push(true);

                if (name !== undefined) {
                    modules[name] = exec;
                }

                if (name === undefined && i === waitingModules.length - 1) {
                    waitingModules = [];
                }
            }
        });
    }

    /**
     * On Load event
     * @param  {Event}      event  event of the load
     */
    function onLoad(event) {
        if (event.type !== "load" && !/load|complete/.test(this.readystate)) {
            return;
        }

        if (this.attachEvent) {
            this.detachEvent('onreadystatechange', onLoad);
        } else {
            this.removeEventListener('load', onLoad);
        }

        waitingModules[0].push(this.getAttribute('data-module'));

        checkModuleLoaded();
    }

    /**
     * Attach events to a script tags
     * @param {Element} script     script to attach event
     * @param {String}  moduleName module to load
     */
    function attachEvents(script, moduleName) {
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

        each(document.getElementsByTagName('script'), function (elem, i) {
            if (elem.getAttribute('data-module') && elem.getAttribute('data-module') === moduleName) {
                script = elem;
                return false;
            }
        });

        return script;
    }

    /**
     * Create a script element to load asked module
     * @param  {String} file       name of the file
     * @param  {String} moduleName name of the module
     */
    function create(file, moduleName) {
        var script = checkScripts(moduleName);

        if (script) {
            return;
        }

        script = document.createElement('script');

        script.async = true;
        script.type = "text/javascript";
        script.src = file;
        script.setAttribute('data-module', moduleName);

        if (baseElement) {
            //prevent IE 6-8 bug (script executed before appenchild execution)
            baseElement.parentNode.insertBefore(script, baseElement);
        } else {
            document.head.appendChild(script);
        }

        attachEvents(script, moduleName);
    }

    /**
     * Parse a file to include
     * @param  String file file to parse
     * @param  Number i    index of file
     */
    function parseFiles(file, index) {
        var moduleName = file;

        if (modules[moduleName]) {
            return;
        }

        if (!/\.js/.test(file)) {
            file = file + '.js';
        }

        create(file, moduleName);
    }

    /**
     * @param {Array}    files    array of files to be loaded
     * @param {Function} callback general callback when all files are loaded
     */
    include = function (files, callback) {
        // Check if only callback is defined
        if (typeof files === "function" && callback === undefined) {
            waitingModules.unshift([[], files]);
            return;
        }

        waitingModules.unshift([files, callback]);
        each(files, parseFiles);
    };

})(this);