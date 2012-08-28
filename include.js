//     include.js 2.0
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

    var scriptCounter = 1;

    /**
     * Base element check for IE 6-8
     * @type {[type]}
     */
    var baseElement = document.getElementsByTagName('base')[0];

    /**
     * Loop trougth an array of element with the given function
     * @param  {Array|NodeList}    array    array to loop       
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

    /**
     * Check if a module is loaded
     */
    function checkModuleLoaded() {
        each(waitingModules, function (module, i) {
            var name         = module[0],
                dependencies = module[1],
                exec         = module[2],
                args         = [];

            if (module[3] === true && (name === null || modules[name] !== undefined)) {
                return;
            }

            each(dependencies, function (dependencie) {
                if (modules[dependencie] !== undefined) {
                    args.push(modules[dependencie]);
                }
            });

            if (dependencies.length === args.length || dependencies.length === 0) {
                exec = exec.apply(this, args);
                module.push(true);

                if (name !== null) {
                    modules[name] = exec;

                }

                if (name === null && i === waitingModules.length - 1) {
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
        if (event.type !== "load" && !/load|complete/.test(this.readystate)) {
            return;
        }

        var name = this.getAttribute('data-module');
        var count = this.getAttribute('data-count');
        this.setAttribute('data-loaded', true);

        if (this.attachEvent) {
            this.detachEvent('onreadystatechange', onLoad);
        } else {
            this.removeEventListener('load', onLoad);
        }

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

        scriptCounter++;

        script = document.createElement('script');

        script.async = true;
        script.type = "text/javascript";
        script.src = file;
        script.setAttribute('data-module', moduleName);
        script.setAttribute('data-count',  scriptCounter);
        script.setAttribute('data-loaded', false);

        if (baseElement) {
            //prevent IE 6-8 bug (script executed before appenchild execution)
            baseElement.parentNode.insertBefore(script, baseElement);
        } else {
            document.head.appendChild(script);
        }

        attachEvents(script);
    }

    /**
     * Parse a file to include
     * @param  {String} file file to parse
     * @param  {Number} i    index of file
     */
    function parseFiles(file, index) {
        var moduleName = file;

        if (modules[moduleName]) {
            checkModuleLoaded();
            return;
        }

        if (!/\.js/.test(file)) {
            file = file.replace('.', '/');
            file = file + '.js';
        }

        create(file, moduleName);
    }

    /**
     * @param {String}   name     the name of the module
     * @param {Array}    deps     dependencies of the module
     * @param {Function} module   module definition
     */
    include = function (name, deps, module) {
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