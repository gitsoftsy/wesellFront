var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;

const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');

botaoDesativa.addEventListener('click', () => {
	elemento.classList.add('animar-sair');
	elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
	elemento.classList.add('animar-entrar');
	elemento.classList.remove('animar-sair');
});

var funcionarios = []



function showPage(page) {
    // Exibe o modal de carregamento
    Swal.fire({
        title: 'Carregando...',
        text: 'Por favor, aguarde.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onOpen: () => {
            Swal.showLoading(); // Exibe o spinner de carregamento
        }
    });

    $.ajax({
        url: url_base + `/funcionarios?page=${page - 1}&size=${rows}`,
        method: 'GET',
        success: function(data) {
            produto = data;
            renderizarProduto(data);
            updatePagination(data);
            $('input[data-toggle="toggle"]').bootstrapToggle();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erro ao carregar itens:", jqXHR.responseText);
        },
        complete: function() {
            Swal.close(); // Fecha o modal de carregamento
        }
    });
}




function toggleNavigation(data) {
    var totalPages = data.totalPages;
    var currentPage = data.number + 1; // No Spring, 'number' começa do 0

    $('#prev').prop('disabled', currentPage === 1);
    $('#next').prop('disabled', currentPage === totalPages);

    $('#page-numbers').empty();

    var startPage = Math.max(1, Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1));
    var endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (startPage > 1) {
        $('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="1">1</button>');
        if (startPage > 2) {
            $('#page-numbers').append('<span>...</span>');
        }
    }

    for (var i = startPage; i <= endPage; i++) {
        var btnClass = (i === currentPage) ? 'btn btn-sm btn-page active-page' : 'btn btn-sm btn-page';
        $('#page-numbers').append('<button class="' + btnClass + '" data-page="' + i + '">' + i + '</button>');
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            $('#page-numbers').append('<span>...</span>');
        }
        $('#page-numbers').append('<button class="btn btn-sm btn-page" data-page="' + totalPages + '">' + totalPages + '</button>');
    }

    $('.btn-page').click(function() {
        goToPage(parseInt($(this).data('page')));
    });
}

function goToPage(page) {
    showPage(page);
}

$('#prev').click(function() {
    if (currentPage > 1) goToPage(currentPage - 1);
});

$('#next').click(function() {
    var totalPages = produto.totalPages;
    if (currentPage < totalPages) goToPage(currentPage + 1);
});

$(document).ready(function() {
	
	


	$.ajax({
		url: url_base + "/funcionarios?page=0&size=12",
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
	})
		.done(function(data) {
			console.log(data)
			Swal.close();
			$('#exportar-excel').click(function() {
				var planilha = XLSX.utils.json_to_sheet(data);
				var livro = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
				XLSX.writeFile(livro, "FuncionariosLojista.xlsx");
			});

			funcionarios = data;
			renderizarFuncionarios(data);
		})

	function renderizarFuncionarios(funcionarios) {
		
		console.log(funcionarios)
		
		var html = funcionarios.map(function(item) {
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
				item.nome +
				"</td>" +
				"<td>" +
				item.cargo.cargo +
				"</td>" +
				"<td>" +
				item.lojista.nomeFantasia +
				"</td>" +
				"<td>" +
				item.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") +
				"</td>" +
				'<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
				item.idFuncionario +
				'" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
				item.ativo +
				'" data-id="' +
				item.idFuncionario +
				'" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
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





function editar(user) {
	var idFuncionario = user.getAttribute("data-value");
	window.location.href = "cadastroFuncionario?id=" + idFuncionario;
}
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
		url: url_base + `/funcionarios/${id}${status === "S" ? '/desativar' : '/ativar'}`,
		type: "put",
		error: function(e) {
			console.log(e.responseJSON);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.error
			});
		}
	});


}
