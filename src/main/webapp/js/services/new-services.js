$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
});

function resetForm(){
    $("#form").trigger('reset'); 
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

function validateInputs () {

    if (document.getElementById("inputName").value == "") {
		actionModal("Aviso!", "Preencha o campo Nome corretamente")
		return false
	}

    if (document.getElementById("inputPrice").value == "") {
		actionModal("Aviso!", "Preencha o campo Preço corretamente")
		return false
	}
    
    return true
}

function setService () {
    if(validateInputs()){
        var service = new Object();
        service.name = document.getElementById("inputName").value
		service.price_hours = document.getElementById("inputPrice").value
        service.status = 1
        registerService(service)
    }
}

function registerService (service) {
	$.ajax({
		type: "POST",
		url: `/servphone_war_exploded/servphone/rest/service/register`,
		data: JSON.stringify(service)
	}).then((response) => {
		if (response === 'Serviço cadastrado com sucesso!') {
            document.getElementById("form").reset()
			actionModal("Sucesso", response)
		} else {
            actionModal("Erro", response)
        }
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer o cadastro: ${error.responseText}`)
	})
}

