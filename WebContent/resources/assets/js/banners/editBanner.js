const idItem = params.get("id");
var usuario = "";
var banner = {};

$(document).ready(function () {
  var user = localStorage.getItem("usuario");
  usuario = JSON.parse(user);

  $.ajax({
    url: url_base + "/banners/" + idItem,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $("#ordem").val(data.ordem);
      $("#urlDestino").val(data.urlDestino);
      $("#dtInicio").val(data.dataInicioExibicao);
      $("#dtFim").val(data.dataFimExibicao);
      console.log(data);
      banner = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("erro ao buscar dados.");
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });

  var hoje = new Date().toISOString().split("T")[0];

  $("#dtInicio").attr("min", hoje);
  $("#dtFim").attr("min", hoje);

  $("#dtInicio").on("change", function () {
    $("#dtFim").attr("min", $(this).val());

    if ($("#dtFim").val() < hoje || $("#dtFim").val() < $(this).val()) {
      $("#dtFim").val("");
    }
  });

  $("#dtFim").on("blur", function () {
    if ($(this).val() < hoje || $(this).val() < $("#dtInicio").val()) {
      $(this).val("");
    }
  });

  $("#dtInicio").on("blur", function () {
    if ($("#dtInicio").val() < hoje) {
      return $("#dtInicio").val("");
    }
  });
});

$("#form-edit").on("submit", function (e) {
  e.preventDefault();
   var dataInicioExibicao = new Date($("#dtInicio").val() + 'T00:00:00');
  var dataFimExibicao = new Date($("#dtFim").val() + 'T00:00:00');
  var dataAtual = new Date();

  if (dataInicioExibicao.setHours(0, 0, 0, 0) < dataAtual.setHours(0, 0, 0, 0)) {
    Swal.fire({
      icon: "error",
      title: "A data de início não pode ser menor que a data atual.",
    });
    return;
  }

  if (dataFimExibicao.setHours(0, 0, 0, 0) < dataInicioExibicao.setHours(0, 0, 0, 0)) {
    Swal.fire({
      icon: "error",
      title: "A data de fim não pode ser menor que a data de início.",
    });
    return;
  }

  var objetoEdit = {
    idBanner: idItem,
    colaboradorId: usuario.id,
    tipoBanner: banner.tipoBanner,
    localBanner: banner.localBanner,
    tipoDispositivo: banner.tipoDispositivo,
    ordem: Number($("#ordem").val()),
    urlDestino: $("#urlDestino").val(),
    dataInicioExibicao: $("#dtInicio").val(),
    dataFimExibicao: $("#dtFim").val(),
  };

  $.ajax({
    url: url_base + "/banners",
    type: "PUT",
    data: JSON.stringify(objetoEdit),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      Swal.fire({
        icon: "error",
        title: "Falha ao editar dados.",
      });
      console.log(e);
    },
  }).done(function (data) {
    Swal.fire({
      icon: "success",
      title: "Editado com sucesso!",
    });
    setTimeout(function () {
      window.location.href = "listarBanners";
    }, 2000);
  });
});
