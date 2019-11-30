var tf;
var start;
var length;
var end;
var x;
var now;
var remaining;
var minutes;
var seconds;
var d;
var i;
var left;
var right;
var line=[];
var slice;
var pausetime;
var pauselength;
 
$(document).ready(function() {
    tf = 25;
    $('#display').html('25:00');});

    function display() {
        $('#display').empty().html(tf + ':00');
    }

    $('#more').on('click', function() {
        tf = tf + 1;
        display();
    });
     
    $('#less').on('click', function() {
        if(tf > 1) {
            tf = tf - 1;
            display();
        }
     });
//update the count down every 1 second
     function a() {
         x = setInterval(function() {
             //get the time when the user clicks
             now = $.now();
             
             //find the distance btw now and the count down time

             remaining = end - now;

             //time calculations for days,hours,minutes and seconds
             minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
             seconds = Math.round((remaining % (1000 * 60)) / 1000);

             //display the result in the element with id ='demo'

             if (seconds == 60) {
                 document.getElementById("display").innerHTML = "1:00"
               }
             else if (seconds < 10) {
                 document.getElementById("display").innerHTML = minutes + ":0" + seconds;
             }
             else document.getElementById("display").innerHTML = minutes + ":" + seconds;

             //if the count down is finished write some text
             if(remaining < 0) {
                 clearInterval(x);
                 document.getElementById("display").innerHTML = "END";
             }

             //to animate the pie 
             d = 360 / length;
             i = length - remaining;
             right = -90 + d * i;
             left = -90 + d * i - 180;

             //rotates the red, shows blue on the right 
             if (right < 90) {
                 line = ['linear-gradient('+ right +'deg, #ffaed2 50%, transparent 50%)',
                       'linear-gradient(-90deg, #5795ee 50%, transparent 50%)'];
             }

             //to update the class of the pie
                slice = $('#timer').css({
                    'background-image': line.join(',')
                });
            },1000);
         }
      
         //user to start or resume
         $('#go').on('click', function () {
        
         // to start
         if (isNaN(pausetime)) {
             start = $.now();
             length = tf * 60 * 1000;
             end = start + length;
             a();
         }

         //to resume
         else {
             start = $.now();
             end = start + pauselength;
             a();
         }
    });

        // user to pause
        $('#pause').on('click', function() {
            pausetime = $.now();
            pauselength = end - pausetime;
            clearInterval(x);
        });

        //user to reset
        $('#reset').on('click', function() {
            clearInterval(x);
            slice = $('timer').css({
                'background-image': 'linear-gradient(-90deg, #ffaed2 50%, transparent 50%)'
            });
            tf = 25;
            display();
            pausetime = NaN;
        });
