var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 7;
var currentPage = 1;
var pagesToShow = 5;

const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
var id = '';
var idFuncionario = '';
var user = localStorage.getItem("usuario")
const funcionario = JSON.parse(user);

/*botaoDesativa.addEventListener('click', () => {
  elemento.classList.add('animar-sair');
 elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
  elemento.classList.add('animar-entrar');
  elemento.classList.remove('animar-sair');
  });*/

var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome)

var produto = []
var imge = []

$("#tipoTelefone").change(() => {

	if ($("#tipoTelefone").val() == "T") {
		$("#telefoneC").hide()
		$("#telefoneT").show()
	} else {
		$("#telefoneC").show()
		$("#telefoneT").hide()
	}

})

$("#tipoTelefoneEdit").change(() => {

	if ($("#tipoTelefoneEdit").val() == "T") {
		$("#telefoneCEdit").hide()
		$("#telefoneTEdit").show()
	} else {
		$("#telefoneCEdit").show()
		$("#telefoneTEdit").hide()
	}

})

$(document).ready(function() {
	$("#telefoneC").show()
	$("#telefoneT").hide()

	$.ajax({
		url: url_base + "/telefones",
		type: "GET",
		async: false,
	})
		.done(function(data) {
			renderizarTelefone(data)

			function renderizarTelefone(telefone) {

				var html = telefone.map(function(item) {
					let teste = (/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3")
					let tel = item.tpTelefone == "C" ? item.telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3") : item.telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1)$2-$3")
					let tpTel = item.tpTelefone == "C" ? "Celular" : "Telefone"

					return (
						"<tr>" +
						"<td>" +
						tel +
						"</td>" +
						"<td>" +
						tpTel +
						"</td>" +
						'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
						item.idTelefoneFuncionario +
						'' +
						'" data-id="' +
						item.idTelefoneFuncionario +
						'" data-funcionario-id="' +
						item.funcionarioId +
						'" data-telefone="' + item.telefone +
						'" data-tpTelefone="' +
						item.tpTelefone +
						'"onclick="showModal(this)" data-bs-toggle="modal" data-bs-target="#editTel""><i class="fa-solid fa-pen fa-lg"></i></span> </td>' +
						"</tr>"
					);
				}).join("");

				$("#colaTabela").html(html);
			}



			$('.checkbox-toggle').each(function() {
				var status = $(this).data('status');
				if (status !== 'S') {
					$(this).prop('checked', false);
				}
			});

			showPage(currentPage);
			updatePagination();
		});

})

$('#formCadastro').on('submit', function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

$('#formEdit').on('submit', function(e) {
	e.preventDefault();
	editar();
	return false;
});

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
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(objeto);
				console.log(e.responseJSON[0].mensagem);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Criado com sucesso",
				icon: "success"
			}).then((result) => {
				window.location.href = 'listarTelefoneLojista';
			});
		});

	}
}

function showModal(ref) {
	id = ref.getAttribute("data-id");
	let telefone = ref.getAttribute("data-telefone");
	let tipoTelefone = ref.getAttribute("data-tpTelefone");
	idFuncionario = ref.getAttribute("data-funcionario-id");

	if (tipoTelefone == "C") {
		$("#telefoneCEdit").show()
		$("#telefoneCEdit").val(telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3"))
		$("#telefoneTEdit").hide()
	} else {
		$("#telefoneTEdit").show()
		$("#telefoneTEdit").val(telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1)$2-$3"))
		$("#telefoneCEdit").hide()
	}
	$('#tipoTelefoneEdit').val(tipoTelefone);
}

function editar() {
	let telefone

	if ($("#tipoTelefoneEdit").val() == "T") {
		telefone = $('#telefoneTEdit')
	} else {
		telefone = $('#telefoneCEdit')
	}

	if (telefone.val().length < 10) {
		Swal.fire({
			icon: "error",
			title: "Erro no telefone",
			text: "Confira se o telefone foi digitado corretamente!",
		});
	} else {
		const objeto = {
			"idTelefoneFuncionario": id,
			"funcionarioId": idFuncionario,
			"telefone": telefone.val().replace(/[^a-zA-Z0-9 ]/g, ""),
			"tpTelefone": $('#tipoTelefoneEdit').val()
		};

		$.ajax({
			url: url_base + '/telefones',
			type: "put",
			data: JSON.stringify(objeto),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(objeto);
				console.log(e.responseJSON[0].mensagem);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Não foi possível realizar esse comando!",
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success"
			}).then((result) => {
				window.location.href = 'listarTelefoneLojista';
			});
		});

	}
}

function excluir() {
	Swal.fire({
		title: "Quer mesmo excluir?",
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: "Sim",
		denyButtonText: `Não, cancelar`
	}).then((result) => {
		if (result.isConfirmed) {
			ajaxDelete();
		}
	});
}

const ajaxDelete = () => {
	$.ajax({
		url: url_base + `/telefones/${id}`,
		type: "delete",
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			// Mostrar indicador de carregamento
			Swal.fire({
				title: 'Carregando...',
				text: 'Por favor, aguarde',
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading();
				}
			});
		},
		error: function(e) {
			Swal.close();
			console.log(e);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Falha na requisição, tente mais tarde!"
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Apagado com sucesso!",
			icon: "success",
		}).then((result) => {
			window.location.href = 'listarTelefoneLojista';
		});
	});
}


function limpaCampo() {
	$('#cadastro-telefone').val('');
	$('#edit-telefone').val('');
}



