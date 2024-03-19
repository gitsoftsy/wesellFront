const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome)

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

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



function editar() {

	var objetoEdit = {

		"idLojista": usuario.lojistaId,
		"cnpj": $('#cnpj').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"nomeFantasia": $("#nomeFantasia").val(),
    	"razaoSocial":  $("#razaoSocial").val(),
		"inscrEstadual": $('#inscricaoEstadual').val(),
		"endereco": $('#endereco').val(),
		"numero": $('#numero').val(),
		"complemento": $('#complemento').val(),
		"bairro": $('#bairro').val(),
		"cidade": $('#cidade').val(),
		"estado": $('#estado').val(),
		"cep": $('#cep').val().replace(/[^a-zA-Z0-9 ]/g, ""),
		"site": $('#site').val(),
		"ativo":"S",

	}

	$.ajax({
		url: url_base + "/lojistas",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
			text: e.responseJSON.error,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		console.log(e.responseJSON)

		}
	})
		.done(function() {
			
			setTimeout(function() {
				window.location.href = 'lojaLojista';
			}, 1000);
			
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

}

$(document).ready(function() {
		
		$.ajax({
			url: url_base + "/lojistas/" + usuario.lojistaId,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				    $('#cnpj').val(data.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")),
				    $("#nomeFantasia").val(data.nomeFantasia),
				    $("#razaoSocial").val(data.razaoSocial),
					$('#inscricaoEstadual').val(data.inscrEstadual),
					$('#endereco').val(data.endereco),
					$('#numero').val(data.numero),
					$('#complemento').val(data.complemento),
					$('#bairro').val(data.bairro),
					$('#cidade').val(data.cidade),
					$('#estado').val(data.estado),
					$('#cep').val(data.cep.replace(/^(\d{4})(\d{4})$/, "$1-$2")),
					$('#site').val(data.site),
					edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();

		editar()
	
});