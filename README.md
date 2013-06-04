## jquery-plugins

jquery.maxLength is a jquery plugin for detecting input value in textarea or input element.

### How to use

    <textarea id="content"></textarea>
	<div>
		<span id="count">0</span> / 1,000byte</span>
	</div>

	<script type="text/javascript">
		jQuery("#content").maxLength({
			unit: 'byte',
			max: 1000,
			isCutValue: true
		}).bind('onchange', function() {
			jQuery("#count").html(arguments[1].count);
		});
	</script>


### [see the demo](https://github.com/hidcliff/jquery-plugins/blob/master/maxLength/demo.html)