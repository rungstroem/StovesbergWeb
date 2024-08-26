// Get the host address for websocket 
var hostname = location.hostname;

const WebSocketClient = new WebSocket('ws://'+hostname+':443/');

var list = document.querySelector(".list");

WebSocketClient.onmessage = (event) => {
	let files = JSON.parse(event.data);
	let listItems = "";
		
	for(let [key,val] of Object.entries(files)){
		let item = val.file;
		let itemReduced = item.slice(0,30);	
		listItems += `<li><a href="sales/${item}">${itemReduced}</a></li>`;
	}

	list.innerHTML = listItems;
}


WebSocketClient.addEventListener("open", () => {
	console.log("Connected to server");
	WebSocketClient.send('REQ: Sales');
});
