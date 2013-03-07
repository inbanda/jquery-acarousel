// ====================================
//  aCarousel jQuery plug-in 1.1
//  by aldocoria(at)gmail.com
// ====================================
(function($) {
    $.fn.aCarousel = function(options) {
        // plugin defaults
        $.fn.aCarousel.defaults = {
            auto : true,
			delay : 3000,
			prevText : 'Previous',
			nextText : 'Next'
        };
		
        var opts = $.extend({}, $.fn.aCarousel.defaults, options);

        return this.each(function() {
			var carousel = this; 
			var slidesWrapper = $('ul', carousel);
			var slidesItems = $('ul li', carousel);
			var carouselWidth = $('.acarousel-inner', carousel).width();
			var currentSlide = 0;
			var totalWidth = slidesItems.length * carouselWidth;
			var intervalKilled = false;
			// Auto Carousel
			if (opts.auto === true) {
				var carInterval = setInterval(function() { intervalTick(); }, opts.delay);
				// stop on mouseenter
				$(carousel).mouseenter(function() {
					clearInterval(carInterval);
					intervalKilled = true;
				});
				// start on mouseleave
				$(carousel).mouseleave(function() {
					if (intervalKilled !== false) carInterval = setInterval(function() {intervalTick();}, opts.delay);
				});
			}
			$(carousel).addClass('acarousel-wrapper');
			slidesWrapper.addClass('slides');
			slidesItems.each(function(index) {
				index++; // 1 instead 0 for the first item
				$(this).addClass('slide-'+index);
			});
			
			slidesWrapper.css('width', totalWidth);
			
			// switchCarousel function
			var switchCarousel = function(index) {
				var offset = $(carousel).width() * index;
				var currentSlide = index+1;
				//console.log('current:', currentSlide, 'total:',slidesItems.length);
				slidesWrapper.animate({
					"left" : -offset
				},500,function() {
					$('ul.slides li').removeClass('current');
					$('ul.slides li.slide-'+currentSlide).addClass('current');
				});	
			}
            // intervalTick function
			var intervalTick = function() {
				switchCarousel(currentSlide = (currentSlide < slidesItems.length-1 ? currentSlide + 1 : 0));
			};
			
			// addControls 
			var addControls = function() {
				var controlsHtml = '<a class="acarousel-prev" href="#">'+ opts.prevText +'</a><a class="acarousel-next" href="#">'+ opts.nextText +'</a>';
				$(carousel).append(controlsHtml);
				$('.acarousel-prev', carousel).click(function(e) {
					e.preventDefault();
					switchCarousel(currentSlide = (currentSlide > 0) ? currentSlide-1 : slidesItems.length-1);
				});
				$('.acarousel-next', carousel).click(function(e) {
					e.preventDefault();
					switchCarousel(currentSlide = (currentSlide+1 < slidesItems.length ) ? currentSlide+1 : 0);
				});
			};
			addControls();
        });
    }
})(jQuery);
