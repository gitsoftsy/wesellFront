$(document).ready(function () {
	var usuario = $("#usuarioCadastro").val()
  $.ajax({
    url: url_base + "/listaParceiroAtivo",
    type: "GET",
    async: false,
  })
    .done(function (data) {
      console.log(data)
      data.forEach(function(parceiro) {
        $('#listaParceiros').append(
          $('<option>', {
            value: parceiro.idParceiro,
            text: parceiro.razaoSocial
          })
        );
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
    })
  $("#form-user-parceiro").submit(function (e) {
    e.preventDefault();
    var senha = $("#senha").val();
    var validSenha = $("#validSenha").val();

    if (senha !== validSenha) {
      alert("As senhas não coincidem. Por favor, digite senhas iguais.");
    } else {
      var formArray = $("#form-user-parceiro").serializeArray();

      var userData = {};
      $(formArray).each(function (index, obj) {
        userData[obj.name] = obj.value;
      });
      var celularInput = $("#celular");

      userData["celular"] = celularInput.cleanVal();
      var cpfInput = $("#cpf");

      userData["cpf"] = cpfInput.cleanVal();
      var ativoCheckbox = $('input[name="ativo"]');
      var administradorCheckbox = $('input[name="administrador"]');

      userData["ativo"] = ativoCheckbox.is(":checked") ? "S" : "N";
      userData["administrador"] = administradorCheckbox.is(":checked")
        ? "S"
        : "N";

      $.ajax({
        url:
          url_base +
          `/cdUsuarioParceiro?idParceiro=${userData.parceiro}&usuarioCadastro=${usuario}&senha=${userData.senha}&nome=${userData.nome}&email=${userData.email}&celular=${userData.celular}&ativo=${userData.ativo}&cpf=${userData.cpf}&administrador=${userData.administrador}`,
        type: "GET",
      })
        .done(function (data) {
			Toastify({
				text: "Cadastro realizado com sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			setTimeout(function() {
				window.location.href = 'listarUsuarioParceiro';
			}, 1000);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Erro ao cadastrar");
          console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
        });
    }
  });
});
