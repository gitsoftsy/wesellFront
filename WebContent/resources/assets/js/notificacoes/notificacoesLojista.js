const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var user = JSON.parse(localStorage.getItem("usuario"));

botaoDesativa.addEventListener("click", () => {
  elemento.classList.add("animar-sair");
  elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
  elemento.classList.add("animar-entrar");
  elemento.classList.remove("animar-sair");
});

var importacoes = [];
const lidos = [];
var rows = 12;
var currentPage = 1;
var pagesToShow = 5;
var dados = [];
var sortOrder = {};
var dadosFiltrados = [];

const colocarLido = () => {
  $.ajax({
    url: url_base + "/importacao/marcarLido",
    type: "put",
    data: JSON.stringify(lidos),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      console.log(e.responseJSON);
    },
  }).done(function (data) {
    Swal.close();
  });
};

function downloadFile(path, name) {
  console.log(path, name);
  // Cria um elemento <a> oculto para forçar o download
  var link = document.createElement("a");
  link.target = "_blank";
  link.href = path;
  link.download = name; // Nome do arquivo que será baixado
  document.body.appendChild(link); // Anexa o link ao corpo do documento
  link.click(); // Simula o clique no link
  document.body.removeChild(link); // Remove o link do documento
}

$(document).ready(function () {
  $.ajax({
    url: url_base + "/importacao/funcionarioLojista/" + user.id,
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
        title: "Não foi possível no momento",
      });
    },
  }).done(function (data) {
	
    Swal.close();
    $("#exportar-excel").click(function () {
      var planilha = XLSX.utils.json_to_sheet(data);
      var livro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
      XLSX.writeFile(livro, "FuncionariosLojista.xlsx");
    });
    if (data.length > 0) {
      importacoes = data;
      dados = data
      dadosFiltrados = data
      
      renderizarImportacoes(data);
      showPageNew(currentPageNew);
      renderPageNumbersNew();
      
    } else {
      $(".container-table").hide();
      $(".card-table").append('<span class="title">Nenhuma Notificação</span>');
    }
  });

  function renderizarImportacoes(importacoes) {
    var html = importacoes
      .map(function (item) {
        if (item.lido == "N") {
          lidos.push(item.idLogImportacaoProduto);
        }

        var buttonClass = item.lido === "S" ? "btn-success" : "btn-danger";
        var iconClass = item.lido === "S" ? "fa-check" : "fa-xmark";

        var statusLabel;
        if (item.statusImport === "C") {
          statusLabel = "Concluído";
        } else if (item.statusImport === "I") {
          statusLabel = "Iniciada";
        } else if (item.statusImport === "E") {
          statusLabel = "Erro";
        } else {
          statusLabel = "Parcial";
        }

        var dataFinalizacao = item.dataFinalizacao
          ? new Date(item.dataFinalizacao).toLocaleString()
          : "N/A";
        var pathLog = item.pathLog
          ? item.pathLog.replace("/opt/tomcat9/webapps", url_image)
          : "";

        return (
          "<tr>" +
          "<td>" +
          dataFinalizacao +
          "</td>" +
          "<td>" +
          '<button type="button" class="btn btn-status ' +
          buttonClass +
          ' btn-sm" ' +
          'style="width: 63px; height: 31px; padding: 2px; display: flex; align-items: center; justify-content: center;" disabled>' +
          '<i class="fa-solid ' +
          iconClass +
          ' fa-xl"></i>' +
          "</button>" +
          "</td>" +
          "<td>" +
          item.categoriaNome +
          "</td>" +
          "<td>" +
          item.subCategoriaNome +
          "</td>" +
          "<td>" +
          item.nomeArquivo +
          "</td>" +
          "<td>" +
          statusLabel +
          "</td>" +
          '<td class="d-flex">' +
          '<span style="width: 60%; margin-right: 5px; height: 31px; padding: 8px; display: flex; gap: 6px; align-items: center; justify-content: center;" ' +
          'class="btn btn-primary btn-sm ' +
          (pathLog ? "" : "disabled") +
          '" ' +
          (pathLog
            ? "onclick=\"downloadFile('" +
              pathLog +
              "', '" +
              item.nomeArquivo +
              "')\""
            : "disabled") +
          '><i class="fa-regular fa-eye"></i> Ver</span>' +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    colocarLido();
    $("#colaTabela").html(html);
  }

  $("#inputBusca").on("keyup", function () {
    var valorBusca = $(this).val().toLowerCase();

    if (valorBusca === "") {
      busca();
      $("#colaTabela tr").show();
    } else {
      $("#colaTabela tr")
        .hide()
        .filter(function () {
          return $(this).text().toLowerCase().indexOf(valorBusca) > -1;
        })
        .show();
    }
  });

  function realizarBusca(valorInput) {
    if (valorInput === "") {
      showPageN(currentPage);
    } else {
      $("#colaTabela tr")
        .hide()
        .filter(function () {
          return $(this).text().toLowerCase().indexOf(valorInput) > -1;
        })
        .show();
    }
  }

  $("#inputBusca").on("input", function () {
    var valorBusca = $(this).val().toLowerCase();
    realizarBusca(valorBusca);
  });

  $(".checkbox-toggle").each(function () {
    var status = $(this).data("status");
    if (status !== "S") {
      $(this).prop("checked", false);
    }
  });
});
