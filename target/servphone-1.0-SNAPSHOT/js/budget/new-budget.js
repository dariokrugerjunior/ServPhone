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
        response.forEach(client => {
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
