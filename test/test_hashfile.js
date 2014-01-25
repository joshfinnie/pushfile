var assert = require('assert')

var hashfile = require('../lib/hashfile');


describe('hashlib', function(){

	it('should return proper hash of filename', function(){
	  hashfile.hash('test/test_of_long_file_name.json', 'test_salt', function (result){
	  	assert.equal('aNLAzajPvK.json', result);
	  });
	})

	it('should return same file extension', function(){
	  hashfile.hash('test/test_of_long_file_name.json', 'test_salt', function (result) {
	  	assert.equal('json', result.split('.').pop());
	  });
	})

	it('should return a filename of only 10 charachers', function(){
	  hashfile.hash('test/test_of_long_file_name.json', 'test_salt', function (result) {
	  	assert.equal(10, result.substr(0, result.lastIndexOf('.')).length);
	  });
	})
	
})