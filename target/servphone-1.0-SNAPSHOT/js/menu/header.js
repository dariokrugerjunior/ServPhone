$(document).ready(function () {
    console.log('header')
    var role = sessionStorage.getItem('role');
    //admin = 0
    //tech = 1
    let contentButton = `<a href="/servphone_war_exploded/pages/budget/budget.html" type="button" class="btn btn-outline-primary" >Orçamentos</a>
        <a href="" type="button" class="btn btn-outline-primary" >Relatorios</a>
        <a href="/servphone_war_exploded/pages/product/product.html" type="button" class="btn btn-outline-primary" >Produtos</a>
        <a href="/servphone_war_exploded/pages/services/services.html" type="button" class="btn btn-outline-primary" >Serviços</a>`;
    if (role == 0) {
        contentButton += `<a href="/servphone_war_exploded/pages/admin/client/client.html" class="btn btn-outline-primary">Cliente</a>
            <a href="/servphone_war_exploded/pages/admin/employee/employee.html" type="button" class="btn btn-outline-primary" >Funcionarios</a>
            <a href="/servphone_war_exploded/pages/admin/cash/cash.html" type="button" class="btn btn-outline-primary" >Caixa</a>`;
    }
    document.getElementById("menu-option").innerHTML = contentButton
});