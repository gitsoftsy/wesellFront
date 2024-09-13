var perfil = localStorage.getItem("usuario");
var lojista = JSON.parse(perfil);

$(document).ready(function () {
  fetchData("/categorias/ativos", "#categoria", "idCategoria", "categoria");

  async function fetchData(endpoint, selectId, valueKey, textKey) {
    try {
      const response = await $.ajax({
        url: url_base + endpoint,
        type: "GET",
        async: false,
      });

      response.forEach((item) => {
        $(selectId).append(
          $("<option>", {
            value: item[valueKey],
            id: item[valueKey],
            text: item[textKey],
            name: item[textKey],
          })
        );
      });
    } catch (error) {
      console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    }
  }
});

$("#categoria").change(function () {
  const categoryId = $(this).val();
  loadSubCategories(categoryId);
});

async function loadSubCategories(categoryId) {
  await $.ajax({
    url: `${url_base}/subcategorias/categoria/${categoryId}`,
    type: "GET",
    success: function (data) {
      const subCategoriaSelect = $("#subCategoria").empty();
      subCategoriaSelect.append(
        $("<option>", {
          value: "",
          text: "Selecione...",
          disabled: true,
          selected: true,
        })
      );

      data.forEach((item) => {
        subCategoriaSelect.append(
          $("<option>", {
            value: item.id,
            text: item.nome,
          })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Erro ao buscar subcategorias:", status, error);
    },
  });
}

$("#btnDownload").click(function () {
  var headers = [
    {
      "CODIGO DO PRODUTO": "",
      "NOME DO PRODUTO": "",
      DESCRIÇÃO: "",
      PREÇO: "",
      "PREÇO PROMOCIONAL": "",
      "COMISSAO WESELL": "",
      "COMISSAO INFLUENCER": "",
      "FRETE GRÁTIS": "",
      ALTURA: "",
      LARGURA: "",
      PROFUNDIDADE: "",
      PESO: "",
      "NÍVEL RELEVÂNCIA": "",
      DESTACAR: "",
      "URL IMAGEM": "",
    },
  ];
  var planilha = XLSX.utils.json_to_sheet(headers);

  planilha["!cols"] = [
    { wch: 20 },
    { wch: 30 },
    { wch: 50 },
    { wch: 10 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
    { wch: 50 },
  ];

  var livro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(livro, planilha, "Modelo De Importação");

  XLSX.writeFile(livro, "modeloImportacao.xlsx");
});

$("#form-cadastro").on("submit", async function (e) {
  e.preventDefault();

  var file = $("#fileExcel")[0].files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function () {
      var base64String = reader.result.split(",")[1];

      var objeto = {
        categoriaId: $("#categoria").val(),
        subcategoriaId: $("#subCategoria").val(),
        lojistaId: lojista.lojistaId,
        arquivo: base64String,
      };

      console.log(objeto);
      //   $.ajax({
      //     url: url_base + "/marcas",
      //     type: "POST",
      //     data: JSON.stringify(objeto),
      //     contentType: "application/json; charset=utf-8",
      //     error: function (e) {
      //       Swal.close();
      //       console.log(e.responseJSON);
      //       Swal.fire({
      //         icon: "error",
      //         title: "Oops...",
      //         text: "Erro ao importar arquivo.",
      //       });
      //     },
      //   }).done(function (data) {
      //     Swal.close();
      //     Swal.fire({
      //       title: "Importado com sucesso",
      //       icon: "success",
      //     }).then((data) => {
      //       window.location.href = "listarProduto";
      //     });
      //   });
    };

    reader.readAsDataURL(file);
  } else {
    console.log("Por favor, selecione um arquivo primeiro.");
  }
});
