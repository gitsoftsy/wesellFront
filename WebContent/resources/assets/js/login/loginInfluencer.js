$("#formInfor").submit(function(e) {
	e.preventDefault();

	var objeto = {
		"email": $("#email").val(),
		"senha": $("#senha").val(),
		"perfil": "VENDEDOR"
	}


	$.ajax({

		url: url_base + '/login',
		type: "POST",
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
				title: "Email ou senha inválidos!"
			});
		}
	})
		.done(function(data) {
			window.location.href = 'dadosDeCadastro';
			localStorage.setItem("usuarioVendedor", JSON.stringify(data));
		})
});

