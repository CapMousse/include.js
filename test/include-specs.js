describe("Replace define", function(){
    it("include should replace Require and Define", function(){
        var test = false;

        if (require && define) {
            test = true;
        }

        expect(test).toBe(true);
    });
});

describe("Anonymous function", function(){
    it("include should be able to launch anonymous function", function(done){
        include(function(){
            expect(true).toBe(true);
            done();
        });
    });
});

describe("Normal script", function(){
    it("should be able to load normal javascript", function(done){
        include(['data/a.js'], function(){
            expect($).toBe('a');
            done();
        });
    });
});

describe("Module name", function(){
    it("should be able to load javascript module with module name", function(done){
        include(['data.c'], function(c){
            expect(c).toBe('c');
            done();
        });
    });

    it("should be able to reload module", function(done){
        include(['data.c'], function(c){
            expect(c).toBe('c');
            done();
        });
    });
});

describe("Include nested dependencies", function(){
    it("should be able to load nested dependencies", function(done){
        include(['data.d'], function(d){
            expect(d.e).toBe('e');
            done();
        });
    });

    it("should be able to load nested dependencies with normal scripts", function(done){
        include(['data.f'], function(f){
            expect(f).toBe(true);
            done();
        });
    });
});

describe("Include external script", function(){
    it("should be able to load normal scripts as module", function(done){
        include([['stripe', 'https://js.stripe.com/v2/stripe.js']], function(stripe){
            expect(stripe).toEqual(jasmine.any(Function));
            done();
        });
    });

    it("should be able to reload normal scripts as module", function(done){
        include([['stripe', 'https://js.stripe.com/v2/stripe.js']], function(stripe){
            expect(stripe).toEqual(jasmine.any(Function));
            done();
        });
    });
});

describe("Include css", function(){
    it("should be able to load css", function(done){
        include(['https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/4.1.0/sanitize.css'], function(css){
            expect(css).toBe(null);
            done();
        });
    });

    it("should be able to load css and module", function(done){
        inc = include([
            'https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/4.1.0/sanitize.css', 
            'data/b.js'
        ], function(css, b){
            expect(css).toBe(null);
            expect(b).toBe('b');
            done();
        });
    });

    it("should be able to load css and script as module", function(done){
        inc = include([
            'https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/4.1.0/sanitize.css', 
            ['stripe', 'https://js.stripe.com/v2/stripe.js']
        ], function(css, stripe){
            expect(css).toBe(null);
            expect(stripe).toEqual(jasmine.any(Function));
            done();
        });
    });
});