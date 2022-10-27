$(document).ready(function(){   
	$("header").load("../../../pages/menu/header.html");
});

function resetForm(){
    $("#form").trigger('reset'); 
}

function setClient() {
    if (validateInputs()) {
        var client = new Object();
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
        registerClient(client)
    }
}

function registerClient(client) {
    $.ajax({
		type: "POST",
		url: `/servphone_war_exploded/servphone/rest/client/register`,
		data: JSON.stringify(client)
	}).then((response) => {
		if (response === 'Cliente cadastrado com sucesso!') {
            document.getElementById("form").reset()
			actionModal("Sucesso", response)
		} else {
            actionModal("Erro", response)
        }
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer o cadastro: ${error.message}`)
	})
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

function actionModal(title, message) {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: false,
    })
    myModal
    $("#body-content").html(message)
    $("#myModalLabel").html(title)
    myModal.show()
}
