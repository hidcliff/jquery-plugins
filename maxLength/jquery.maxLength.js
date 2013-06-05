/**
 * maxLength
 * 
 * @param
 * unit : bytes | words, unit
 * max : -1(infinity) | number, maximum length
 * method : timer | key, event method
 * isCutValue : false | true, cutting up to a maximum length
 */	
(function($) {
	function MaxLength($element, options) {
		var self = this,
		config = $.extend({
			unit: "bytes",
			max: -1,
			method: "timer",
			isCutValue: false
		}, options),
		timer = null,
		lastValue = "";
				
		function getBytesLength(value) {
			return (value.length + (escape(value)+"%u").match(/%u/g).length-1);
		}		
		
		function getCount(value) {
			return config.unit === "bytes" ? getBytesLength(value) : value.length;
		}

		function stopTimer() {
			clearInterval(timer);
			timer = null;
			$element.trigger("onstop");
		}
		
		function startTimer() {
			timer = setInterval(self.change, 200);
			$element.trigger("onstart");
		}

		this.change = function() {
 			var value = $element.val(),
 			isExceeded = config.max > -1 && getCount(value) > config.max ? true : false,
 			tempValue = lastValue;
 			
 			if (isExceeded && config.isCutValue) {
 				value = tempValue;
 				$element.val(tempValue);
 			}
			
 			if (lastValue !== value) {
				$element.trigger("onchange", {
					value: $element.val(),
					isExceeded: isExceeded,
					count: getCount(value)
				});
 			}			
			lastValue = value;
		};
		
		$element.focus(function() {
			startTimer();
		}).blur(function() {
			stopTimer();
		});
	}

	$.fn.maxLength = function(options) {
		var $element = $(this);
		
		$(this).data("instance", new MaxLength($element, options));
		return this;
	};

	$.fn.updateLength = function() {
		$(this).data("instance").change();
	};	
}(jQuery));