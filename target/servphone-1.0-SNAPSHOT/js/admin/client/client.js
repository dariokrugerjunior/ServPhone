$(document).ready(function(){   
	$("header").load("../../../pages/menu/header.html");
	getClientById()
});

function getClientById() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/client/get",
	}).then((response) => {
		setClientTable(response)
	}).catch((error) => {
	})
}

function setClientTable(listClient) {
	listClient.forEach(client => {
		let rowTable = 
		`<tr> 
			<th scope="row">${client.id}</th>
			<td>${client.name}</td>
			<td>${!client.status ? 'Desativado' : 'Ativo'}</td>
			<td>
			<a href="/servphone_war_exploded/pages/admin/client/edit-client.html?id=${client.id}">
				<button class="navbar-toggler custom-toggler" type="button">
				<img src="../../../imgs/edit.svg" width="30" height="30">
				</button>
			</a>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}