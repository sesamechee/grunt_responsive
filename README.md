# Grunt Responsive Template
- Best view IE9+
- SCSS
- SVG Icon : SVG or PNG Fallback ( GRUNTICON )
- Minified JS : Concat JS files into one JS File (and minified Optional)
- BrowserSync : Testing workflow faster by synchronising URLs, interactions and code changes across multiple devices

## ImgSlider Usage
    newSliderName = new imgSlider( $('target'), {
		speed: 300,
		drag: true,
		loop: true,
		autoHeight: false,
		autoPlay: false,
		autoPlaySpeed: 5000,
		fade: false,
		offsetWidth: 1,
		thumbnailCarousel: true,
		beforeSlideCallback: function(){
		},
		afterSlideCallback: function(){
		}
    });
    
    gBannerSlider.transition( 'next' , idx );
    gBannerSlider.transition( 'prev' , idx );
    gBannerSlider.changePattern( idx );
    gBannerSlider.slidesOnReady();
    gBannerSlider.destroy();
