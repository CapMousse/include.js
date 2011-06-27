/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Backbone.Template = {
    compiled:   false,
    template :  '',
    compile :   function(){
        this.template = this.template instanceof Array ? this.template.join('') : this.template;
        
        this.template = _.template(this.template);
        this.compiled = true;
    },
    apply: function(data){
        if(!this.compiled)
            this.compile();
        
        return this.template(data);
    }
};

Backbone.Template.extend = function(params){
    var instance = _.clone(Backbone.Template);
    return _.extend(instance, params);
};