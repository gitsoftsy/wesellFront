const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var edição = "";
const idColaboradores = params.get("id");

botaoDesativa.addEventListener("click", () => {
  elemento.classList.add("animar-sair");
  elemento.classList.remove("animar-entrar");
});

botaoAtiva.addEventListener("click", () => {
  elemento.classList.add("animar-entrar");
  elemento.classList.remove("animar-sair");
});

$(document).ready(function () {
  $("#alteraSenhasDiv").hide();

  if (idColaboradores) {
    $("#alteraSenhasDiv").show();

    $("#tituloPagina, #tituloForm").text("Editar Colaborador");
    $("#btn-submit").text("Salvar");
    $("#usuario").attr("disabled", "disabled")

    $(".divSenhas").hide();
    $("#senha, #confirmarSenha").prop("required", false);

    $.ajax({
      url: url_base + "/colaboradores/" + idColaboradores,
      type: "GET",
      async: false,
    })
      .done(function (data) {
        $("#nome").val(data.nome),
          $("#cpf").val(
            data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
          );
        $("#usuario").val(data.usuario);
        if (data.administrador === "N") {
          $("#administrador").prop("checked", true);
        } else {
          $("#administrador").attr("data-off", "true");
        }
        $("#email").val(data.email);
        edição = "sim";
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("erro ao buscar dados.");
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });
  }
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

function cadastrar() {
  var objeto = {
    nome: $("#nome").val(),
    cpf: $("#cpf")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    usuario: $("#usuario").val(),
    senha: $("#senha").val(),
    administrador: $("#administrador").is(":checked") ? "S" : "N",
    alterarSenha: "N",
    email: $("#email").val(),
  };

  $.ajax({
    url: url_base + "/colaboradores",
    type: "post",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e.responseJSON[0].mensagem);
      Swal.fire({
        icon: "error",
        title: "Dados inválidos, verifique-os.",
      });
    },
  }).done(function (data) {
    Swal.fire({
      icon: "success",
      title: "Cadastrado com sucesso",
    }).then((result) => {
      window.location.href = "listarColaboradores";
    });
  });
}

function editar() {
  var objetoFinal = {};

  if ($('input[name="alterarSenha"]').is(":checked") == true) {
    objetoFinal = {
      idColaborador: idColaboradores,
      nome: $("#nome").val(),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      usuario: $("#usuario").val(),
      senha: $("#senha").val(),
      administrador: $("#administrador").is(":checked") ? "S" : "N",
      alterarSenha: "S",
      email: $("#email").val(),
    };
  } else {
    objetoFinal = {
      idColaborador: idColaboradores,
      nome: $("#nome").val(),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      usuario: $("#usuario").val(),
      administrador: $("#administrador").is(":checked") ? "S" : "N",
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
    }).then((result) => {
      window.location.href = "listarColaboradores";
    });
  });
}

$("#form-funcionario").on("submit", function (e) {
  e.preventDefault();

  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");

  if (senhaInput.value != confirmarSenhaInput.value) {
    $("#senha").val("");
    $("#confirmarSenha").val("");
    Swal.fire({
      title: "As senhas não coincidem!",
      icon: "info",
    });
  } else {
    if (edição == "sim") {
      editar();
    } else {
      cadastrar();
    }
  }
});
