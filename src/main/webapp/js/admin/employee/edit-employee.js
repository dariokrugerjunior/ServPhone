$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html");
	getEmployeeById()
});

function getEmployeeById() { 
	$.ajax({
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/employee/get-by-id`,
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setValueEmployee(response)
	}).catch((error) => {
		console.log(error)
	})
}

function setValueEmployee(employee) {
	document.getElementById("title").innerHTML = `Funcionario: ${employee.name}`
	document.getElementById("inputName").value = employee.name
	document.getElementById("inputPhone").value = employee.phone
	document.getElementById("inputSalary").value = employee.salary
	document.getElementById("inputEmail").value = employee.email
	$(`#selectRole option[value=${employee.role}]`).attr('selected', 'selected')
	$(`#selectStatus option[value=${employee.status}]`).attr('selected', 'selected')
}

function setUpdateEmployee(updateEmployee) {
	$.ajax({
		type: "PUT",
		url: `/servphone_war_exploded/servphone/rest/employee/update`,
		data: JSON.stringify(updateEmployee)
	}).then((response) => {
		console.log("response", response)
		getEmployeeById()
	}).catch((error) => {
		console.log(error, 'error')
	})
}

function updateEmployee(){
	var employee = new Object();
	employee.id = new URLSearchParams(window.location.search).get('id')
    employee.name = document.getElementById("inputName").value;
    employee.salary = document.getElementById("inputSalary").value.replace(".", "").replace(",",".");
    employee.status = document.getElementById("selectStatus").value ;
    employee.email = document.getElementById("inputEmail").value;
    employee.phone = document.getElementById("inputPhone").value;
    employee.role = document.getElementById("selectRole").value ;
	setUpdateEmployee(employee)
}

