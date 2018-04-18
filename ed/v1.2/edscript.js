// This scripte was created by MedStar Health National Center for Human Factors in Healthcare, 2014. Author: Allan Fong and Raj Ratwani
// This code is publically available for anyone to use and modify though we request that users reference the code: Fong, A., Meadors, M., Batta, N., Nitzberg, M., Hettinger, A., & Ratwani, R. (2014). Identifying Interruption Clusters in the Emergency Department. Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 58, 743-747

// Defines the task object
function Task(startTime, name){
  
    this.startTime = startTime;
    this.name = name;  //name of Task
    this.startArr = new Array(0);
    this.stopArr = new Array(0);
    this.location = "";
    this.description = "";
        
}

    
$(document).ready(function(){

    var timeOnLoad = new Date();
    var timeOnLoadSec = Math.round(timeOnLoad.getTime());
    var allTasks = new Array();
    var multiTask = false;
    var toEnd = false;
    var lastTask = "asdf";
    
    $('#log').prepend(''+timeOnLoad.getTime()+',start,<br/>');
    
    //multi-task state, changes Status background color
    $('.multi').click(function() {
        var newTime = new Date();
        document.getElementById("status").innerHTML = "STATUS:"
        //if currently multiTask, turns off multiTask
        if (multiTask) {
            $('#rightPanel').css("background-color", "#FFFFFF");
            $('.multi').css("background-color", "#808080");
            multiTask=false;
            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',multi-OFF,<br/>');
        } else {
            $('#rightPanel').css("background-color", "#FF9966");
            $('.multi').css("background-color", "#FF9966");
            multiTask=true;
            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',multi-ON,<br/>');
        }
    });

////////////////// Interruption Strategies /////////////////////    
    //Reject, delay, start, add note, appends to log
    $('#interrupt').click(function(){
        var newTime = new Date();
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',interrupt,<br/>');
        document.getElementById("status").innerHTML = "STATUS: INTERRUPT " + lastTask;
    });
    $('#delay').click(function(){
        var newTime = new Date();
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',delay,<br/>');
        document.getElementById("status").innerHTML = "STATUS: DELAY " + lastTask;
    });
    $('#start').click(function(){
        var newTime = new Date();
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',start,<br/>');
        document.getElementById("status").innerHTML = "STATUS: START " + lastTask;
    });



////////////////// CODE FOR LOCATION  ////////////
    $('#loc-wow').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-wow,<br/>');
    });
    $('#loc-desk').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-desk,<br/>');
    });
    $('#loc-ipr').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-ipr,<br/>');
    });
    $('#loc-opr').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-opr,<br/>');
    });
    $('#loc-hall').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-hall,<br/>');
    });
    $('#loc-other').click(function(){
        var newTime = new Date();
        $(this).css('background-color', 'green');
        $("#locationAtt div").not(this).css('background-color', '#808080');
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',loc-other,<br/>');
    });





////////////////// CODE FOR Patient Counter  ////////////
    $('#subP').click(function(){
        var newTime = new Date();
        var currCnt = document.getElementById("patCnt").innerHTML;
        var newCnt = Number(currCnt)-1
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',note, patCnt '+newCnt+',<br/>');
        document.getElementById("patCnt").innerHTML = newCnt;
    });
    $('#addP').click(function(){
        var newTime = new Date();
        var currCnt = document.getElementById("patCnt").innerHTML;
        var newCnt = Number(currCnt)+1
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',note, patCnt '+newCnt+',<br/>');
        document.getElementById("patCnt").innerHTML = newCnt;
    });


////////////////// Other functions: Notes, End /////////////////////
    $('#addNote').click(function(){
        var newTime = new Date();
        $(this).effect("highlight", {}, 300);
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',note,'+document.getElementById("description").value+',<br/>');
        document.getElementById("description").value = "";
    });
    
    $('#end').click(function(){
        if (toEnd) {
            $(this).css('background-color', '#808080');
            toEnd = false;
        } else {
            $(this).css('background-color', 'red');
            toEnd = true;
        }        
    });
    
  //  $(this).css('background-color', 'blue');
  //              $(this).html(currPre+"f");
  //              $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'off<br/>');
  //          } else {
  //              $(this).css('background-color', 'green');
  //              $(this).html(currPre+"o");
  //              $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'on<br/>');
    
    //Multi on-off
    //task on-off
    //task ends
    

    

    
    document.getElementById("p1").innerHTML = timeOnLoad.getHours() + ":" + timeOnLoad.getMinutes() + ":" + timeOnLoad.getSeconds();

////////////////// Task Type /////////////////////
    $('#newTaskGroup').click(function() {
        document.getElementById("status").innerHTML = "STATUS:"    
    });

    $('#add_comp_pthx_hpi').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "computer_pthx_hpi "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_comp_lires').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "comp_lires "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_comp_disp').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "comp_disp "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_pt_con_hist').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "pt_care_con_hist "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_pt_pro_pe').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "pt_pro_pe "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_equip_malf').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "equip_malf "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_equip_miss').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "equip_miss "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_nursetech_ord').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "nursetech_ord "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_nursetech_other').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "nursetech_other "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_student_sup').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "student_sup "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_student_tea').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "student_tea "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_phone_adm').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "phone_adm "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_phone_cons').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "phone_cons "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });
    $('#add_phone_emt').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "phone_emt "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });   
    $('#add_phys_adm').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "phys_adm "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });     
    $('#add_phys_cons').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "phys_cons "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });   
    $('#add_delays').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "delays "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });    
    $('#add_other').click(function(){
        //puts a new tasks in the array
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        allTasks.push(new Task(Math.round(newTime.getTime()-timeOnLoadSec)/1000-timeOnLoadSec, "other "+(allTasks.length)+",f"));
        $('#list').prepend('<div class="item">' + allTasks[allTasks.length-1].name + '</div>');        
        $('.item:first-child').click();
        lastTask = "dpc";
    });   



    
    $('#exportButton').click(function(){
        /** Export to csv **/
        var exportString = $('#log').html();
        exportString = exportString.replace(/<br\s*\/?>/ig, "\r\n");
        var a = document.createElement('a');
        a.href = 'data:attachment/csv,' + encodeURIComponent(exportString);
        a.target = '_blank';
        a.download = 'myFile.csv';

        document.body.appendChild(a);
        a.click();

/*
        var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exportString));
    pom.setAttribute('download', filename);
    pom.click();
*/        
        /** Export to new html page **/
        /*
        $(this).effect("highlight", {}, 300);
        var win=window.open("data.html", '_blank');
        var exportString = $('#log').html();
        win.document.write(exportString);
        win.focus();
        */        
    });
    

    
    //////////////////////////////////////////////////////
    
    
    $('#list').on('click', '.item', function() {
        
        //find associated task and assign as currentTask
        var currentTask;
        var newTime = new Date();
        for (i=0; i<allTasks.length; i++) {
            
            if ($(this).html()==allTasks[i].name) {
                var currentButton = $(this);
                currentTask = allTasks[i];
                break;
            }            
        }
        var currName = $(this).html();
        var currPre = currName.substr(0,currName.length-1);
        var currPost = currName.substr(currName.length-1);
        
        //if toEnd state is true, remove item
        if (toEnd) {
            if (currName.substr(currName.length-1)=="f") {    
            } else {
                $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'off,<br/>');
            }
            //$('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'removed<br/>');
            $(this).remove();
            $('#end').css('background-color', '#808080');
            toEnd = false;
        } else {
            if (multiTask) {
                //code
                //if task On turn OFF, if task OFF turn ON
                if (currName.substr(currName.length-1)=="o") {
                    $(this).css('background-color', 'blue');
                    $(this).html(currPre+"f");
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'off,<br/>');
                } else {
                    $(this).css('background-color', 'green');
                    $(this).html(currPre+"o");
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'on,<br/>');
                } 
                
            } else {
                
                //if task OFF turn ON and turn every other task OFF
                if (currName.substr(currName.length-1)=="f") {
                    
                    //turn every other task off
                    var containerDiv = document.getElementById("list");
                    var innerDivs = containerDiv.getElementsByTagName("div");
                    for (i=0; i<innerDivs.length; i++) {
                        tempName = innerDivs[i].innerHTML;
                        tempPre = tempName.substr(0,tempName.length-1);
                        if (tempName.substr(tempName.length-1)=="o") {
                            innerDivs[i].innerHTML=tempPre+"f";
                            innerDivs[i].style.backgroundColor="blue";
                            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+tempPre+'off,<br/>');
                        }
                    }
                    
                    $(this).css('background-color', 'green');
                    $(this).html(currPre+"o");
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'on,<br/>');
                        
                } else {
                    $(this).css('background-color', 'blue');
                    $(this).html(currPre+"f");
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+currPre+'off,<br/>');                
                }
            } // check multiTask
        } // check toEnd
            
        
    });

});


