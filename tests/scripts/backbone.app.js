//     Backbone.App.js
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.

(function(){
    
    if(typeof Backbone === "undefined" || typeof require === "undefined"){
        throw("Backbone or Require is not defined");
        return false;
    }
    
    Backbone.App = function(options) {
        options || (options = {});

        this.models = {};
        this.controllers = {};
        this.templates = {};
        this.collections = {};
        this.views = {};

        this._fetchRequiredFiles();
        
        return this;
    };

    _.extend(Backbone.App.prototype, Backbone.Events, {
        appName : null,
        appDir : null,
        require: null,

        initialize : function(){},

        _fetchRequiredFiles : function(){
            if(this.appName == null || this.appDir == null){
                console.log('appName and/or appDir is missing');
                return;
            }

            if(this.require != null && typeof this.require != "string"){
                require({
                    files: this._parseFileName(this.require),
                    success : this.initialize
                });
            }else{
                this.initialize();
            }

            return;
        },

        _parseFileName : function(files){ 
            var returnFiles = [],
                appName = this.appName,
                appDir = this.appDir;

            _.each(files, function(value, index){
                value = value.replace(appName, appDir)
                             .replace(/\./g, '/')+".js";

                returnFiles.push([value, files[index]]);
            });

            return returnFiles;
        }
    });

    Backbone.App.extend = Backbone.View.extend;
})();