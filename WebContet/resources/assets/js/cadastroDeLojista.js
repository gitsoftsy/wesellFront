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



const button = document.querySelector("#btn-submit");

function mostraModalFeedback(tipo, mensagem) {
	if (tipo == "erro") {
		$('#exampleModalLabel').text(mensagem)
		$('#icone-modal').replaceWith("<i id='icone-modal' class='fa-solid fa-xmark modal-erro'></i>")
		$("#openModalBtn").click()
	} else if (tipo == "sucesso") {
		$('#exampleModalLabel').text(mensagem)
		$('#icone-modal').replaceWith("<i id='icone-modal' class='fa-solid fa-check circulo-border'></i>")
		$("#openModalBtn").click()
	}
}

$("#cep").blur(function() {

	$.ajax({

		url: 'https://viacep.com.br/ws/' + $('#cep').val() + '/json/',
		type: "get",
		async: false,
	})
		.done(function(data) {
			$('#endereco').val(data.logradouro);
			$('#bairro').val(data.bairro);
			$('#cidade').val(data.localidade);
			$('#estado').val(data.uf);


		});

});


function cadastrar() {

	var objeto = {
		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val(),
		"site": $('#site').val(),
	};

	$.ajax({

		url: url_base + '/lojistas',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(data) {
			mostraModalFeedback("erro", "erro na requisição!");

		}
	}).done(function(data) {
		Toastify({
			text: "cadastrado com sucesso!",
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		setTimeout(function() {
			window.location.href = 'listarLojista';
		}, 2000);
	})
}

function editar() {

	var objetoEdit = {

		"idLojista": idLojista,
		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val(),
		"site": $('#site').val(),

	}

	$.ajax({
		url: url_base + "/lojistas",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
	})
		.done(function(data) {
			Toastify({
				text: "Editado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarLojista';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

$(document).ready(function() {


	if (idLojista == undefined) {

	} else {
		$.ajax({
			url: url_base + "/lojistas/" + idLojista,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				    $('#cnpj').val(data.cnpj),
					$('#inscricaoEstadual').val(data.inscrEstadual),
					$('#endereco').val(data.endereco),
					$('#numero').val(data.numero),
					$('#complemento').val(data.complemento),
					$('#bairro').val(data.bairro),
					$('#cidade').val(data.cidade),
					$('#estado').val(data.estado),
					$('#cep').val(data.cep),
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