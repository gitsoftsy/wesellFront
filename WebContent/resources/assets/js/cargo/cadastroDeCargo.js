const elemento = document.querySelector('#modalMenu');
var edição = ""
const idCargo = params.get("id");


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
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			icon: "success",
			title: "Cadastrado com sucesso!"
		}).then(result => {
			window.location.href = 'listarCargos';
		})
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
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			icon: "success",
			title: "Editado com sucesso!"
		}).then(result => {
			window.location.href = 'listarCargos';
		})
	})


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