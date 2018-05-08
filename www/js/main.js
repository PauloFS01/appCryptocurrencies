
//o debouse evitara que o scroll seja ativado um numero desnecessario de vezes
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


$( window ).bind("scroll",debounce(function() {
  if($(this).scrollTop() > 50){
  	$('.divTitulo').addClass('menuHide');
  	$('.toolbar').removeClass('toobarHide');
  	console.log('ok');
  }else{
  	$('.divTitulo').removeClass('menuHide');
  	$('.toolbar').addClass('toobarHide');
  }
},200));




//$(".button-collapse").sideNav();



  // Or with jQuery
/*
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton({
    	hoverEnabled: false,
    	toolbarEnabled: true
    });
  });
*/



