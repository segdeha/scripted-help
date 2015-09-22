/**
 * Generic utilities
 * @todo Replace with a proper library such as Underscore.js
 * @author Andrew Hedges <andrew@hedges.name>
 * @date 2015-09-21
 */
var utils = (function (window, document, undefined) {

	function isPositiveNumber(val) {
		return /^[0-9]+\.?[0-9]?$/.test(val)
	}

	/**
	 * Return an object of the name/value pairs of location.search
	 */
	function getQuery() {
		var query = window.location.search
		var obj = {}
		var pairs
		if (0 === query.indexOf('?')) {
			query = query.substr(1)
			pairs = query.split('&')
			pairs.forEach(function(pair) {
				var split = pair.split('=')
				if (split.length > 1) {
					obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1])
				}
			})
		}
		return obj
	}

	/**
	 * Return the x, y of the given element
	 * Based on: http://www.quirksmode.org/js/findpos.html
	 */
	function getElementPos(el) {
		var pos = {
			x : 0,
			y : 0
		}
		if (el.offsetParent) {
			do {
				pos.x += el.offsetLeft
				pos.y += el.offsetTop
			} while (el = el.offsetParent)
		}
		return pos
	}

	return {
		isPositiveNumber : isPositiveNumber,
		getQuery : getQuery,
		getElementPos : getElementPos
	}

}).call(this, this, this.document)
