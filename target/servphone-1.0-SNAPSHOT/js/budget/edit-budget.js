$(document).ready(function () {
	$("header").load("/pages/menu/header.html");

	var role = 1

	var optionStatus = []
	if (role === 0) {
		optionStatus.push({ label: 'Aguardando Administração', value: 5 })
		optionStatus.push({ label: 'Enviar para Técnico', value: 6 })
		optionStatus.push({ label: 'Esperando Resposta do Cliente', value: 7 })
		optionStatus.push({ label: 'Avisar Cliente', value: 8 })
	} else {
		optionStatus.push({ label: 'Em Analise Técnico', value: 0 })
		optionStatus.push({ label: 'Aguardando Peça', value: 1 })
		optionStatus.push({ label: 'Em Manutenção', value: 2 })
		optionStatus.push({ label: 'Serviço Realizado', value: 3 })
		optionStatus.push({ label: 'Enviar para Administração', value: 4 })
	}

	const selectOp = document.getElementById('statusSelect');
	optionStatus.forEach((element, key) => {
		selectOp[key] = new Option(element.label, element.value, false, false);
	})

});


function resetForm() {
	$("#form").trigger('reset');
}

