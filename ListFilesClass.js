const fs = require('fs');

class ListFilesClass{
	constructor(directory){
		this.dir = directory;
	}

	get_file_names(){
		fs.readdir(this.dir, function(err, files){
			if(err) {
				console.log("Unable to scan directory" + err);
			}

			let fileList = []
			files.forEach(function(file){
				fileList.push(file);
				return JSON.stringify(fileList);
			});
		});
	}
}

module.exports = ListFilesClass;
