var cashBudgetId = 0
$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html")

	getCashById()
});

function getCashById() {
	$.ajax({
		type: "GET",
		url: `/servphone_war_exploded/servphone/rest/cash-register/get-by-id`,
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setValueCash(response)
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel buscar esse pagamento: ${error.message}`)
	})
}

function setValueCash(cash) {
	document.getElementById("inputCodBudget").value = cash.budget_id
	document.getElementById("inputDiscount").value = cash.discount
	document.getElementById("inputValue").value = cash.value_total
	document.getElementById('inputValueTotal').value = cash.value_total - cash.discount
	document.getElementById('inputDate').value = convertDateBr(cash.create_time)
	document.getElementById('inputFormPayment').value = getNameFormPayment(cash.form_payment)
	cashBudgetId = cash.budget_id
}

function getNameFormPayment(payment) {
	switch (payment) {
		case 'money':
			return 'Dinheiro'
		case 'debit':
			return 'Debito'
		case 'credit':
			return 'Credito'
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

function convertDateBr(date) {
	const dataUTC = new Date(date.replace('[UTC]', ''));
	const dataLocal = new Date(dataUTC.getTime() - (dataUTC.getTimezoneOffset() * 60000));

	return dataLocal.toLocaleDateString('pt-BR') + ' ' + dataLocal.toLocaleTimeString('pt-BR');
}

function goToBudget() {
	window.location.assign(`../../budget/edit-budget.html?id=${cashBudgetId}`)
}