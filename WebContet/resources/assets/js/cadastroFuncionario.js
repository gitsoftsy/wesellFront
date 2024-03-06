const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idFuncionarios = params.get("id");



botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

function ativaSenhas() {

		$("#senha, #confirmarSenha").removeAttr("disabled")
		$("#senha, #confirmarSenha").attr("type", "text")
		$("#labelSenha, #confirmarSenhaLabel").removeClass("none")
		$("#labelSenha").text("Nova Senha:")
		$("#senha").val("")
		$("#confirmarSenha").val("")
	
}

function cadastrar() {

	var objeto = {
		"cargoId": $("#cargo option:selected").attr("id"),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"email": $('#email').val(),
		"senha": $('#senha').val(),
		"lojistaId": $("#lojista option:selected").attr("id"),
		"nome": $('#nome').val(),
	};

	$.ajax({

		url: url_base + '/funcionarios',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e){
			Toastify({
			text: e.responseJSON.message,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)
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
				Toastify({
				text: e.responseJSON.message,
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			console.log(e.responseJSON)
		}
		}).done((function(data) {

			Toastify({
				text: "cadastrado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarFuncionarios';
			}, 2000);
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
		"lojistaId": $("#lojista option:selected").attr("id"),
		"nome": $('#nome').val(),

	}

	$.ajax({
		url: url_base + "/funcionarios",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e){
			Toastify({
			text: e.responseJSON.message,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)
		}
	})
		.done(function(data) {

			Toastify({
				text: "Editado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarFuncionarios';
			}, 2000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

function editarTelefone() {

	$.ajax({
		url: url_base + "/telefones/" + idFuncionarios,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(e){
			Toastify({
			text: e.responseJSON.message,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)
		}
	}).done(function(data) {

		var telefoneEdit = {
			"idTelefoneFuncionario": data.idTelefoneFuncionario, // idtelefone aqui
			"funcionarioId": idFuncionarios,
			"telefone": $('#telefone').val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"tpTelefone": "C"
		}

		$.ajax({
			url: url_base + "/telefones",
			type: "PUT",
			data: JSON.stringify(telefoneEdit),
			contentType: "application/json; charset=utf-8",
		})

	}).fail(function(jqXHR, textStatus, errorThrown) {
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
		cargo = data;
		renderizarCargos(data)
	})
	function renderizarCargos(cargo) {
		var html = cargo.map(function(item) {
			return (
				`<option id="${item.idCargo}">${item.cargo}</option>`
			)
		});
		$("#cargo").html(html);
	};

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



	if (idFuncionarios == undefined) {

	} else {
		
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
				$('#cargo').find(`option[id=${data.cargoId}]`).attr("selected", "selected"),
					$('#cpf').val(data.cpf[0] + data.cpf[1] + data.cpf[2] + "." 
					+ data.cpf[3] + data.cpf[4] + data.cpf[5] + "." 
					+ data.cpf[6] + data.cpf[7] +data.cpf[8] + "-"
					+ data.cpf[9] +data.cpf[10]), //.mask("000.000.000-00")
					$('#email').val(data.email),
					$('#senha').val(data.senha),
					$("#confirmarSenha").val(data.senha)
				    $('#lojista').find(`option[id=${data.lojistaId}]`).attr("selected", "selected"),
					$('#nome').val(data.nome),
					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});

		$.ajax({
			url: url_base + "/telefones/" + idFuncionarios,
			type: "GET",
			async: false,
		}).done(function(data) {

			$("#telefone").val(data.telefone)

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
		//editarTelefone()
	} else {
		cadastrar()
	}

		}
	};

	requerimentoSenha()

	
});
