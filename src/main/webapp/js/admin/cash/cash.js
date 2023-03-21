$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html")
	getAll()
});


function getAll() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/cash-register/get",
	}).then((response) => {
		setCashTable(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar os pagamentos: ${error.responseText}`)
	})
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

function setCashTable(cashRegisterList) {
	console.log(cashRegisterList)
	document.getElementById("table-value").innerHTML = ''
	cashRegisterList.sort(function (a, b) {
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	}).forEach(cash => {
		let rowTable =
			`<tr> 
			<th scope="row">${cash.id}</th>
			<td class="name">${cash.budget_id}</td>
			<td>${cash.value_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
			<td>${getNameFormPayment(cash.form_payment)}</td>
			<td class="column-action">
				<div class="d-flex justify-content-evenly">
				<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('cash-view.html?id=${cash.id}')"></i>
				</div>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
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
