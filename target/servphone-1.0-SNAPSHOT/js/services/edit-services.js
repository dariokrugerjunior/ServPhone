$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
	getServiceById()
});

function getServiceById() {
	$.ajax({
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/service/get-by-id`,
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setValueService(response)
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel buscar esse serviço: ${error.responseText}`)
	})
}

function setUpdateService(updateService) {
	$.ajax({
		type: "PUT",
		url: `/servphone_war_exploded/servphone/rest/service/update`,
		data: JSON.stringify(updateService)
	}).then((response) => {
		getServiceById()
		if (response > 0) {
			actionModal("Sucesso", "Alteração salva com sucesso!")
		} else {
			actionModal("Erro", "Não foi possivel fazer a alteração")
		}
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer a alteração: ${error.message}`)
	})
}

function updateService() {
	if (validateInputs()) {
		var service = new Object();
		service.id = new URLSearchParams(window.location.search).get('id')
		service.name = document.getElementById("inputName").value
		service.priceHours = document.getElementById("inputPrice").value
		service.status = document.getElementById("selectStatus").value
		setUpdateService(service)
	}
}


function setValueService(service) {
	document.getElementById("title").innerHTML = `Serviço: ${service.name}`
	document.getElementById("inputName").value = service.name
	document.getElementById("inputPrice").value = service.priceHours
	let status = 0;
	if(service.status){
		status = 1
	}
	$(`#selectStatus option[value=${status}]`).attr('selected', 'selected')
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

	if (document.getElementById("inputPrice").value == "") {
		actionModal("Aviso!", "Preencha o campo Preço corretamente")
		return false
	}

	return true
}