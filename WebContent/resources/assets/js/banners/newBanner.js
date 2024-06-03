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
    const aspectRatio = tipoDispositivo === "M" ? 2 / 3 : 16 / 9;

    cropper = new Cropper(image, {
      aspectRatio,
      viewMode: 3,
      responsive: true,
      scalable: true,
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
});

$("#form-cadastro").submit(function (e) {
  e.preventDefault();

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
    Toastify({
      text: "cadastrado com sucesso!",
      duration: 2000,
      position: "center",
      close: true,
      className: "Toastify__toast--custom",
    }).showToast();
    window.location.href = "listarBanners";
  });
});
