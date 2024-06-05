


$(document).ready(function() {

	$.ajax({
		url: url_base + '/redesSociais',
		type: "GET",
		async: false,
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

		$('#rede').append($('<option>', {
			value: "",
			text: "Selecione...",
		}));


		$.each(data, function(index, item) {

			$('#rede').append($('<option>', {
				value: item.idRedesSociais,
				id: item.idRedesSociais,
				text: item.redesSociais,
				name: item.redesSociais
			}));
		})

	})



});

var id = localStorage.getItem("idVendedor")
var vendedor = JSON.parse(id);



$("#enviarFormInfor").click(function(e) {
	e.preventDefault();

	var valor = $("#seguidores option:selected").val()
	var numero

	var objetoInfor = {


		"vendedorId": vendedor.idVendedor,
		"redesSociaisId": $("#rede option:selected").attr("id"),
		"perfil": $("#usuario").val(),
		"urlPerfil": $("#usuario").val(),
		"qtdSeguidores": numero = Number(valor),


	}

	$.ajax({

		url: url_base + "/vendedorRedesSociais",
		type: "post",
		data: JSON.stringify(objetoInfor),
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
			window.location.href = 'meusProdutos';
		})
	})

})