const perfis = ["FUNCIONARIO", "VENDEDOR", "COLABORADOR"];


$(document).ready(function() {
	$("#esqueciSenha").on("click", function(event) {
		event.preventDefault();

		Swal.fire({
			title: "Recuperar Senha",
			text: "Digite seu e-mail para redefinir a senha",
			input: "email",
			inputPlaceholder: "seuemail@exemplo.com",
			showCancelButton: true,
			confirmButtonText: "Enviar",
			cancelButtonText: "Cancelar",
			inputValidator: (value) => {
				if (!value) {
					return "Por favor, insira um e-mail válido!";
				}
			}
		}).then((result) => {
			if (result.isConfirmed) {


				$.ajax({
					url: url_base + "/login",
					type: "POST",
					data: JSON.stringify(objeto),
					contentType: "application/json; charset=utf-8",
					beforeSend: function() {
						Swal.showLoading();
					},
					error: function(e) {
						Swal.close();
						console.log(e);
						Swal.fire({
							icon: "error",
							title: "Usuário ou senha inválido !!",
						});
					},
				}).done(function(data) {
					Swal.close();
					if (perfil == "LOJISTA") {
						if (data?.administrador?.toUpperCase() == "S") {
							window.location.href = "usuarioLojista";
						} else {
							window.location.href = "listarProdutoLojista";
						}
					} else if (perfil == "COLABORADOR") {
						if (data.administrador.toUpperCase() == "S") {
							window.location.href = "listarColaboradores";
						} else {
							window.location.href = "listarCategoria";
						}
					} else if (perfil == "FUNCIONARIO") {
						window.location.href = "listarProdutoLojista";
					}

					data.perfil = perfil;
					localStorage.setItem("usuario", JSON.stringify(data));
				});
				
				
				Swal.fire({
					icon: "success",
					title: "E-mail enviado!",
					text: "Verifique seu e-mail para redefinir a senha.",
					confirmButtonText: "OK"
				});
			}
		});
	});
});

$("#form-login").submit(function(e) {
	e.preventDefault();

	const perfil = $("#tipoLogin").val();

	var objeto = {
		email: $("#email").val(),
		senha: $("#senha").val(),
		perfil: $("#tipoLogin").val(),
		administrador: "N",
	};

	if (perfil == "COLABORADOR") {
		objeto = {
			email: $("#email").val(),
			senha: $("#senha").val(),
			perfil: $("#tipoLogin").val(),
			administrador: "S",
		};
	}

	$.ajax({
		url: url_base + "/login",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading();
		},
		error: function(e) {
			Swal.close();
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Usuário ou senha inválido !!",
			});
		},
	}).done(function(data) {
		Swal.close();
		if (perfil == "LOJISTA") {
			if (data?.administrador?.toUpperCase() == "S") {
				window.location.href = "usuarioLojista";
			} else {
				window.location.href = "listarProdutoLojista";
			}
		} else if (perfil == "COLABORADOR") {
			if (data.administrador.toUpperCase() == "S") {
				window.location.href = "listarColaboradores";
			} else {
				window.location.href = "listarCategoria";
			}
		} else if (perfil == "FUNCIONARIO") {
			window.location.href = "listarProdutoLojista";
		}

		data.perfil = perfil;
		localStorage.setItem("usuario", JSON.stringify(data));
	});
});
