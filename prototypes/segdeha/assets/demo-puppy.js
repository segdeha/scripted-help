/**
 * Page instantiates Demo Puppy then gives it the URL for a script
 * @author Andrew Hedges <andrew@hedges.name>
 * @date 2015-09-21
 */
var DemoPuppy = (function (window, document, undefined) {

	// ajax in 120 characters: https://gist.github.com/segdeha/5601610
	function a(u,c){var x=new XMLHttpRequest;x.open('GET',u);x.onreadystatechange=function(){3<x.readyState&&c(x)};x.send()}

	/**
	 * @private
	 */
	function Action(dp, action) {
		if (undefined === dp) {
			throw 'No Demo Puppy instance specified.'
		}
		if (DemoPuppy !== dp.constructor) {
			throw 'Demo Puppy instance ain’t a Demo Puppy instance.'
		}
		this.dp = dp
		this.triggers = action.triggers || []
		this.selector = action.selector || ''
		this.content  = action.content  || ''
		this.el = document.querySelector(this.selector)
		if (null === this.el) {
			throw 'Invalid selector'
		}
		this.pos = utils.getElementPos(this.el)
		var elHeight = parseInt(window.getComputedStyle(this.el)['height'])
		var elBottomMargin = parseInt(window.getComputedStyle(this.el)['marginBottom'])
		if (!isNaN(elHeight)) {
			this.pos.y += elHeight
			if (!isNaN(elBottomMargin)) {
				this.pos.y -= elBottomMargin
			}
		}
	}

	var act_proto = Action.prototype

	act_proto.createEvents = function () {
		this.triggers.forEach(function (trigger) {
			if (utils.isPositiveNumber(trigger)) {
				// type: inactivity
				setTimeout(this.handleInactivity.bind(this), trigger) // TODO track actual inactivity and compare against trigger
			}
			else {
				switch (trigger) {
					case 'mouseover':
						this.el.addEventListener(trigger, this.handleMouseover.bind(this))
						break;
					case 'click':
						this.el.addEventListener(trigger, this.handleClick.bind(this))
						break;
					case 'next':
						// special case: click of a 'next' element in the popover
						break;
					case 'previous':
						// special case: click of a 'previous' element in the popover
						break;
					default:
						break;
				}
			}
		}.bind(this))
	}

	// TODO the handle methods are not DRY
	act_proto.handleInactivity = function () {
		dp.popover
			.setContent(this.content)
			.setPopoverPos(this.pos)
			.show()
	}

	act_proto.handleMouseover = function (evt) {
		dp.popover
			.setContent(this.content)
			.setPopoverPos(this.pos)
			.show()
	}

	// TODO pause execution of native click
	act_proto.handleClick = function (evt) {
		dp.popover
			.setContent(this.content)
			.setPopoverPos(this.pos)
			.show()
	}

	/**
	 * Constuctor
	 * @public
	 * @param opts Options object
	 * @return DemoPuppy instance
	 */
	function DemoPuppy(opts) {
		this.popover = new Popover()
		this.actions = []
	}

	var dp_proto = DemoPuppy.prototype

	/**
	 * Convenience method for starting a script
	 * @public
	 */
	dp_proto.start = function (uri) {
		var scrpt = this._getScript(uri).then(this._initScript.bind(this), function (err) { console.log(err) })
	}

	/**
	 * Fetch a script at the given URL
	 * @private
	 * @return JSON
	 */
	dp_proto._getScript = function (uri) {
		return new Promise(function (resolve, reject) {
			function complete(xhr) {
				var json
				if (xhr.status > 0 && xhr.status < 400) {
					try {
						json = JSON.parse(xhr.response)
						resolve(json)
					}
					catch (e) {
						throw e
					}
				}
				else {
					reject('There was an error fetching the script. HTTP status: ' + xhr.status)					
				}
			}
			a(uri, complete)
		})
	}

	/**
	 * Initialize a script
	 *     Scripts contain a list of actions, each of which contains a CSS selector, some content,
	 *     and an array of triggers (i.e. 'mouseover', 'click', 'inactivity', 'next', 'previous')
	 * @private
	 */
	dp_proto._initScript = function (scrpt) {

console.log(scrpt.name)

		if (scrpt.actions) {
			scrpt.actions.forEach(this._setUpAction.bind(this))
		}
	}

	dp_proto._setUpAction = function (action) {
		// get the element to act as the trigger
		// find its position
		var action = new Action(this, action)
		action.createEvents()
		this.actions.push(action)
	}

	return DemoPuppy

}).call(this, this, this.document)
