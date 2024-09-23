var dados = [];
var sortOrder = {};
var dadosFiltrados = [];

const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");

/*botaoDesativa.addEventListener('click', () => {
  elemento.classList.add('animar-sair');
 elemento.classList.remove('animar-entrar');

});

botaoAtiva.addEventListener('click', () => {
  elemento.classList.add('animar-entrar');
  elemento.classList.remove('animar-sair');
  });*/

var colaboradores = [];

$(document).ready(function () {
  $.ajax({
    url: url_base + "/colaboradores",
    type: "GET",
    async: false,
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Não foi possível pegar os dados ",
      });
    },
  }).done(function (data) {
    Swal.close();

    $("#exportar-excel").click(function () {
      var planilha = XLSX.utils.json_to_sheet(data);
      var livro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
      XLSX.writeFile(livro, "Colaboradores.xlsx");
    });

    colaboradores = data;
    dadosFiltrados = colaboradores;
    renderizarColaboradores(dadosFiltrados);
    showPageNew(currentPageNew);
    renderPageNumbersNew();
  });

  function renderizarColaboradores(funcionarios) {
    var html = colaboradores
      .map(function (item) {
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
          item.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") +
          "</td>" +
          "<td>" +
          item.usuario +
          "</td>" +
          "<td>" +
          item.email +
          "</td>" +
          '<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
          item.idColaborador +
          '" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
          item.ativo +
          '" data-id="' +
          item.idColaborador +
          '" onChange="alteraStatus(this)" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" data-width="63" class="checkbox-toggle" data-size="sm"></td>' +
          "</tr>"
        );
      })
      .join("");

    $("#colaTabela").html(html);
  }

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });

  $("#inputBusca").on("input", function () {
    var valorBusca = $(this).val().toLowerCase();
    realizarBusca(valorBusca);
  });

  function realizarBusca(valorInput) {
    if (valorInput === "") {
      dadosFiltrados = colaboradores;
    } else {
      dadosFiltrados = colaboradores.filter(function (item) {
        return (
          item.nome.toLowerCase().includes(valorInput) ||
          item.cpf.includes(valorInput) ||
          item.usuario.toLowerCase().includes(valorInput) ||
          item.email.toLowerCase().includes(valorInput) 
        );
      });
    }

    currentPage = 1;
    renderizarColaboradores(dadosFiltrados);
    renderPageNumbersNew();
    showPageNew(currentPageNew);
    toggleNavigationNew();
  }
});

function editar(user) {
  var idColaborador = user.getAttribute("data-value");
  window.location.href = "cadastroDeColaboradores?id=" + idColaborador;
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
    url:
      url_base +
      `/colaboradores/${id}${status === "S" ? "/desativar" : "/ativar"}`,
    type: "put",
    error: function (e) {
      console.log(e.responseJSON.error);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.error,
      });
    },
  });
}
