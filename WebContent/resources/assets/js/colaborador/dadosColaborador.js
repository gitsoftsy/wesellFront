var user = localStorage.getItem("usuario");
var usuario = JSON.parse(user);
var adm = "";
$("#usuarioNome").text(usuario.nome);

$(document).ready(function () {
  $("#alteraSen").removeClass("none");
  $("#senha, #confirmarSenha").attr("disabled", "disabled");
  $("#senha, #confirmarSenha").attr("type", "hidden");
  $("#labelSenha, #confirmarSenhaLabel").addClass("none");
  $.ajax({
    url: url_base + "/colaboradores/" + usuario.id,
    type: "GET",
    async: false,
  })
    .done(function (data) {
		console.log(data)
      $("#nome").val(data.nome),
        $("#cpf").val(
          data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
        );
      $("#usuario").val(data.usuario);
      $("#email").val(data.email), (edição = "sim");
		adm = data.administrador
	 
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("erro ao buscar dados.");
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    });
});

function removeObjeto() {
  localStorage.removeItem("usuario");
}

function alteraSenha() {
  $("#senha, #confirmarSenha").removeAttr("disabled");
  $("#labelSenha, #confirmarSenhaLabel").removeClass("none");
  $("#alteraSen").addClass("none");
  $("#alteraSenhaNao").removeClass("none");
  $("#senha, #confirmarSenha").attr("type", "password");
  $("#senha").val("");
  $("#confirmarSenha").val("");
}

function alteraSenhaNao() {
  $("#alteraSen").removeClass("none");
  $("#alteraSenhaNao").addClass("none");
  $("#senha").val("");
  $("#confirmarSenha").val("");
  $("#senha, #confirmarSenha").attr("disabled", "disabled");
  $("#senha, #confirmarSenha").attr("type", "hidden");
  $("#labelSenha, #confirmarSenhaLabel").addClass("none");
}

function editar() {
  var objetoEdit = {
    idColaborador: usuario.id,
    nome: $("#nome").val(),
    cpf: $("#cpf")
      .val()
      .replace(/[^a-zA-Z0-9 ]/g, ""),
    usuario: $("#usuario").val(),
    senha: $("#senha").val(),
    administrador: adm,
    alterarSenha: "N",
    email: $("#email").val(),
  };

  $.ajax({
    url: url_base + "/colaboradores",
    type: "PUT",
    data: JSON.stringify(objetoEdit),
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
  });
}

$("#form-funcionario").on("submit", function (e) {
  e.preventDefault();

  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");

  function requerimentoSenha() {
    if (senhaInput.value != confirmarSenhaInput.value) {
      $("#senha").val("");
      $("#confirmarSenha").val("");

      Swal.fire({
        title: "As senhas não coincidem!",
        icon: "info",
      });
    } else {
      editar();
    }
  }

  requerimentoSenha();
});
