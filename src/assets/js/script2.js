
/* CATEGORIAS */
$(document).ready(function() {
    $('.js-example-basic-single').select2();
});
$(document).ready(function() {
    $('.js-example-basic-single-2').select2();
});

/* DATE PICKER */
// $('#datetimepicker1').datetimepicker({
//     format: 'DD/MM/YYYY'
// });

/*	 MODALES LOGIN Y REGISTRO */

$('a#registrarte-link').click(function(e) {
  e.preventDefault();
});

$('a#login-link').click(function(e) {
  e.preventDefault();

});

/***
  LOGIN Y REGISTRO
***/
$('#login-link').click(function(e) {
  e.preventDefault();
  $('.modal-gral').css('display','block');
  $(".modulo-inicio").css('display','block');
  $('#d-ini').addClass('activeInside');
  $('#d-reg').removeClass('activeInside');

  $(".modulo-registro").css('display','none');
});

$('#registrarte-link').click(function(e) {
  e.preventDefault();
  $('.modal-gral').css('display','block');
  $(".modulo-registro").css('display','block');
  $('#d-reg').addClass('activeInside');
  $('#d-ini').removeClass('activeInside');

  $(".modulo-inicio").css('display','none');
});

$('#d-ini').click(function(e) {
  e.preventDefault();
  $(this).addClass('activeInside');
  $('#d-reg').removeClass('activeInside');

  $(".modulo-inicio").css('display','block');
  $(".modulo-registro").css('display','none');
});

$('#d-reg').click(function(e) {
  e.preventDefault();
  $(this).addClass('activeInside');
  $('#d-ini').removeClass('activeInside');

  $(".modulo-registro").css('display','block');
  $(".modulo-inicio").css('display','none');
});


$('#close-modal').click(function(e) {
	e.preventDefault();
	$('.modal-gral').fadeOut();
});

$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
       $('.modal-gral').fadeOut();
    }
});


$('a#registrarte-link').click(function(e) {
  e.preventDefault();
});

$('a#login-link').click(function(e) {
  e.preventDefault();

});

/***
  LOGIN Y REGISTRO
***/
$('#login-link2').click(function(e) {
  e.preventDefault();
  $('.modal-gral').css('display','block');
  $(".modulo-inicio").css('display','block');
  $('#d-ini2').addClass('activeInside');
  $('#d-reg2').removeClass('activeInside');

  $(".modulo-registro").css('display','none');
});

$('#registrarte-link2').click(function(e) {
  e.preventDefault();
  $('.modal-gral').css('display','block');
  $(".modulo-registro").css('display','block');
  $('#d-reg2').addClass('activeInside');
  $('#d-ini2').removeClass('activeInside');

  $(".modulo-inicio").css('display','none');
});

$('#d-ini2').click(function(e) {
  e.preventDefault();
  $(this).addClass('activeInside');
  $('#d-reg2').removeClass('activeInside');

  $(".modulo-inicio").css('display','block');
  $(".modulo-registro").css('display','none');
});

$('#d-reg2').click(function(e) {
  e.preventDefault();
  $(this).addClass('activeInside');
  $('#d-ini2').removeClass('activeInside');

  $(".modulo-registro").css('display','block');
  $(".modulo-inicio").css('display','none');
});


$('.close-modal').click(function(e) {
	e.preventDefault();
	$('.modal-gral').fadeOut();
});

