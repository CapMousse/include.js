describe("Include", function(){
    var test;

    it("should be able to launch anonymous function", function(){
        runs(function(){
            test = false; 

            include(function(){
                test = true;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't launch anonymous function", 500);

        runs(function() {
            expect(test).toBe(true);
        })
    });


    it("should be able to load normal javascript", function(){
        runs(function(){
            test = false; 

            include(['data/a.js'], function(){
                test = $;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't load normal javascript", 500);

        runs(function() {
            expect(test).toBe('a');
        })

    });


    it("should be able to load javascript module with normal URL", function(){
        runs(function(){
            test = false;
            

            include(['data/b.js'], function(b){
                test = b;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't javascript module with normal URL", 500);

        runs(function() {
            expect(test).toBe('b');
        })
    });


    it("should be able to load javascript module with module name", function(){
        runs(function(){
            test = false;
            

            include(['data.c'], function(c){
                test = c;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't javascript module with module name", 500);

        runs(function() {
            expect(test).toBe('c');
        })
    });


    it("should be able to reload module", function(){
        runs(function(){
            test = false;
            

            include(['data.c'], function(c){
                test = c;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't reload module", 500);

        runs(function() {
            expect(test).toBe('c');
        })
    });


    it("should be able to load nested dependencies", function(){
        runs(function(){
            test = false;
            

            include(['data.d'], function(d){
                test = d.e;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't load nested dependencies", 500);

        runs(function() {
            expect(test).toBe('e');
        })
    });


    it("should be able to load nested dependencies with normal scripts", function(){
        runs(function(){
            test = false;
            

            include(['data.f'], function(f){
                test = f;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't load nested dependencies", 500);

        runs(function() {
            expect(test).toBe(true);
        })
    });


    it("should be able to load external scripts", function(){
        runs(function(){
            test = false;
            

            include(['http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js'], function(){
                test = jQuery&&true;
            });
        });

        waitsFor(function() {
            return test;
        }, "Include can't load externak scripts", 2000);

        runs(function() {
            expect(test).toBe(true);
        })
    });

    it("should replace Require and Define", function(){
        var test = false;

        if (require && define) {
            test = true;
        }

        expect(test).toBe(true);
    });
});