validateLogin = function () {
    var login = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    $.ajax({
        type: "POST",
        url: "security/auth",
        data: {login: login, password: password},
    }).then((response) => {
        if(response.toString().includes('ok')){
            let page = window.location.href.toString().replaceAll('#', '')
            if (page.toString().includes('index.html')) {
                page = page.replaceAll('index.html', 'pages/index.html')
            } else {
                page += 'pages/index.html'
            }
            sessionStorage.setItem('role', response.toString().replaceAll('ok ', ''))
            sessionStorage.setItem('location', location.pathname.split("/").filter((x) => x.includes('servphone_war')).toString());
            window.location.assign(page);
        } else {
            actionModal("Erro", `Não foi possivel fazer o login`)
        }
    }).catch((error) => {
        if(error.responseText.includes('Usuario desativado pelo administrador')){
            actionModal("Erro", 'Usuario desativado pelo administrador')
        } else if (error.responseText.includes('Login ou senha incorretos.')) {
            actionModal("Erro", 'Login ou senha incorretos.')
        } else {
            actionModal("Erro", 'Erro ao fazer login favor acionar os administradores')
        }
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