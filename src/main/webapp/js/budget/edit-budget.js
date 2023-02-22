var Budget = new Object();
var Products = [];
var Services = [];

$(document).ready(function () {
	$("header").load("../../pages/menu/header.html");
	getById()
	setSelectOption()
	getProducts()
	getServices()
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

function getProducts() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/product/product-active",
	}).then((response) => {
		setSelectProductsOptions(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar produtos: ${error.responseText}`)
	})
}

async function getProductById(id) {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/product/get-by-id",
		data: `id=${id}`
	}).then((response) => {
		setTableProduct(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar produtos: ${error.responseText}`)
	})
}

async function getServiceById(id) {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/service/get-by-id",
		data: `id=${id}`
	}).then((response) => {
		setTableService(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar serviço: ${error.responseText}`)
	})
}

function getServices() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/service/service-active",
	}).then((response) => {
		setSelectServicesOptions(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar serviços: ${error.responseText}`)
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
	
	document.getElementById("title").innerHTML = `Código orçamento: ${budget.id}`
	document.getElementById("inputClient").value = budget.name
	document.getElementById("inputModel").value = budget.model
	document.getElementById("inputBrand").value = budget.brand
	document.getElementById("inputPasswordProduct").value = budget.password_product
	document.getElementById("inputDefect").value = budget.defect
	document.getElementById("inputDescription").value = budget.description
}

function setSelectOption() {
	var optionStatus = []
	if (sessionStorage.getItem('role') == 1) {
		optionStatus.push({ label: 'Aguardando Aviso para o Cliente', value: 9 })
		optionStatus.push({ label: 'Aguardando Peça', value: 8 })
		optionStatus.push({ label: 'Em Análise Técnico', value: 1 })
	}

	const selectOp = document.getElementById('statusSelect');
	optionStatus.forEach((element, key) => {
		selectOp[key] = new Option(element.label, element.value, false, false);
	})
	document.getElementById('statusSelect').value = new URLSearchParams(window.location.search).get('status')
}

function goToWhatsApp() {
	window.location = `https://api.whatsapp.com/send?phone=${phone}`
}

function openModalAdd(type) {
	if (type == 'product') {
		if(!$("#addServiceCard").is(':hidden')){
			document.getElementById(`add-service`).click()
		}
	}

	if (type == 'service') {
		if (!$("#addProductCard").is(':hidden')) {
			document.getElementById(`add-product`).click()
		}
	}
}

function setSelectProductsOptions(products) {
	var optionProducts = []
	products.forEach((product) => {
		optionProducts.push({label: product.name, value: product.id})
	})

	const selectOp = document.getElementById('productSelect');
	optionProducts.forEach((element, key) => {
		selectOp[key] = new Option(element.label, element.value, false, false);
	})
}

function setSelectServicesOptions(services) {
	var optionServices = []
	services.forEach((service) => {
		optionServices.push({label: service.name, value: service.id})
	})

	const selectOp = document.getElementById('serviceSelect');
	optionServices.forEach((element, key) => {
		selectOp[key] = new Option(element.label, element.value, false, false);
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

function validateInputsModal() {
	if (!$("#addProductCard").is(':hidden')) {
		if (document.getElementById("inputAmount").value == '' || document.getElementById("inputAmount").value == 0 || !new RegExp('^[0-9]+$').test(document.getElementById("inputAmount").value)) {
			actionModal("Aviso!", "Não é possivel adicionar quantidade zero (0) do produto ou letras")
			return false
		}
	}

	if (!$("#addServiceCard").is(':hidden')) {
		if (document.getElementById("inputAmountHours").value == '' || document.getElementById("inputAmountHours").value == 0) {
			actionModal("Aviso!", "Não é possivel adicionar quantidade zero (0) de horas")
			return false
		}
	}

	return true
}

function confirmAddValues(type){
	if(validateInputsModal()) {
		if (type == 'product') {
			getProductById(document.getElementById('productSelect').value)
		} else if (type == 'service') {
			getServiceById(document.getElementById('serviceSelect').value)
		}
	}
}


function setTableProduct(product){
	document.getElementById("table-product").innerHTML = ''
	var newProduct = new Object()
	newProduct.id = product.id
	newProduct.name = product.name
	newProduct.status = product.status
	newProduct.value_sale = product.valueSale
	newProduct.amount = document.getElementById("inputAmount").value

	if (Products.length == 0 || !Products?.map((x) => x?.id === newProduct.id).includes(true)) {
		Products.push(newProduct)
	} else {
		Products.forEach((x) => {
			if(x.id == newProduct.id){
				x.amount = parseInt(x.amount) + parseInt(document.getElementById("inputAmount").value)
			}
		})
	}
	refreshProductTable()
}

function removeProduct(id) {
	Products = Products
	var newProducts = [];
	Products.forEach((x) => {
		if (x.id === id){
		}else {
			newProducts.push(x)
		}
	})
	Products = newProducts
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
			<td>${product.value_sale.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
			<td>${product.amount}</td>
			<td class="column-action">
				<div class="d-flex justify-content-evenly">
				<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Remover" class="icon-bin" onclick="removeProduct(${product.id})"></i>
				</div>
			</td>
		</tr>`
		document.getElementById("table-product").innerHTML += rowTable
	});
}

function setTableService(service){
	document.getElementById("table-service").innerHTML = ''
	var newService = Object();
	newService.id = service.id
	newService.name = service.name
	newService.status = service.status
	newService.price_hours = service.priceHours
	newService.amount_hours = document.getElementById("inputAmountHours").value
	if (Services.length == 0 || !Services?.map((x) => x?.id === newService.id).includes(true)) {
		Services.push(newService)
	} else {
		Services.forEach((x) => {
			if(x.id == newService.id){
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
			<td>${service.price_hours.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
			<td>${service.amount_hours}</td>
			<td class="column-action">
				<div class="d-flex justify-content-evenly">
				<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Remover" class="icon-bin" onclick="removeService(${service.id})"></i>
				</div>
			</td>
		</tr>`
		document.getElementById("table-service").innerHTML += rowTable
	});
}

function removeService(id) {
	Services = Services
	var newServices = [];
	Services.forEach((x) => {
		if (x.id === id){
		}else {
			newServices.push(x)
		}
	})
	Services = newServices
	refreshServiceTable()
}


function updateBudget() {
	if(validateInputsBudget()) {
		var budget = new Object();
		budget.id = new URLSearchParams(window.location.search).get('id')
		budget.status = document.getElementById('statusSelect').value
		budget.defect = document.getElementById('inputDefect').value
		budget.description = document.getElementById('inputDescription').value
		budget.products = Products
		budget.services = Services
		setUpdateBudget(budget)
	}
	
}

function validateInputsBudget() {
	if (document.getElementById("inputDefect").value === '') {
		actionModal("Aviso!", "Não é possivel atualizar o Orçamento com o campo DEFEITO vazio")
		return false
	}
	
	if (document.getElementById("inputDescription").value === '') {
		actionModal("Aviso!", "Não é possivel atualizar o Orçamento com o campo DESCRIÇÃO vazio")
		return false	
	}

	if (Services.length <= 0){
		actionModal("Aviso!", "Não é possivel atualizar orçamento sem um Serviço")
		return false
	}

	return true
}

function setUpdateBudget(updateBudget) {
	$.ajax({
		type: "PUT",
		url: `/servphone_war_exploded/servphone/rest/budget/update`,
		data: JSON.stringify(updateBudget)
	}).then((response) => {
		if (response > 0) {
			updateStatus(updateBudget.id, 9)
			actionModal("Sucesso", `Orçamento alterado com sucesso`)
		}else {
			actionModal("Erro", `Não foi possivel fazer no orçamento`)
		}
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer a alteração: ${error.message}`)
	})
}

function goToUrl() {
	window.location = 'budget.html'
}

function updateStatus(id, status) {
	var budget = new Object();
	budget.id = id
	budget.status = status;
	$.ajax({
		type: "POST",
		url: "/servphone_war_exploded/servphone/rest/budget/update-status",
		data: JSON.stringify(budget)
	}).then((response) => {
	}).catch((error) => {
		actionModal('Erro', 'Erro ao critico ao atualizar status, acionar os administradores')
	})
}


