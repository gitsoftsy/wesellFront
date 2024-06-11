const idProduto = params.get("id");
var ValorConvertidoPreco;
var ValorConvertidoComissao;
var edição = "";

let swiper;
var lojista = "";

$(document).ready(function () {
  tinymce.init({
    selector: "#descricao",
    language: "pt_BR",
    placeholder: "Digite a descrição aqui...",
    spellchecker_language: "pt",
    plugins:
      "anchor autolink charmap codesample emoticons link lists media searchreplace visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table spellcheckdialog typography align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    statusbar: false, // Remove o footer
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave(); // Garante que o valor do textarea seja atualizado
      });
    },
  });

  var user = localStorage.getItem("usuario");
  lojista = JSON.parse(user);

  swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 15,
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
    listarImagens();
    $("#nomeProdutoEdit").attr("required", "required");
    $("#categoria").attr("disabled", "disabled");
    $("#subCategoria").attr("disabled", "disabled");
    $("#lojista").attr("disabled", "disabled");
    $("#area-input-edit").removeAttr("hidden");
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
  } else {
    $("#nomeProduto").attr("required", "required");
    $("#imagem-produto").attr("required", "required");
  }
});

function formatCurrencyInput(event, callback) {
  let value = event.target.value.replace(/\D/g, "");
  let rawValue = (value / 100).toFixed(2);
  let formattedValue = rawValue.replace(".", ",");
  formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  callback(formattedValue, rawValue);
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

async function listarImagens() {
  await $.ajax({
    url: url_base + "/imagens/produto/" + idProduto,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
      console.log(data);

      data.forEach(function (img) {
        addImageCard(img);
      });

      swiper.update();
    },
    error: function (e) {
      console.log("Erro ao listar imagens.");
      console.error("Erro na solicitação AJAX:", e);
    },
  });
}

function addImageCard(img) {
  var imageUrl = img.imagem.replace(
    "/opt/apache-tomcat-9.0.89/webapps/ROOT",
    "http://ec2-18-235-243-90.compute-1.amazonaws.com:8080"
  );

  var divCard = $("<div>", {
    class: "swiper-slide card-image shadow-sm",
    "data-id": img.idImagemProduto,
  });

  var linkElement = $("<a>", {
    href: imageUrl,
    "data-fancybox": "gallery",
    "data-caption": "imagem " + img.idImagemProduto,
  });

  var imgElement = $("<img>", {
    src: imageUrl,
    alt: "imagem " + img.idImagemProduto,
  });

  var buttonRemove = $("<button>", {
    class: "btn btn-sm btn-danger btn-remove",
    text: "Remover",
    "data-id": img.idImagemProduto,
    type: "button",
  });

  linkElement.append(imgElement);
  divCard.append(linkElement);
  divCard.append(buttonRemove);

  $(".swiper-wrapper").append(divCard);
}

$(document).on("click", ".btn-remove", function () {
  var idImagemProduto = $(this).data("id");

  var $button = $(this);

  $button.html("Removendo...");
  $button.prop("disabled", true);

  removeImageById(idImagemProduto, $button);
});

async function removeImageById(id, $button) {
  await $.ajax({
    url: url_base + "/imagens/" + id,
    type: "DELETE",
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

      $button.html("Remover");
      $button.prop("disabled", false);
    },
  }).done(function (data) {
    Swal.fire({
      title: "Removido com sucesso!",
      icon: "success",
    }).then(() => {
      $button.closest(".card-image").remove();
      document.getElementById("btn-close").click();
      swiper.update();
    });
  });
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

$("#form-new-image").on("submit", async function (e) {
  e.preventDefault();

  const $button = $("#btn-submit-modal");
  const originalButtonText = $button.html();

  $button.html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  $button.prop("disabled", true);

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
      $button.html(originalButtonText);
      $button.prop("disabled", false);
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
      $(".swiper-wrapper").empty();

      listarImagens();
      $button.html(originalButtonText);
      $button.prop("disabled", false);
      document.getElementById("btn-close").click();
    });
  } catch (error) {
    $button.html(originalButtonText);
    $button.prop("disabled", false);
  }
});

function formatCurrencyInput2(value) {
  let numericValue = value.replace(/\D/g, "");
  let rawValue = (numericValue / 100).toFixed(2);
  let formattedValue = rawValue.replace(".", ",");
  formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return { formattedValue, rawValue };
}

async function editar($button, originalButtonText) {
  console.log(lojista);
  let precoDeVendaVal = $("#precoDeVenda").val();
  let comissaoVal = $("#comissao").val();

  let precoConvertido =
    ValorConvertidoPreco || formatCurrencyInput2(precoDeVendaVal).rawValue;
  let comissaoConvertida =
    ValorConvertidoComissao || formatCurrencyInput2(comissaoVal).rawValue;

  var objetoEdit = {
    idProduto: idProduto,
    nomeProduto: $("#nomeProdutoEdit").val(),
    descrProduto: $("#descricao").val(),
    preco: precoConvertido,
    comissao: comissaoConvertida,
    categoriaId: $("#categoria").val(),
    subcategoriaId: $("#subCategoria").val(),
    lojistaId: lojista.lojistaId,
  };

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

      $button.html(originalButtonText);
      $button.prop("disabled", false);
    },
  })
    .done(function (data) {
      Swal.fire({
        title: "Editado com sucesso!",
        icon: "success",
      }).then(() => {
        setTimeout(function () {
          window.location.href = "listarProdutoLojista";
        }, 1000);
      });
    })
    .always(() => {
      $button.html(originalButtonText);
      $button.prop("disabled", false);
    });
}

async function cadastrar($button, originalButtonText) {
  const input = document.getElementById("imagem-produto");
  const files = input.files;
  console.log(lojista);

  let imagensBase64 = [];
  if (files.length > 0) {
    try {
      imagensBase64 = await converterImagensParaBase64(files);
    } catch (error) {
      console.error("Erro ao converter imagens:", error);
      Swal.fire({
        title: "Erro ao converter imagens",
        icon: "error",
      });

      $button.html(originalButtonText);
      $button.prop("disabled", false);
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
    lojistaId: lojista.lojistaId,
  };

  try {
    const produtoId = await cadastrarProduto(objeto);
    await cadastrarImagens(imagensBase64, produtoId);

    Swal.fire({
      title: "Cadastrado com sucesso!",
      icon: "success",
    }).then((result) => {
      window.location.href = "listarProdutoLojista";
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    Swal.fire({
      title: "Erro ao cadastrar produto",
      icon: "error",
    });
  } finally {
    $button.html(originalButtonText);
    $button.prop("disabled", false);
  }
}

function limpaInput() {
  $("#new-imagem-produto").val("");
}
// cadastro do prduto
$("#form-cadastro").on("submit", async function (e) {
  e.preventDefault();

  if (tinymce.get("descricao").getContent().trim() === "") {
    Swal.fire({
      title: "A descrição é obrigatória.",
      icon: "error",
    });
    return;
  }

  const $button = $("#btn-submit");
  const originalButtonText = $button.html();

  $button.html(
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  );
  $button.prop("disabled", true);

  if (edição == "sim") {
    await editar($button, originalButtonText);
  } else {
    await cadastrar($button, originalButtonText);
  }
});
