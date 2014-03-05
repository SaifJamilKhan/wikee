var box = {
	"headBar": document.createElement("div"),
	"searchForm": document.getElementById("searchform").cloneNode(true),
	"headBarTitle": document.createElement("h1"),
	"headBarMenu": document.createElement("div"),
	"contentMenu": document.createElement("div")
};


function init() {
	box.headBar.id = "headBar";
	box.headBarTitle.innerHTML = "W.";
	box.headBarMenu.id = "headBarMenu";
	box.contentMenu.id = "contentMenu";
	box.contentMenu.className = "hideM";

	if(document.getElementById('toc')) {
		var contentMenuItems = document.getElementById("toc").children
		for(var i = 0; i < contentMenuItems.length; i++) {
			if(contentMenuItems[i].tagName.toLowerCase() == "ul") {
				contentMenuItems = contentMenuItems[i];
				break;
			}
		}
		box.contentMenu.appendChild(contentMenuItems); 
	}

	box.headBar.appendChild(box.headBarTitle);
	box.headBar.appendChild(box.searchForm);
	box.headBar.appendChild(box.headBarMenu);

	document.getElementsByTagName("body")[0].insertBefore(box.headBar, document.getElementsByTagName("body")[0].children[0]);
	document.getElementsByTagName("body")[0].insertBefore(box.contentMenu, document.getElementsByTagName("body")[0].children[0]);
}

function triggerMenu(forceHide) {
	if(forceHide) {
		box.contentMenu.className = "hideM";
	} else {
		if(box.contentMenu.className == "hideM") {
			box.contentMenu.className = "showM";
			box.contentMenu.style.top = box.headBar.offsetHeight + "px";
		} else {
			box.contentMenu.className = "hideM";
		}
	}
}

function isChild(parent, child) {
	var node = child;
	while(node != null) {
		if(node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

document.addEventListener('click', function(e) {
	if(e.target == box.headBarMenu) {
		triggerMenu(false);
	} else if(!(isChild(box.contentMenu, e.target))) {
		triggerMenu(true);
	}
}, false);

window.onhashchange = function() {
	window.scroll(0, window.scrollY - box.headBar.offsetHeight);
}

init();