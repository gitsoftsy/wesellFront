const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var edição = "";
const idVendedor = params.get("id");
var telefoneOriginal;
let vendedor

$(document).ready(function() {
	$.ajax({
		url: url_base + "/vendedor/" + idVendedor,
		type: "GET",
		async: false,
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message,
			});
		},
	}).done(function(data) {
		Swal.close();
		console.log(data)
		if (data.cnpj == "") {
			$("#cardCNPJ").hide();
			$("#cpf").val(data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"))
			$('#cpf').attr('required', true);
			$('#cnpj').attr('required', false);
		} else {
			$("#cardCPF").hide();
			$("#cnpj").val(data.cnpj)
			$('#cpf').attr('required', false);
			$('#cnpj').attr('required', true);
		}
		vendedor = data
		$("#nome").val(data.nome)
		$("#dtNasc").val(data.dtNasc)
		$("#email").val(data.email)
		$("#celular").val(data.celular)
		$("#idTransacao").val(data.transacoes)

	});
});


function editar() {
	var objetoFinal = {
		idVendedor: idVendedor,
		nome: $("#nome").val(),
		dtNasc: $("#dtNasc").val(),
		cpf: $("#cpf")
			.val()
			.replace(/[^a-zA-Z0-9 ]/g, ""),
		email: $("#email").val(),
		celular: $("#celular").val(),
		cnpj: $("#cnpj").val().replace(/[^a-zA-Z0-9 ]/g, ""),
		transacoes: $("#idTransacao").val(),
	};

	$.ajax({
		url: url_base + "/vendedor",
		type: "PUT",
		data: JSON.stringify(objetoFinal),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e);
			Swal.fire({
				icon: "error",
				title: e.responseJSON[0].mensagem,
			});
		},
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then((result) => {
			window.location.href = "listarInfluencer";
		});

	});
}

$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();
	editar();
});
