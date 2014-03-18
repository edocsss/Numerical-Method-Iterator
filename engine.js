//Clear the boxes when the reset button is pressed
function clearBox (dummy , type) {
    var target = document.getElementById('target');
    var start = document.getElementById('start');
    target.textContent = null;
    dummy.rst = true;
    
    start.textContent = "Start!";
    dummy.play = !dummy.play;
};


//This function determines whether the iteration should start
function iterateStart (dummy , type) {
    var start = document.getElementById('start');
    
    //The iteration is started if the dummy.play = FALSE
    if (dummy.play) {
        start.textContent = "Start!"; //The text inside the button
        cond = dummy.play; //A temporary storage for the dummy.play before it is inverted
        dummy.play = !dummy.play;
        calculate(cond, type , dummy);
        } 
    
    else {
        start.textContent = "Stop!";
        cond = dummy.play;
        dummy.play = !dummy.play;
        setTimeout(function() {calculate(cond, type , dummy);} , 500);
    };
};


//This function is basically a recursive function which calls itself until the condition of the IF is false. This function also has a delay before it calls itself again
function calculate(x , type , dummy) {
    var p = document.createElement('p');
    var target = document.getElementById('target');
    var type = type;
    var condition = x;
    
    if (!condition) {
        if (type === "bisection") {
                x1 = dummy.x1;
                x2 = dummy.x2;
                
                f1 = f(x1, dummy);
                f2 = f(x2, dummy);
               
                x3 = (parseFloat(x1) + parseFloat(x2))/2;
                f3 = f(x3, dummy);
               
                if (f3 > 0) {
                    if (f(x1, dummy) > 0 && f(x2, dummy) < 0) {
                        x1 = x3;
                        f1 = f3;
                    }
                    else if (f(x1, dummy) < 0 && f(x2, dummy) > 0) {
                        x2 = x3;
                        f2 = f3;
                    };
                }
                else if (f3 < 0) {
                    if (f(x1, dummy) > 0 && f(x2, dummy) < 0) {
                        x2 = x3;
                        f2 = f3;
                    }
                    else if (f(x1, dummy) < 0 && f(x2, dummy) > 0) {
                        x1 = x3;
                        f1 = f3;
                    }
                };
                dummy.x1 = x1;
                dummy.x2 = x2;
                
                p.textContent = "Iteration " + dummy.count + " : " + x3;
                dummy.count = dummy.count + 1;
                target.insertBefore(p , target.firstChild);
                
            }      
        else if (type === "linearinterpolation") {
                x1 = dummy.x1;
                x2 = dummy.x2;
                console.log(dummy.x1 , x1);
            
                f1 = f(x1, dummy);
                f2 = f(x2, dummy);
            
                x3 = ((x1 * Math.abs(f2) + x2 * Math.abs(f1)) / (Math.abs(f1) +  Math.abs(f2)));
                f3 = f(x3, dummy);
            
                if (f3 > 0) {
                    if (f(x1, dummy) > 0 && f(x2, dummy) < 0) {
                        x1 = x3;
                        f1 = f3;
                    }
                    else if (f(x1, dummy) < 0 && f(x2, dummy) > 0) {
                        x2 = x3;
                        f2 = f3;
                    };
                }
                else if (f3 < 0) {
                    if (f(x1, dummy) > 0 && f(x2, dummy) < 0) {
                        x2 = x3;
                        f2 = f3;
                    }
                    else if (f(x1) < 0 && f(x2) > 0) {
                        x1 = x3;
                        f1 = f3;
                    }
                };
            
                dummy.x1 = x1;
                dummy.x2 = x2;
            
                p.textContent = "Iteration " + dummy.count + " : " + x3;
                dummy.count = dummy.count + 1;
                target.insertBefore(p , target.firstChild);
            }
        
        //it uses !dummy.play since dummy.play has been negated during the iterateStart function call
        setTimeout(function() {calculate(!dummy.play , type , dummy);} , 500); 
    }
};


//Evaluate the mathematical expressions
function f(x, dummy) {
    var equation = document.getElementById('functionbox').value;
    
	//using exception to catch an error in the equation
	try {
        var result = eval(equation);
        return result;
    }
	
	//if there is an error, the iteration will be stopped by changing the value dummy.play into true
    catch(e) {
        dummy.play = true;
    }
}


function time_now() {
    var fulldate, fulltime;
    var time = new Date();
    var offset = -(time.getTimezoneOffset() / 60);
    var day = time.getUTCDay();
    var month = time.getUTCMonth();
    var year = time.getUTCFullYear();
    var hour = time.getUTCHours() + offset;
    var min = time.getUTCMinutes();
    var sec = time.getUTCSeconds();
    var date = time.getUTCDate();
    var target = document.getElementById('time');

    switch (day) {
        case 0 : 
            day = "Sunday"; 
            break;
            case 1 : 
            day = "Monday";
            break;

        case 2 :
            day = "Tuesday";
            break;

        case 3 :
            day = "Wednesday";
            break;

        case 4 :
            day = "Thursday";
            break;

        case 5 :
            day = "Friday";
            break;

        case 6 :
            day = "Saturday";
            break;
    }

    switch (month) {
        case 0 : 
            month = "January";
            break;

        case 1 : 
            month = "February";
            break;

        case 2 : 
            month = "March";
            break;

        case 3 : 
            month = "April";
            break;

        case 4 : 
            month = "May";
            break;

        case 5 : 
            month = "June";
            break;

        case 6 : 
            month = "July";
            break;

        case 7 : 
            month = "August";
            break;

        case 8 : 
            month = "September";
            break;

        case 9 : 
            month = "October";
            break;

        case 10 :
            month = "November";
            break;

        case 11 :
            month = "December";
            break;
    }

    fulldate = day + ", " + date + " " + month + " " + year;

    hour = checkTime(hour);
    min = checkTime(min);
    sec = checkTime(sec);

    fulltime = hour + " : " + min + " : " + sec;

    target.innerHTML = fulldate + ' ' + fulltime;
    console.log(min);
    setTimeout(function() {time_now()}, 500);
}

function checkTime(n) {
    if (n < 10)
        return "0" + n;
        
    return n;
}


document.addEventListener("DOMContentLoaded", function () {
    //Variable declarations
    var target = document.getElementById('target');
    var start = document.getElementById('start');
    var reset = document.getElementById('reset');
    var box1 = document.getElementById('x1');
    var box2 = document.getElementById('x2');
    var explain = document.getElementById('explain');
    var image = document.getElementById('question');
    var functionbox = document.getElementById('functionbox').value;
    var dummy = {
            init_x1 : null, //to compare whether the x1 and x2 are changed
            init_x2 : null,
            init_method : null, //to compare whether the method chosen is changed
            init_equation : null, //to compare whether the equation is changed
            x1 : document.getElementById('x1').value, //the value of x1 and x2 which are written in the box right now
            x2 : document.getElementById('x2').value,
            play : false, //if play = false, the iteration will start and then it will change play into true (negated) --> see iterateStart function
            rst : false,
            count : 1 //Number of iteration
        };
    
    
    
    //This function is called whenever the start button is clicked or the user presses enter
    function onStart() {
        var x1 = document.getElementById('x1').value;
        var x2 = document.getElementById('x2').value;
        var checker = /^[+-]?\d+(\.\d+)?$/;
        var functionbox = document.getElementById('functionbox').value;
        
        //to check the equation first
        var result = f(1 , dummy);
        
        //isNaN() is to check whether it is a illegal number or not
        if (isNaN(result)) {
            alert("Please give a valid equation using JavaScript expression only and use one variable x only!");    
            dummy.play = true;
        }
		
		//check the input using regex
        else if (!x1.match(checker) || !x2.match(checker)) {
            alert("Please enter a correct value of x!");
            dummy.play = true;   
        }
		
		//if the equation box is not filled in
        else if (functionbox === null) {
            alert("Please give a valid equation using JavaScript expression only!");
            dummy.play = true;
        }
		
		//check only if the iteration is just going to START 
		//use !dummy.play just to make sure that the iteration is not started yet and by clicking the button, it is going to start -> can be deleted actually
        else if (!dummy.play && (f(x1, dummy) * f(x2, dummy) > 0)) {
            alert("There is no change of sign between the two values of x!");
            dummy.play = true;
        }
        else {
			//if the iteration is just reset
            if (dummy.rst) {
                dummy.count = 1; //the iteration count is reset
                dummy.rst = false;
                
                dummy.x1 = x1;
                dummy.x2 = x2;
            }
			
			//if the iteration is just going to be started for the VERY FIRST time --> because the count is still 1
            else if (dummy.count === 1) {
                dummy.x1 = x1;
                dummy.x2 = x2;
                
                dummy.init_x1 = x1;
                dummy.init_x2 = x2;
                dummy.init_method = document.getElementById('method').value;
                dummy.init_equation = document.getElementById('functionbox').value;
            }
			
			//check whether the value of x1 x2 equation and method are changed after being PAUSED
			//use !dummy.play to make sure that the iteration is not run yet --> can be deleted
            else if (dummy.count > 1 && !dummy.play) {
				//check the x values
                if (document.getElementById('x1').value !== dummy.init_x1 || 
                    document.getElementById('x2').value !== dummy.init_x2) {
                    
                    answer = confirm("You change the values of x. The iteration will start from the beginning. Is that okay?");
                    if (answer) {
                        dummy.x1 = x1;
                        dummy.x2 = x2;
                
                        dummy.init_x1 = x1;
                        dummy.init_x2 = x2;
                        
                        dummy.count = 1;
                        dummy.play = false;
                        target.textContent = null;
                    }
					
					else {
						dummy.play = true;
					}
                }
				
				//check the equation and the method
                else if (document.getElementById('method').value !== dummy.init_method || functionbox !== dummy.init_equation) {
                        
                        if (document.getElementById('method').value !== dummy.init_method) {
                            answer = confirm("You change the method. The iteration will start from the beginning. Is that okay?");
                        }
                        else if (functionbox !== dummy.init_equation) {
                            answer = confirm("You change the equation. The iteration will start from the beginning. Is that okay?");  
                        }
                    
                        if (answer) {
                            dummy.init_method = document.getElementById('method').value;
                            dummy.init_equation = document.getElementById('functionbox').value;
                            dummy.x1 = x1;
                            dummy.x2 = x2;
                                
                            dummy.count = 1;
                            dummy.play = false;
                            target.textContent = null;
                        }
                        else {
                            dummy.play = true;
                        }
                }
            }
        } 
        
		//the iteration might be started or not. It depends on the value of dummy.play -> so, this iterateStart is like a universal function
        iterateStart(dummy , document.getElementById('method').value);
    };
    
    
    //Start when the start button is pressed
    start.addEventListener("click" , onStart);
	
	//start the iteration if the user presses "Enter"
    document.getElementById('body').addEventListener('keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            onStart();  
        }});
    
    
    //When the reset button is preseed
    reset.addEventListener("click" , function() {
        clearBox(dummy , document.getElementById('method').value);
    });
    
    
    //Function block for fading effect of the math expressions div
    $("#question").mouseenter(q_in).mouseleave(q_out);
    $("#explain").mouseenter(explain_in).mouseleave(explain_out);
    
    var close = 0;
    function q_in() {
        var display = $("#explain").css("display");

        if (display === "none") {
            $("#explain").fadeIn('fast');
        }

        else if (close) {
            window.clearTimeout(close);
            close = null;
        }
    }
    
    time_now();
    function q_out() {
        close = window.setTimeout(function() {
            $("#explain").fadeOut('fast');
        }, 100);
    }

    function explain_in() {
        if (close) {
            window.clearTimeout(close);
            close = null;
        }
    }

    function explain_out() {
        close = window.setTimeout(function() {
            $("#explain").fadeOut('fast');
        }, 100);
    }
    //End of fading effect block
    
    
    //Alternative to the fading effect -> this one does not hold the explain box when the cursor is on the explain div
    //use jQuery to do the info box fading effects
    /* $( "#question" )
    .mouseenter( function() {
        $("#explain").css('opacity','0');
        $('#explain').css('display',"block");
        $("#explain").animate({opacity:1},100,'swing');
    })
    .mouseleave( function() {
        $("#explain").fadeOut(100)
    }); */
});