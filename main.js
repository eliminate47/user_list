$(function () {
	var url = "https://randomuser.me/api/?";
	var res = 30;
	$.getJSON(
		url,
		{ results: res },
		function (users) {
			var male = 0, female = 0;
			$.each(users.results, function (i, item) {

				var User = $('<tr class = "user"></tr>')
					.append('<td class="thumbnail"><img src="' + users.results[i].picture.thumbnail + '"></td>')
					.append('<td>' + users.results[i].name.last + '</td>')
					.append('<td class="fname">' + users.results[i].name.first + '</td>')
					.append('<td>' + users.results[i].login.username + '</td>')
					.append('<td>' + users.results[i].phone + '</td>')
					.append('<td>' + users.results[i].location.city + '</td>')
					.append('<td class = "button"><span class = "plus part-1"></span><span class="plus part-2"></span></td>');

				var Info = $('<tr class = "add-info"></tr>');
				var colInfo = $('<td colspan = "7"></td>');
				var AddInfo = $('<div class = "user-info"></div>');
				var titleMain = document.createElement("h1");
				titleMain.textContent = users.results[i].name.first;
				if (users.results[i].gender == "male") {
					titleMain.classList.add("male");
					male += 1;
				} else {
					titleMain.classList.add("female");
					female += 1;
				}
				var largeThumb = $('<img src="' + users.results[i].picture.large + '">');
				var list = $('<ul class = "info-list"></ul>')
					.append('<li><b>Username</b> ' + users.results[i].login.username + '</li>')
					.append('<li><b>Registered</b> ' + newDate(users.results[i].registered.date) + '</li>')
					.append('<li><b>Email</b> ' + users.results[i].email + '</li>')
					.append('<li><b>Address</b> ' + users.results[i].location.street.number + " " + users.results[i].location.street.name + '</li>')
					.append('<li><b>City</b> ' + users.results[i].location.city + '</li>')
					.append('<li><b>Zip Code</b> ' + users.results[i].location.postcode + '</li>')
					.append('<li><b>Birthday</b> ' + newDate(users.results[i].dob.date) + '</li>')
					.append('<li><b>Phone</b> ' + users.results[i].phone + '</li>')
					.append('<li><b>Cell</b> ' + users.results[i].cell + '</li>');

				AddInfo.append(titleMain);
				AddInfo.append(largeThumb);
				AddInfo.append(list);
				colInfo.append(AddInfo);
				Info.append(colInfo);

				$('#users').append(User);
				$('#users').append(Info);
			});

			function newDate(str) {
				let fst = str.substring(0, 10);
				let scnd = fst.substring(5) + fst.substring(4, 5) + fst.substring(0, 4);
				return scnd.replace(/-/gi, '/');
			}

			//Открытие допольнительной информации пользователей

			var User = document.getElementsByClassName("user");
			var addInfo = document.getElementsByClassName("add-info");

			for (var i = 0; i < User.length; i++) {
				User[i].onclick = function () {
					if (this.classList.contains("active")) {
						this.classList.remove("active");
						this.nextElementSibling.classList.remove("click");
					} else if (!this.classList.contains("active")) {
						remClass(User, "active");
						remClass(addInfo, "click");
						this.classList.add("active");
						this.nextElementSibling.classList.add("click");
					}
				}
			}

			function remClass(elem, cName) {
				for (var i = 0; i < elem.length; i++) {
					elem[i].classList.remove(cName);
				}
			}

			//Поиск пользователя

			var input = document.getElementById("search");
			input.onkeyup = searchUser;

			function searchUser() {
				var phrase = document.getElementById("search");
				var table = document.getElementById("user-table");
				remClass(addInfo, "click");
				var regPhrase = new RegExp(phrase.value, 'i');
				var flag = false;
				for (var i = 1; i < table.rows.length; i++) {
					flag = false;
					if (i % 2 != 0) {
						for (var j = 1; j < table.rows[i].cells.length; j++) {
							flag = regPhrase.test(table.rows[i].cells[2].innerHTML);
							if (flag) break;
						}
						if (flag) {
							table.rows[i].style.display = "";
						} else {
							table.rows[i].style.display = "none";
						}
					}
				}
			}

			//Диаграмма

			var popCanvas = document.getElementById("gen-chart").getContext('2d');
			var perMale = Math.round(100 * male / res);
			var perFemale = Math.round(100 * female / res);

			var genChart = new Chart(popCanvas, {
				type: 'pie',
				data: {
					labels: ['Male %', 'Female %'],
					datasets: [{
						data: [perMale, perFemale],
						backgroundColor: ["#434348", "#7cb5ec"],
						borderColor: ["#ebebeb"]
					}]
				}
			});
		}
	);
});

//Открытие и закрытие модального окна

var modal = document.getElementById("modal");
var btn = document.getElementById("btn-modal");
var btn_close = document.getElementById("close-m");

btn.onclick = function () {
	modal.style.display = "block";
	document.body.style.overflow = "hidden";
}

btn_close.onclick = function () {
	modal.style.display = "none";
	document.body.style.overflow = "";
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		document.body.style.overflow = "";
	}
}