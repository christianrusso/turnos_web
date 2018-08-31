/***
	CAMBIO DÍAS CALENDARIO
***/

$(document).ready(function(){
    $(".dias").each(function(e) {
        if (e != 0)
            $(this).hide();
    });
    
    $(".calendario-turnos #next-btn").click(function(e){
        e.preventDefault();
        if ($(".dias:visible").next().length != 0)
            $(".dias:visible").next().show().prev().hide();
        else {
            $(".dias:visible").hide();
            $(".dias:first").show();
        }
        return false;
    });

    $(".calendario-turnos #prev-btn").click(function(e){
        e.preventDefault();
        if ($(".dias:visible").prev().length != 0)
            $(".dias:visible").prev().show().next().hide();
        else {
            $(".dias:visible").hide();
            $(".dias:last").show();
        }
        return false;
    });
});

$(".calendario-turnos .dias .div-contenido-fecha div.col-md-1").each(function() {
  $( this ).click(function() {
        $(this).toggleClass('selectedTurno') 
    });
});

/* SELECTS FILTROS */
$(document).ready(function() {
    $('.js-example-basic-single-9').select2();
});
$(document).ready(function() {
    $('.js-example-basic-single-8').select2();
});

$(document).ready(function() {
    $('.js-example-basic-single-11').select2();
});
$(document).ready(function() {
    $('.js-example-basic-single-10').select2();
});

$('a.sig-turno').click(function(e) {

 
});

$('a#volver-turno').click(function(e) {
    e.preventDefault();
    $('.filtros-calendario').fadeIn();
    $('.confirmacion-reserva').fadeOut();
    $('#b2').removeClass('activeReserva');
    $('#b1').addClass('activeReserva');
});