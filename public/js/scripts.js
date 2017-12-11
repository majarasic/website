function opengit(){
  window.open("https://github.com/bonsaihr");
}

function openlinkedin(){
  window.open("https://www.linkedin.com/company/bonsai-d.o.o.");
}


/* Back to the top button */
/*
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("backtothetop").style.display = "block";
    } else {
        document.getElementById("backtothetop").style.display = "none";
    }
}*/

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var interval;

function bodyLoaded(){
  slideItRight();
}

var current_quote = 0;
var quote_ids = ["#quote_1", "#quote_2", "#quote_3"];
var dot_ids = ["dot_1", "dot_2", "dot_3"];

function slideItRight() {
    clearInterval(interval);
    interval = setInterval(slideItRight, 5000);

    var fadeout_time = 500;
    if(window.innerWidth < 501)
      fadeout_time = 0;

    $(quote_ids[current_quote]).fadeOut(fadeout_time);
    document.getElementById(dot_ids[current_quote]).classList.remove('green_dot');
    document.getElementById(dot_ids[current_quote]).classList.add('grey_dot');

    current_quote += 1;
    if(current_quote > 2)
      current_quote = 0;
    $(quote_ids[current_quote]).fadeIn(1000);
    document.getElementById(dot_ids[current_quote]).classList.remove('grey_dot');
    document.getElementById(dot_ids[current_quote]).classList.add('green_dot');
}

function slideItLeft() {
    clearInterval(interval);
    interval = setInterval(slideItRight, 5000);

    $(quote_ids[current_quote]).fadeOut(1000);
    document.getElementById(dot_ids[current_quote]).classList.remove('green_dot');
    document.getElementById(dot_ids[current_quote]).classList.add('grey_dot');

    current_quote -= 1;
    if(current_quote < 0)
      current_quote = 2;
    $(quote_ids[current_quote]).fadeIn(1000);
    document.getElementById(dot_ids[current_quote]).classList.remove('grey_dot');
    document.getElementById(dot_ids[current_quote]).classList.add('green_dot');
}


/* POP UP EMAIL */
function popupform(){
  document.getElementById("contactForm_div").style.display = "block";
}

function closePopForm(){
  document.getElementById("pop_forma").reset();
  document.getElementById("contactForm_div").style.display = "none";
}

/* Find out how button sa početka stranice */
function findOutHow(){
  document.getElementById("contact").scrollIntoView();
}

$(document).ready(function(){
  $('#pop_forma').submit(function(event){
    var sender_name = document.getElementById("sender_name").value;
    var sender_email = document.getElementById("sender_email").value;
    var email_subject = document.getElementById("email_subject").value;
    var email_message = document.getElementById("email_message").value;

    $.ajax({
      url: "/send",
      data: {
        name : sender_name, email : sender_email, subject : email_subject, message : email_message
      },
      type: "POST"
    })
    .done(function() {
      closePopForm();
      alert("Email has been sent!");
    })
    .fail(function(error) {
      alert("Email couldnt be sent, please try again. Error: " + error);
    })
    .always(function() {
      console.log("Gotov sam");
    }); 

    event.preventDefault();
  });

});

