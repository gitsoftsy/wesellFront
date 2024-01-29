$(document).ready(function() {
	const idUsuario = params.get("id");
	$(".campoSenha").hide();
	$.ajax({
		url: url_base + `/obtemUsuarioParceiro?idUsuarioParceiro=${idUsuario}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			console.log(data);
			$("#nome").val(data[0].nome);
			$("#cpf").val(data[0].cpf);
			$("#email").val(data[0].email);
			$("#celular").val(data[0].celular);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log("Erro ao buscar dados");
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$("#form-editar").submit(function(e) {
		e.preventDefault();

		var senha = $("#senha").val();
		var validSenha = $("#validSenha").val();

		if ($(".campoSenha").is(":visible")) {
			if (senha !== validSenha) {
				alert("As senhas não coincidem. Por favor, digite senhas iguais.");
			} else {
				var formArray = $(
					"#form-editar :input:not(#validSenha)"
				).serializeArray();

				var userData = {};
				$(formArray).each(function(index, obj) {
					userData[obj.name] = obj.value;
				});

				var celularInput = $("#celular");

				userData["celular"] = celularInput.cleanVal();
				var cpfInput = $("#cpf");

				userData["cpf"] = cpfInput.cleanVal();
				var administradorCheckbox = $('input[name="administrador"]');

				userData["administrador"] = administradorCheckbox.is(":checked")
					? "S"
					: "N";

				$.ajax({
					url:
						url_base +
						`/alterarDadosUsuarioParceiro?idUsuarioParceiro=${idUsuario}&nome=${userData.nome}&email=${userData.email}&celular=${userData.celular}&cpf=${userData.cpf}&administrador=${userData.administrador}`,
					type: "GET",
				})
					.done(function() {
						$.ajax({
							url:
								url_base +
								`/alterarSenhaUsuarioParceiro?idUsuarioParceiro=${idUsuario}&senha=${userData.senha}`,
							type: "GET",
						})
							.done(function() {
								Toastify({
									text: "Editado com sucesso!",
									duration: 2000,
									position: "center",
									close: true,
									className: "Toastify__toast--custom"
								}).showToast();
								setTimeout(function() {
									window.location.href = 'listarUsuarioParceiro';
								}, 1000);
							})
							.fail(function(jqXHR, textStatus, errorThrown) {
								console.error(
									"Erro na solicitação AJAX:",
									textStatus,
									errorThrown
								);
							});
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
					});
			}
		} else {
			var formArray = $(
				"#form-editar :input:not(#validSenha)"
			).serializeArray();

			var userData = {};
			$(formArray).each(function(index, obj) {
				userData[obj.name] = obj.value;
			});

			var celularInput = $("#celular");

			userData["celular"] = celularInput.cleanVal();
			var cpfInput = $("#cpf");

			userData["cpf"] = cpfInput.cleanVal();
			var administradorCheckbox = $('input[name="administrador"]');

			userData["administrador"] = administradorCheckbox.is(":checked")
				? "S"
				: "N";
			$.ajax({
				url:
					url_base +
					`/alterarDadosUsuarioParceiro?idUsuarioParceiro=${idUsuario}&nome=${userData.nome}&email=${userData.email}&celular=${userData.celular}&cpf=${userData.cpf}&administrador=${userData.administrador}`,
				type: "GET",
			})
				.done(function() {
					Toastify({
						text: "Editado com sucesso!",
						duration: 2000,
						position: "center",
						close: true,
						className: "Toastify__toast--custom"
					}).showToast();
					setTimeout(function() {
						window.location.href = 'listarUsuarioParceiro';
					}, 1000);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
				});
		}
	});

	$("#alteraSenha").change(function() {
		if ($(this).prop("checked")) {
			$(".campoSenha").show();
			$("#senha").prop("required", true);
			$("#validSenha").prop("required", true);
		} else {
			$(".campoSenha").hide();
			$("#senha").prop("required", false);
			$("#validSenha").prop("required", false);
		}
	});
});
