} // end of avaInit


/* startup script to launch the tweak */
var startup = function()
{
	if(typeof window.qx == 'undefined') {
		console.warn('qx not found, retry again in a couple of seconds.');
		window.setTimeout(startup, 2000);
		return;
	}
	// checkDependances
	console.warn('check dependencies');
	var dependencies = [webfrontend.config.Config.getInstance().getChat(), qx.core.Init.getApplication().chat],
		i = dependencies.length;

	while(i--) {
		if(dependencies[i])
			continue;
		console.debug('dependency missing [' + i + ']');
		console.warn('dependencies missing, retry again in a couple seconds');
		window.setTimeout(startup, 2000);
		return;

	}
	console.debug('dependencies found.  initialize tools');
	window.setTimeout(avaInit, 2000);
};
window.setTimeout(startup, 4000);
} // end of avaMain




function inject() {
	console.warn('Injecting fun fun fun script');
	var script = document.createElement("script");
	var txt = avaMain.toString();
	if(window.opera != undefined)
		txt = txt.replace(/</g, "&lt;");
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);



}

if(/lordofultima\.com/i.test(document.domain))
	inject();


})();
