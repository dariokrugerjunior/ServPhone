$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html");
	getEmployee()
});

function getEmployee() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/employee/get",
	}).then((response) => {
		setEmployeeTable(response)
	}).catch((error) => {
	})
}

function setEmployeeTable(listEmployee) {
	listEmployee.forEach(employee => {
		let rowTable = 
		`<tr> 
			<th scope="row">${employee.id}</th>
			<td class="name">${employee.name}</td>
			<td>${employee.role === 0 ? 'Administração' : 'Tecnico'}</td>
			<td>${employee.status === 0 ? 'Desativado' : 'Ativado'}</td>
			<td>
			<a href="/servphone_war_exploded/pages/admin/employee/edit-employee.html?id=${employee.id}">
				<button class="navbar-toggler custom-toggler" type="button">
				<img src="../../../imgs/edit.svg" width="30" height="30">
				</button>
			</a>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}

function searchEmployee() {
	var input, ul, filter, li, a, i, txtValue;
	input = document.getElementById('search-employee');
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