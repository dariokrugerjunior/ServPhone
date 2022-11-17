$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html");
	getClientById()
});

function getClientById() {
	$.ajax({
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/client/get-by-id`,
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setValueClient(response)
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel buscar esse cliente: ${error.message}`)
	})
}

function setValueClient(client) {
	document.getElementById("title").innerHTML = `Cliente: ${client.name}`
	document.getElementById("inputName").value = client.name
	document.getElementById("inputPhone").value = client.phone
	document.getElementById("inputEmail").value = client.email
	document.getElementById("inputCpfCnpj").value = client.cpf_cnpj
	document.getElementById("inputCEP").value = client.cep
	document.getElementById("inputAddress").value = client.address
	document.getElementById("inputAddressNumber").value = client.number
	document.getElementById("inputAddressDistrict").value = client.district
	document.getElementById("inputAddressCity").value = client.city
	document.getElementById("inputAddressState").value = client.state
	document.getElementById("inputAddressComplement").value = client.complement
	$(`#selectStatus option[value=${client.status}]`).attr('selected', 'selected')
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

function updateClient() {
	if (validateInputs()) {
		var client = new Object();
		client.id = new URLSearchParams(window.location.search).get('id')
		client.name = document.getElementById("inputName").value;
		client.email = document.getElementById("inputEmail").value;
		client.phone = document.getElementById("inputPhone").value;
		client.cpf_cnpj = document.getElementById("inputCpfCnpj").value
		client.cep = document.getElementById("inputCEP").value
		client.address = document.getElementById("inputAddress").value
		client.number = document.getElementById("inputAddressNumber").value
		client.district = document.getElementById("inputAddressDistrict").value
		client.city = document.getElementById("inputAddressCity").value
		client.state = document.getElementById("inputAddressState").value
		client.complement = document.getElementById("inputAddressComplement").value
		if(document.getElementById("selectStatus").value == 0){
			client.status = false
		}else{
			client.status = true
		}
		setUpdateClient(client)
	}
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

	if (document.getElementById("inputCpfCnpj").value.length < 11 && document.getElementById("inputCpfCnpj").value.length > 14) {
		actionModal("Aviso!", "Preencha o campo CPF - CNPJ corretamente")
		return false
	}

	if (document.getElementById("inputCEP").value == '') {
		actionModal("Aviso!", "Preencha o campo CEP corretamente")
		return false
	}

	if (document.getElementById("inputAddress").value == '') {
		actionModal("Aviso!", "Preencha o campo Endereço corretamente")
		return false
	}

	if (document.getElementById("inputAddressNumber").value == '') {
		actionModal("Aviso!", "Preencha o campo Numero corretamente")
		return false
	}

	if (document.getElementById("inputAddressDistrict").value == '') {
		actionModal("Aviso!", "Preencha o campo Bairro corretamente")
		return false
	}

	if (document.getElementById("inputAddressCity").value == '') {
		actionModal("Aviso!", "Preencha o campo Cidade corretamente")
		return false
	}

	if (document.getElementById("inputAddressState").value == '') {
		actionModal("Aviso!", "Preencha o campo Estado corretamente")
		return false
	}

	return true
}

function setUpdateClient(updateClient) {
	$.ajax({
		type: "PUT",
		url: `/servphone_war_exploded/servphone/rest/client/update`,
		data: JSON.stringify(updateClient)
	}).then((response) => {
		getClientById()
		if (response > 0) {
			actionModal("Sucesso", "Alteração salva com sucesso!")
		} else {
			actionModal("Erro", "Não foi possivel fazer a alteração")
		}
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer a alteração: ${error.message}`)
	})
}