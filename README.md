aCarousel jQuery Plugin
======================= 

This is a jQuery Plugin that allows you to add a Carousel to your web page. Easy and quick! 


## Usage  
First, download and include `jquery-acarousel.js` (or the minified version) in your HTML document

```html
<script src="/path/to/jquery-acarousel.js"></script>
```

Next, call the `aCarousel()` method on wrapper div 

```javascript
$('#myCarousel').aCarousel();
```
## Options
This Plugin accepts some basic options:

```javascript
$('#myCarousel').aCarousel({
	'auto' : true, // values: true, false
	'delay' : 5000, // default value = 4000ms. 
	'nextText' : 'Adelante', // default value = 'Next'
	'prevText' : 'Atras', // default value = 'Previous'
});
```

## Requirements and Compatibility

Please note that this plugin requires jQuery version **1.9** or later.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).
