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
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Usuário ou senha inválido !!"
			});
		}
	})
		.done(function(data) {
			Swal.close();
			if (perfil == 'LOJISTA') {
				if (data?.administrador?.toUpperCase() == 'S') {
					window.location.href = 'usuarioLojista'
				} else {
					window.location.href = 'listarProdutoLojista'
				}
			} else if (perfil == 'COLABORADOR') {
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















