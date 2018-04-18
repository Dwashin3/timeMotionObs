
//Array for storing synch timestamps
var arrSynch = new Array();
		
var synchInterval = 5; 			//Frequency for synching with BITalino in minutes
var synchExportInterval = 30; 	//Frequency for exporting synch timestamps in minutes
		


var ws = null;


// Define the boolean data type as used in Python
var True = true;
var False = false;
	

var readings = [];


var maxSamples = 500;


var options = {
				xaxis: {min: 0, max: maxSamples},
				yaxis: {min:0, max: 1024}
				};

				
				

var samplesPerSecond = 100;
var samplesToRead = 10;






function stopButtonClicked() {
	
	ws.send("device.close()")

	// Request ServerBIT to shut down
	ws.send("server.shutdown()");

	ws.onclose = function () {};
	
	ws.close()

}

		
function startButtonClicked() {


	// Establish a connection to the ServerBIT
	ws = new WebSocket("ws://localhost:9001 ");
	
	ws.onopen = function() {};

	// Process the responses sent by the ServerBIT
	ws.onmessage = function (e) {
		msg = e.data.toString()

		// Write responses to page
		if (msg.indexOf("read") < 0 && msg.indexOf("peak") < 0)
			
			//When first connecting, send synch message and record the time
			if(msg == "device.start();") {
				
				synch();
				exportSynch();
				setInterval(exportSynch,synchExportInterval * 1000 * 60);
				
				document.getElementById("serverResponse").innerHTML = "Server: Begin Aquisition"
									
			}
			else if(msg == "server.connected()")
				document.getElementById("serverResponse").innerHTML = "Server: Connection Accepted";
				
			else if(msg.indexOf("BITalino") >= 0)
				document.getElementById("serverResponse").innerHTML = "Server: Connected to device";
		
		
		// Evaluate the respose
		eval(e.data)
		

	};
	
	//Export and download array of synch timestamps as csv
	exportSynch = function() {
				
		var csvContent = "data:text/csv;charset=utf-8,";
		
		csvContent += arrSynch.join();
		
		var encodedUri = encodeURI(csvContent);
		
		var link = document.createElement("a");

		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "TaskTracker_synch.csv");

		link.click(); 
	
	
	
	}
	
	//Send synch message to server and record the time
	synch = function() {
		
		ws.send("server.synch()");
		
		var now = new Date();
		
		arrSynch.push(now.getTime());
	
		setTimeout(synch, synchInterval * 1000 * 60);
			
	
	};

	// Detect when the page is unloaded or close
	window.onbeforeunload = function() {
		// Request ServerBIT to close the connection to BITalino
		ws.send("device.close()")

		
		// Request ServerBIT to shut down
		ws.send("server.shutdown()");

		ws.onclose = function () {};

		ws.close()
	};

	// Process the server messages related with the server
	server = new function() {
		
		this.connected = function(msg) {
			// When a connection to ServerBIT is established, open the connection to the device
			ws.send("server.BITalino('98:d3:31:b2:c2:6b')");
			
		};

		this.BITalino = function(msg) {
			if (msg) 
				// When a connection to the device is established start the acquisition
				ws.send("device.start(" + samplesPerSecond + ", [2])")
								
		}
		
		
			
			
		this.peakfound = function(msg) {
			
			setHeartSize("85px");

			setTimeout(function() {setHeartSize("75px");}, 100);

		}

		
		
	}

	// Process the server messages related with the device
	device = new function() {

		this.start = function(msg) {
			// When the device starts the acquisition read samples
			ws.send("device.read(" + samplesToRead + ")[:,-1]");
			
			
		};
	
	
		this.read = function(msg) {
			// When a set of samples is read request more samples
			ws.send("device.read(" + samplesToRead + ")[:,-1]")
		
			
			//Reset ECG trace on page
			if(readings.length + msg.length > maxSamples) 
				readings = [];
				
			for (var i = 0; i < msg.length; i++)				
				if((i % 2) == 0)
					readings.push([readings.length, msg[i]]);
				
				
		
			$.plot($("#placeholder"), [readings], options );
			
		}
				
		this.version = function(msg) {};
		this.stop = function(msg) {};
		this.close = function(msg) {};
	}


	// Process the server messages related with exceptions
	sys = new function() {
		this.exception = function(msg) {
			alert(msg.toString());
		};
	};
	

}
