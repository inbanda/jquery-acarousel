// =======================================================
//  aCarousel jQuery plug-in 1.2
//  by aldocoria(at)gmail.com -- github.com/aldocoria
// =======================================================
(function ( $, window, document, undefined ) {
    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.
    
    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).

    // Create the defaults once
    var aCarousel = 'aCarousel',
        defaults = {
            auto : true,
			delay : 3000,
			prevText : 'Previous',
			nextText : 'Next'
        };

    // The actual plugin constructor
    function Plugin(el, options) {
        this.carousel = el;
		this.slidesWrapper = $('ul', this.carousel);
		this.slidesItems = $('ul li', this.carousel);
		this.carouselWidth = $('.acarousel-inner', this.carousel).width();
		this.currentSlide = 0;
		this.totalWidth = this.slidesItems.length * this.carouselWidth;
		this.intervalKilled = false;
       
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = aCarousel;
        
        this.init();
    }

    Plugin.prototype = {
		init : function() {
			this.addControls();
			var _this = this;
		   // Auto Carousel 
			if (this.options.auto === true) {
				this.carInterval = setInterval(function() { _this.intervalTick(); }, _this.options.delay);
				// stop on mouseenter
				$(this.carousel).mouseenter(function() {
					clearInterval(_this.carInterval);
					_this.intervalKilled = true;
				});
				// start on mouseleave
				$(this.carousel).mouseleave(function() {
					if (_this.intervalKilled !== false) _this.carInterval = setInterval(function() {_this.intervalTick();}, _this.options.delay);
				});
			}
			$(this.carousel).addClass('acarousel-wrapper');
			this.slidesWrapper.addClass('slides');
			this.slidesItems.each(function(index) {
				index++; // 1 instead 0 for the first item
				$(this).addClass('slide-'+index);
			});
			this.slidesWrapper.css('width', this.totalWidth);
		},
		switchCarousel : function(index) {
			var offset = $(this.carousel).width() * index;
			var currentSlide = index+1;
			this.slidesWrapper.animate({
				"left" : -offset
			},500,function() {
				$('ul.slides li').removeClass('current');
				$('ul.slides li.slide-'+currentSlide).addClass('current');
			});	
		},
		intervalTick : function() {
			this.switchCarousel(this.currentSlide = (this.currentSlide < this.slidesItems.length-1 ? this.currentSlide + 1 : 0));
		},
		addControls : function() {
			var _this = this;
			var controlsHtml = '<a class="acarousel-prev" href="#">'+ this.options.prevText +'</a><a class="acarousel-next" href="#">'+ this.options.nextText +'</a>';
			$(this.carousel).append(controlsHtml);
			$('.acarousel-prev', this.carousel).click(function(e) {
				e.preventDefault();
				_this.switchCarousel(_this.currentSlide = (_this.currentSlide > 0) ? _this.currentSlide-1 : _this.slidesItems.length-1);
			});
			$('.acarousel-next', this.carousel).click(function(e) {
				e.preventDefault();
				_this.switchCarousel(_this.currentSlide = (_this.currentSlide+1 < _this.slidesItems.length ) ? _this.currentSlide+1 : 0);
			});
		}		
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[aCarousel] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + aCarousel)) {
                $.data(this, 'plugin_' + aCarousel, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );