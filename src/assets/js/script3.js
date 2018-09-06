
/*** 
	BÚSQUEDA
***/

/* Km range */
var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value + ' km');
    });

    range.on('input', function(){
      $(this).next(value).html(this.value +' km');
    });
  });
};

rangeSlider();


/** Filtros Mobile **/
 if ($(window).width() < 767 ){
		$('.filter-search h2').click(function() {
			$("form.form-filter").toggle("slow");
		});
 };

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

/* CONTENIDO DE CADA CLINICA */
$(document).ready(function() {
    $(".button-collapse").click(function(e) {
      e.preventDefault();
        $(this).nextAll('.collapse:first').slideToggle();
        $(this).toggleClass('borders');
    });
});

/* Menú clínica */
  $('.info-slide').addClass('activeFilter');
$('.info-slide').click(function(e) {
  e.preventDefault();
  $('.info-cluster').fadeIn();
  $(".com-cluster").fadeOut();
  $(".ubi-cluster").fadeOut();
  $('.info-slide').addClass('activeFilter');
  $('.com-slide').removeClass('activeFilter');
  $('.ubi-slide').removeClass('activeFilter');

});


$('.com-slide').click(function(e) {
  e.preventDefault();
  $('.com-cluster').fadeIn();
  $(".info-cluster").fadeOut();
  $(".ubi-cluster").fadeOut();
  $('.com-slide').addClass('activeFilter');
  $('.info-slide').removeClass('activeFilter');
  $('.ubi-slide').removeClass('activeFilter');

});

$('.ubi-slide').click(function(e) {
  e.preventDefault();
  $('.ubi-cluster').fadeIn();
  $(".com-cluster").fadeOut();
  $(".info-cluster").fadeOut();
  $('.ubi-slide').addClass('activeFilter');
  $('.com-slide').removeClass('activeFilter');
  $('.info-slide').removeClass('activeFilter');

});

/* Ordenar por */
$(document).ready(function() {
    $('.js-example-basic-single-3').select2();
});

/* Ordenar */
$(document).ready(function() {
    $('.js-example-basic-single-5').select2();
});

/* Categoria */
$(document).ready(function() {
    $('.js-example-basic-single-4').select2();
});

/* Fecha de reserva */
/* DATE PICKER */
// $('#datetimepicker2').datetimepicker({
//     format: 'DD/MM/YYYY'
// });

/* Filtros */

$('#filtro-simple').click(function(e) {
  e.preventDefault();
  $('.form-filter').fadeIn();
  $(".form-filter-extra").fadeOut();
  $('#filtro-simple').addClass('activeFilters');
  $('#filtro-extra').removeClass('activeFilters');
});
$('#filtro-extra').click(function(e) {
  e.preventDefault();
  $('.form-filter-extra').fadeIn();
  $(".form-filter").fadeOut();
  $('#filtro-extra').addClass('activeFilters');
  $('#filtro-simple').removeClass('activeFilters');
});


$("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});