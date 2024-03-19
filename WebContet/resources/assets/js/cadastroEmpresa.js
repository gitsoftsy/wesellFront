const elemento = document.querySelector('#modalMenu');
var primeiro = document.getElementById("primeiraSecao")
var segunda = document.getElementById("segundaSecao")
var proximo = document.getElementById("proximo")

primeiro.addEventListener("click", function(){
	
		$("#container-funcionario").addClass("none")
		$("#container-empresa").removeClass("none")
	
})

segunda.addEventListener("click", function(){

		$("#container-empresa").addClass("none")
		$("#container-funcionario").removeClass("none")
		
})

proximo.addEventListener("click", function(){
	
	$("#container-empresa").addClass("none")
	$("#container-funcionario").removeClass("none")
})

$("#cep").blur(function() {

	$.ajax({
		url: 'https://viacep.com.br/ws/' + $('#cep').val() + '/json/',
		type: "get",
		async: false,
	})
		.done(function(data) {
			$('#endereco').val(data.logradouro);
			$('#bairro').val(data.bairro);
			$('#cidade').val(data.localidade);
			$('#estado').val(data.uf);
		});
});

function cadastrarEmpresa() {
	
	var objetoEmpresa = {
		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"nomeFantasia": $("#nomeFantasia").val(),
    	"razaoSocial": $("#razaoSocial").val(),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val(),
		"site": $('#site').val(),
	};

	$.ajax({

		url: url_base + '/lojistas',
		type: "post",
		data: JSON.stringify(objetoEmpresa),
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
	}).done(function(data) {
		Toastify({
			text: "Informações da empresa cadastrada com Sucesso!",
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
	})
};

function cadastrarFuncionario(){
	
	var objetoFuncionario = {
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
		data: JSON.stringify(objetoFuncionario),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.message,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
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
					backgroundColor: "red",
					close: true,
					className: "Toastify__toast--custom"
				}).showToast();
				console.log(e.responseJSON)
			}
		}).done((function(data) {

			Toastify({
				text: "Responsável cadastrado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function(){
					window.location.href = 'cadastroSucesso';
			},2000)
		}))
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

	const novaOpcao = $("<option>"); // Cria um novo elemento option
	novaOpcao.text("Selecione..."); // Define o texto da opção
	novaOpcao.val("exemplo");

	$("select").prepend(novaOpcao).val();
	$("select option[value='exemplo']").attr("selected", "selected");

})
	
$("#container-empresa").on("submit", function(e) {
	e.preventDefault();

	cadastrarEmpresa()
	
	});
	
$("#container-funcionario").on("submit", function(e){
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

				cadastrarFuncionario()
				
	};
	}
	
	requerimentoSenha()
})
	
	


