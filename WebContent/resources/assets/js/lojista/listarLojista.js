var dados = [];
var sortOrder = {};
var dadosFiltrados = [];

const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");

botaoDesativa.addEventListener("click", () => {
  elemento.classList.add("animar-sair");
  elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
  elemento.classList.add("animar-entrar");
  elemento.classList.remove("animar-sair");
});

var lojistas = [];

$(document).ready(function () {
  $.ajax({
    url: url_base + "/lojistas",
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
        title: e.responseJSON.message,
      });
    },
  }).done(function (data) {
    Swal.close();

    $("#exportar-excel").click(function () {
      var planilha = XLSX.utils.json_to_sheet(data);
      var livro = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(livro, planilha, "Planilha1");
      XLSX.writeFile(livro, "Lojistas.xlsx");
    });

    lojistas = data;
    dadosFiltrados = lojistas;
    renderizarLojistas(data);
    showPageNew(dadosFiltrados);
    renderPageNumbersNew();
  });

  function renderizarLojistas(lojistas) {
    var html = lojistas
      .map(function (item) {
        var buttonClass = item.ativo === "S" ? "btn-success" : "btn-danger";

        var inscricao;

        if (item.inscrEstadual.length == 0) {
          inscricao = "Vazio";
        } else {
          inscricao = item.inscrEstadual;
        }

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
          item.razaoSocial +
          "</td>" +
          "<td>" +
          item.nomeFantasia +
          "</td>" +
          "<td>" +
          item.cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
          ) +
          "</td>" +
          "<td>" +
          inscricao +
          "</td>" +
          "<td>" +
          item.endereco +
          "</td>" +
          "<td>" +
          item.numero +
          "</td>" +
          "<td>" +
          item.bairro +
          "</td>" +
          "<td>" +
          item.cidade +
          "</td>" +
          "<td>" +
          item.estado +
          "</td>" +
          "<td>" +
          item.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") +
          "</td>" +
          "<td>" +
          item.site +
          "</td>" +
          '<td class="d-flex"><span style="width: 63px; margin-right: 5px; height: 31px; padding: 8px; display: flex; align-items: center; justify-content: center;" class="btn btn-warning btn-sm" data-value="' +
          item.idLojista +
          '" onclick="editar(this)"><i class="fa-solid fa-pen fa-lg"></i></span> <input type="checkbox" data-status="' +
          item.ativo +
          '" data-id="' +
          item.idLojista +
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
      dadosFiltrados = lojistas;
    } else {
      dadosFiltrados = lojistas.filter(function (item) {
        return (
          item.razaoSocial.toLowerCase().includes(valorInput) ||
          item.nomeFantasia.toLowerCase().includes(valorInput) ||
          item.cnpj.replace(/\D/g, "").includes(valorInput)
        );
      });
    }

    currentPage = 1;
    renderizarLojistas(dadosFiltrados);
    renderPageNumbersNew();
    showPageNew(currentPageNew);
    toggleNavigationNew();
  }

  function showPageNew(page) {
    var start = (page - 1) * rows;
    var end = start + rows;

    $("#colaTabela tr").hide();
    $("#colaTabela tr").slice(start, end).show();
    toggleNavigationNew();
  }

  function renderPageNumbersNew() {
    var totalRows = dadosFiltrados.length;
    var totalPages = Math.ceil(totalRows / rows);
    var pageNumbersHtml = "";

    if (totalPages > 1) {
      $("#pagination").removeAttr("hidden");

      var startPage = Math.max(1, currentPage - 1);
      var endPage = Math.min(totalPages, currentPage + 1);

      if (currentPage === 1) {
        endPage = Math.min(totalPages, 3);
      } else if (currentPage === totalPages) {
        startPage = Math.max(1, totalPages - 2);
      }

      if (totalPages > 1) {
        for (var i = startPage; i <= endPage; i++) {
          pageNumbersHtml +=
            '<li class="page-item ' +
            (i === currentPage ? "active" : "") +
            '">';
          pageNumbersHtml +=
            '<a class="page-link" href="#" data-page="' + i + '">' + i + "</a>";
          pageNumbersHtml += "</li>";
        }
      }

      $("#pagination").find("li.page-item:not(#prevB):not(#nextB)").remove();
      $("#pagination").find("li#prevB").after(pageNumbersHtml);

      $("#pagination").show();

      $("#pagination .page-link").click(function (e) {
        e.preventDefault();
        var page = $(this).data("page");
        if (page !== currentPage) {
          currentPage = page;
          showPageNew(currentPageNew);
          renderPageNumbersNew();
          toggleNavigationNew();
        }
      });
    } else {
      $("#pagination").attr("hidden", true);
    }
  }

  function toggleNavigationNew() {
    var totalRows = dadosFiltrados.length;
    var totalPages = Math.ceil(totalRows / rows);

    if (totalRows > rows) {
      $("#prevB, #nextB").show();
      $("#prevB").toggleClass("disabled", currentPage === 1);
      $("#nextB").toggleClass("disabled", currentPage === totalPages);

      $("#prevB a").click(function (e) {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          showPageNew(currentPageNew);
          renderPageNumbersNew();
        }
      });

      $("#nextB a").click(function (e) {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          showPageNew(currentPageNew);
          renderPageNumbersNew();
        }
      });
    } else {
      $("#prevB, #nextB").hide();
    }
  }
  $("#prevB").click(function () {
    if (currentPage > 1) {
      currentPage--;
      showPageNew(currentPageNew);
      renderPageNumbersNew();
    }
  });

  $("#nextB").click(function () {
    var totalRows = dadosFiltrados.length;
    var totalPages = Math.ceil(totalRows / rows);

    if (currentPage < totalPages) {
      currentPage++;
      showPageNew(currentPageNew);
      renderPageNumbersNew();
    }
  });
});

function editar(user) {
  var idLojista = user.getAttribute("data-value");
  window.location.href = "cadastroDeLojista?id=" + idLojista;
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
      url_base + `/lojistas/${id}${status === "S" ? "/desativar" : "/ativar"}`,
    type: "put",
    error: function (e) {
      Swal.fire({
        title: e.responseJSON.error,
        icon: "error",
      });
      console.log(e.responseJSON);
    },
  });
}
