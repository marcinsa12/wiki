(function(global) {
	const url =
		"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&generator=search&pilimit=max&exsentences=1&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&origin=*&gsrsearch=";
	const pageIDurl = "https://en.wikipedia.org/?curid=";
	const lookFor = document.querySelector("input[type=text]");
	function moveOn() {
		lookFor.classList.add("afterFocus");
		document.querySelector(".centralbox").classList.add("movedUp");
		document.querySelector(".invisible").classList.add("visible");
	}
	function moveOut() {
		lookFor.classList.remove("afterFocus");
		document.querySelector(".centralbox").classList.remove("movedUp");
		document.querySelector(".invisible").classList.remove("visible");
	}

	function createBlock(semiIndex, semiTitle, semiEx) {
		document.querySelector(".generatedContent").innerHTML +=
			' <div class="generatedBlocks"><h1><a href="https://en.wikipedia.org/?curid=' +
			semiIndex +
			'">' +
			semiTitle +
			'</h1></a><p class="generatedText">' +
			semiEx +
			"</p></div>";
	}

	function wikiSearchTool(event) {
		event.preventDefault();
		fetch(url + lookFor.value)
			.then(response => response.json())
			.then(myJson => {
				document.querySelector(".errorMsg").classList.remove("errorMsgDisplayed");
				let arr = Object.keys(myJson.query.pages).map(key => myJson.query.pages[key]);
				document.querySelector(".generatedContent").innerHTML = "";
				arr.forEach(function(a) {
					if (a.extract.length > 250) a.extract = a.extract.slice(0, 247) + "...";
					createBlock(a.pageid, a.title, a.extract);
				});
				document.querySelector(".centralbox").classList.add("loaded");
			})
			.catch(error => {
				console.log("We had some issues");
				document.querySelector(".errorMsg").classList.add("errorMsgDisplayed");
			});
	}
	function init() {
		document.querySelector(".invisible").addEventListener("click", wikiSearchTool);
		lookFor.addEventListener("focus", moveOn);
		lookFor.addEventListener("focusout", function() {
			if (document.querySelector("#searchCont").value == "") {
				moveOut();
			}
		});
		document.querySelector("form").addEventListener("submit", wikiSearchTool);
	}
	init();

	////////////////////////////////////////////// MONSTER HEAD CONTROL

	let positionHistory = {x: 0, y: 0};
	let eyes = document.querySelector(".monsterEye");
	let eyeballs = document.querySelectorAll(".eyeballs");

	setInterval(() => {
		moveEyes(eyeballs);
	}, 100);

	document.onmousemove = function(event) {
		let e = event || window.event;
		mousePos = {x: e.clientX, y: e.clientY};
		return mousePos;
	};

	function moveEyes(targetsArray) {
		if (window.mousePos) {
			[].forEach.call(targetsArray, el => {
				let ratioY = window.innerHeight / el.parentElement.offsetHeight * 2;
				let ratioX = window.innerWidth / el.parentElement.offsetWidth * 2;
				let ballPos = el.getBoundingClientRect();
				let deltaX = Math.round((mousePos.x - ballPos.x) / ratioX);
				let deltaY = Math.round((mousePos.y - ballPos.y) / ratioY);
				if (deltaY > el.parentElement.offsetHeight / 2) deltaY = el.parentElement.offsetHeight / 2 - 2;
				if (positionHistory.x !== deltaX || positionHistory.y !== deltaY) {
					el.setAttribute("style", "transform: translate(" + (deltaX - 1) + "px, " + (deltaY - 1) + "px);");
				}
				positionHistory.x = deltaX;
				positionHistory.y = deltaY;
			});
		}
	}
})(window);
