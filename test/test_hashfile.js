var assert = require('assert')

var hashfile = require('../lib/hashfile');


describe('hashlib', function(){
	it('should return proper hash of filename', function(){
	  assert.equal('kXQrnlOq1l.json', hashfile.hash('test_of_long_file_name.json'));
	})

	it('should return same file extension', function(){
		assert.equal('PNG', hashfile.hash('test_image.PNG').split('.').pop());
	})

	it('should return a filename of only 8 charachers', function(){
		var file = hashfile.hash('test_of_long_file_name.json');
		assert.equal(10, file.substr(0, file.lastIndexOf('.')).length);
	})
})