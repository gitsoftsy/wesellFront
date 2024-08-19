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

			$("#inputBusca").on("keyup", function() {
				var valorBusca = $(this).val().toLowerCase();

				if (valorBusca === '') {
					busca()
					$("#colaTabela tr").show();
				} else {
					$("#colaTabela tr").hide().filter(function() {
						return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
					}).show();
				}
			});

			function realizarBusca(valorInput) {
				if (valorInput === '') {
					showPage(currentPage);
				} else {
					$("#colaTabela tr").hide().filter(function() {
						return $(this).text().toLowerCase().indexOf(valorInput) > -1;
					}).show();
				}
			}



			$("#inputBusca").on("input", function() {
				var valorBusca = $(this).val().toLowerCase();
				realizarBusca(valorBusca);
			});

			var rows = 8;
			var currentPage = 1;

			showPage(currentPage);
			toggleNavigation();

			function showPage(page) {
				var start = (page - 1) * rows;
				var end = start + rows;

				$('.tabela-funcionarios tbody tr').hide();
				$('.tabela-funcionarios tbody tr').slice(start, end).show();
			}

			function toggleNavigation() {
				var totalRows = $('.tabela-funcionarios tbody tr').length;
				var totalPages = Math.ceil(totalRows / rows);

				generatePaginationList(totalPages); // Chama a função para gerar a lista de paginação


				if (totalRows > rows) {
					$('#prev, #next').show();
				} else {
					$('#prev, #next').hide();
				}
			}

			$('#prev').click(function() {
				if (currentPage > 1) {
					currentPage--;
					showPage(currentPage);
					toggleNavigation();
				}
			});

			$('#next').click(function() {
				var totalRows = $('.tabela-funcionarios tbody tr').length;
				var totalPages = Math.ceil(totalRows / rows);

				if (currentPage < totalPages) {
					currentPage++;
					showPage(currentPage);
					toggleNavigation();
				}
			});

			function generatePaginationList(totalPages) {
				var paginationList = $('#pagination-list');
				paginationList.empty(); // Limpa a lista antes de adicionar novos itens

				// Adiciona item "Prev"
				var prevListItem = $('<li class="page-item">');
				var prevLink = $('<a class="page-link" href="#" aria-label="Previous">&laquo;</a>').attr('data-page', 'prev');
				prevListItem.append(prevLink);
				paginationList.append(prevListItem);

				for (let i = 1; i <= totalPages; i++) {
					var listItem = $('<li class="page-item">');
					var link = $('<a class="page-link" href="#"></a>').text(i).attr('data-page', i);

					link.on('click', function(e) {
						e.preventDefault(); // Previne o comportamento padrão do link
						var page = $(this).data('page');

						// Atualiza currentPage baseado no item clicado
						if (page === 'prev') {
							currentPage = Math.max(1, currentPage - 1);
						} else if (page === 'next') {
							currentPage = Math.min(totalPages, currentPage + 1);
						} else {
							currentPage = page;
						}

						showPage(currentPage);
						toggleNavigation();
					});

					listItem.append(link);
					paginationList.append(listItem);
				}

				// Adiciona item "Next"
				var nextListItem = $('<li class="page-item">');
				var nextLink = $('<a class="page-link" href="#" aria-label="Next">&raquo;</a>').attr('data-page', 'next');
				nextListItem.append(nextLink);
				paginationList.append(nextListItem);

				// Atualiza o manipulador de clique para 'prev' e 'next' separadamente para evitar conflitos
				prevLink.add(nextLink).on('click', function(e) {
					e.preventDefault();
					var page = $(this).data('page');

					if (page === 'prev' && currentPage > 1) {
						currentPage--;
					} else if (page === 'next' && currentPage < totalPages) {
						currentPage++;
					}

					showPage(currentPage);
					toggleNavigation();
				});
			}

			$('.checkbox-toggle').each(function() {
				var status = $(this).data('status');
				if (status !== 'S') {
					$(this).prop('checked', false);
				}
			});
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



