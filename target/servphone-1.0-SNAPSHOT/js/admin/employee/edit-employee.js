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
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/employee/update`,
		data: JSON.stringify(updateEmployee)
	}).then((response) => {
		console.log("response", response)
	}).catch((error) => {
		console.log(error)
	})
}

function updateEmployee(){
	var employee = new Object();
    employee.name=document.frm.inputName.value;
    employee.salary=document.frm.inputSalary.value.replace(".", "").replace(",",".");
    employee.status=document.frm.selectStatus.value;
    employee.email=document.frm.inputEmail.value;
    employee.phone=document.frm.inputPhone.value;
    employee.role=document.frm.selectRole.value;
	console.log(employee)
	setUpdateEmployee(employee)
}

