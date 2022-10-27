$(document).ready(function () {
    $("header").load("../../../pages/menu/header.html");
});

function resetForm() {
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

function validateInputs() {
    if (!RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$").test(document.getElementById("inputName").value)) {
        actionModal("Aviso!", "Preencha o campo Nome Completo corretamente")
        return false;
    }

    if (!new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$').test(document.getElementById("inputEmail").value)) {
        actionModal("Aviso!", "Preencha o campo Email corretamente")
        return false
    }

    if ((document.getElementById("inputPhone").value.length !== 11)) {
        actionModal("Aviso!", "Preencha o campo Telefone corretamente")
        return false
    }

    if (document.getElementById("inputSalary").value == '') {
        actionModal("Aviso!", "Preencha o campo Salario corretamente")
        return false
    }

    if (document.getElementById("inputPassword").value.length < 6) {
        actionModal("Aviso!", "Preencha o campo Senha corretamente, senha tem que conter mais de seis caracteres")
        return false
    }

    if (document.getElementById("inputPassword").value !== document.getElementById("inputPasswordConfirm").value) {
        actionModal("Aviso!", "Senha não correspondem")
        return false
    }

    return true
}

function setEmployee() {
    if (validateInputs()) {
        var employee = new Object();
        employee.name = document.getElementById("inputName").value;
        employee.salary = document.getElementById("inputSalary").value.replace(".", "").replace(",", ".");
        employee.status = 1;
        employee.email = document.getElementById("inputEmail").value;
        employee.phone = document.getElementById("inputPhone").value;
        employee.role = document.getElementById("selectRole").value;
        employee.password = btoa(document.getElementById("inputPasswordConfirm").value);
        registerEmployee(employee)
    }
}

function registerEmployee(employee) {
    $.ajax({
		type: "POST",
		url: `/servphone_war_exploded/servphone/rest/employee/register`,
		data: JSON.stringify(employee)
	}).then((response) => {
		if (response === 'Funcionario cadastrado!') {
            document.getElementById("form").reset()
			actionModal("Sucesso", response)
		} else {
            actionModal("Erro", response)
        }
	}).catch((error) => {
		actionModal("Erro", `Não foi possivel fazer o cadastro: ${error.message}`)
	})

}
