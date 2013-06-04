/**
 * maxLength
 * 
 * @param
 * unit : bytes | words, unit
 * max : -1(infinity) | number, maximum length
 * method : timer | key, event method
 * isCutValue : false | true, cutting up to a maximum length
 */	
; (function($) {
	$.fn.maxLength = function(options) {
		var $element = $(this);
		
		$(this).data("instance", new maxLength($element, options));
		return this;
	};

	$.fn.updateLength = function() {
		$(this).data("instance").change();
	};
	
	function maxLength($element, options) {
		var self = this;
		var config = $.extend({
			unit: "bytes",
			max: -1,
			method: "timer",
			isCutValue: false
		}, options);
		var timer = null;
		var lastValue = "";
		
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
 			var value = $element.val();
 			var isExceeded = config.max > -1 && getCount(value) > config.max ? true : false;
 			var tempValue = lastValue;
 			
 			if (isExceeded && config.isCutValue) {
 				value = tempValue;
 				$element.val(tempValue);
 			}
			
 			if (lastValue != value) {
				$element.trigger("onchange", {
					value: $element.val(),
					isExceeded: isExceeded,
					count: getCount(value)
				});
 			}			
			lastValue = value;
		}
		
		function getCount(value) {
			return config.unit === "bytes" ? getBytesLength(value) : value.length;
		}
		
		function getBytesLength(value) {
			return (value.length + (escape(value)+"%u").match(/%u/g).length-1);
		}
				
		$element.focus(function() {
			startTimer();
		}).blur(function() {
			stopTimer();
		});
	}
	
})(jQuery);