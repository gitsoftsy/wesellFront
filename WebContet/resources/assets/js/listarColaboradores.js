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

$(document).ready(function () {
	

  $.ajax({
    url: url_base + "/listaUsuarioInterno",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      funcionarios = data;
      renderizarFuncionarios(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

    function renderizarFuncionarios(funcionarios) {
      var html = funcionarios.map(function (item) {
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
          item.usuario +
          "</td>" +
          "<td>" +
          item.nome +
          "</td>" +
           "<td>" +
          item.usuario +
          "</td>" +
           "<td>" +
          item.usuario +
          "</td>" +
           "<td>" +
          item.usuario +
          "</td>" +
          '<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
          item.idUsuario +
          '" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
          item.ativo +
          '" data-id="' +
          item.idUsuario +
          '" data-usuario="' +
          item.usuario +
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
  
  $('.checkbox-toggle').each(function() {
    var status = $(this).data('status');
    if (status !== 'S') {
      $(this).prop('checked', false);
    }
  });
});

function editar(user) {
  var idUsuario = user.getAttribute("data-value");
  window.location.href = "cadastroDeColaboradores?id=" + idUsuario;
}
function alteraStatus(element) {
  var id = element.getAttribute("data-id");
  var usuario = element.getAttribute("data-usuario");
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
    url: url_base + `/alterarAtivoUsuario?usuario=${usuario}&ativo=${status === "S" ? "N" : "S"}`,
    type: "GET",
    success: function() {
      if (status === "S") {
        console.log("Desativado com sucesso!");
      } else {
        console.log("Ativado com sucesso!");
      }
    },
    error: function(error) {
      console.error("Erro ao alterar status do funcionario:", error);
    }
  });

  funcionarios = funcionarios.map((funcionario) => {
    if (funcionario.idUsuario === id) {
      return { ...funcionario, ativo: status === "S" ? "N" : "S" };
    }
    return funcionario;
  });
}
