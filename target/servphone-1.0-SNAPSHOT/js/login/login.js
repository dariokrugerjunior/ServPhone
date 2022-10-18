validateLogin = function () {
    var login = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    $.ajax({
        type: "POST",
        url: "security/auth",
        data: {login: login, password: password},
    }).then((response) => {
        console.log(response, 'response')
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
        }
    }).catch((error) => {
           console.log(error)
    })
}