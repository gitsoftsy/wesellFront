var dados = [];
var sortOrder = {};
var dadosOriginais = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;

const botaoDesativa = document.querySelector('#teste');
const botaoAtiva = document.querySelector('.botaoAtivaMenu');
const elemento = document.querySelector('#modalMenu');

/*botaoDesativa.addEventListener('click', () => {
  elemento.classList.add('animar-sair');
 elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
  elemento.classList.add('animar-entrar');
  elemento.classList.remove('animar-sair');
  });
  */
var user = localStorage.getItem("usuario")
var usuario = JSON.parse(user);

$("#usuarioNome").text(usuario.nome)

var funcionarios = []

$(document).ready(function() {


	$.ajax({
		url: url_base + "/funcionarios/lojista/" + usuario.lojistaId, //colocar o id lojista aqui 
		type: "GET",
		async: false,
	})
		.done(function(data) {
			funcionarios = data;
			renderizarFuncionarios(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	function renderizarFuncionarios(funcionarios) {
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
	window.location.href = "cadastroFuncionarioLojista?id=" + idFuncionario;
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
			console.log(e.responseJSON)
			Swal.fire({
				icon: "info",
				title: e.responseJSON.error
			})
		}

	});


}
