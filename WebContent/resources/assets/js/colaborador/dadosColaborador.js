var user = localStorage.getItem("usuario");
var usuario = JSON.parse(user);
var adm = "";
$("#usuarioNome").text(usuario.nome);

$(document).ready(function () {
  $(".divSenhas").hide();
  $("#senha, #confirmarSenha").prop("required", false);

  $.ajax({
    url: url_base + "/colaboradores/" + usuario.id,
    type: "GET",
    async: false,
  })
    .done(function (data) {
      $("#nome").val(data.nome),
        $("#cpf").val(
          data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
        );
      $("#usuario").val(data.usuario);
      $("#email").val(data.email), (edição = "sim");
      adm = data.administrador;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("erro ao buscar dados.");
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
});

$('input[name="alterarSenha"]').change(function () {
  if ($(this).is(":checked") == true) {
    $(".divSenhas").show();
    $("#senha, #confirmarSenha").prop("required", true);
  } else {
    $(".divSenhas").hide();
    $("#senha, #confirmarSenha").prop("required", false);
  }
});

function removeObjeto() {
  localStorage.removeItem("usuario");
}

function editar() {
  var objetoFinal = {};

  if ($('input[name="alterarSenha"]').is(":checked") == true) {
    objetoFinal = {
      idColaborador: usuario.id,
      nome: $("#nome").val(),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      usuario: $("#usuario").val(),
      senha: $("#senha").val(),
      administrador: adm,
      alterarSenha: "S",
      email: $("#email").val(),
    };
  } else {
    objetoFinal = {
      idColaborador: usuario.id,
      nome: $("#nome").val(),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      usuario: $("#usuario").val(),
      administrador: adm,
      alterarSenha: "N",
      email: $("#email").val(),
    };
  }

  $.ajax({
    url: url_base + "/colaboradores",
    type: "PUT",
    data: JSON.stringify(objetoFinal),
    contentType: "application/json; charset=utf-8",
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
    Swal.fire({
      title: "Editado com sucesso",
      icon: "success",
    });
    $("#alterarSenha").prop("checked", true);
    $("#senha").val("");
    $("#confirmarSenha").val("");
    $("#senha, #confirmarSenha").prop("required", false);
  });
}

$("#form-funcionario").on("submit", function (e) {
  e.preventDefault();

  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");

  if (senhaInput.value != confirmarSenhaInput.value) {
    Swal.fire({
      title: "As senhas não coincidem!",
      icon: "info",
    });
  } else {
    editar();
  }
});
