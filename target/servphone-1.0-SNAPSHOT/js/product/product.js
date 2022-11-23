$(document).ready(function(){   
	$("header").load("../../pages/menu/header.html");
	getProduct();
});

function getProduct() {
	$.ajax({
		type: "GET",
		url: "/servphone_war_exploded/servphone/rest/product/get",
	}).then((response) => {
		setProductTable(response)
	}).catch((error) => {
	})
}

function setProductTable(listProduct) {
	listProduct.forEach(product => {
		let rowTable = 
		`<tr> 
			<th scope="row">${product.id}</th>
			<td>${product.name}</td>
			<td>${product.valueSale.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
			<td>${product.status == 0 ? 'Desativado' : 'Ativado' }</td>
			<td>
			<a href="/servphone_war_exploded/pages/product/edit-product.html?id=${product.id}">
				<button class="navbar-toggler custom-toggler" type="button">
				<img src="../../imgs/edit.svg" width="30" height="30">
				</button>
			</a>
			</td>
		</tr>`
		document.getElementById("table-value").innerHTML += rowTable
	});
}
