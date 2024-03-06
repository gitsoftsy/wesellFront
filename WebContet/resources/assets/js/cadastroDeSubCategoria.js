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
		error: function(e) {
			Toastify({
			text: e.responseJSON.error,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)

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
			window.location.href = 'listarSubCategoria';
		}, 2000);
	})
}

function editar() {

	var objetoEdit = {

		"id": idSubCategoria,
		"nome": $('#descricaoSubCategoria').val(),
		"categoriaId":$("#categoria option:selected").attr("id"),

	}

	$.ajax({
		url: url_base + "/subcategorias",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
			text: e.responseJSON.error,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)

		}
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
				window.location.href = 'listarSubCategoria';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

var categorias = []

$(document).ready(function() {
	
	$.ajax({
		url: url_base + '/categorias',
		type: "GET",
		async: false,
	}).done(function(data) {
		categorias = data;
		renderizarCategorias(data)
	})
	function renderizarCategorias(categorias) {
		var html = categorias.map(function(item) {
			return (
				`<option id="${item.idCategoria}">${item.categoria}</option>`
			)
		});
		$("#categoria").html(html);
	};


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
				$('#categoria').find(`option[id=${data.categoriaId}]`).attr("selected", "selected"),
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