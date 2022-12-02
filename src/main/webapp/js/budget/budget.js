$(document).ready(function () {
	$("header").load("../../pages/menu/header.html");
	setSelectValue();
	getBudgets();
});
function getBudgets() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/budget/get-all-by-role",
		data: `role=${sessionStorage.getItem('role')}`
	}).then((response) => {
		setBudgetsTable(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar orçamentos: ${error.responseText}`)
	})
}

function setBudgetsTable(listBudget) {
	document.getElementById("table-value").innerHTML = ''
	listBudget.sort(function (a, b) {
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	}).forEach(budget => {
		let rowTable =
			`<tr> 
			<th scope="row">${budget.id}</th>
			<td class="name">${budget.name}</td>
			<td>${setBudgetStatus(budget.status)}</td>
			<td class="column-action">
				<div class="d-flex justify-content-evenly">${setBudgetAction(budget)}</div>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}

function setSelectValue() {
	if (sessionStorage.getItem('role') == 1) {
		document.getElementById('select-status').innerHTML =
			`
			<option value="8">${setBudgetStatus(8)}</option>
			<option value="4">${setBudgetStatus(4)}</option>
			<option value="1">${setBudgetStatus(1)}</option>
			<option value="5">${setBudgetStatus(5)}</option>
			<option selected value="14">Todos</option>
		`
	} else {
		document.getElementById('select-status').innerHTML =
			`
			<option value="2" >${setBudgetStatus(2)}</option>
			<option value="9">${setBudgetStatus(9)}</option>
			<option value="8">${setBudgetStatus(8)}</option>
			<option value="3">${setBudgetStatus(3)}</option>
			<option value="10">${setBudgetStatus(10)}</option>
			<option value="6">${setBudgetStatus(6)}</option>
			<option value="5">${setBudgetStatus(5)}</option>
			<option value="13">${setBudgetStatus(13)}</option>
			<option value="11">${setBudgetStatus(11)}</option>
			<option value="12">${setBudgetStatus(12)}</option>
			<option value="7">${setBudgetStatus(7)}</option>
			<option selected value="14">Todos</option>
		`
	}
}

function setBudgetStatus(statusCode) {
	switch (statusCode) {
		case 2: return 'Aguardando Atendente'
		case 9: return 'Aguardando Aviso para o Cliente'
		case 8: return 'Aguardando Peça'
		case 4: return 'Aguardando Manutenção'
		case 3: return 'Aguardando Resposta do Cliente'
		case 10: return 'Aguardando Retirada com Pagamento'
		case 6: return 'Aguardando Retirada do Aparelho'
		case 1: return 'Em Análise Técnico'
		case 5: return 'Em Manutenção'
		case 13: return 'Concluido - Aguardando Aviso para Cliente'
		case 11: return 'Concluido/Em Garantia'
		case 12: return 'Orçamento Finalizado'
		case 7: return 'Orçamento Não Realizado'
	}
}

function setBudgetAction(budget) {
	switch (budget.status) {
		case 1: return sessionStorage.getItem('role') == 0 ? `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>` 
						: `<i class="icon-pencil" style="cursor:pointer" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>`
		case 2: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-hour-glass" onclick="updateStatus(${budget.id}, 9)"></i>`
		case 3: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 4)"></i> 
						<i style="cursor:pointer" class="icon-cross" data-toggle="tooltip" data-placement="top" title="Cancelar" onclick="updateStatus(${budget.id}, 6)"></i>`
		case 4: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i class="icon-hour-glass"></i> ${sessionStorage.getItem('role') == 1 ? `<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 5)"></i>` : ''}`
		case 5: return `<i	 style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						${sessionStorage.getItem('role') == 1 ? `<i class="icon-pencil" style="cursor:pointer" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i> <i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 10)"></i>` : ''}`
		case 6: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 7)"></i>`
		case 7: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>`
		case 8: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 4)"></i>
						<i style="cursor:pointer" class="icon-cross" data-toggle="tooltip" data-placement="top" title="Cancelar" onclick="updateStatus(${budget.id}, 6)"></i>`
		case 9: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-whatsapp" data-toggle="tooltip" data-placement="top" title="${budget.phone}" onclick="goToWhatsApp(${budget.phone})"></i>
						<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 3)"></i>`
		case 10: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-coin-dollar" data-toggle="tooltip" data-placement="top" title="Pagamento" onclick="window.location.assign('')"></i>`
		case 11: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>`
		case 12: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>`
		case 13: return `<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}?status=${budget.status}')"></i>
						<i style="cursor:pointer" class="icon-whatsapp" data-toggle="tooltip" data-placement="top" title="${budget.phone}"  onclick="goToWhatsApp(${budget.phone})"></i>
						<i style="cursor:pointer" class="icon-checkmark" data-toggle="tooltip" data-placement="top" title="Confirmar" onclick="updateStatus(${budget.id}, 10)"></i>`
	}
}

function goToWhatsApp(phone) {
	window.location = `https://api.whatsapp.com/send?phone=${phone}`
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
		if (response === 0) {
			actionModal('Erro', 'Não foi possivel atualizar status, contate os administradores')
		} else if (response === 2) {
			actionModal('Erro', 'Sem permissão para alterar Status')
		} else {
			actionModal('Sucesso', 'Status atualizado com sucesso')
		}
		getBudgets()
	}).catch((error) => {
		actionModal('Erro', 'Erro ao critico ao atualizar status, acionar os administradores')
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


function changeAction(event) {
	if (event == 14) {
		getBudgets()
	} else {
		getByStatus(event)
	}
}

function getByStatus(status) {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/budget/get-by-status",
		data: `status=${status}`
	}).then((response) => {
		setBudgetsTable(response)
	}).catch((error) => {
		actionModal("Erro", `Erro ao buscar orçamentos: ${error.responseText}`)
	})
}

function searchClient() {
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('search-client');
	filter = input.value.toUpperCase();
	ul = document.getElementById("table-value");
	li = ul.getElementsByTagName('tr');
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("name")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

