/**
 * Created by David on 10/11/13.
 */

var avaScripts = [
	"avaUtil.js",
//	"avaChat.js",
//	"avaContextMenu.js",
//	"avaIncomming.js",
//	"avaIntel.js",
//	"avaRaid.js",
	"avaMisc.js",
	"avaInit.js",
		];

function avaInjectJs (resourceName )
{
	var url = chrome.extension.getURL(resourceName);
	var scriptElement = document.createElement('script');

	if (typeof scriptElement != "undefined") {
		scriptElement.setAttribute("type", "application/javascript" );
		scriptElement.setAttribute("src", url);
		document.getElementsByTagName("head")[0].appendChild(scriptElement);
	}
	else
	{
	 console.error("bad");
	}
};


function inject() {
	console.warn('Injecting fun fun fun script');
	for(var i=0;i<avaScripts.size;++i)
	{
		avaInjectJs( avaScripts[i] );
	}

}

inject();
