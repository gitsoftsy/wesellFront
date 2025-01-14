const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var edição = "";
const idLojista = params.get("id");
const user = localStorage.getItem("usuario");
const jsonUser = JSON.parse(user);
let preco = 0;
let valorConvertidoPreco;

botaoDesativa.addEventListener("click", () => {
  elemento.classList.add("animar-sair");
  elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
  elemento.classList.add("animar-entrar");
  elemento.classList.remove("animar-sair");
});

function formatCurrencyInput(event, callback) {
  let value = event.target.value.replace(/\D/g, "");
  let rawValue = (value / 100).toFixed(2);
  let formattedValue = rawValue.replace(".", ",");
  formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  callback(formattedValue, rawValue);
}

$("#valorMinimoDaCompra").on("input", function (e) {
  formatCurrencyInput(e, function (formattedValue, rawValue) {
    valorConvertidoPreco = rawValue;
    e.target.value = formattedValue;
  });
});

function ValidarCEP(value) {
  const cep = $("#cepCd");
  const message = $("<p id='errMessage'></p>")
    .text("CEP Inválido")
    .css("color", "#FF0000");
  if (value) {
    $("#btn-submit").removeAttr("disabled");
    cep.removeClass("err-message");
    $("#errMessage").css("display", "none");
  } else {
    if ($("#cardCEP").find("#errMessage").length > 0) {
      $("#errMessage").remove();
    }
    $("#btn-submit").attr("disabled", "disabled");
    cep.addClass("err-message");
    $("#cardCEP").append(message);
    message.show();
  }
}

$("#cepCd").blur(function () {
  $.ajax({
    url: "https://viacep.com.br/ws/" + $("#cepCd").val() + "/json/",
    type: "get",
    async: false,
  }).done(function (data) {
    if (data.erro == "true") {
      console.log(data);

      ValidarCEP(false);
    } else {
      console.log(data);

      ValidarCEP(true);
    }
  });
});

$("#cep").blur(function () {
  $.ajax({
    url: "https://viacep.com.br/ws/" + $("#cep").val() + "/json/",
    type: "get",
    async: false,
  }).done(function (data) {
    if (data.erro == true) {
      console.log(e.responseJSON);

      Swal.fire({
        icon: "error",
        title: "CEP inválido, Por favor Verifique.",
      });
    } else {
      $("#endereco").val(data.logradouro);
      $("#bairro").val(data.bairro);
      $("#cidade").val(data.localidade);
      $("#estado").val(data.uf);
    }
  });
});

function cadastrar() {
  var transacao = $("#idTransacao").val() ? $("#idTransacao").val() : null;

  var objeto = {
    colaboradorId: jsonUser.id,
    cnpj: $("#cnpj")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    nomeFantasia: $("#nomeFantasia").val(),
    razaoSocial: $("#razaoSocial").val(),
    inscrEstadual: $("#inscricaoEstadual").val(),
    endereco: $("#endereco").val(),
    numero: $("#numero").val(),
    complemento: $("#complemento").val(),
    bairro: $("#bairro").val(),
    cidade: $("#cidade").val(),
    estado: $("#estado").val(),
    cep: $("#cep")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    site: $("#site").val(),
    calcularFrete: $('input[name="calcularFrete"]:checked').val(),
    avisoRecebimento: $('input[name="avisoRecebimento"]:checked').val(),
    maosProprias: $('input[name="maosProprias"]:checked').val(),
    aceitaBoleto: $('input[name="aceitaBoleto"]:checked').val(),
    aceitaPix: $('input[name="aceitaPix"]:checked').val(),
    aceitaCartao: $('input[name="aceitaCartao"]:checked').val(),
    possuiParcelamento: $('input[name="possuiParcelamento"]:checked').val(),
    maximoParcelas: $("#maximoParcelas").val(),
    cepCd: $("#cepCd")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    valorMinimoDaCompra: valorConvertidoPreco,
    transacoes: null,
  };

  $.ajax({
    url: url_base + "/lojistas",
    type: "post",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON.message);
      console.log(e.responseJSON.error);

      if (
        e.responseJSON.message ==
        "could not execute statement; SQL [n/a]; nested exception is org.hibernate.exception.DataException: could not execute statement"
      ) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Já exite um lojista com esse cnpj ",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Não foi possível cadastrar no momento, tente mais tarde!",
        });
      }
    },
  }).done(function (data) {
    Swal.close();
    Swal.fire({
      title: "Criado com sucesso",
      icon: "success",
    }).then((result) => {
      window.location.href = "listarLojista";
    });
  });
}

function editar() {
  var objetoEdit = {
    idLojista: idLojista,
    colaboradorId: jsonUser.id,
    cnpj: $("#cnpj")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    nomeFantasia: $("#nomeFantasia").val(),
    razaoSocial: $("#razaoSocial").val(),
    inscrEstadual: $("#inscricaoEstadual").val(),
    endereco: $("#endereco").val(),
    numero: $("#numero").val(),
    complemento: $("#complemento").val(),
    bairro: $("#bairro").val(),
    cidade: $("#cidade").val(),
    estado: $("#estado").val(),
    cep: $("#cep")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    site: $("#site").val(),
    ativo: "S",
    calcularFrete: $('input[name="calcularFrete"]:checked').val(),
    avisoRecebimento: $('input[name="avisoRecebimento"]:checked').val(),
    maosProprias: $('input[name="maosProprias"]:checked').val(),
    aceitaBoleto: $('input[name="aceitaBoleto"]:checked').val(),
    aceitaPix: $('input[name="aceitaPix"]:checked').val(),
    aceitaCartao: $('input[name="aceitaCartao"]:checked').val(),
    possuiParcelamento: $('input[name="possuiParcelamento"]:checked').val(),
    maximoParcelas: $("#maximoParcelas").val(),
    cepCd: $("#cepCd")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    valorMinimoDaCompra: valorConvertidoPreco,
    transacoes: $("#idTransacao").val(),
  };

  $.ajax({
    url: url_base + "/lojistas",
    type: "PUT",
    data: JSON.stringify(objetoEdit),
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON.message);
      console.log(e.responseJSON.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e.responseJSON.error,
      });
    },
  }).done(function (data) {
    Swal.close();
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    }).then((result) => {
      window.location.href = "listarLojista";
    });
  });
}

$(document).ready(function () {
  function toggleFields() {
    var calcularFrete = $('input[name="calcularFrete"]:checked').val();
    var aceitaCartao = $('input[name="aceitaCartao"]:checked').val();

    if (calcularFrete === "N") {
      $("#maosProprias").find('input[type="radio"]').prop("disabled", true);
      $("#maosProprias")
        .find('input[type="radio"][value="N"]')
        .prop("checked", true);
      $("#cepCd").val("").prop("disabled", true);
      $("#avisoRecebimento").find('input[type="radio"]').prop("disabled", true);
      $("#avisoRecebimento")
        .find('input[type="radio"][value="N"]')
        .prop("checked", true);
    } else {
      $("#maosProprias").find('input[type="radio"]').prop("disabled", false);
      $("#cepCd").prop("disabled", false);
      $("#avisoRecebimento")
        .find('input[type="radio"]')
        .prop("disabled", false);
    }

    if (aceitaCartao === "N") {
      $("#maximoParcelas").prop("disabled", true);
      $("#maximoParcelas").val("");
      $("#possuiParcelamento")
        .find('input[type="radio"]')
        .prop("disabled", true);
      $("#possuiParcelamento")
        .find('input[type="radio"][value="N"]')
        .prop("checked", true);
    } else {
      $("#possuiParcelamento")
        .find('input[type="radio"]')
        .prop("disabled", false);
      $("#maximoParcelas").prop("disabled", false);
    }

    var possuiParcelamento = $(
      'input[name="possuiParcelamento"]:checked'
    ).val();
    if (possuiParcelamento === "N") {
      $("#maximoParcelas").prop("disabled", true);
      $("#maximoParcelas").val("");
    } else {
      $("#maximoParcelas").prop("disabled", false);
    }
  }
  if (idLojista == undefined) {
  } else {
    $("#tituloPagina, #tituloForm").text("Editar Lojista");
    $("#btn-submit").text("Salvar");

    $.ajax({
      url: url_base + "/lojistas/" + idLojista,
      type: "GET",
      async: false,
    })
      .done(function (data) {
        $("#cnpj").val(
          data.cnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            "$1.$2.$3/$4-$5"
          )
        );
        $("#nomeFantasia").val(data.nomeFantasia);
        $("#razaoSocial").val(data.razaoSocial);
        $("#inscricaoEstadual").val(data.inscrEstadual);
        $("#endereco").val(data.endereco);
        $("#numero").val(data.numero);
        $("#complemento").val(data.complemento);
        $("#bairro").val(data.bairro);
        $("#cidade").val(data.cidade);
        $("#idTransacao").val(data.transacoes)
        $("#estado").val(data.estado);
        $("#cep").val(data.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2"));
        $("#site").val(data.site);
        $("#maximoParcelas").val(data.maximoParcelas);
        $("#valorMinimoDaCompra").val(
          data.valorMinimoDaCompra.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })
        );
        $("#cepCd").val(data.cepCd.replace(/^(\d{5})(\d{3})$/, "$1-$2"));
        valorConvertidoPreco = data.valorMinimoDaCompra;

        if (data.calcularFrete === "S") {
          $('input[name="calcularFrete"][id="calcularFreteSim"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="calcularFrete"][id="calcularFreteNao"]').prop(
            "checked",
            true
          );
        }

        if (data.avisoRecebimento === "S") {
          $('input[name="avisoRecebimento"][id="avisoRecebimentoS"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="avisoRecebimento"][id="avisoRecebimentoN"]').prop(
            "checked",
            true
          );
        }

        if (data.maosProprias === "S") {
          $('input[name="maosProprias"][id="maosPropriasSim"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="maosProprias"][id="maosPropriasNao"]').prop(
            "checked",
            true
          );
        }

        if (data.aceitaBoleto === "S") {
          $('input[name="aceitaBoleto"][id="aceitaBoletoS"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="aceitaBoleto"][id="aceitaBoletoN"]').prop(
            "checked",
            true
          );
        }

        if (data.aceitaPix === "S") {
          $('input[name="aceitaPix"][id="aceitaPixSim"]').prop("checked", true);
        } else {
          $('input[name="aceitaPix"][id="aceitaPixNao"]').prop("checked", true);
        }

        if (data.aceitaCartao === "S") {
          $('input[name="aceitaCartao"][id="aceitaCartaoSim"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="aceitaCartao"][id="aceitaCartaoNao"]').prop(
            "checked",
            true
          );
        }

        if (data.possuiParcelamento === "S") {
          $('input[name="possuiParcelamento"][id="possuiParcelamentoS"]').prop(
            "checked",
            true
          );
        } else {
          $('input[name="possuiParcelamento"][id="possuiParcelamentoN"]').prop(
            "checked",
            true
          );
        }
        toggleFields();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("erro ao buscar dados.");
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });
  }
  $('input[name="calcularFrete"]').change(toggleFields);
  $('input[name="aceitaCartao"]').change(toggleFields);
  $('input[name="possuiParcelamento"]').change(() => {
    var possuiParcelamento = $(
      'input[name="possuiParcelamento"]:checked'
    ).val();
    if (possuiParcelamento === "N") {
      $("#maximoParcelas").prop("disabled", true);
      $("#maximoParcelas").val("");
    } else {
      $("#maximoParcelas").prop("disabled", false);
    }
  });
});
$("#form-funcionario").on("submit", function (e) {
  e.preventDefault();
  if (idLojista != undefined) {
    editar();
  } else {
    cadastrar();
  }
});
