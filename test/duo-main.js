/**
 * Module Dependencies
 */

var assert = require('assert');
var main = require('../');

/**
 * Tests
 */

describe('duo-main', function() {
  describe('entry', function() {

    describe('existing component.json files', function() {

      it('should pull main when css', function() {
        var entries = main({ main: 'index.css' })
        assert('index.css' == entries[0]);
      })

      it('should pull main when js', function() {
        var entries = main({ main: 'index.js' })
        assert('index.js' == entries[0]);
      })

      it('should pull scripts when main is css', function() {
        var entries = main({ main: 'index.css', scripts: [ 'a.js', 'b.js'] });
        assert('index.css' == entries[0]);
        assert('a.js' == entries[1]);
        assert(2 == entries.length);
      })

      it('should pull styles when main is js', function() {
        var entries = main({ main: 'index.js', styles: [ 'a.css', 'b.css'] });
        assert('index.js' == entries[0]);
        assert('a.css' == entries[1]);
        assert(2 == entries.length);
      })

      it('should pull scripts when no main', function() {
        var entries = main({ scripts: [ 'a.js', 'b.js'] });
        assert('a.js' == entries[0]);
        assert(1 == entries.length);
      })

      it('should pull styles when no main', function() {
        var entries = main({ styles: [ 'a.css', 'b.css'] });
        assert('a.css' == entries[0]);
        assert(1 == entries.length);
      })

      it('should pull scripts and styles when no main', function() {
        var entries = main({ scripts: [ 'a.js', 'b.js'], styles: [ 'a.css', 'b.css'] });
        assert('a.js' == entries[0]);
        assert('a.css' == entries[1]);
        assert(2 == entries.length);
      })
    });

    describe('main that is not css or js', function() {

      it('should not pull in scripts', function() {
        var entries = main({ main: 'index.styl', scripts: [ 'a.js', 'b.js'] });
        assert('index.styl' == entries[0]);
        assert(1 == entries.length);
      })

      it('should not pull in styles', function() {
        var entries = main({ main: 'index.coffee', styles: [ 'a.css', 'b.css'] });
        assert('index.coffee' == entries[0]);
        assert(1 == entries.length);
      })
    })

    describe('main array', function() {
      it('should include all mains in an array', function() {
        var entries = main({ main: ['index.js', 'index.coffee', 'index.styl', 'index.css']})
        assert('index.js' == entries[0]);
        assert('index.coffee' == entries[1]);
        assert('index.styl' == entries[2]);
        assert('index.css' == entries[3]);
        assert(4 == entries.length);
      })
    });

    describe('main objects', function() {
      it('should include all values in the object', function() {
        var entries = main({ main: { js: 'index.js', css: 'index.css' }});
        assert('index.js' == entries[0]);
        assert('index.css' == entries[1]);
        assert(2 == entries.length);
      })
    });
  });

  describe('dependencies', function() {
    describe('existing component.json files', function() {
      it('should select main if the type matches ', function() {
        var entry = main({ main: 'index.js' }, 'js');
        assert('index.js' == entry);
      })

      it('should return false if the type doesnt match', function() {
        var entry = main({ main: 'index.js' }, 'css');
        assert(!entry);
      })

      it('should pull in scripts if main is css and type js', function() {
        var entry = main({ main: 'index.css', scripts: [ 'a.js', 'b.js' ]}, 'js');
        assert('a.js' == entry);
      })

      it('should pull in styles if main is js and type css', function() {
        var entry = main({ main: 'index.js', styles: [ 'a.css', 'b.css' ]}, 'css');
        assert('a.css' == entry);
      })
    })

    it('should pull scripts when no main', function() {
      var entry = main({ scripts: [ 'a.js', 'b.js'] }, 'js');
      assert('a.js' == entry);
    })

    it('should pull styles when no main', function() {
      var entry = main({ styles: [ 'a.css', 'b.css'] }, 'css');
      assert('a.css' == entry);
    })

    it('should pull scripts or styles when no main', function() {
      var entry = main({ scripts: [ 'a.js', 'b.js'], styles: [ 'a.css', 'b.css'] }, 'css');
      assert('a.css' == entry);
    })

    describe('main string thats not css or js', function() {
      it('should be the entry', function() {
        assert('index.coffee' == main({ main: 'index.coffee' }, 'js'));
        assert('index.styl' == main({ main: 'index.styl' }, 'js'));
      })
    })

    describe('main array', function() {
      it('should return false', function() {
        var entry = main({ main: ['index.js', 'b.js' ] }, 'js');
        assert(false == entry);
      })
    })

    describe('main objects', function() {
      it('should include the entry with corresponding key', function() {
        assert('index.js' == main({ main: { js: 'index.js', css: 'index.css'} }, 'js'));
        assert('index.css' == main({ main: { js: 'index.js', css: 'index.css'} }, 'css'));
      })

      it('should return false if no key available', function() {
        var entry = main({ main: { css: 'index.css'} }, 'js');
        assert(false == entry);
      })

      it('should work with non js or css values', function() {
        assert('index.coffee' == main({ main: { js: 'index.coffee', css: 'index.css'} }, 'js'));
        assert('index.styl' == main({ main: { js: 'index.js', css: 'index.styl'} }, 'css'));
      })
    })
  })
})
