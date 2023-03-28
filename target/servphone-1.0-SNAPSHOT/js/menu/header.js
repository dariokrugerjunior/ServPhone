$(document).ready(function () {
    var role = sessionStorage.getItem('role');
    document.getElementById('name-title').innerHTML = `Olá ${sessionStorage.getItem('name')} <a type="button" onclick="logout()" class="card-link">Sair</a>`
    //admin = 0
    //tech = 1
    let contentButton = `<a href="/servphone_war_exploded/pages/budget/budget.html" type="button" class="btn btn-outline-primary" >Orçamentos</a>
        <a href="/servphone_war_exploded/pages/product/product.html" type="button" class="btn btn-outline-primary" >Produtos</a>
        <a href="/servphone_war_exploded/pages/services/services.html" type="button" class="btn btn-outline-primary" >Serviços</a>`;
    if (role == 0) {
        contentButton += `<a href="/servphone_war_exploded/pages/admin/client/client.html" class="btn btn-outline-primary">Cliente</a>
            <a href="/servphone_war_exploded/pages/admin/employee/employee.html" type="button" class="btn btn-outline-primary" >Funcionarios</a>
            <a href="/servphone_war_exploded/pages/admin/cash/cash.html" type="button" class="btn btn-outline-primary" >Caixa</a>`;
    }
    document.getElementById("menu-option").innerHTML = contentButton
});

function logout() {
    $.ajax({
        type: "POST",
        url: "/servphone_war_exploded/security/logout",
    }).then((response) => {
        if(response){
            window.location.href=("/servphone_war_exploded/index.html")
        }
    }).catch((error) => {
    })
}