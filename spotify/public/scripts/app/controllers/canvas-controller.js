;(function($){
	'use strict';
	angular.module('SpotifyApp')
		.controller('CanvasController', CanvasController);
		CanvasController.$inject = [];
		function CanvasController(){
			/*Variables*/
			var canvas 			= document.getElementById('canvas');
			var canvas2 		= document.getElementById('canvas2');
			var deleteCanvas 	= document.getElementById('delete');
			var mouseCanvas 	= document.getElementById('mouse-canvas');
			var palete 			= document.getElementsByClassName('palete');
			var lastEvent		= '';
			canvas.context 		= canvas.getContext('2d');
			canvas.radius 		= 1;
			canvas.dragging		= false;
			canvas.lastPointX		= 0;
			canvas.lastPointY		= 0;
			canvas.color 			= '#FF0000';

			/*Canvas*/
			canvas.width 	= window.innerWidth;
			canvas.height 	= window.innerHeight;

			canvas2.width 	= window.innerWidth;
			canvas2.height 	= window.innerHeight;
			drawGrid(canvas2);

			canvas.context.lineWidth = canvas.radius*2;

			canvas.putPoint = function(e){

				canvas.lastPointX = e.clientX;
				canvas.lastPointY = e.clientY;

				if(canvas.dragging){
						canvas.context.lineTo(e.clientX, e.clientY);
						canvas.context.strokeStyle = canvas.color;
						canvas.context.stroke();
						canvas.context.beginPath();
						canvas.context.arc(canvas.lastPointX, canvas.lastPointY, canvas.radius, 0, Math.PI*2);
						canvas.context.fillStyle = canvas.color;
						canvas.context.fill();
						canvas.context.beginPath();
						canvas.context.moveTo(e.clientX, e.clientY);						
					}
				
				

			}
			canvas.engage = function(e){

				if(lastEvent === 'keydown'){					
					canvas.context.beginPath();
					canvas.context.arc(canvas.lastPointX, canvas.lastPointY - 1, canvas.radius / canvas.radius /2, 0, Math.PI*2);
					canvas.context.fillStyle = canvas.color;
					canvas.context.fill();

				}

				document.addEventListener("keydown", function(event) {
					
					if(event.which === 17){
						canvas.context.lineTo(canvas.lastPointX, canvas.lastPointY);
						canvas.context.strokeStyle = canvas.color;
						canvas.context.stroke();
						canvas.context.beginPath();
						canvas.context.arc(canvas.lastPointX, canvas.lastPointY, canvas.radius, 0, Math.PI*2);
						canvas.context.fillStyle = canvas.color;
						canvas.context.fill();
						canvas.context.beginPath();
						canvas.context.moveTo(canvas.lastPointX, canvas.lastPointY);
					}
					$(document).click();
					lastEvent = 'keydown';
				});

				

				canvas.dragging = true;
				canvas.putPoint(e);
				lastEvent = 'mousedown';
			}

			
			
			$(document).on('mousemove', function(e){			
			    $('#move').css({
			    	width: canvas.radius*2,
			    	height: canvas.radius*2,
			       left:  e.pageX + 20,
			       top:   e.pageY + 0,
			       backgroundColor: canvas.color
			    });
			});
			canvas.disengage = function(){
				canvas.dragging = false;
				canvas.context.beginPath();				
			};

			function changePalete(e){
				canvas.color = e.target.style.backgroundColor
			}
			function deleteCanvasFunction(){
				canvas.context.clearRect(0,0, canvas.width, canvas.height);
			};
			canvas.addEventListener('mousedown', canvas.engage);
			canvas.addEventListener('mousemove', canvas.putPoint);
			canvas.addEventListener('mouseup', canvas.disengage);
			deleteCanvas.addEventListener('click', deleteCanvasFunction);
			for (var i = 0; i < palete.length; i++) {
			    palete[i].addEventListener('click', changePalete, false);
			}
			document.addEventListener("keydown", function(event) {
				
				  if(event.which === 109){
				  	if(canvas.radius > 0.10){
				  		canvas.radius = canvas.radius - 0.5;
				  		canvas.context.lineWidth = canvas.radius*2;
				  		$('#move').css({
					    	width: canvas.radius*2,
					    	height: canvas.radius*2,
					    	backgroundColor: canvas.color
					    });
				  	}
				  	
				  }else if(event.which === 107){				  	
				  	if(canvas.radius < 50){
				  		canvas.radius = canvas.radius + 0.5;
				  		canvas.context.lineWidth = canvas.radius*2;
				  		$('#move').css({
					    	width: canvas.radius*2,
					    	height: canvas.radius*2,
					    	backgroundColor: canvas.color
					    });
				  	}
				  }
			});
			
			function drawGrid(cnv) {

	            var gridOptions = {
	                minorLines: {
	                    separation: 30,
	                    color: '#dadada'
	                },
	            };

	            drawGridLines(cnv, gridOptions.minorLines);

	            return;
	        }

	        function drawGridLines(cnv, lineOptions) {

	            var iWidth = cnv.width;
	            var iHeight = cnv.height;

	            var ctx = cnv.getContext('2d');

	            ctx.strokeStyle = lineOptions.color;
	            ctx.strokeWidth = 1;

	            ctx.beginPath();

	            var iCount = null;
	            var i = null;
	            var x = null;
	            var y = null;

	            iCount = Math.floor(iWidth / lineOptions.separation);

	            for (i = 1; i <= iCount; i++) {
	                x = (i * lineOptions.separation);
	                ctx.moveTo(x, 0);
	                ctx.lineTo(x, iHeight);
	                ctx.stroke();
	            }

	            iCount = Math.floor(iHeight / lineOptions.separation);

	            for (i = 1; i <= iCount; i++) {
	                y = (i * lineOptions.separation);
	                ctx.moveTo(0, y);
	                ctx.lineTo(iWidth, y);
	                ctx.stroke();
	            }

	            ctx.closePath();

	            return;
	        }

		};
}(jQuery));