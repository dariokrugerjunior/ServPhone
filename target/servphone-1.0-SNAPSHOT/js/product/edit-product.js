$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
	getProductById()
});

function getProductById() {
	$.ajax({
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/product/get-by-id`,
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setValueProduct(response)
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel buscar esse produto: ${error.message}`)
	})
}

function setUpdateProduct(updateProduct) {
	$.ajax({
		type: "PUT",
		url: `/servphone_war_exploded/servphone/rest/product/update`,
		data: JSON.stringify(updateProduct)
	}).then((response) => {
		getProductById()
		if (response > 0) {
			actionModal("Sucesso", "Alteração salva com sucesso!")
		} else {
			actionModal("Erro", "Não foi possivel fazer a alteração")
		}
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer a alteração: ${error.message}`)
	})
}

function updateProduct() {
	if (validateInputs()) {
		var product = new Object();
		product.id = new URLSearchParams(window.location.search).get('id')
		product.name = document.getElementById("inputName").value
		product.value_sale = document.getElementById("inputPrice").value
		product.status = document.getElementById("selectStatus").value
		setUpdateProduct(product)
	}
}


function setValueProduct(product) {
	document.getElementById("title").innerHTML = `Produto: ${product.name}`
	document.getElementById("inputName").value = product.name
	document.getElementById("inputPrice").value = product.valueSale
	let status = 0;
	if(product.status){
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

