/*
javascript from: 
vanillaSlideshow v0.2
 (c) Dimitri Mikadze
 https://github.com/DimitriMikadze/vanilla-slideshow
 License: MIT
*/
var slideShow = (function() {
	
	var app = {};

	// default properties
	var defaults = {
		delay: 5000,
		random: false,
		slideshow: true,
		animationSpeed: '1s'
	}

	// container divs
	var slideshowContainer = document.getElementById('slideshow-container');
	var slideshow = document.getElementById('mySlideshow');
	var slides = document.getElementById('mySlideshow').getElementsByClassName('mySlide');

	// check properties
	function _checkProperties() {
		var random = (defaults.random) ? _randomInt(0, slides.length - 1) : 0;

		for(var i=0; i<slides.length; i++) {
			
			if(slides[i].getAttribute('data-src') !== null) {
				slides[i].style.backgroundImage  = 'url( ' + slides[i].getAttribute('data-src') + ')';
			}

			if(i === random) { slides[i].className += ' currentSlide'; }

			_setVendor(slides[i], 'Transition', defaults.animationSpeed);
		}
	};

	// slideshow function
	function _slideShow() {
		var active = document.querySelector('#' + slideshow.getAttribute('id') + ' .currentSlide');
		var next = (_nextElement(active)) ? _nextElement(active) : slides[0];

		// classes
		active.className = 'mySlide';
		next.className += ' currentSlide';
	};

	// start slideshow
	function _startSlideshow() {
		app.intervalSliding = setInterval(function() {
			_slideShow();
		}, defaults.delay);
	};

	// set browser vendor properties
	function _setVendor(element, property, value) {
	  element.style["webkit" + property] = value + ' ease-in-out';
	  element.style["Moz" + property] = value + ' ease-in-out';
	  element.style["ms" + property] = value + ' ease-in-out';
	  element.style["o" + property] = value + ' ease-in-out';
	};

	// Next element
	function _nextElement(element) {
	    do {
	        element = element.nextSibling;
	    } while (element && element.nodeType !== 1);

	    return element;        
	};

	// Random number
	function _randomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// init function
	app.init = function(arguments) {
		if( ! slideshowContainer) { return false; }

		// check if options is present
	  	if(arguments && typeof arguments === "object") {
	    	defaults.random = (arguments.random !== '') ? arguments.random : defaults.random;
	    	defaults.slideshow = (arguments.slideshow !== '') ? arguments.slideshow : defaults.slideshow;
	    	defaults.delay = (arguments.delay) ? arguments.delay : defaults.delay;
	    	defaults.animationSpeed = (arguments.animationSpeed) ? arguments.animationSpeed : defaults.animationSpeed;
	    }

		_checkProperties();
		
		if(slides.length > 1) {
			if(defaults.slideshow) {
				_startSlideshow();
			}
		}	
	};

	return app;

}(slideShow));