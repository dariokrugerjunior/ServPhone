validateLogin = function () {

    var login = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    $.ajax({
        type: "POST",
        url: "security/auth",
        data: {login: login, password: password},
    }).then((response) => {

    }).catch((error) => {

           swal.fire({
               title:'Erro no Login!',
               icon: 'error',
               confirmButtonText: 'Tentar novamente',
               allowOutsideClick: false,
               allowEnterKey:false,
               text: error.responseText,
               position:'center',
               keydownListenerCapture:true,
               heightAuto:false
           })
    })
}