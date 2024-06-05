const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idLojista = params.get("id");

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

$("#cep").blur(function() {

	$.ajax({
		url: 'https://viacep.com.br/ws/' + $('#cep').val() + '/json/',
		type: "get",
		async: false,

	})
		.done(function(data) {
			if (data.erro == true) {
				console.log(e.responseJSON)

				Swal.fire({
					icon: "error",
					title: "CEP inválido, Por favor Verifique."
				});

			} else {
				$('#endereco').val(data.logradouro);
				$('#bairro').val(data.bairro);
				$('#cidade').val(data.localidade);
				$('#estado').val(data.uf);
			}
		});
});

function cadastrar() {

	var objeto = {

		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"nomeFantasia": $("#nomeFantasia").val(),
		"razaoSocial": $("#razaoSocial").val(),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"site": $('#site').val(),
		"colaboradorId": 17
	};
	console.log(objeto)

	$.ajax({

		url: url_base + '/lojistas',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.message);
			console.log(e.responseJSON.error);

			if (e.responseJSON.message == "could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.DataException: could not execute statement") {
				Swal.fire({
					icon: "error",
					title: "Erro",
					text: "Já exite um lojista com esse cnpj ",
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar no momento, tente mais tarde!",
				});
			}
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Criado com sucesso",
			icon: "success"
		}).then((result) => {
			window.location.href = 'listarLojista';
		});
	})
}

function editar() {

	var objetoEdit = {

		"idLojista": idLojista,
		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"nomeFantasia": $("#nomeFantasia").val(),
		"razaoSocial": $("#razaoSocial").val(),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"site": $('#site').val(),
		"ativo": "S",

	}

	$.ajax({
		url: url_base + "/lojistas",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.message);
			console.log(e.responseJSON.error);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: e.responseJSON.error,
			});

		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success"
		}).then((result) => {
			window.location.href = 'listarLojista';
		});
	})
}

$(document).ready(function() {


	if (idLojista == undefined) {

	} else {

		$("#tituloPagina, #tituloForm").text("Editar Lojista")
		$("#btn-submit").text("Editar")

		$.ajax({
			url: url_base + "/lojistas/" + idLojista,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#cnpj').val(data.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")),
					$("#nomeFantasia").val(data.nomeFantasia),
					$("#razaoSocial").val(data.razaoSocial),
					$('#inscricaoEstadual').val(data.inscrEstadual),
					$('#endereco').val(data.endereco),
					$('#numero').val(data.numero),
					$('#complemento').val(data.complemento),
					$('#bairro').val(data.bairro),
					$('#cidade').val(data.cidade),
					$('#estado').val(data.estado),
					$('#cep').val(data.cep.replace(/^(\d{4})(\d{4})$/, "$1-$2")),
					$('#site').val(data.site),
					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	}

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();
	if (edição == "sim") {

		editar()
	} else {
		cadastrar()
	}
});