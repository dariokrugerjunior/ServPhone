const Budget = new Object();
const Products = [];
const Services = [];
let valueTotalBudget = 0
let valueTotal = 0;

$(document).ready(function () {
	$("header").load("../../../pages/menu/header.html")
	getById()
	setTimeout(function () {
		if (Budget.status == 10) {
			valuesPayment(Products, Services)
		} else {
			actionModal("Erro", `Não pode fazer o pagamento do orçamento solicitado`)

		}
	}, 1000);

});


function getById() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/budget/get-by-id",
		data: `id=${new URLSearchParams(window.location.search).get('id')}`
	}).then((response) => {
		setBudgetsTable(response)
		getProductByBudgetId(response.id)
		getServiceByBudgetId(response.id)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar esse orçamento: ${error.responseText}`)
	})
}

function setBudgetsTable(budget) {
	Budget.id = budget.id
	Budget.name = budget.name
	Budget.model = budget.model
	Budget.brand = budget.brand
	Budget.password_product = budget.password_product
	Budget.defect = budget.defect
	Budget.description = budget.description
	Budget.status = budget.status


	document.getElementById("inputCodBudget").value = budget.id
	document.getElementById("inputClient").value = budget.name
	document.getElementById("inputModel").value = budget.model
	document.getElementById("inputBrand").value = budget.brand
	document.getElementById("inputDefect").value = budget.defect
	document.getElementById("inputDescription").value = budget.description
}

function getProductByBudgetId(id) {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/product/product-budget",
		data: `id=${id}`
	}).then((response) => {
		response.forEach((product) => setTableProduct(product))
	}).catch((error) => {
	})
}

function setTableProduct(product) {
	document.getElementById("table-product").innerHTML = ''
	var newProduct = new Object()
	newProduct.id = product.id
	newProduct.name = product.name
	newProduct.status = product.status
	newProduct.value_sale = product.valueSale
	newProduct.amount = product.amount ? product.amount : document.getElementById("inputAmount").value

	if (Products.length == 0 || !Products?.map((x) => x?.id === newProduct.id).includes(true)) {
		Products.push(newProduct)
	} else {
		Products.forEach((x) => {
			if (x.id == newProduct.id) {
				x.amount = parseInt(x.amount) + parseInt(document.getElementById("inputAmount").value)
			}
		})
	}
	refreshProductTable()
}

function refreshProductTable() {
	document.getElementById("table-product").innerHTML = ''
	Products.sort(function (a, b) {
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	}).forEach((product, x) => {
		let rowTable =
			`<tr> 
			<th scope="row">${product.id}</th>
			<td class="name">${product.name}</td>
			<td>${product.value_sale.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
			<td>${product.amount}</td>
		</tr>`
		document.getElementById("table-product").innerHTML += rowTable
	});
}

function getServiceByBudgetId(id) {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/service/service-budget",
		data: `id=${id}`
	}).then((response) => {
		response.forEach((service) => setTableService(service))
	}).catch((error) => {
	})
}

function setTableService(service) {
	document.getElementById("table-service").innerHTML = ''
	var newService = Object();
	newService.id = service.id
	newService.name = service.name
	newService.status = service.status
	newService.price_hours = service.priceHours
	newService.amount_hours = service.amountHours ? service.amountHours : document.getElementById("inputAmountHours").value
	if (Services.length == 0 || !Services?.map((x) => x?.id === newService.id).includes(true)) {
		Services.push(newService)
	} else {
		Services.forEach((x) => {
			if (x.id == newService.id) {
				x.amount_hours = parseInt(x.amount_hours) + parseInt(document.getElementById("inputAmountHours").value)
			}
		})
	}
	refreshServiceTable()
}

function refreshServiceTable() {
	document.getElementById("table-service").innerHTML = ''
	Services.sort(function (a, b) {
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	}).forEach((service, x) => {
		let rowTable =
			`<tr> 
			<th scope="row">${service.id}</th>
			<td class="name">${service.name}</td>
			<td>${service.price_hours.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
			<td>${service.amount_hours}</td>
		</tr>`
		document.getElementById("table-service").innerHTML += rowTable
	});
}

function valuesPayment(products, services) {
	let valueTotalServices = 0
	let valueTotalProducts = 0
	services.forEach((service) => {
		valueTotalServices = valueTotalServices + (service.price_hours * service.amount_hours)
	})

	products.forEach((product) => {
		valueTotalProducts = valueTotalProducts + (product.value_sale * product.amount)
	})

	valueTotalBudget = valueTotalServices + valueTotalProducts
	valueTotal = valueTotalBudget

	document.getElementById('value').value = valueTotalBudget.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
	document.getElementById('valueTotal').value = valueTotalBudget.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

function applyDiscount(value) {
	valueTotal = valueTotalBudget - value
	document.getElementById('valueTotal').value = valueTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
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

function paymentConfirm() {
	var cashPayment = new Object();

	cashPayment.budget_id = Budget.id
	cashPayment.discount = document.getElementById('discount').value === '' ? 0 : document.getElementById('discount').value
	cashPayment.value_total = valueTotal
	cashPayment.form_payment = verifyPayment()


	$.ajax({
		type: "POST",
		url: "/servphone_war_exploded/servphone/rest/cash-register/register-payment",
		data: JSON.stringify(cashPayment)
	}).then((response) => {
		if (response == 20) {
			actionModal('Erro', 'Esse orçamento já foi pago')
		} else if (response == 0) {
			actionModal('Erro', 'Não foi possivel fazer pagamento desse orçamento.')
		} else {
			actionModal('Sucesso', 'Orçamento pago com sucesso!')
		}
	}).catch((error) => {
		actionModal('Erro', 'Erro ao critico ao realizar pagamento, acionar os administradores')
	})
}	

function verifyPayment() {
	if (document.querySelector('#btnMoney').checked) {
		return'money'
	} else if (document.querySelector('#btnDebit').checked) {
		return 'debit'
	} else if (document.querySelector('#btnCredit').checked) {
		return 'credit'
	}
}