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
			<td>${employee.name}</td>
			<td>${employee.role === 0 ? 'Administração' : 'Tecnico'}</td>
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