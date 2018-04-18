

var arrTasks = ['Review of info', 'Pt hx and reason for visit', 'Pt exam', 'Write/dictate notes and orders', 'Counseling',
				'Interact with family of patient', 'Immunizations', 'Retrieving paperwork','Interact with PA/NP', 
				'Interact with RN', 'Interact with MA', 'Interact with other', 'Other'];
				
				
var arrLocations = ['Room1','Room2','Room3','Room4','Room5','Room6','Office','Workstation','Hallway','Zone','Other'];


var currentIdx = -1;
//var numFields = 11;
var numFields = 7;
var numRecords = 500;

var results = [];

//var results = [500][11];
var toRole = 0;
var toNote = 0;
var toChange = 0;


var cnt = 0;
var displayTaskIdx = 0;
var c_taskNameList = document.getElementsByName("c_taskName");
var c_stList = document.getElementsByName("c_st");
var c_etList = document.getElementsByName("c_et");
var c_rtList = document.getElementsByName("c_rt");
var c_roleList = document.getElementsByName("c_ro");


var exportRate = 30; //export every 30 minutes

/*
function createArray(length) {
	var arr = new Array(length || 0),
        i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
			while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

    	return arr;
}
*/


//var results = createArray(numOfRec, numOfFields);
	// stores results
	
	// 0 - task name
	// 1 - task count
	// 2 - start hour
	// 3 - start minutes
	// 4 - start seconds
	// 5 - notes
	// 6 - stop hour
	// 7 - stop minutes
	// 8 - stop seconds
	// 9 - is stop (1 - is stopped, 0 - not stopped)
	// 10- role


	
function onLoad() {

	
	var numTasks = arrTasks.length;
	
	
	var outerDiv = document.getElementById('taskGroup');

	var rightPanelDiv = document.getElementById('rightPanel');
	
	var subtaskDiv = '';
	var taskDiv = '';
	var space = '';
	
	var br = document.createElement("BR");
	
	for(var i = 0; i < numTasks; i++) {
	
		//Create subtasks
		subtaskDiv = document.createElement('DIV');
		subtaskDiv.className = 'subtask';
		subtaskDiv.id = 'subtask' + i;
		subtaskDiv.innerHTML = '&nbsp;';
		
		subtaskDiv.onclick = (function() {var taskNum = i; return function() {addTask(taskNum, true); }; })();
	
		//Create tasks
		taskDiv = document.createElement('DIV');
		taskDiv.className = 'task';
		taskDiv.id = 'task' + i;
		taskDiv.innerHTML = arrTasks[i];
		
		taskDiv.onclick = (function() {var taskNum = i; return function() {addTask(taskNum, false); }; })();
		
		
		//Add to parent DIV
		space = document.createTextNode("\u00A0");

		outerDiv.appendChild(subtaskDiv);
		outerDiv.appendChild(space);
		
		outerDiv.appendChild(taskDiv);
		outerDiv.appendChild(br);
		
		//Change task panel
		taskDiv = document.createElement('DIV');
		taskDiv.className = 'taskChange';
		taskDiv.id = 'changeTo' + i;
		taskDiv.innerHTML = arrTasks[i];
		
		
		//changeTask(this.id)
		
		taskDiv.onclick = (function() {return function() {changeTask(this.id);};})();
		
		rightPanelDiv.appendChild(taskDiv);
		
		
		//taskDiv.onclick = (function() {return function() {changeTask(this.id); }; })();

		
	}
	
	
	var createdBy = document.createElement('A');
	
	createdBy.id = 'created';
	createdBy.href="http://medicalhumanfactors.net";
	createdBy.innerHTML = 'MedStar National Center for Human Factors in Healthcare';
	createdBy.target = "_blank";
	
	
	outerDiv.appendChild(createdBy);
	
	
	
	var locationObjs = document.getElementsByClassName("location");
	
	for(var i = 0; i < locationObjs.length; i++) 
		locationObjs[i].innerHTML = arrLocations[i];
		
	
	
	
	var now = moment();
	
	
	var timeOnLoad = moment().format('H:mm:ss');
	
	
	//alert(timeOnLoad);
	
	document.getElementById("starttime").innerHTML = timeOnLoad;
	
	updateTime();
	
	setInterval(updateTime,500);
	
	setInterval(exportResults,exportRate * 60 * 1000);
	
	this.results = new Array();
	
	$("#taskTracker").hide();
	
}


Array.prototype.toResults = function() {

	var start = this[2];
	
	var startHour = start.hours();
	var startMinute = start.minutes();
	var startSeconds = start.seconds();
	
	var end = this[4];
	
	var endHour = 0;
	var endMinute = 0;
	var endSeconds = 0;
	
	
	if(end != 0) {
	
		endHour = end.hours();
		endMinute = end.minutes();
		endSeconds = end.seconds();
	
	}
		
	retVal = this.slice();

	retVal.splice(2,1,startHour,startMinute,startSeconds);
	
	retVal.splice(6,1,endHour,endMinute,endSeconds);
	
	return retVal;

}


//2 is start and 4 end 
function exportResults(wasClicked) {
	
	
	var openAsTab = true;
	

	if(wasClicked) 
		$("#exportButton").effect("highlight", {}, 300);


	var data = results;
	
	//alert(data);


	if (openAsTab && wasClicked) {
	        var win=window.open("data.html", '_blank');
	        var exportString = results;
	        win.document.write(exportString);
			
			
	}
	
	else {


	
	var csvContent = "data:text/csv;charset=utf-8,";
	
	//alert(results.length);
		
	
	
	data.forEach(function(infoArray, index){
		
		var dataString = infoArray.toResults();

		csvContent += index < (data.length - 1) ? dataString + "\n" : dataString;

	});

//	alert(csvContent);
	
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "my_data.csv");

	link.click(); // This will download the data file named "my_data.csv".

	}

}


/*
	function exportResults() {
	
		var openAsTab = false;
	
		if (openAsTab) {
	        var win=window.open("data.html", '_blank');
	        var exportString = results;
	        win.document.write(exportString);

	//        win.focus();
		} else {
			var data = results
			var csvContent = "data:text/csv;charset=utf-8,";
			data.forEach(function(infoArray, index){
				dataString = infoArray.join(",");
	   			csvContent += index < data.length ? dataString+ "\n" : dataString;
			}); 

			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "my_data.csv");

			link.click(); // This will download the data file named "my_data.csv".
		};
	





	}
*/


/*
	//task title
	results[currentIdx][0] = arrTasks[taskNum];
		
	//count
	results[currentIdx][1] = cnt;
	
	//start time
	results[currentIdx][2] = now;
	
	//note
	results[currentIdx][3] = "";
	
	//end time
	results[currentIdx][4] = 0; 
	
	//active flag
	results[currentIdx][5] = 0;
	
	//role
	results[currentIdx][6] = "";
	
	*/


function deleteFirstTask() {

	
	$("#c_delete0").effect("highlight", {}, 300);
	
	//change language to include OK button
	//change results too
	if(confirm("Are you sure you would like to delete this task?")) {
	
		//if 2nd task, shift to 1st
		if ((currentIdx-1) >= 0) {
			c_taskNameList[0].innerHTML = results[currentIdx-1][0];
			c_stList[0].innerHTML = results[currentIdx-1][2].format('H:mm:ss');
			c_etList[0].innerHTML = results[currentIdx-1][4].format('H:mm:ss');	
			
			c_roleList[0].innerHTML = results[currentIdx-1][6];
			
			results[currentIdx-1][4] = 0;
		
			c_etList[0].innerHTML = ".....";
		
		} else {
			c_taskNameList[0].innerHTML = ".....";
			c_roleList[0].innerHTML = ".....";
			c_stList[0].innerHTML = ".....";
			c_etList[0].innerHTML = ".....";
			c_rtList[0].innerHTML = ".....";
		}
		
		// if 3rd task, shift to 2nd
		if ((currentIdx-2)>=0) {
			c_taskNameList[1].innerHTML = results[currentIdx-2][0];
			c_roleList[1].innerHTML = results[currentIdx-2][6];
			
			c_stList[1].innerHTML = results[currentIdx-2][2].format('H:mm:ss');	
			
			c_etList[1].innerHTML = results[currentIdx-2][4].format('H:mm:ss');	
		} else {
			c_taskNameList[1].innerHTML = ".....";
			c_roleList[1].innerHTML = ".....";
			c_stList[1].innerHTML = ".....";
			c_etList[1].innerHTML = ".....";
			c_rtList[1].innerHTML = ".....";
		}
		
		
		// if 4th task, shift to 3rd
		if ((currentIdx-3)>=0) {
			c_taskNameList[2].innerHTML = results[currentIdx-3][0];
			c_roleList[2].innerHTML = results[currentIdx-3][6];
			c_stList[2].innerHTML = results[currentIdx-3][2].format('H:mm:ss');	;	
			c_etList[2].innerHTML = results[currentIdx-3][4][2].format('H:mm:ss');	
		} else {
			c_taskNameList[2].innerHTML = ".....";
			c_roleList[2].innerHTML = ".....";
			c_stList[2].innerHTML = ".....";
			c_etList[2].innerHTML = ".....";
			c_rtList[2].innerHTML = ".....";
		}
		
		
		// if 4th task, shift to 3rd
		if ((currentIdx-4) >=0) {
			c_taskNameList[3].innerHTML = results[currentIdx-4][0];
			c_roleList[3].innerHTML = results[currentIdx-4][6];
			c_stList[3].innerHTML = results[currentIdx-4][2].format('H:mm:ss');	
			c_etList[3].innerHTML = results[currentIdx-4][4].format('H:mm:ss');	
			
		} else {
			c_taskNameList[3].innerHTML = ".....";
			c_roleList[3].innerHTML = ".....";
			c_stList[3].innerHTML = ".....";
			c_etList[3].innerHTML = ".....";
			c_rtList[3].innerHTML = ".....";

		}

		currentIdx = currentIdx - 1;
	}

}


function normal() {

	document.getElementById("heartBeat").style.width = "75px";
	document.getElementById("heartBeat").style.height = "75px";



}



function toggleScreen() {
	
	$("#bitalinoCalibration").toggle();
	$("#taskTracker").toggle();
	
	
}


function setHeartSize(pixels) {
	
	document.getElementById("heartBeat").style.width = pixels;
	document.getElementById("heartBeat").style.height = pixels;


}



function updateTime() {
	
	//var now = moment().format('h:mm:ss');
	
	var now = moment();
	
	//document.getElementById('currenttime').innerHTML = moment().format('h:mm:ss');
	
	//document.getElementById('currenttime').innerHTML = now.format('h:mm:ss');
	document.getElementById('currenttime').innerHTML = now.format('H:mm:ss');
	
	
    // Change A
    // if tasks are present: increment time
	if(c_stList[0].innerHTML[0] != "." && c_etList[0].innerHTML[0] == "." && c_etList[0].innerHTML[1] == ".") 
    	c_rtList[0].innerHTML = now.diff(moment(c_stList[0].innerHTML,'H:mm:ss'),'seconds');
		
	if(c_stList[1].innerHTML[0] != "." && c_etList[1].innerHTML[0] == "." && c_etList[1].innerHTML[1] == ".") 
    	c_rtList[1].innerHTML = now.diff(moment(c_stList[1].innerHTML,'H:mm:ss'),'seconds');

	if(c_stList[2].innerHTML[0] != "." && c_etList[2].innerHTML[0] == "." && c_etList[2].innerHTML[1] == ".") 
    	c_rtList[2].innerHTML = now.diff(moment(c_stList[2].innerHTML,'H:mm:ss'),'seconds');

	if(c_stList[3].innerHTML[0] != "." && c_etList[3].innerHTML[0] == "." && c_etList[3].innerHTML[1] == ".") 
    	c_rtList[3].innerHTML = now.diff(moment(c_stList[3].innerHTML,'H:mm:ss'),'seconds');
		
	
		
}




function shiftDown(curr) {
// shift task list down
	rIdx = curr;
	
	for(i = 1;i < 4; i++) { //length of shift
		if(rIdx== -1 || results[rIdx][0] == undefined) {

		} else {

			c_taskNameList[i].innerHTML = results[rIdx][0];
			c_roleList[i].innerHTML = results[rIdx][6];

			
			var startTime = moment(results[rIdx][2],'H:mm:ss')
			
			var endTime = results[rIdx][4];
			
			if(endTime == 0)
				endTime = moment();
			else
				endTime = moment(endTime,'H:mm:ss')
			
			c_rtList[i].innerHTML = endTime.diff(startTime,'seconds');
			
			//c_stList[i].innerHTML = results[rIdx][2]+":"+results[rIdx][3]+":"+results[rIdx][4];		
			
			c_stList[i].innerHTML = moment(results[rIdx][2]).format('H:mm:ss');
			
			//alert(results[rIdx][4]);
			
			if(results[rIdx][4] == 0)
				c_etList[i].innerHTML = ".....";
			else
				c_etList[i].innerHTML = moment(results[rIdx][4]).format('H:mm:ss');
				//c_etList[i].innerHTML = moment(results[rIdx][4]).format('H:mm:ss');

			c_roleList[i].innerHTML = results[rIdx][6];
			
			//alert(
	

			//alert(rIdx
	
			if (results[rIdx][4]==0) {
				c_taskNameList[i].style.background='#99ffbb'; // light green

				} else {
				c_taskNameList[i].style.background= '#ffcce0'; //light red
			}

			
			//toRole = 0;
			rIdx = rIdx -1;

			}
	}
}




function addTask(taskNum,isSubTask) {

	var task = '';
	
	if(!isSubTask) {
		stopAll();
		task = document.getElementsByClassName("task")[taskNum];
		
	}
	else
		task = document.getElementsByClassName("subtask")[taskNum];
	
	$('#' + task.id).effect("highlight", {}, 300);
	
	
	
	shiftDown(currentIdx);
	
	
	
	var now = moment();
	
	
	currentIdx = currentIdx + 1;
	
	results[currentIdx] = new Array(numFields);
	
	
	
	
	
	//task title
	results[currentIdx][0] = arrTasks[taskNum];
		
	//count
	results[currentIdx][1] = cnt;
	
	//start time
	results[currentIdx][2] = now;
	
	//note
	results[currentIdx][3] = "";
	
	//end time
	results[currentIdx][4] = 0; 
	
	//active flag
	results[currentIdx][5] = 0;
	
	//role
	results[currentIdx][6] = "";
	
	
	
	// always write to top
	c_taskNameList[0].innerHTML = arrTasks[taskNum];;
	c_stList[0].innerHTML = now.format('H:mm:ss');
	
	c_etList[0].innerHTML = ".....";
	c_roleList[0].innerHTML = ".....";
	

	c_taskNameList[0].style.background = '#99ffbb'; // color light green - still going
	toRole = 0;
	cnt = cnt+1;

		
	
}


function stopAll() {
	// stop all active in taskList
	for (i=0; i<4; i++) {
		offSet = currentIdx-i;
		if (offSet>=0) {
			if(results[offSet][4]==0) {
				// stop if previously stopped
				stopOne(i);
			}
		}
	}


}


function stopOne(taskNum) {
		// stop taskN in list, 0 is top of list
		//if already stopped, do nothing
		//*does not catch rare condition if it was previously stopped on 0:0:0
		
		//alert('hello')
		
		var temp = currentIdx - taskNum;

		//alert(results[temp][4]);
		
		if(results[temp][4] == 0) {
			
			var now = moment();
			
			results[temp][4] = now;
			results[temp][5] = 1;
			c_etList[taskNum].innerHTML = now.format('H:mm:ss');
						
			c_taskNameList[taskNum].style.background= '#ffcce0'; // color light red	
		}

	}

	
	
	
function stopTask(taskNum) {
	
	$('#c_stop' + taskNum).effect("highlight", {}, 300);
	
	stopOne(taskNum);
	
}



function changeTaskLocation(taskNum) {

	$("#c_ro" + taskNum).effect("highlight", {}, 300);
	toRole = taskNum;
}
	
	
function assignLocation(locationId) {
	
	var loc = document.getElementById(locationId).innerHTML;
	
	$('#' + locationId).effect("highlight", {}, 300);
	
	temp = currentIdx - toRole;
	
	if(temp >= 0) {
		results[temp][6] = loc;
		c_roleList[toRole].innerHTML = loc;

	}
	
}
	
	
function writeNote(taskNum) {
			
	
	$('#rightPanel').hide();
				
	$('#c_note' + taskNum).effect("highlight", {}, 300);
	
	toNote = taskNum;
	temp = currentIdx-toNote

	if (results[temp][5] == null) {
		document.getElementById('comments').value = ""
	} else {
		document.getElementById('comments').value = results[temp][3];
	}

	
	$('#notePanel').show();
	
	
	
	
}

function saveNote() {
	
	$('#saveNote').effect("highlight", {}, 300);
	
	temp = currentIdx-toNote;
	var str = document.getElementById('comments').value;

	var res = str.replace(/,/g, "...")

	results[temp][3] = res;
	
	$('#notePanel').hide();
	
	
	
	document.getElementById('comments').value = "";
}


function cancelNote() {
	
	$('#cancelNote').effect("highlight", {}, 300);
	
	$('#notePanel').hide();
	
	document.getElementById('comments').value = "";
	
}


function changeTaskNum(taskNum) {
	
	//check to see if note panel is up and hide if so
	
	$('#notePanel').hide();
	
	$('#c_ch' + taskNum).effect("highlight", {}, 300);
	toChange = taskNum;
	$('#rightPanel').show();
	
}


function changeTask(taskId) {


	taskTitle = document.getElementById(taskId).innerHTML;
	
	$('#' + taskId).effect("highlight", {}, 300);
	
	temp = currentIdx-toChange;
		if(temp>=0) {
			results[temp][0] = taskTitle;
			c_taskNameList[toChange].innerHTML = taskTitle;
		}

	$('#rightPanel').hide();
		
}



	
	
	

