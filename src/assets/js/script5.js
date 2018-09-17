$(document).ready(function() {
    $(".button-collapse").click(function(e) {
    	$(this).addClass('activePregunta')
    	e.preventDefault();
         $(this).nextAll('.collapse:first').slideToggle();
    });
});

