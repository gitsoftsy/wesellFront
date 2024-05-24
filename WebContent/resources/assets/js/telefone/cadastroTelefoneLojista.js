var user = localStorage.getItem("usuario")
const funcionario = JSON.parse(user);


$(document).ready(function() {
	$("#telefoneC").show()
	$("#telefoneT").hide()
});

$("#tipoTelefone").change(() => {

	if ($("#tipoTelefone").val() == "T") {
		$("#telefoneC").hide()
		$("#telefoneT").show()
	} else {
		$("#telefoneC").show()
		$("#telefoneT").hide()
	}

})

function cadastrar() {

	let telefone

	if ($("#tipoTelefone").val() == "T") {
		telefone = $('#telefoneT')
	} else {
		telefone = $('#telefoneC')
	}

	if (telefone.val().length < 10) {
		Swal.fire({
			icon: "error",
			title: "Erro no telefone",
			text: "Confira se o telefone foi digitado corretamente!",
		});
	} else {
		var objeto = {
			"funcionarioId": funcionario.id,
			"telefone": telefone.val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"tpTelefone": $('#tipoTelefone').val()
		};

		$.ajax({

			url: url_base + '/telefones',
			type: "post",
			data: JSON.stringify(objeto),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				console.log(objeto)
				console.log(e.responseJSON[0].mensagem)
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			Swal.fire({
				title: "Criado com sucesso",
				icon: "success"
			}).then((result) => {
				window.location.href = 'listarTelefoneLojista';
			})
		})
	}
}

$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();
	cadastrar()
});