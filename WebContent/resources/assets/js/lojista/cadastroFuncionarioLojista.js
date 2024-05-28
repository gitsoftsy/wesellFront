const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idFuncionarios = params.get("id");

function ativaSenhas() {

	$("#senha, #confirmarSenha").removeAttr("disabled")
	$("#senha, #confirmarSenha").attr("type", "password")
	$("#labelSenha, #confirmarSenhaLabel").removeClass("none")
	$("#labelSenha").text("Nova Senha:")
	$("#senha").val("")
	$("#confirmarSenha").val("")

}

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome)

function cadastrar() {

	var objeto = {
		"cargoId": $("#cargo option:selected").attr("id"),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"email": $('#email').val(),
		"senha": $('#senha').val(),
		"lojistaId": usuario.lojistaId,
		"nome": $('#nome').val(),
	};

	$.ajax({

		url: url_base + '/funcionarios',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.message);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível cadastrar os dados pessoais, confira os dados e tente novamente",
			});
		}
	}).done(function(data) {

		var telefone = {
			"funcionarioId": data.idFuncionario,
			"telefone": $('#telefone').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"tpTelefone": "C"
		}

		$.ajax({

			url: url_base + '/telefones',
			type: "post",
			data: JSON.stringify(telefone),
			contentType: "application/json; charset=utf-8",
			error: function(e) {
				Swal.close();
				console.log(e.responseJSON.message);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível cadastrar o telefone, confira-o e tente novamente",
				});
			}
		}).done((function(data) {
			Swal.close();
			Swal.fire({
				title: "Cadastrado com sucesso!",
				icon: "success",
			}).then((result) => {
				window.location.href = 'listarFuncionarioLojista';
			});
		}))
	});
};

function editar() {

	var objetoEdit = {

		"idFuncionario": idFuncionarios,
		"cargoId": $("#cargo option:selected").attr("id"),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"email": $('#email').val(),
		"senha": $('#senha').val(),
		"lojistaId": usuario.lojistaId,
		"nome": $('#nome').val(),

	}


	$.ajax({
		url: url_base + "/funcionarios",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON)
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível editar os dados pessoais, confira os dados e tente novamente",
			});

		}
	})
		.done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success",
			}).then(done => {
				window.location.href = 'listarFuncionarioLojista';
			})
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

var cargo = []
var lojistas = []

$(document).ready(function() {

	$.ajax({
		url: url_base + '/cargos',
		type: "GET",
		async: false,
	}).done(function(data) {

		$('#cargo').append($('<option>', {
			value: "",
			text: "Selecione...",
		}));


		$.each(data, function(index, item) {

			$('#cargo').append($('<option>', {
				value: item.idCargo,
				id: item.idCargo,
				text: item.cargo,
				name: item.cargo
			}));
		})

	})


	$.ajax({
		url: url_base + '/lojistas',
		type: "GET",
		async: false,
	}).done(function(data) {
		lojistas = data;
		renderizarLojistas(data)
	})
	function renderizarLojistas(lojistas) {
		var html = lojistas.map(function(item) {
			return (
				`<option id="${item.idLojista}">${item.nomeFantasia}</option>`
			)
		});
		$("#lojista").html(html);
	};

	if (idFuncionarios) {

		$("#tituloPagina, #tituloForm").text("Editar Funcionario")
		$("#btn-submit").text("Editar")

		$("#labelSenha").text("Senha Atual:")

		$("#alteraSen").removeClass("none")

		$("#senha, #confirmarSenha").attr("disabled", "disabled")
		$("#senha, #confirmarSenha").attr("type", "hidden")
		$("#labelSenha, #confirmarSenhaLabel").addClass("none")

		$.ajax({
			url: url_base + "/funcionarios/" + idFuncionarios,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$('#cargo').find(`option[id=${data.cargo.idCargo}]`).attr("selected", "selected"),
					$('#cpf').val(data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")),
					$('#email').val(data.email),
					$('#senha').val(data.senha),
					$("#confirmarSenha").val(data.senha)
				$('#lojista').find(`option[id=${data.lojista.idLojista}]`).attr("selected", "selected"),
					$('#nome').val(data.nome),
					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});

		$.ajax({
			url: url_base + "/telefones/funcionario/" + idFuncionarios,
			type: "GET",
			async: false,
		})
			.done(function(data) {

				$("#telefone").val(data[0].telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3"))

			})


	}

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();

	const senhaInput = document.getElementById("senha");
	const confirmarSenhaInput = document.getElementById("confirmarSenha");

	function requerimentoSenha() {
		if (senhaInput.value != confirmarSenhaInput.value) {
			$("#senha").val("")
			$("#confirmarSenha").val("")

			Toastify({
				text: "as Senhas não Coincidem!",
				duration: 5000,
				position: "center",
				type: "info",
			}).showToast()


		} else {

			if (edição == "sim") {

				editar()
			} else {
				cadastrar()
			}

		}
	};

	requerimentoSenha()


});
