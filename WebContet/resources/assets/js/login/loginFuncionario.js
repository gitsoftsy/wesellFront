const perfis = ['FUNCIONARIO', 'VENDEDOR', 'COLABORADOR']

$("#form-login").submit(function(e) {
	e.preventDefault();

	const perfil = $('#tipoLogin').val()

	var objeto = {
		"email": $("#email").val(),
		"senha": $("#senha").val(),
		"perfil": $('#tipoLogin').val()
	}

	if (perfil == 'COLABORADOR') {
		objeto = {
			"email": $("#email").val(),
			"senha": $("#senha").val(),
			"perfil": $('#tipoLogin').val(),
			"administrador": "N"
		}
	}

	$.ajax({

		url: url_base + '/login',
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {

			Swal.fire({
				title: "Usuário ou senha inválido !!",
				icon: "error",
			})

			console.log(e)

		}
	})
		.done(function(data) {
			if (perfil == 'LOJISTA') {
				if (data.administrador.toUpperCase() == 'S') {
					window.location.href = 'usuarioLojista'
				} else {
					window.location.href = 'usuarioLojista'
				}
			} else if (perfil == 'COLABORADOR') {
				if (data.administrador.toUpperCase() == 'S') {
					window.location.href = 'listarColaboradores'
				} else {
					window.location.href = 'listarCategoria'
				}
			}
			
			data.perfil = perfil
			localStorage.setItem("usuario", JSON.stringify(data));
		})






});















