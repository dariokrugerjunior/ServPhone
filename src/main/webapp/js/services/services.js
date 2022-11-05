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
			<td>${service.name}</td>
			<td>${service.priceHours}</td>
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