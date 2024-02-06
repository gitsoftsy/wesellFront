const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idColaboradores = params.get("id");

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



function cadastrar() {

	var objeto = {
		"nome": $('#nome').val(),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"usuario": $('#usuario').val(),
		"senha": $('#senha').val(),
		"administrador": "N",
		"alterarSenha": "N",
		"email": $('#email').val(),
	};

	$.ajax({

		url: url_base + '/colaboradores',
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
			window.location.href = 'listarColaboradores';
		}, 2000);
	})
}

function editar() {

	var objetoEdit = {
		"idColaborador": idColaboradores,
		"nome": $('#nome').val(),
		"cpf": $('#cpf').val(),
		"usuario": $('#usuario').val(),
		"senha": $('#senha').val(),
		"administrador": $('#administrador').is(':checked') ? 'S' : 'N',
		"alterarSenha": "N",
		"email": $('#email').val(),
	}

	$.ajax({
		url: url_base + "/colaboradores",
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
				window.location.href = 'listarColaboradores';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

$(document).ready(function() {


	if (idColaboradores == undefined) {

	} else {
		$.ajax({
			url: url_base + "/colaboradores/" + idColaboradores,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				    $('#nome').val(data.nome),
					$('#cpf').val(data.cpf),
					$('#usuario').val(data.usuario),
					$('#senha').val(data.senha),
					$('#administrador').val(data.administrador)
					$('#email').val(data.email),
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