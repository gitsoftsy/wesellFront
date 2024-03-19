const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var edição = ""
const idColaboradores = params.get("id");

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
		"nome": $('#nome').val(),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"usuario": $('#usuario').val(),
		"senha": $('#senha').val(),
		"administrador": $("#administrador").is(':checked') ? 'S' : 'N',
		"alterarSenha": "N",
		"email": $('#email').val(),
	};

	$.ajax({

		url: url_base + '/colaboradores',
		type: "post",
		data: JSON.stringify(objeto),
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
			text: "cadastrado com sucesso!",
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		setTimeout(function() {
			window.location.href = 'listarColaboradores';
		}, 1000);
	})
}

function editar() {

	var objetoEdit = {
		"idColaborador": idColaboradores,
		"nome": $('#nome').val(),
		"cpf": $('#cpf').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"usuario": $('#usuario').val(),
		"senha": $('#senha').val(),
		"administrador": $("#administrador").is(':checked') ? 'S' : 'N',
		"alterarSenha": "N",
		"email": $('#email').val(),
	}

	$.ajax({
		url: url_base + "/colaboradores",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
			text: "erro",
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
				window.location.href = 'listarColaboradores';
			}, 1000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

$(document).ready(function() {



	if (idColaboradores == undefined) {
		



	} else {
		
		
		
		$("#tituloPagina, #tituloForm").text("Editar Colaborador")
		$("#btn-submit").text("Editar")
		
		$("#labelSenha").text("Senha Atual:")
		
		$("#alteraSen").removeClass("none")
		
		$("#senha, #confirmarSenha").attr("disabled", "disabled")
		$("#senha, #confirmarSenha").attr("type", "hidden")
		$("#labelSenha, #confirmarSenhaLabel").addClass("none")
		
		$.ajax({
			url: url_base + "/colaboradores/" + idColaboradores,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				    $('#nome').val(data.nome),
					$('#cpf').val(data.cpf[0] + data.cpf[1] + data.cpf[2] + "." 
					+ data.cpf[3] + data.cpf[4] + data.cpf[5] + "." 
					+ data.cpf[6] + data.cpf[7] +data.cpf[8] + "-"
					+ data.cpf[9] +data.cpf[10] ),  //.mask("000.000.000-00")
					$('#usuario').val(data.usuario),
					$('#senha').val(data.senha),
					$("#confirmarSenha").val(data.senha)
					if(data.administrador === "S"){
						$('#administrador').prop("checked", true)
					} else {$('#administrador').attr("data-off", "true");
					}
					$('#email').val(data.email),
					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	}

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();
	
	
			const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");

function requerimentoSenha()  {
  if (senhaInput.value != confirmarSenhaInput.value) {
    $("#senha").val("")
    $("#confirmarSenha").val("")
    Toastify({
				text: "as Senhas não Coincidem!",
				duration: 5000,
				position: "center",
				type:"info",
			}).showToast();
  
  } else {
   
  }
};

requerimentoSenha()
	
	if (edição == "sim") {

		editar()
	} else {
		
		cadastrar()
	}
});