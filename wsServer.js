const WebSocketServer = require('ws');
const socketServer = new WebSocketServer.Server({ port: 443 });
const fs = require('fs');


socketServer.on('connection', wsClient => {
	console.log('Client connected!')
	wsClient.on('close', () => console.log('Client disconnected!'))


	wsClient.on('message', data => {
		if(data.toString() === "REQ: Sales"){
			fs.readdir(__dirname+"/pdfs/sales", function(err, files){
				if(err) {
					console.log("Unable to scan directory" + err);
				}
				let JSONFiles = JSON.stringify(files.map( (file) => {
					return { file };
				}));
				wsClient.send(JSONFiles);

			});
		}
		
		if(data.toString() === "REQ: News"){
			fs.readdir(__dirname+"/pdfs/news", function(err, files){
				if(err) {
					console.log("Unable to scan directory" + err);
				}
				let JSONFiles = JSON.stringify(files.map( (file) => {
					return { file };
				}));
				wsClient.send(JSONFiles);

			});
		}


		/*socketServer.clients.forEach(client => {
			console.log(`distributing message: ${data}`)
			client.send(`${data}`)
			})*/
	})
	

	wsClient.onerror = function () {
		console.log('websocket error')
	}
})

//https://www.pubnub.com/blog/nodejs-websocket-programming-examples/
//https://www.honeybadger.io/blog/websocket-node/
//https://medium.com/@vitaliykorzenkoua/working-with-websocket-in-node-js-using-typescript-1aebb8a06bd6
