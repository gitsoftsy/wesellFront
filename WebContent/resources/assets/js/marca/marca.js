const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');
let id = 0

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

$(document).ready(function() {
	$.ajax({
		url: url_base + "/marcas",
		type: "GET",
		async: false,
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	}).done(function(data) {
		Swal.close()
		$('#exportar-excel').click(function() {
			var planilha = XLSX.utils.json_to_sheet(data);
			var livro = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
			XLSX.writeFile(livro, "cargos.xlsx");
		});

		cargos = data;
		renderizarFuncionarios(data);
	})


	function renderizarFuncionarios(cargos) {
		var html = cargos.map(function(item) {
			var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";
			return (
				"<tr>" +
				"<td>" +
				'<button type="button" class="btn btn-status btn-sm ' +
				buttonClass +
				'" style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
				(item.ativo === "S"
					? "<i class='fa-solid fa-check fa-xl'></i>"
					: '<i class="fa-solid fa-xmark fa-xl"></i>') +
				"</button>" +
				"</td>" +
				"<td>" +
				item.marca +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idMarca +
				'" data-nome="' +
				item.marca +
				'" data-id="' +
				item.idMarca +
				'" data-bs-toggle="modal" onclick="showModal(this)" data-bs-target="#editItem"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idMarca +
				'" data-nome="' +
				item.marca +
				'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
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

function alteraStatus(element) {
	var id = element.getAttribute("data-id");
	var status = element.getAttribute("data-status");

	const button = $(element).closest("tr").find(".btn-status");
	if (status === "S") {
		button.removeClass("btn-success").addClass("btn-danger");
		button.find("i").removeClass("fa-check").addClass("fa-xmark");
		element.setAttribute("data-status", "N");
	} else {
		button.removeClass("btn-danger").addClass("btn-success");
		button.find("i").removeClass("fa-xmark").addClass("fa-check");
		element.setAttribute("data-status", "S");
	}

	$.ajax({
		url: url_base + `/marcas/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.message
			});
		}
	});
}

const cadastrar = () => {
	var objeto = {
		marca: $('#marca').val()
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/marcas",
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Cadastrado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = 'marcas'
		})
	});

	return false;
}

const showModal = (ref) => {
	id = ref.getAttribute("data-id");
	nome = ref.getAttribute("data-nome");

	$('#marcaEdit').val(nome);
}

const editar = () => {
	var objeto = {
		idMarca: id,
		marca: $('#marcaEdit').val()
	};

	console.log(objeto)

	$.ajax({
		url: url_base + "/marcas",
		type: "PUT",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close()
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Não foi possível realizar esse comando!",
			});
		},
	}).done(function(data) {
		Swal.close()
		Swal.fire({
			title: "Editado com sucesso",
			icon: "success",
		}).then((data) => {
			window.location.href = 'marcas'
		})
	});

	return false;
}

$("#formCadastro").on("submit", function(e) {
	e.preventDefault();
	cadastrar();
	return false;
});

$("#editItem").on("submit", function(e) {
	e.preventDefault();
	editar();
	return false;
});

const limpaCampo = () => {
	$('#marca').val('')
	$('#marcaEdit').val('')
}
