const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idSubCategoria = params.get("id");

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
		"nome": $('#descricaoSubCategoria').val(),
		"categoriaId": $("#categoria option:selected").attr("id"),
	};

	$.ajax({

		url: url_base + '/subcategorias',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.error
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			icon: "success",
			title: "Cadastrado com sucesso!"
		}).then(result => {
			window.location.href = 'listarSubCategoria';
		})
	})
}

function editar() {

	var objetoEdit = {

		"id": idSubCategoria,
		"nome": $('#descricaoSubCategoria').val(),
		"categoriaId": $("#categoria option:selected").attr("id"),

	}

	$.ajax({
		url: url_base + "/subcategorias",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.error
			});
		}
	})
		.done(function(data) {
			Swal.close();
			Swal.fire({
				icon: "success",
				title: "Editado com sucesso!"
			}).then(result => {
				window.location.href = 'listarSubCategoria';
			})
		})
}

var categorias = []

$(document).ready(function() {

	$.ajax({
		url: url_base + '/categorias',
		type: "GET",
		async: false,
	}).done(function(data) {

		$('#categoria').append($('<option>', {
			value: "",
			text: "Selecione...",
		}));


		$.each(data, function(index, item) {

			$('#categoria').append($('<option>', {
				value: item.idCategoria,
				id: item.idCategoria,
				text: item.categoria,
				name: item.categoria
			}));
		})

	})

	if (idSubCategoria == undefined) {

	} else {

		$("#tituloPagina, #tituloForm").text("Editar Sub-Categoria")
		$("#btn-submit").text("Editar")

		$.ajax({
			url: url_base + "/subcategorias/" + idSubCategoria,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#categoria').find(`option[id=${data.categoria.idCategoria}]`).attr("selected", "selected"),
					$('#descricaoSubCategoria').val(data.nome);
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