// Includes
const http = require('http');
const fs = require('fs').promises;
const PORT = 8080;
const listFilesClass = require('./listFilesClass.js');

function print(data){
	console.log(data);
}

var mime = {
	html: 'text/html',
	txt: 'text/plain',
	css: 'text/css',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	png: 'image/png',
	svg: 'image/svg+xml',
	js: 'application/javascript'
};


//////////////////////////////////////////////////////////////////////////
// Note to myself, when I pick this up later on. 
// - The server works
//////////////////////////////////////////////////////////////////////////


//Routing
const requestListener = function(req, res){
	print(req.url);
	if(req.url === "/"){
		fs.readFile(__dirname+"/html/index.html").then(contents => {
			res.setHeader("Content-Type", mime.html);
			res.writeHead(200);	//HTML-OK message
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read index.html ${err}`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
	if(req.url.indexOf(".html") > -1){
		fs.readFile(__dirname+"/html"+req.url).then(contents => {
			res.setHeader("Content-Type", mime.html);
			res.writeHead(200);	//HTML-OK message
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read index.html ${err}`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
	if(req.url.indexOf(".css") > -1){
		fs.readFile(__dirname+"/css"+req.url).then(contents => {
			res.setHeader("Content-Type", mime.css);
			res.writeHead(200);	//HTML-OK message
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read index.html ${err}`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
	if(req.url.indexOf(".jpg") > -1){
		fs.readFile(__dirname+"/img"+req.url).then(contents => {
			res.setHeader("Content-Type", mime.jpg);
			res.writeHead(200);
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read img ${err}`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
	if(req.url.indexOf(".png") > -1){
		fs.readFile(__dirname+"/img"+req.url).then(contents => {
			res.setHeader("Content-Type", mime.png);
			res.writeHead(200);
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read img ${err}`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
	if(req.url.indexOf(".js") > -1){
		fs.readFile(__dirname+"/scripts"+req.url).then(contents => {
			res.setHeader("Content-Type", mime.js);
			res.writeHead(200);
			res.end(contents);
		}).catch(err => {
			console.log(`Could not read script`);
			res.writeHead(500);
			res.end(err);
			return;
		});
	}
};

function main(){
	const server = http.createServer(requestListener);
	server.listen(PORT);

	let salesDir = new listFilesClass(__dirname+"/sales");
	salesDir.getDirectory();
}

main();
