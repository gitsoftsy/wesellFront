const botaoDesativa = document.querySelector("#teste");
const botaoAtiva = document.querySelector(".botaoAtivaMenu");
const elemento = document.querySelector("#modalMenu");
var edição = "";
const idFuncionario = params.get("id");
var telefoneOriginal;

$(document).ready(function () {
  $("#alteraSenhasDiv").hide();
  $.ajax({
    url: url_base + "/cargos/ativos",
    type: "GET",
    async: false,
  }).done(function (data) {
    $("#cargo").append(
      $("<option>", {
        value: "",
        text: "Selecione...",
      })
    );

    $.each(data, function (index, item) {
      $("#cargo").append(
        $("<option>", {
          value: item.idCargo,
          id: item.idCargo,
          text: item.cargo,
          name: item.cargo,
        })
      );
    });
  });

  $.ajax({
    url: url_base + "/lojistas",
    type: "GET",
    async: false,
  }).done(function (data) {
    $("#lojista").append(
      $("<option>", {
        value: "",
        text: "Selecione...",
      })
    );

    $.each(data, function (index, item) {
      $("#lojista").append(
        $("<option>", {
          value: item.idLojista,
          id: item.idLojista,
          text: item.nomeFantasia,
          name: item.nomeFantasia,
        })
      );
    });
  });

  if (idFuncionario) {
    $("#alteraSenhasDiv").show();

    $("#tituloPagina, #tituloForm").text("Editar Funcionário");
    $("#btn-submit").text("Salvar");

    $(".divSenhas").hide();
    $("#senha, #confirmarSenha").prop("required", false);

    $.ajax({
      url: url_base + "/funcionarios/" + idFuncionario,
      type: "GET",
      async: false,
    })
      .done(function (data) {
        $("#cargo")
          .find(`option[id=${data.cargo.idCargo}]`)
          .attr("selected", "selected"),
          $("#cpf").val(
            data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
          );
        $("#email").val(data.email),
          $("#lojista")
            .find(`option[id=${data.lojista.idLojista}]`)
            .attr("selected", "selected"),
          $("#nome").val(data.nome),
          (edição = "sim");
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("erro ao buscar dados.");
        console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
      });

    $.ajax({
      url: url_base + "/telefones/funcionario/" + idFuncionario,
      type: "GET",
      async: false,
    }).done(function (data) {
      console.log(data);
      telefoneOriginal = data[0].telefone.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1)$2-$3"
      );
      $("#telefone").val(
        data[0].telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3")
      );
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
    cargoId: $("#cargo option:selected").attr("id"),
    cpf: $("#cpf")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    email: $("#email").val(),
    senha: $("#senha").val(),
    lojistaId: $("#lojista option:selected").attr("id"),
    nome: $("#nome").val(),
  };

  $.ajax({
    url: url_base + "/funcionarios",
    type: "post",
    data: JSON.stringify(objeto),
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.message,
      });
    },
  }).done(function (data) {
    var telefone = {
      funcionarioId: data.idFuncionario,
      telefone: $("#telefone")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      tpTelefone: "C",
    };

    $.ajax({
      url: url_base + "/telefones",
      type: "post",
      data: JSON.stringify(telefone),
      contentType: "application/json; charset=utf-8",
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
        icon: "success",
        title: "Cadastrado com sucesso",
      }).then((result) => {
        window.location.href = "listarFuncionarios";
      });
    });
  });
}

function editar() {
  var objetoFinal = {};
  const valorInput = $("#senha").val();

  if ($('input[name="alterarSenha"]').is(":checked") == true) {
    var objetoComSenha = {
      idFuncionario: idFuncionario,
      cargoId: $("#cargo option:selected").attr("id"),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      email: $("#email").val(),
      senha: $("#senha").val(),
      lojistaId: $("#lojista option:selected").attr("id"),
      nome: $("#nome").val(),
    };
    objetoFinal = objetoComSenha;
  } else {
    var objetoSemSenha = {
      idFuncionario: idFuncionario,
      cargoId: $("#cargo option:selected").attr("id"),
      cpf: $("#cpf")
        .val()
        .replace(/[^a-zA-Z0-9 ]/g, ""),
      email: $("#email").val(),
      lojistaId: $("#lojista option:selected").attr("id"),
      nome: $("#nome").val(),
    };
    objetoFinal = objetoSemSenha;
  }

  $.ajax({
    url: url_base + "/funcionarios",
    type: "PUT",
    data: JSON.stringify(objetoFinal),
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      Swal.showLoading();
    },
    error: function (e) {
      Swal.close();
      console.log(e);
      Swal.fire({
        icon: "error",
        title: e.responseJSON[0].mensagem,
      });
    },
  }).done(function (data) {
    if ($("#telefone").val() == telefoneOriginal) {
      Swal.close();
      Swal.fire({
        title: "Editado com sucesso",
        icon: "success",
      }).then((result) => {
        window.location.href = "listarFuncionarios";
      });
    } else {
      editarTelefone();
    }
  });
}

function editarTelefone() {
  $.ajax({
    url: url_base + "/telefones/funcionario/" + idFuncionario,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      Swal.close();
      console.log(e);
      console.log(e.responseJSON);
      Swal.fire({
        icon: "error",
        title: e.responseJSON.message,
      });
    },
  })
    .done(function (data) {
      Swal.close();

      if (data.length > 0) {
        var telefoneEdit = {
          idTelefoneFuncionario: data[0].idTelefoneFuncionario, // idtelefone aqui
          funcionarioId: idFuncionario,
          telefone: $("#telefone")
            .val()
            .replace(/[^a-zA-Z0-9 ]/g, ""),
          tpTelefone: "C",
        };

        $.ajax({
          url: url_base + "/telefones",
          type: "PUT",
          data: JSON.stringify(telefoneEdit),
          contentType: "application/json; charset=utf-8",
        }).done(function (data) {
          Swal.close();
          Swal.fire({
            title: "Editado com sucesso",
            icon: "success",
          }).then((result) => {
            window.location.href = "listarFuncionarios";
          });
        });
      } else {
        var telefone = {
          funcionarioId: idFuncionario,
          telefone: $("#telefone")
            .val()
            .replace(/[^a-zA-Z0-9 ]/g, ""),
          tpTelefone: "C",
        };

        $.ajax({
          url: url_base + "/telefones",
          type: "post",
          data: JSON.stringify(telefone),
          contentType: "application/json; charset=utf-8",
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
            icon: "success",
            title: "Editado com sucesso",
          }).then((result) => {
            window.location.href = "listarFuncionarios";
          });
        });
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
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
    if (edição == "sim") {
      editar();
    } else {
      cadastrar();
    }
  }
});
