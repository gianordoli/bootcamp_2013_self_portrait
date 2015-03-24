/*---------- MENU ----------*/

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Navigation var
var page = 0;

windowResize();

function windowResize(){
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	var navPosition = screenWidth/2 - 450;
	
	// Positioning the menu!
	$('.galleryContainer').css({
		'width': screenWidth,
		'height': screenHeight,
		'padding': '20px',
		// 'background-color': 'black'
	});

	// Positioning the menu!
	$('nav').css({
		'left': navPosition
	});

	resizeGallery
	if(idArray != null){
		resizeGallery();
	}
}

function resizeGallery(){
	nColumns = Math.sqrt(idArray.length*(screenWidth-40)/(screenHeight-120));
	nColumns = Math.floor(nColumns);

	var divWidth = (screenWidth-40)/nColumns;
	$('.portrait').css({
		'width': divWidth
	});
}


window.addEventListener('resize', function(){
	windowResize();
});

// Triggered when a menu link is clicked
function navBar(imageIndex){

	// Navigation var
	page = imageIndex;

	if(page > 0){
		// $('nav').animate({
		// 	'top' : '10px',
		// }, 200);

		// Show the home link
		$('#homeLink').fadeIn();

	}else{
		// $('nav').animate({
		// 	'top' : '615px',
		// }, 200);
		$('#homeLink').fadeOut();
	}

	//Resets all img src's
	var menuImages = $('.menu');

	menuImages[0].src = 'img/menu_home.png';
	menuImages[1].src = 'img/menu_gallery.png';
	menuImages[2].src = 'img/menu_draw.png';
	menuImages[3].src = 'img/menu_about.png';

	// Stores the clicked img
	var myImage = menuImages[imageIndex];

	// Setting the new src
	switch(imageIndex){
		case 0:
			myImage.src = 'img/menu_home_over.png';
			break;
		case 1:
			myImage.src = 'img/menu_gallery_over.png';
			break;
		case 2:
			myImage.src = 'img/menu_draw_over.png';
			break;
		case 3:
			myImage.src = 'img/menu_about_over.png';		
			break;	
	}
}

function getIn(imageIndex){
	// Stores the clicked img
	var myImage = $('.menu').get(imageIndex);

	// Setting the new src
	switch(imageIndex){
		case 0:
			myImage.src = 'img/menu_home_over.png';
			break;
		case 1:
			myImage.src = 'img/menu_gallery_over.png';
			break;
		case 2:
			myImage.src = 'img/menu_draw_over.png';
			break;
		case 3:
			myImage.src = 'img/menu_about_over.png';		
			break;	
	}
}

function getOut(imageIndex){
	// Stores the clicked img
	var myImage = $('.menu').get(imageIndex);

	if(imageIndex != page){
		// Setting the new src
		switch(imageIndex){
			case 0:
				myImage.src = 'img/menu_home.png';
				break;
			case 1:
				myImage.src = 'img/menu_gallery.png';
				break;
			case 2:
				myImage.src = 'img/menu_draw.png';
				break;
			case 3:
				myImage.src = 'img/menu_about.png';
				break;				
		}
	}
}

$('.menu').on({
    'click': function(){
    	navBar($('.menu').index(this));
    },
    'mouseenter': function(){
    	getIn($('.menu').index(this));
    },
    'mouseleave': function(){
    	getOut($('.menu').index(this));
    }    
});



/*---------- SCROLL ----------*/

function goToByScroll(id){
$('html,body').animate({
		'scrollLeft': $("#"+id).offset().left
	}, 'slow');
}



/*---------- CANVAS DRAWING ----------*/

// Selecting the element in the html
var ourCanvas = document.getElementById('htmlCanvas');
// Specifying that it is a 2d canvas (It's case sensitive!)
var ctx = ourCanvas.getContext('2d');

// Getting the mouse events,
ourCanvas.addEventListener('mousedown', function(evt){
	isPressed = true;
	getMousePos(evt);
}, false);

ourCanvas.addEventListener('mousemove', function(evt){
	getMousePos(evt);
}, false);

ourCanvas.addEventListener('mouseup', function(evt){
	isPressed = false;
	prevX = 0;
}, false);

var centerX = ourCanvas.width/2;
var centerY = ourCanvas.height/2;
var prevX = 0;
var prevY = 0;
var currX = 0;
var currY = 0;
var isPressed = false;

function getMousePos(evt){
	// Getting the actual position of the canvas
	var canvasPosition = ourCanvas.getBoundingClientRect();
	// console.log(canvasPosition);

	if(isPressed){

		// Getting the mouse x and y
		if(prevX == 0){
			prevX = evt.clientX - canvasPosition.left;
			prevY = evt.clientY - canvasPosition.top;	
		}else{
			prevX = currX;
	        prevY = currY;
	    }
		currX = evt.clientX - canvasPosition.left;
		currY = evt.clientY - canvasPosition.top;
		// console.log(canvasPosition);

		// Getting the distance to the center
		var distance = Math.sqrt(Math.pow(currX - centerX, 2) + Math.pow(currY - centerY, 2));		

		if(distance < ourCanvas.width/2 - 8){
			
			if(pencil){
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#666666';
			}else{
				ctx.lineWidth = 10;
				ctx.strokeStyle = '#FFFFFF';
			}

			// ctx.fillRect(x, y, rectSize, rectSize);
		    ctx.beginPath();
		    ctx.moveTo(prevX, prevY);
		    ctx.lineTo(currX, currY);
		    ctx.stroke();		
			ctx.closePath();
		}
	}
}


/*---------- SWITCHING DRAWING TOOLS ----------*/

var pencil = true;

$('.img-swap').on({
    'click': function(){
	    if ($(this).attr("class") == "img-swap") {
	      this.src = this.src.replace("_on","_off");
		  pencil = false;	      
	    }
	     else {
	      this.src = this.src.replace("_off","_on");
	      pencil = true;
	    }
	    $(this).toggleClass("on");
    }
});


/*---------- READ DATA FROM SERVER ----------*/

var idArray = [];
var nColumns;

read();

function read(){
	console.log('called read function');

	// Load projects
	$.post('/public-start', {}, function(response) {
        // console.log(response);
        if(response.error){
        	throw response.error	
        }else{
	    	console.log(response);
			idArray = response.students;
			// // Removing 2 itens counting from the 0 index
			// idArray.splice(0,2);
			clearArray();
        }
    });	

	// $.ajax({
	//     type: 'get',
	//     url: 'readFolder.php',
	//     success: function(data) {
	//     	console.log(data);
	// 		idArray = jQuery.parseJSON(data);
	// 		// Removing 2 itens counting from the 0 index
	// 		idArray.splice(0,2);
	// 		clearArray();
	// 		// createGallery();
	// 		// createDivs();
	//     }
	// });
}

function clearArray(){
	console.log('called clear array function');
	for(var i = 0; i < idArray.length; i ++){
		if(idArray[i] == 'a' || idArray[i] == 'b'){
			idArray.splice(i, 1);
		}
	}
	createGallery();
}

function createGallery(){
	console.log('called createGallery function');
	// Calculating the number of columns of the gallery
	// 120 = padding-top
	nColumns = Math.sqrt(idArray.length*(screenWidth-40)/(screenHeight-120));
	nColumns = Math.floor(nColumns);
	console.log(nColumns);
	createDivs();
}

function createDivs(){
	console.log('called createDivs function');

	var divWidth = (screenWidth-40)/nColumns;

	for(var i = 0; i < idArray.length; i ++){
		// Enclosing div
		var div = $('<div>');
		div.attr('class', 'portrait');
		div.attr('width', divWidth);
		div.appendTo('#galleryContainer');
	}

	display();
}

function display(){

	console.log('called display function');

	$('.portrait').each(function(i){

// <a href="img/logo_large.png" data-lightbox="image-1" title="My caption">

		var currentDiv = $(this);
		var name;
		var description;
		var namePath = 'students/'+idArray[i]+'/name.txt';
		var descriptionPath = 'students/'+idArray[i]+'/description.txt';
		var imagePath = 'students/'+idArray[i]+'/img.png';
		
		// Loading the name
		
		$.ajax({
            url : namePath,
            dataType: "text",
            success : function (data) {
            	name = data;
            	console.log(name);
            	// Name
  				var span = $('<span>');
				span.text(name);
				span.appendTo(currentDiv);
            }
        });

		// Loading the description
		
		$.ajax({
            url : descriptionPath,
            dataType: "text",
            success : function (data) {
            	description = data;

				// a
				var a = $('<a>');
				a.attr('href', imagePath);
				a.attr('data-lightbox', name);
				a.attr('alt', '');
				a.attr('title', '<b>' + name + '</b><br>' + description);
				a.prependTo(currentDiv);

				// Image
				var img = $('<img>');
				img.attr('src', imagePath);
				img.attr('class', 'imageThumb');
				img.attr('width', '90%');
				img.appendTo(a);
            }
        });
	});
}


/*---------- UPLOAD DATA TO SERVER ----------*/

$('#ok').click(function(){

	// alert("This Yearbook is closed! You can't submit your info/drawing to the gallery, but feel free to draw something if you want. hit the 'DONE' button to save your drawing.");	

	var dataURL = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
	var newWindow = window.open();
	newWindow.document.write('<img src="'+dataURL+'"/>');

	// if($('#schoolID').val().length > 3
	//    && $('#studentName').val().length > 3
	//    && $('#description').val().length > 10
	//    && localStorage.getItem('isSubmitted') != 1){

	// 	createFolder();
	// 	localStorage.setItem('isSubmitted', 1); 

	// 	// $('#thankYou').css({
	// 	// 	'display': 'visible'
	// 	// });
	// 	$('#thankYou').fadeIn();

	// 	$(document).scrollTop($('#thankYou').offset().left);
	// 	setTimeout(function(){
	// 		// window.location = 'http://a.parsons.edu/~giang063/selfportrait/#gallery';
	// 		// location.reload();
	// 		window.open('http://a.parsons.edu/~giang063/selfportrait', '_self');
	// 	}, 5000);
	// }else{
	// 	alert('Oops, there is somethig wrong! Maybe you haven\'t \n filled all the fields or your description is too short... \n Or maybe you\'ve already submitted something!');
	// }
});

function createFolder(){
	// Folder

	var schoolID = $('#schoolID').val();
	var jsonString = JSON.stringify(schoolID);
    $.ajax({
        type: "POST",
        url: "createFolder.php",
        data: {data : jsonString}, 
        cache: false,

        success: function(){
            console.log('Folder successfully created.');
            saveData();
        }
    });
}

function saveData(){

	// Form vars
	var schoolID = $('#schoolID').val();
	var studentName = $('#studentName').val();
	var description = $('#description').val();
	var myImage = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
 	
 	// Array with them all
 	var myData = [schoolID, studentName, description, myImage];

 	// jQuery Ajax
    $.ajax({
        type: "POST",
        url: "save.php",
        // data: {data : jsonString}, 

        // data: myImage, 
        data: {data: myData},
        cache: false,

        success: function(){
            // console.log(myData[1]);
        }
    });
}