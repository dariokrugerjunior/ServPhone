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

function setProduct () {
    if(validateInputs()){
        var product = new Object();
        product.name = document.getElementById("inputName").value
		product.value_sale = document.getElementById("inputPrice").value
        product.status = 1
        registerProduct(product)
    }
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

function registerProduct (product) {
	$.ajax({
		type: "POST",
		url: `/servphone_war_exploded/servphone/rest/product/register`,
		data: JSON.stringify(product)
	}).then((response) => {
		if (response === 'Produto cadastrado com sucesso!') {
            document.getElementById("form").reset()
			actionModal("Sucesso", response)
		} else {
            actionModal("Erro", response)
        }
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer o cadastro: ${error.responseText}`)
	})
}
