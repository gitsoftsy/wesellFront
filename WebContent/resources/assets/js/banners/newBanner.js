var base64 = "";
var usuario = "";
$(document).ready(function () {
  let cropper;
  let image = document.getElementById("imgBanner");
  var user = localStorage.getItem("usuario");
  usuario = JSON.parse(user);

  $("#tipoDispositivo").on("change", function () {
    const tipoDispositivo = $(this).val();
    const inputImage = document.getElementById("inputImage");
    inputImage.disabled = tipoDispositivo === "";

    if (cropper) {
      // $("#imagePreview").html("");
      image.src = "";
      cropper.destroy();
      cropper = null;
    }
  });

  $("#inputImage").on("change", function (e) {
    if (cropper) {
      // $("#imagePreview").html("");
      image.src = "";
      cropper.destroy();
      cropper = null;
    }

    const file = e.target.files[0];
    image.src = URL.createObjectURL(file);

    $("#staticBackdrop").modal("show");
  });

  $("#staticBackdrop").on("shown.bs.modal", function () {
    const tipoDispositivo = $("#tipoDispositivo").val();
    const aspectRatio = tipoDispositivo === "M" ? 2 / 3 : 14 / 4;

    cropper = new Cropper(image, {
      aspectRatio,
      viewMode: 2,
      responsive: true,
      zoomable: true,
      ready() {
        cropper.reset();
        cropper.fit();
      },
      // ready() {
      //   const croppedImageDataURL = cropper
      //     .getCroppedCanvas()
      //     .toDataURL("image/png");
      //   // $("#imagePreview").html(
      //   //   `<img src="${croppedImageDataURL}" alt="Imagem recortada">`
      //   // );
      // },
      // crop(event) {
      //   const croppedImageDataURL = cropper
      //     .getCroppedCanvas()
      //     .toDataURL("image/png");
      //   $("#imagePreview img").attr("src", croppedImageDataURL);
      // },
    });
  });

  $(window).on("resize", function () {
    if (cropper) {
      cropper.reset();
      cropper.fit();
    }
  });

  $("#btnCrop").on("click", function () {
    const croppedImageDataURL = cropper
      .getCroppedCanvas()
      .toDataURL("image/png");
    base64 = croppedImageDataURL;
    console.log(croppedImageDataURL);
  });

  $("#btnCancel").on("click", function () {
    image.src = "";
    $("#inputImage").val("");
    $("#imagePreview").html("");
    if (cropper) {
      cropper.destroy();
    }
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

$("#form-cadastro").submit(function (e) {
  e.preventDefault();

  var dataInicioExibicao = new Date($("#dtInicio").val());
  var dataFimExibicao = new Date($("#dtFim").val());
  var dataAtual = new Date();

  if (dataInicioExibicao < dataAtual) {
    Swal.fire({
      icon: "error",
      title: "A data de início não pode ser menor que a data atual.",
    });
    return;
  }

  if (dataFimExibicao < dataInicioExibicao) {
    Swal.fire({
      icon: "error",
      title: "A data de fim não pode ser menor que a data de início.",
    });
    return;
  }

  var base64SemPrefixo = base64.replace(
    /^data:image\/(png|jpeg|jpg);base64,/,
    ""
  );

  var dados = {
    colaboradorId: usuario.id,
    tipoBanner: $("#tipoBanner").val(),
    localBanner: $("#localBanner").val(),
    tipoDispositivo: $("#tipoDispositivo").val(),
    pathImagem: base64SemPrefixo,
    ordem: Number($("#ordem").val()),
    urlDestino: $("#urlDestino").val(),
    dataInicioExibicao: $("#dtInicio").val(),
    dataFimExibicao: $("#dtFim").val(),
  };

  $.ajax({
    url: url_base + "/banners",
    type: "POST",
    data: JSON.stringify(dados),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    Swal.fire({
      icon: "success",
      title: "Cadastrado com sucesso!",
    });
    setTimeout(function () {
      window.location.href = "listarBanners";
    }, 2000);
  });
});
