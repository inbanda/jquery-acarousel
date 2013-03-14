aCarousel jQuery Plugin
======================= 

This is a jQuery Plugin that allows you to add a Carousel to your web page. Easy and quick! 


## Usage  
First, download and include `jquery-acarousel.js` (or the minified version) in your HTML document

```html
<script src="/path/to/jquery.acarousel.js"></script>
```
or

```html
<script src="/path/to/jquery.acarousel.min.js"></script>
```

Next, call the `aCarousel()` method on wrapper div like this:

```javascript
$('#myCarousel').aCarousel();
```
## Options
This Plugin accepts some basic options:

```javascript
$('#myCarousel').aCarousel({
	'auto' : true, // values: true, false
	'delay' : 5000, // default value = 4000ms. 
	'nextText' : 'Next', // default value = '>'
	'prevText' : 'Previous', // default value = '<'
	'showDots' : false // values: true, false
});
```

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/).
