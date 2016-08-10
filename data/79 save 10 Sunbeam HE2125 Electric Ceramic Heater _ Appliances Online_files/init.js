(function (w, d) {
	window.mtBrTr = window.mtBrTr || {};
	window.mtBrTr.url = 'https://ux-mt-br-tr.a.appliancesonline.com.au';

	window.mtBrTr.trackInputs = function() {
		var now = new Date();
	
		var inputs = document.querySelectorAll('input');
		for (var i = 0; i < inputs.length; i++)
		{
			var el = inputs[i],
				className = 'mt-br-tr-monitored';

			if (el.classList.contains(className) == false)
			{
				el.className += ' ' + className;

				el.addEventListener("change", function(){
					if (typeof this.value == 'string' && this.value.match(/^[^@]+@[^@]+\.[^@]+$/))
					{
						var data; 
						if (typeof btoa == "function")
							data = 'b='+btoa(this.value);
						else
							data = 'e='+this.value;

						var script = document.createElement('script');
						script.src = window.mtBrTr.url+'/ident?'+data+'&callback=ident_'+now.getTime()+'&_='+now.getTime();
						document.getElementsByTagName('head')[0].appendChild(script);
					}
				});

			}
		}

		var m = window.location.href.match(/(\?|&)kuid=([0-9]+)/i);
		if (m)
		{
			var data = 'u='+m[2];

			var script = document.createElement('script');
			script.src = window.mtBrTr.url+'/ident?'+data+'&callback=ident'+now.getTime()+'&_='+now.getTime();
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	window.mtBrTr.trackInputs();
}(window, document));

