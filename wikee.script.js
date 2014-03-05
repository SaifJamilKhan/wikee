var headBar = document.createElement("div");
headBar.id = "headBar";

var searchForm = document.getElementById("searchform").cloneNode(true);

var headBarTitle = document.createElement("h1");
headBarTitle.innerHTML = "W.";

var headBarMenu = document.createElement("div");
headBarMenu.id = "headBarMenu"

var contentMenu = document.createElement("div");
contentMenu.id = "contentMenu";
contentMenu.className = "hideM";
var contentMenuItems = document.getElementById("toc").children
for(var i = 0; i < contentMenuItems.length; i++) {
	if(contentMenuItems[i].tagName.toLowerCase() == "ul") {
		contentMenuItems = contentMenuItems[i];
		break;
	}
}
contentMenu.appendChild(contentMenuItems);

headBar.appendChild(headBarTitle);
headBar.appendChild(searchForm);
headBar.appendChild(headBarMenu);

document.getElementsByTagName("body")[0].insertBefore(headBar, document.getElementsByTagName("body")[0].children[0]);
document.getElementsByTagName("body")[0].insertBefore(contentMenu, document.getElementsByTagName("body")[0].children[0]);

function triggerMenu(forceHide) {
	if(forceHide == true) {
		contentMenu.className = "hideM";
	} else {
		if(contentMenu.className == "hideM") {
			contentMenu.className = "showM";
			contentMenu.style.top = headBar.offsetHeight + "px";
		} else {
			contentMenu.className = "hideM";
		}
	}
}

function isChild(parent, child) {
	if(parent == child) {
		return true;
	}
	var node = child.parentNode;
	while(node != null) {
		if(node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}


document.addEventListener('click', function(e) {
	if(e.target == headBarMenu) {
		triggerMenu(false);
	} else if(isChild(contentMenu, e.target) == false) {
		triggerMenu(true);
	}
}, false);