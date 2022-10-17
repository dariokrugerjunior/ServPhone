$(document).ready(function () {
    var role = 0
    //admin = 0
    //tech = 1
    let contentButton = '<a href="/pages/budget/budget.html" type="button" class="btn btn-outline-primary" >Orçamentos</a>' +
        '<a href="/pages/admin/client.html" type="button" class="btn btn-outline-primary" >Relatorios</a>' +
        '<a href="/pages/product/product.html" type="button" class="btn btn-outline-primary" >Produtos</a>' +
        '<a href="/pages/services/services.html" type="button" class="btn btn-outline-primary" >Serviços</a>';
    if (role == 0) {
        contentButton +='<a href="/pages/admin/client/client.html" class="btn btn-outline-primary">Cliente</a>' +
            '<a href="/pages/admin/employee/employee.html" type="button" class="btn btn-outline-primary" >Funcionarios</a>' +
            '<a href="/pages/admin/cash/cash.html" type="button" class="btn btn-outline-primary" >Caixa</a>';
    }
    document.getElementById("menu-option").innerHTML = contentButton
});