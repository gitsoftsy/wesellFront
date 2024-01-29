$(document).ready(function () {
  $("#form-parceiro").submit(function (e) {
    e.preventDefault();
      var formArray = $('#form-parceiro').serializeArray();

      var userData = {};
      $(formArray).each(function (index, obj) {
        userData[obj.name] = obj.value;
      });
      var ativoCheckbox = $('input[name="ativo"]');

      userData['ativo'] = ativoCheckbox.is(':checked') ? 'S' : 'N';
      var cnpjInput = $('#cnpj');

      userData['cnpj'] = cnpjInput.cleanVal();;
      
      let usuario = $("#usuarioCadastro").val()

      $.ajax({
        url: url_base + `/inserirParceiro?cnpj=${userData.cnpj}&razaoSocial=${userData.razaoSocial}&descricao=${userData.descricao}&ativo=${userData.ativo}&usuarioCadastro=${usuario}`,
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
				window.location.href = 'listarParceiros';
			}, 1000);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log('Erro ao cadastrar')
          console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
        });
  });
});
