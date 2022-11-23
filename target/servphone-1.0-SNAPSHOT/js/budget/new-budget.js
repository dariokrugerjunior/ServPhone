$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
    getClient()
});

function resetForm(){
    $("#form").trigger('reset'); 
}

function getClient() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/client/client-active",
	}).then((response) => {
        setClient(response)
	}).catch((error) => {
	})
}

function setClient(response) {
    document.getElementById('selectClient').innerHTML = ''
    if (response.length > 0) {
        response.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ).forEach(client => {
            document.getElementById('selectClient').innerHTML += `<option value="${client.id}">${client.name}</option>')`
        });
    } else {
        document.getElementById('selectClient').innerHTML = `<option value="erro">Sem clientes cadastrados</option>')`
    }
}

function validateInputs() {

    if (document.getElementById('selectClient').value == 'erro'){
        actionModal("Aviso!", "Cadastre um cliente para registrar um orçamento!")
		return false;
    }

	if (document.getElementById("inputModel").value == '') {
		actionModal("Aviso!", "Preencha o campo Modelo corretamente")
		return false
	}

	if (document.getElementById("inputBrand").value == '') {
		actionModal("Aviso!", "Preencha o campo Marca corretamente")
		return false
	}

	if (document.getElementById("inputDefect").value == '') {
		actionModal("Aviso!", "Preencha o campo Defeito corretamente")
		return false
	}

	if (document.getElementById("inputDescription").value == '') {
		actionModal("Aviso!", "Preencha o campo descrição corretamente")
		return false
	}
	return true
}

function setBudget() {
    if (validateInputs()) {
        var budget = Object();
        budget.status = 1
		budget.model = document.getElementById("inputModel").value
		budget.brand = document.getElementById("inputBrand").value
		budget.defect = document.getElementById("inputDefect").value
		budget.description = document.getElementById("inputDescription").value
		budget.password_product = document.getElementById("inputPasswordProduct").value
		budget.client_id = document.getElementById('selectClient').value
		registerBudget(budget)
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

function registerBudget(budget) {
	$.ajax({
		type: "POST",
		url: `/servphone_war_exploded/servphone/rest/budget/register`,
		data: JSON.stringify(budget)
	}).then((response) => {
		if (response === 'Orçamento cadastrado com sucesso!') {
            document.getElementById("form").reset()
			actionModal("Sucesso", response)
		} else {
            actionModal("Erro", response)
        }
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer o cadastro: ${error.responseText}`)
	})
}
