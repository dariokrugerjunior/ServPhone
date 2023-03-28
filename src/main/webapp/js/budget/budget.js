let statusBudget;
let idBudget;
let employeeTec = sessionStorage.getItem('role') == 1 //Funcionario for igual Técnico 


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
		console.log(budget, 'budget')
		let rowTable =
			`<tr> 
			<td scope="row">${budget.id}</td>
			<td class="name">${budget.name}</td>
			<td>${setBudgetStatus(budget.status)}</td>
			<td>${convertDateBr(budget.update_time)}</td>
			<td class="column-action">
				<div class="d-flex justify-content-evenly">${setBudgetAction(budget)}</div>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}

function convertDateBr(date) {
	const dataUTC = new Date(date.replace('[UTC]', ''));

	const dataLocal = new Date(dataUTC.getTime() - (dataUTC.getTimezoneOffset() * 60000));
	const offset = -6; // offset de -6 horas para Brasília
	const localTime = new Date(dataLocal.getTime() - (offset * 60 * 60 * 1000));

	return localTime.toLocaleDateString('pt-BR') + ' ' + localTime.toLocaleTimeString('pt-BR');

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
	let activeIcon = false
	console.log(budget.status)
	if (employeeTec && [1].includes(budget.status)) {
		activeIcon = true
	}

	let activeModalEdit = 'cursor:pointer;'
	if (employeeTec && budget.status == 4 || employeeTec) {
		activeModalEdit = 'cursor:pointer'
	} else if (!employeeTec && budget.status == 4) {
		activeModalEdit = 'cursor:default; pointer-events: none;'
	} else if (budget.status == 8 || budget.status == 6) {
		activeModalEdit = 'cursor:pointer'
	} else if (!employeeTec && budget.status == 9 || !employeeTec && budget.status == 3) {
		activeModalEdit = 'cursor:pointer'
	}
	else if (![1].includes(budget.status)) {
		activeModalEdit = 'cursor:default; pointer-events: none;'
	}

	return `
		<i style="cursor:pointer" data-toggle="tooltip" data-placement="top" title="Informações" class="icon-info" onclick="window.location.assign('edit-budget.html?id=${budget.id}&status=${budget.status}')"></i>
		<i style="cursor:pointer" class="icon-whatsapp" data-toggle="tooltip" data-placement="top" title="${budget.phone}" onclick="goToWhatsApp(${budget.phone})"></i>
		<i class="icon-clipboard" style="${activeModalEdit}" onclick="${!activeIcon ? `modalEdit(${budget.id}, ${budget.status})` : ''}"></i>
		<i class="icon-pencil" style="${activeIcon ? 'cursor:pointer' : 'cursor:default; pointer-events: none;'}" onclick="${activeIcon ? `window.location.assign('edit-budget.html?id=${budget.id}&status=${budget.status}')` : ''}"></i>
		<i style="${budget.status == 10 ? 'cursor:pointer' : 'cursor:default; pointer-events: none;'}" class="icon-coin-dollar" data-toggle="tooltip" data-placement="top" title="Pagamento" onclick="window.location.assign('../admin/cash/cash-payment.html?id=${budget.id}')"></i>
		`;
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

function modalEdit(id, status) {
	statusBudget = status
	idBudget = id
	console.log(statusBudget, idBudget)
	var myModal = new bootstrap.Modal(document.getElementById('myModalEdit'), {
		keyboard: false,
	})
	myModal
	$("#edit-body-content").html(`<h8>Status do orçamento atual: ${setBudgetStatus(status)}</h8>
	<select class="form-select" aria-label="Default select example" id="statusSelect"></select>
	`)
	$("#myModalEditLabel").html('Deseja alterar o Status do Orçamento ?')
	setSelectOption(status)
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
		actionModal("Erro", `Er	ro ao buscar orçamentos: ${error.responseText}`)
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

function editStatusConfirm() {
	const valueSelected = document.getElementById('statusSelect').value

	// Quando o orçamento está esperando aviso para cliente
	if (statusBudget === 9) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 3)  // Confirma que entrou em contato o cliente
				break;
			case '1': updateStatus(idBudget, 9) // Não avisou o cliente ainda
				break;
		}
	}

	// Quando o orçamento está esperando resposta do cliente
	if (statusBudget === 3) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 4) // Confirma que o cliente quer fazer o serviço
				break;
			case '1': updateStatus(idBudget, 6) // Cliente não quer fazer o serviço
				break;
		}
	}

	// Quando o orçamento está aguarando a manutenção
	if (statusBudget === 4) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 5) // Confirma que o tecico vai iniciar
				break;
			case '1': updateStatus(idBudget, 4) // Tecnico não inicou
				break;
			case '2': updateStatus(idBudget, 8) // Sem peça no estoque para executar
				break;
		}
	}

	// Quando o orçamento está aguardando a peça
	if (statusBudget === 8) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 4) // Peça chegou
				break;
			case '1': updateStatus(idBudget, 8) // não chegou
				break;
			case '2': updateStatus(idBudget, 6) // cancelar orçamento
				break;
		}
	}

	// Quando esta esperando o cliente vir buscar o aparelho
	if (statusBudget === 6) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 7) // Peça chegou
				break;
			case '1': updateStatus(idBudget, 6) // não buscou
				break;
		}
	}

	// Quando o orçamento foi concluido
	if (statusBudget === 5) {
		switch (valueSelected) {
			case '0': updateStatus(idBudget, 10) // Terminou a manutenção
				break;
			case '1': updateStatus(idBudget, 5) // Não terminou ainda
				break;
		}
	}

	document.location.reload(true);

}

function setSelectOption(statusActual) {
	var optionStatus = []

	optionStatus.push({ label: 'Confirmar', value: 0 })
	optionStatus.push({ label: 'Cancelar', value: 1 })

	if (statusBudget == 4) {
		optionStatus.push({ label: 'Aguardando Peça', value: 2 })
	}

	if (statusBudget == 8) {
		optionStatus.push({ label: 'Cancelar Orçamento', value: 2 })
	}

	const selectOp = document.getElementById('statusSelect')
	optionStatus.forEach((element) => {
		console.log(element)
		selectOp[element.value] = new Option(element.label, element.value, false, false);
	})
}

function exportTable() {
	exportarCSV(3, '#table thead th', '#table tbody tr', 'orcamento-dados')
}

function exportarCSV(countCell, selectorColumns, selectorBody, nameCsv) {
	// Seleciona a primeira linha da tabela para obter os cabeçalhos das colunas
	const headers = Array.from(document.querySelectorAll(selectorColumns)).map((header, index) => {
		if (index <= countCell) {
			return header.innerText
		}else{
			return ''
		}
	});

	// Seleciona todas as outras linhas da tabela e armazena em um array
	const rows = Array.from(document.querySelectorAll(selectorBody));

	// Cria uma matriz vazia para armazenar os dados
	const data = [];

	// Percorre as linhas da tabela e adiciona cada dado a um objeto
	rows.forEach(row => {
		const rowData = {};

		// Percorre as células da linha e adiciona cada dado ao objeto
		Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
			if (index <= countCell) {
				rowData[headers[index]] = cell.innerText;
			}
		});

		// Adiciona o objeto de dados à matriz
		data.push(rowData);
	});

	// Converte a matriz de objetos em um arquivo CSV usando a biblioteca Papaparse
	const csv = Papa.unparse(data, {
		delimiter: ";",
		encoding: "utf-8"
	});

	// Cria um link de download para o arquivo CSV
	const link = document.createElement('a');
	link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
	link.setAttribute('download', `${nameCsv}.csv`);
	link.style.display = 'none';
	document.body.appendChild(link);

	// Dispara o evento de download do arquivo CSV
	link.click();
}
