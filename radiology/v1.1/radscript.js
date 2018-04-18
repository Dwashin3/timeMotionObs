var timeOnLoad = new Date();
var timeOnLoadSec = Math.round(timeOnLoad.getTime());
var multiTask = false;
var newTask = false;
var newType = "Int"; //"Int" or "Ext"
var newIdx;
var caseCnt = 0;

$(document).ready(function(){
    //////////////////////////
    //At the end of every click, Write State information
    document.getElementById("p1").innerHTML = timeOnLoad.getHours() + ":" + timeOnLoad.getMinutes() + ":" + timeOnLoad.getSeconds();
    $('#log').prepend(''+Math.round(timeOnLoadSec-timeOnLoadSec)+',start,<br/>');

    //////////////////////////
    //multi-task state, changes Status background color
    $('#multi').click(function() {
        var newTime = new Date();
        //if currently multiTask, turns off multiTask
        if (multiTask) {
            $('#col5').css("background-color", "#FFFFFF");
            $('#multi').css("background-color", "#808080");
            multiTask=false;
            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',multi-OFF,<br/>');
        } else {
            $('#col5').css("background-color", "#0A4694");
            $('#multi').css("background-color", "#0A4694");
            multiTask=true;
            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',multi-ON,<br/>');
        }
    });

    /////////////////////////////
    //Handles cases
    //Case Start, Case Pause, Case Resume, Case End
    //Green is Go, Orange is Pause
    $('#caseStart').click(function() {
        var caseName = prompt("Case Name");
        $(this).effect("highlight", {}, 300);
        $('#list').prepend('<div class="item">' + "C," + caseName + '</div>');
        caseCnt ++;
        $('.item:first-child').click();
        //Starting a new case will clear all other interruption buttons
        $('#col1 div, #col2 div, #col3 div, #col4 div').css("background-color", "#808080");
    });

    // Pauses and Starts Cases using color
    $('#list').on('click', '.item', function() {

        var newTime = new Date();
        
        //if multitasking
        if (multiTask) {

                //if OFF rgb(227, 142, 45), turn ON rgb(30, 158, 34)
                if ($(this).css('background-color')=='rgb(227, 142, 45)') {
                    $(this).css('background-color', 'rgb(30, 158, 34)');
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',on,<br/>');
                } else {
                    //else if ON, turn OFF
                    $(this).css('background-color', 'rgb(227, 142, 45)');
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',off,<br/>');
                };
            
            //if not multitasking
            } else {
                
                //if task OFF, turn every other task OFF and turn ON 
                if ($(this).css('background-color')=='rgb(227, 142, 45)') {
                    
                    //turn every other task off
                    var containerDiv = document.getElementById("list");
                    var innerDivs = containerDiv.getElementsByTagName("div");
                    for (i=0; i<innerDivs.length; i++) {
                        tempName = innerDivs[i].innerHTML;
                        if (innerDivs[i].style.backgroundColor=='rgb(30, 158, 34)') {
                            innerDivs[i].style.backgroundColor = 'rgb(227, 142, 45)';
                            $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+tempName+',off,<br/>');
                        }
                    }
                    
                    $(this).css('background-color', 'rgb(30, 158, 34)');
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+$(this).html()+',on,<br/>');
                        
                } else {
                    $(this).css('background-color', 'rgb(227, 142, 45)');
                    $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+','+$(this).html()+',off,<br/>');                
                }
            } // check multiTask




    });

    ////////////////////////////
    //Handles Interruptions
    //Click on button in main Type, Source, Task, Severity
    //will highlight button in each bin
    $('#typeInt').click(function() {
        $(this).css("background-color", "#000000");
        $('#typeExt').css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');

        // creates new object
        newTask = true;
        newType = "I";
        newIdx = Math.round(caseCnt);
        $('#list').prepend('<div class="item">' + 'Internal,' + Math.round(caseCnt) + '</div>');
        caseCnt ++;
        $('.item:first-child').click();

        // clears all attribute tags
        $('#col2 div, #col3 div, #col4 div, #related, #unrelated').css("background-color", "#808080");


    });
    $('#typeExt').click(function() {
        $(this).css("background-color", "#000000");
        $('#typeInt').css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');

        // creates new object
        newTask = true;
        newType = "E";
        newIdx = Math.round(caseCnt);
        $('#list').prepend('<div class="item">' + "External," + Math.round(caseCnt) + '</div>');
        caseCnt ++;
        $('.item:first-child').click();

        // clears all attribute tags
        $('#col2 div, #col3 div, #col4 div, #related, #unrelated').css("background-color", "#808080");

    });
    $('#related').click(function() {
        $(this).css("background-color", "#000000");
        $('#unrelated').css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');
    });
    $('#unrelated').click(function() {
        $(this).css("background-color", "#000000");
        $('#related').css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');
    });

    $('#col2 div').click(function() {
        //If newTask, Add to item name
        if (newTask) {
            $('.item:first-child').text(newType + "_" + $(this).html()+","+ newIdx);

        } else {
            newTask = false;
        }

        $(this).css("background-color", "#000000");
        $('#col2 div').not(this).css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');
    });

    $('#col3 div').click(function() {
        $(this).css("background-color", "#000000");
        $('#col3 div').not(this).css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');
    });

    $('#col4 div').click(function() {
        $(this).css("background-color", "#000000");
        $('#col4 div').not(this).css("background-color", "#808080");
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+","+$(this).html()+',</br>');
    });

    $('#addNote').click(function(){
        $(this).effect("highlight", {}, 300);
        var newTime = new Date();
        $('#log').prepend(''+Math.round(newTime.getTime()-timeOnLoadSec)/1000+',note,'+document.getElementById("note").value+',<br/>');
        document.getElementById("note").value = "";
    });
    

    $('#exportButton').click(function(){
        
        $(this).effect("highlight", {}, 300);
        var win=window.open("data.html", '_blank');
        var exportString = $('#log').html();
        win.document.write(exportString);
        win.focus();
        
    });



}); //end of document ready