const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idCargo = params.get("id");
botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

window.addEventListener("load", function() {
    const loader = document.querySelector(".bg-loading");
    loader.parentElement.removeChild(loader);
    $(".bg-loading").addClass("none");
});


function cadastrar() {

	var objeto = {
		"cargo": $('#cargo').val(),
	};

	$.ajax({

		url: url_base + '/cargos',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
			text: e.responseJSON.message,
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
			window.location.href = 'listarCargos';
		}, 1000);
	})
}

function editar() {

	var objetoEdit = {

		"idCargo": idCargo,
		"cargo": $('#cargo').val(),

	}

	$.ajax({
		url: url_base + "/cargos",
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
				window.location.href = 'listarCargos';
			}, 1000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

$(document).ready(function() {
	

	if (idCargo == undefined) {

	} else {
		
		$("#tituloPagina, #tituloForm").text("Editar Cargo")
		$("#btn-submit").text("Editar")
		
		$.ajax({
			url: url_base + "/cargos/" + idCargo,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#cargo').val(data.cargo);
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