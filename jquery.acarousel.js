//  =======================================================
//  aCarousel jQuery plug-in 1.2.3
//  by aldocoria(at)gmail.com -- github.com/aldocoria
// =======================================================
(function ($, window, document, undefined) {
    var aCarousel = 'aCarousel',
        defaults = {
            'auto' : true,
            'delay' : 3000,
            'prevText' : '<',
            'nextText' : '>',
            'showDots' : true
        };
    // The actual plugin constructor
    function Plugin(el, options) {
        this.carousel = el;
        this.slidesWrapper = $('.acarousel-inner ul', this.carousel);
        this.slidesItems = $('.acarousel-inner ul li', this.carousel);
        this.carouselWidth = $('.acarousel-inner', this.carousel).width();
        this.currentSlide = 0;
        this.totalWidth = this.slidesItems.length * this.carouselWidth;
        this.intervalKilled = false;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = aCarousel;
        this.init();
    }
    Plugin.prototype = {
        init : function () {
			this.addControls();
			if (this.options.showDots === true) {
				this.showDots();
				// First slide active
				$('ul.acarousel-dots li#acarousel-dot-' + (this.currentSlide + 1)).addClass('active');
			}
            // First slide active
			$('ul.slides li.slide-' + (this.currentSlide)).addClass('current');
			var _this = this;
            // Auto Carousel 
            if (this.options.auto === true) {
                this.carInterval = setInterval(function () { _this.intervalTick(); }, _this.options.delay);
                // stop on mouseenter
                $(this.carousel).mouseenter(function () {
                    clearInterval(_this.carInterval);
                    _this.intervalKilled = true;
                });
                // start on mouseleave
                $(this.carousel).mouseleave(function () {
                    if (_this.intervalKilled !== false) { _this.carInterval = setInterval(function () {_this.intervalTick();}, _this.options.delay); }
                });
            }
            $(this.carousel).addClass('acarousel-wrapper');
            this.slidesWrapper.addClass('slides');
            this.slidesItems.each(function (index) {
                index++; // 1 instead 0 for the first item
                $(this).addClass('slide-' + index);
            });
            this.slidesWrapper.css('width', this.totalWidth);
        },
        switchCarousel : function (index) {
            var offset = this.carouselWidth * index,
                currentSlide = index + 1;
            this.currentSlide = index;
            this.slidesWrapper.animate({
                "left" : -offset
            }, 500, function () {
                $('ul.slides li').removeClass('current');
				$('ul.acarousel-dots li').removeClass('active');
                $('ul.slides li.slide-' + currentSlide).addClass('current');
				$('ul.acarousel-dots li#acarousel-dot-' + currentSlide).addClass('active');
            });
        },
        intervalTick : function () {
            this.switchCarousel(this.currentSlide = (this.currentSlide < this.slidesItems.length - 1 ? this.currentSlide + 1 : 0));
        },
        addControls : function () {
            var _this = this,
                controlsHtml = '<a class="acarousel-prev" href="#">' + this.options.prevText + '</a><a class="acarousel-next" href="#">' + this.options.nextText + '</a>';
            $(this.carousel).append(controlsHtml);
            $('.acarousel-prev', this.carousel).click(function (e) {
                e.preventDefault();
                _this.switchCarousel(_this.currentSlide = (_this.currentSlide > 0) ? _this.currentSlide - 1 : _this.slidesItems.length - 1);
            });
            $('.acarousel-next', this.carousel).click(function (e) {
                e.preventDefault();
                _this.switchCarousel(_this.currentSlide = (_this.currentSlide + 1 < _this.slidesItems.length) ? _this.currentSlide + 1 : 0);
            });
        },
		showDots : function () {
			$(this.carousel).append('<ul class="acarousel-dots"></ul>');
            this.carouselDots = $('.acarousel-dots', this.carousel);
			for (var i = 1; i <= this.slidesItems.length; i++) {
				this.carouselDots.append('<li class="acarousel-dot" id="acarousel-dot-' + i + '"></li>');
			}
            // call onDotClick method
           this.onDotClick();
		},
        onDotClick : function() {
            var _this = this,
                slideClicked;
            $(this.carouselDots, 'body').on('click', 'li', function(e) {
                slideClicked = $(this).attr('id').split('-');
                slideClicked = slideClicked[2]-1;
                if (slideClicked !== _this.currentSlide) {
                    _this.switchCarousel(slideClicked); 
                }
            });
        },
        
    };
    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[aCarousel] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + aCarousel)) {
                $.data(this, 'plugin_' + aCarousel,
                    new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
