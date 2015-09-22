/**
 * Class for controlling the popover UI DOM element
 * @author Andrew Hedges <andrew@hedges.name>
 * @date 2015-09-21
 * @usage	var popover = new Popover(); poover.setContent('<p>Foo!</p>').setPopoverPos({ x : 100, y : 250 }).show();
 */
var Popover = (function (window, document, undefined) {

	function Popover() {
		// create the popover element
		var el = document.createElement('DIV')
		el.className = 'demo-puppy-popover'
		el.id = 'demo-puppy-' + Math.floor(Math.random() * +new Date) // TODO make a better random ID generator
		document.body.appendChild(el)
		// store a referene to the popover element in the DOM
		this.el = document.getElementById(el.id)
	}

	var proto = Popover.prototype

	/**
	 * Set the content of the popover
	 */
	proto.setContent = function (content) {
		this.hide()
		this.el.innerHTML = content // TODO santize for XSS?
		return this
	}

	/**
	 * Set the best x, y for the popover, given the element position
	 */
	proto.setPopoverPos = function (pos) {
		// assuming content is already set
		// calculate width and height of the popover
		// get bounds of the visible viewport
		// will it fit below the element?
		// will it fit to the right of the element?
		// will it fit above the element?
		// will it fit to the left of the element?
		// crap, what do we do if it doesn't fit anywhere?
		// for now, just set it to be right under the trigger element
		this.el.style.top  = (pos.y + 26) + 'px'
		this.el.style.left = pos.x + 'px'
		return this
	}

	proto.show = function () {
		this.el.classList.add('show')
	}

	proto.hide = function () {
		this.el.classList.remove('show')
	}

	return Popover

}).call(this, this, this.document)
