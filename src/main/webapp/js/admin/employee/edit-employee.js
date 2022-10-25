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
		actionModal("Erro", `Não foi possivel buscar esse funcionario: ${error.message}`)
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
		getEmployeeById()
		if (response > 0) {
			actionModal("Sucesso", "Alteração salva com sucesso!")
		} else {
			actionModal("Erro", "Não foi possivel fazer a alteração")
		}
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer a alteração: ${error.message}`)
	})
}

function updateEmployee() {
	if (validateInputs()) {
		var employee = new Object();
		employee.id = new URLSearchParams(window.location.search).get('id')
		employee.name = document.getElementById("inputName").value;
		employee.salary = document.getElementById("inputSalary").value.replace(".", "").replace(",", ".");
		employee.status = document.getElementById("selectStatus").value;
		employee.email = document.getElementById("inputEmail").value;
		employee.phone = document.getElementById("inputPhone").value;
		employee.role = document.getElementById("selectRole").value;
		setUpdateEmployee(employee)
	}
}

function actionModal(title, message) {
	var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
		keyboard: false,
	})
	myModal
	$("#body-content").html(message)
	$("#myModalLabel").html(title)
	myModal.show()
}

function validateInputs() {
	if (!RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$").test(document.getElementById("inputName").value)) {
		actionModal("Aviso!", "Preencha o campo Nome Completo corretamente")
		return false;
	}

	if (!new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$').test(document.getElementById("inputEmail").value)) {
		actionModal("Aviso!", "Preencha o campo Email corretamente")
		return false
	}

	if ((document.getElementById("inputPhone").value.length !== 11)) {
		actionModal("Aviso!", "Preencha o campo Telefone corretamente")
		return false
	}

	if (document.getElementById("inputSalary").value == '') {
		actionModal("Aviso!", "Preencha o campo Salario corretamente")
		return false
	}

	return true
}
