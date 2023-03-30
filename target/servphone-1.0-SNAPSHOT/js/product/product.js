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
			<td class="name">${product.name}</td>
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

function searchProduct() {
	var input, ul, filter, li, a, i, txtValue;
	input = document.getElementById('search-product');
	filter = input.value.toUpperCase();
	ul = document.getElementById("table-value");
	li = ul.getElementsByTagName('tr');
	for (i = 0; i < li.length; i++) {
		a = li[i].getElementsByClassName("name")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}
