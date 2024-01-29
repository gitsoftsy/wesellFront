$(document).ready(function() {
	const idParceiro = params.get('id');
	$.ajax({
		url: url_base + `/obtemParceiro?idParceiro=${idParceiro}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			$('#cnpj').val(data[0].cnpj);
			$('#razaoSocial').val(data[0].razaoSocial);
			$('#descricao').val(data[0].descricao);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('erro ao buscar dados.')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

	$("#form-editar").submit(function(e) {
		e.preventDefault();

		var formArray = $('#form-editar').serializeArray();

		var parceiroData = {};
		$(formArray).each(function(index, obj) {
			parceiroData[obj.name] = obj.value;
		});


		$.ajax({
			url: url_base + `/alterarDadosParceiro?idParceiro=${idParceiro}&cnpj=${parceiroData.cnpj}&razaoSocial=${parceiroData.razaoSocial}&descricao=${parceiroData.descricao}`,
			type: "GET",
		})
			.done(function(data) {
				Toastify({
					text: "Editado com sucesso!",
					duration: 2000,
					position: "center",
					close: true,
					className: "Toastify__toast--custom"
				}).showToast();
				setTimeout(function() {
					window.location.href = 'listarParceiros';
				}, 1000);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	});
});
