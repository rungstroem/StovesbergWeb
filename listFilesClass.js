class listFilesClass{
	constructor(directory){
		this.dir = directory;
	}

	getDirectory(){
		console.log(this.dir);
	}
}

module.exports = listFilesClass;
