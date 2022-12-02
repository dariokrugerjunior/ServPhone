$(document).ready(function () {
	$("header").load("../../pages/menu/header.html");
	getById()


});


function getById() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/budget/get-by-id",
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setBudgetsTable(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar esse orçamento: ${error.responseText}`)
	})
}

function setBudgetsTable(budget) {
	document.getElementById("title").innerHTML = `Código orçamento: ${budget.id}`
	document.getElementById("inputClient").innerHTML = budget.name
	document.getElementById("inputModel").innerHTML = budget.model
	document.getElementById("inputBrand").innerHTML = budget.brand
	document.getElementById("inputPasswordProduct").innerHTML = budget.password_product
	document.getElementById("inputDefect").innerHTML = budget.defect
	document.getElementById("inputDescription").innerHTML = budget.description
}
