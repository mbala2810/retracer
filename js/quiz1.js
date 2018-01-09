var z = [ [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ],[ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ], [ ] ];
function shuffle(array, length){
	var i = length, temp, j;
	while(i !== 0){
		j = Math.floor(Math.random() * i);
		i = i - 1;
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
function details(){
	var person = prompt("Please enter your phone number to proceed", " ");

			if (person === null || person === "") {
				person = details();
			} else {
				if(person.length != 10)
					person = details();
    			//txt = "Hello " + person + "! How are you today?";
			}
			return person;
}
function team(){
	var person = prompt("Please enter your team name to proceed", " ");
	if (person === null || person === "") {
		person = team();
	} else {
		return person;		
	}
}
function getQuestions(){
	$.ajax({
		type: 'post',
        contentType: "application/json; charset=utf-8",
		url: '../quiz.php',
		data: {message: 'Hello world'},
		dataType:'json',
		success: function(response) {
			
			//alert(response.length);
		//	var z = new Array(response.length);
			var len = response.length;
		/*	for(var j = 0; j < len; j++){
				z[i] = new Array(6);
			}
		*/	for(var i = 0; i < len; i++){
				z[i][0] = response[i].question;
				z[i][1] = response[i].option1;
				z[i][2] = response[i].option2;
				z[i][3] = response[i].option3;
				z[i][4] = response[i].option4;
				z[i][5] = response[i].correctOption;
			}
			
            z = shuffle(z, i);
            
			$('#question').html(z[0][0]);
			$('#op1').html('&nbsp' + z[0][1]);
			$('#op2').html('&nbsp' + z[0][2]);
			$('#op3').html('&nbsp' + z[0][3]);
			$('#op4').html('&nbsp' + z[0][4]);
			var start = new Date();
			localStorage.setItem("start", start);
			localStorage.setItem("reset", "1");
		}
	});
}
$(document).ready(function (e) {
	var $worked = $("#timer");
	var start = 1;
	function update() {
		var myTime = new Date(localStorage.getItem("start"));
		var dt = new Date();
		ts = [];
		ts[1] = 1200 - (dt.getHours()*3600 - myTime.getHours()* 3600 + dt.getMinutes()*60 - myTime.getMinutes()*60 + dt.getSeconds() - myTime.getSeconds());

		ts[2] = ts[1]%60;
		ts[1] = Math.floor(ts[1]/60);
		$worked.html(ts[1]+":"+ts[2]);
		var x = $('#score').html();
		x = x.split(":");
		localStorage.setItem("score",x[1]);
		if(ts[1] <= 0 && ts[2] <= 0) {
			var end = new Date();
			localStorage.setItem("end",end);
			teamname = team();
			person = details();
			//alert(person);
			//alert(teamname);
			localStorage.setItem("person",person);
			localStorage.setItem("teamname",teamname);			
			window.location = 'end.html';
		}
		setTimeout(update, 1000);
	}
	setTimeout(update, 1000);
});
$(document).ready(function() {
$('#next').click( function() {
	//alert("HI");
	var x = $('#score').html();
	x = x.split(":");
	var y = $('#questionid').html();
	var y = y.split(" ");
	var answer = 'E';
	var check = 0;
	if($('#one').is(':checked')){
		answer = 'A';
		$('#one').prop("checked", false);
		check = 1;
	}
	if($('#two').is(':checked')){
		answer = 'B';
		$('#two').prop("checked", false);
		check = 1;
	}
	if($('#three').is(':checked')){
		answer = 'C';
		$('#three').prop("checked", false);
		check = 1;	
	}
	if($('#four').is(':checked')){
		answer = 'D';
		$('#four').prop("checked", false);
		check = 1;	
	}
	if(check == 1){
	var i = parseInt(y[1]) - 1;
	//alert(i);
	if(answer == z[i][5]){
		x[1] = parseInt(x[1]) + 4;
		y[1] = parseInt(y[1]) + 1;
	}
	else{
		x[1] = parseInt(x[1]) - 1;
		y[1] = parseInt(y[1]) + 1;
	}
	//alert(x[1]);
	i = y[1] - 1;
	if(i == 25){
		 document.getElementById('skip').style.visibility = 'hidden';
	}
	$('#question').html(z[i][0]);
	$('#op1').html('&nbsp' + z[i][1]);
	$('#op2').html('&nbsp' + z[i][2]);
	$('#op3').html('&nbsp' + z[i][3]);
	$('#op4').html('&nbsp' + z[i][4]);	
	x = x.join(": ");
	y = y.join(" ");
	$('#score').html(x);
	$('#questionid').html(y);
	}
});		
});	
$(document).ready(function() {
$('#skip').click( function() {
	x = $('#questionid').html();
	x = x.split(" ");
	var i = parseInt(x[1]) + 1;
	x[1] = i;
	x = x.join(" ");
		if(i == 26){
			document.getElementById('skip').style.visibility = 'hidden';
		}
	if(i < 27) {
		i = i - 1;
		$('#questionid').html(x);
		$('#question').html(z[i][0]);
		$('#op1').html('&nbsp' + z[i][1]);
		$('#op2').html('&nbsp' + z[i][2]);
		$('#op3').html('&nbsp' + z[i][3]);
		$('#op4').html('&nbsp' + z[i][4]);	
	}

});		
});	
$(document).ready(function() {
$('#submit').click( function() {
	var end = new Date();
	localStorage.setItem("end",end);
	teamname = team();
	person = details();
	localStorage.setItem("person",person);
	localStorage.setItem("teamname",teamname);			
	window.location = 'end.html';
});		
});	