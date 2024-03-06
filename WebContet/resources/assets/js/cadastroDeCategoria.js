const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idCategoria = params.get("id");

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});


function cadastrar() {

	var objeto = {
		"categoria": $('#descricaoCategoria').val(),
	};

	$.ajax({

		url: url_base + '/categorias',
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
			window.location.href = 'listarCategoria';
		}, 2000);
	})
}

function editar() {

	var objetoEdit = {

		"idCategoria": idCategoria,
		"categoria": $('#descricaoCategoria').val(),

	}

	$.ajax({
		url: url_base + "/categorias",
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
				window.location.href = 'listarCategoria';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}





$(document).ready(function() {

	


	if (idCategoria == undefined) {

	} else {
		
		$("#tituloPagina, #tituloForm").text("Editar Categoria")
		$("#btn-submit").text("Editar")
		
		$.ajax({
			url: url_base + "/categorias/" + idCategoria,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#descricaoCategoria').val(data.categoria);
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