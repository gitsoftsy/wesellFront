const idProduto = params.get("id");
var ValorConvertidoPreco;
var ValorConvertidoComissao;
var edição = "";

$(document).ready(function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 8,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  fetchData("/categorias", "#categoria", "idCategoria", "categoria");
  fetchData("/lojistas", "#lojista", "idLojista", "nomeFantasia");

  $("#categoria").change(function () {
    const categoryId = $(this).val();
    loadSubCategories(categoryId);
  });

  $("#precoDeVenda").on("input", function (e) {
    formatCurrencyInput(e, function (formattedValue, rawValue) {
      ValorConvertidoPreco = rawValue;
      e.target.value = formattedValue;
    });
  });

  $("#comissao").on("input", function (e) {
    formatCurrencyInput(e, function (formattedValue, rawValue) {
      ValorConvertidoComissao = rawValue;
      e.target.value = formattedValue;
    });
  });

  if (idProduto) {
    listarImagens()
    $("#area-input-edit").removeAttr("hidden");
    $("#nomeProdutoEdit").attr("required", "required");
    $("#area-carrossel").removeAttr("hidden");
    $("#title-imagens").removeAttr("hidden");
    $("#area-input-cadastro").hide();

    $("#tituloPagina, #tituloForm").text("Editar Produto");
    $("#btn-submit").text("Salvar");

    $.ajax({
      url: url_base + "/produtos/" + idProduto,
      type: "GET",
      async: false,
    })
      .done(function (data) {
        $("#nomeProdutoEdit").val(data.nomeProduto),
          $("#descricao").val(data.descrProduto),
          $("#precoDeVenda").val(
            data.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })
          ),
          $("#comissao").val(
            data.comissao.toLocaleString("pt-br", { minimumFractionDigits: 2 })
          ),
          $("#categoria")
            .val(data.categorias.idCategoria)
            .attr("selected", true);
        loadSubCategories(data.categorias.idCategoria).then(() => {
          $("#subCategoria").val(data.subcategorias.id).attr("selected", true);
        });

        $("#lojista").val(data.lojista.idLojista).attr("selected", true);
        edição = "sim";
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("erro ao buscar dados.");
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });

    $.ajax({
      url: url_base + "/imagens/produto/" + idProduto,
      type: "GET",
      async: false,
    }).done(function (data) {});
  }
});

function formatCurrencyInput(event, callback) {
  let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
  let rawValue = (value / 100).toFixed(2); // Converte para número decimal e fixa duas casas decimais
  let formattedValue = rawValue.replace(".", ","); // Troca ponto por vírgula
  formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona ponto como separador de milhar
  callback(formattedValue, rawValue);
}

async function listarImagens() {
  await $.ajax({
    url: url_base + "/imagens/lista",
    type: "GET",
    contentType: "application/json",
    data: JSON.stringify({
      caminhoDaPasta:
        "/opt/apache-tomcat-9.0.89/webapps/ROOT/Imagens/uploads/produtos/" + idProduto,
    }),
    success: function (data) {
      data.forEach(function (imageBase64) {
        addImageCard(imageBase64);
      });
    },
    error: function (e) {
      console.log("Erro ao buscar dados.");
      console.error("Erro na solicitação AJAX:", e);
    },
  });
}

function addImageCard(imageBase64) {
  var divCard = $('<div>', { class: 'swiper-slide card-image' });


  var img = $('<img>', {
      src: 'data:image/webp;base64,' + imageBase64,
      alt: 'imagem'
  });


  var buttonRemove = $('<button>', {
      class: 'btn btn-sm btn-danger',
      text: 'Remover'
  });

  divCard.append(img);
  divCard.append(buttonRemove);

  $('.swiper-wrapper').append(divCard);
}

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

async function cadastrarProduto(objeto) {
  try {
    const response = await $.ajax({
      url: url_base + "/produtos",
      type: "POST",
      data: JSON.stringify(objeto),
      contentType: "application/json; charset=utf-8",
      beforeSend: function () {
        Swal.showLoading();
      },
    });

    return response.idProduto;
  } catch (error) {
    console.log(objeto);
    console.log(error.responseJSON[0].mensagem);
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.responseJSON[0].message,
    });
    throw error;
  }
}

async function cadastrarImagens(imagensBase64, produtoId) {
  try {
    var imagens = {
      base64List: imagensBase64,
      produtoId: produtoId,
    };

    await $.ajax({
      url: url_base + "/imagens/upload",
      type: "POST",
      data: JSON.stringify(imagens),
      contentType: "application/json; charset=utf-8",
    });
  } catch (error) {
    console.log(imagens);
    console.log(error);
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Falha ao cadastrar imagens.",
    });
    throw error;
  }
}

async function converterImagensParaBase64(files) {
  const imagensBase64 = [];

  const promises = Array.from(files).map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagensBase64.push(
          event.target.result.replace(
            /^data:image\/(png|jpeg|jpg|webp);base64,/,
            ""
          )
        );
        resolve();
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  });

  await Promise.all(promises);
  return imagensBase64;
}

async function cadastrar() {
  const input = document.getElementById("imagem-produto");
  const files = input.files;

  let imagensBase64 = [];
  if (files.length > 0) {
    try {
      imagensBase64 = await converterImagensParaBase64(files);
      console.log(imagensBase64);
    } catch (error) {
      console.error("Erro ao converter imagens:", error);
      Swal.fire({
        title: "Erro ao converter imagens",
        icon: "error",
      });
      return;
    }
  }

  var objeto = {
    nomeProduto: $("#nomeProduto").val(),
    descrProduto: $("#descricao").val(),
    preco: ValorConvertidoPreco,
    comissao: ValorConvertidoComissao,
    categoriaId: $("#categoria").val(),
    subcategoriaId: $("#subCategoria").val(),
    lojistaId: $("#lojista").val(),
  };

  try {
    const produtoId = await cadastrarProduto(objeto);
    await cadastrarImagens(imagensBase64, produtoId);

    Swal.close();
    Swal.fire({
      title: "Cadastrado com sucesso!",
      icon: "success",
    }).then((result) => {
      window.location.href = "listarProduto";
    });
  } catch (error) {}
}

function editar() {
  console.log("edit");
  let preco = converterValor($("#precoDeVenda").val());
  let comissao = converterValor($("comissao").val());

  var objetoEdit = {
    idProduto: idProduto,
    nomeProduto: $("#nomeProdutoEdit").val(),
    descrProduto: $("#descricao").val(),
    preco: preco,
    comissao: comissao,
    categoriaId: $("#categoria option:selected").attr("value"),
    subcategoriaId: $("#subCategoria option:selected").attr("value"),
    lojistaId: $("#lojista option:selected").attr("value"),
  };

  console.log(preco);
  console.log(comissao);

  console.log(objetoEdit);

  $.ajax({
    url: url_base + "/produtos",
    type: "PUT",
    data: JSON.stringify(objetoEdit),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      Toastify({
        text: e.responseJSON.message,
        duration: 2000,
        position: "center",
        backgroundColor: "red",
        close: true,
        className: "Toastify__toast--custom",
      }).showToast();
      console.log(e.responseJSON);
    },
  }).done(function (data) {
    Toastify({
      text: "Editado com sucesso!",
      duration: 2000,
      position: "center",
      close: true,
      className: "Toastify__toast--custom",
    }).showToast();
    setTimeout(function () {
      window.location.href = "listarProduto";
    }, 1000);
  });
}

function limpaInput() {
  $("#new-imagem-produto").val("");
}
// cadastro do prduto
$("#form-cadastro").on("submit", async function (e) {
  e.preventDefault();

  if (edição == "sim") {
    editar();
  } else {
    cadastrar();
  }
});

$("#form-new-image").on("submit", async function (e) {
  e.preventDefault();

  const input = document.getElementById("new-imagem-produto");
  const files = input.files;

  let imagensBase64 = [];
  if (files.length > 0) {
    try {
      imagensBase64 = await converterImagensParaBase64(files);
      console.log(imagensBase64);
    } catch (error) {
      console.error("Erro ao converter imagens:", error);
      Swal.fire({
        title: "Erro ao converter imagens",
        icon: "error",
      });
      return;
    }
  }
  try {
    await cadastrarImagens(imagensBase64, idProduto);
    Swal.fire({
      title: "Adicionado com sucesso!",
      icon: "success",
    }).then((result) => {
      limpaInput();
      document.getElementById("btn-close").click();
    });
  } catch (error) {}
});
