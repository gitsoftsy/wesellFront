const perfis = ['FUNCIONARIO', 'VENDEDOR', 'COLABORADOR']

$("#form-login").submit(function(e) {
	e.preventDefault();

	const perfil = $('#tipoLogin').val()

	var objeto = {
		"email": $("#email").val(),
		"senha": $("#senha").val(),
		"perfil": $('#tipoLogin').val(),
		"administrador": "N"
	}

	if (perfil == 'COLABORADOR') {
		objeto = {
			"email": $("#email").val(),
			"senha": $("#senha").val(),
			"perfil": $('#tipoLogin').val(),
			"administrador": "S"
		}
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
			console.log(e)
			console.log(e.responseJSON);

			if (e.responseJSON.message != undefined) {
				Swal.fire({
					icon: "warning",
					title: "Usuário desativado, entre em contato com o administrador da plataforma"
				})
			} else {
				Swal.fire({
					icon: "error",
					title: "Usuário ou senha inválido !!"
				});
			}
		}
	}).done(function(data) {
		Swal.close();

		if (perfil == 'COLABORADOR') {
			if (data.administrador.toUpperCase() == 'S') {
				window.location.href = 'listarColaboradores'
			} else {
				window.location.href = 'listarCategoria'
			}
		} else if (perfil == 'FUNCIONARIO') {
			window.location.href = 'listarProdutoLojista'

		}
		data.perfil = perfil
		localStorage.setItem("usuario", JSON.stringify(data));
	})
});