$(document).ready(function () {
    var role = 0
    //admin
    //tech
    let contentButton = '<a href="/pages/admin/budget.html" type="button" class="btn btn-outline-primary" >Orçamentos</a>' +
        '<a href="/pages/admin/client.html" type="button" class="btn btn-outline-primary" >Relatorios</a>' +
        '<a href="/pages/admin/inventory.html" type="button" class="btn btn-outline-primary" >Estoques</a>' +
        '<a href="/pages/admin/client.html" type="button" class="btn btn-outline-primary" >Serviços</a>';
    if (role == 0) {
        contentButton +='<a href="/pages/admin/client.html" class="btn btn-outline-primary">Cliente</a>' +
            '<a href="/pages/admin/client.html" type="button" class="btn btn-outline-primary" >Usuarios</a>';
    }
    document.getElementById("menu-option").innerHTML = contentButton
});