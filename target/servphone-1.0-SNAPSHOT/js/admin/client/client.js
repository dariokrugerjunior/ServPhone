$(document).ready(function(){   
	$("header").load("../../../pages/menu/header.html");
	getClient()
});

function getClient() {
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
			<td class="name">${client.name}</td>
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

function searchClient() {
	var input, ul, filter, li, a, i, txtValue;
	input = document.getElementById('search-client');
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