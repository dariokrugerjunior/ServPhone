$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
	getService()
});

function getService() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/service/get",
	}).then((response) => {
		setServiceTable(response)
	}).catch((error) => {
	})
}

function setServiceTable(listService) {
	listService.forEach(service => {
		let rowTable = 
		`<tr> 
			<th scope="row">${service.id}</th>
			<td class="name">${service.name}</td>
			<td>${service.priceHours.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
			<td>${service.status == 0 ? 'Desativado' : 'Ativado' }</td>
			<td>
			<a href="/servphone_war_exploded/pages/services/edit-services.html?id=${service.id}">
				<button class="navbar-toggler custom-toggler" type="button">
				<img src="../../imgs/edit.svg" width="30" height="30">
				</button>
			</a>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}

function searchService() {
	var input, ul, filter, li, a, i, txtValue;
	input = document.getElementById('search-service');
	filter = input.value.toUpperCase();
	ul = document.getElementById("table-value");
	li = ul.getElementsByTagName('tr');
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("name")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}