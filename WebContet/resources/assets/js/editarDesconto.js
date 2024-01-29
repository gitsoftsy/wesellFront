var idDesconto = params.get('id');
$(document).ready(function() {


	$.ajax({
		url: url_base + `/obtemDesconto?idDesconto=${idDesconto}`,
		type: "GET",
		async: false,
	})
		.done(function(data) {
			var apiValor = data[0].tipo;

			if (apiValor === 'P') {
				$('#tipo').prop('checked', false).change();
			} else if (apiValor === 'V') {
				$('#tipo').prop('checked', true).change();
			}
			var modalidadeAPI = data[0].modalidade;
			$('#modalidade').val(modalidadeAPI);
			$('#descricao').val(data[0].desconto);
			$('#valor').val(data[0].valor);
			$('#duracao').val(data[0].duracao);
			$('#tipoIngresso').val(data[0].tipoIngresso);
			var valorCurso = data[0].curso
			$('#mesSemestre').val(data[0].tipoDuracao);
			$('#dataIni').val(data[0].dtInicio);
			$('#dataFim').val(data[0].dtFim);
			$('#quantidade').val(data[0].quantidade);
			$('#expiracao').val(data[0].expiracao);

			$.ajax({
				url: url_base + '/listaConcursoAtivo?P_MODALIDADE=' + modalidadeAPI +
					'&P_TIPO_INGRESSO=' + $("#tipoIngresso").val(),
				type: "GET",
			})
				.done(function(data) {

					if (data == 0) {
						alert("Nao há cursos para esse tipo/modalidade")
					}
					$('#cursos').append($('<option>', {
						value: "todos",
						text: "Todos os cursos",
						disabled: true,
					}));

					$.each(data, function(index, item) {
						console.log(item.curso)
						$('#cursos').append($('<option>', {
							value: item.curso,
							text: item.nome,
							name: item.nome
						}));


					});
					$('#cursos').val(valorCurso);


				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log('Erro ao cadastrar')
					console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
				});

		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Erro ao buscar dados');
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});


})
$("input[data-type='currency']").on({
	keyup: function() {
		formatCurrency($(this));
	},
	blur: function() {
		formatCurrency($(this), "blur");
	}

});

var hoje = new Date().toISOString().split('T')[0];

$('#dataIni').attr('min', hoje);
$('#dataFim').attr('min', hoje);

$('#dataIni').on('change', function() {
	$('#dataFim').attr('min', $(this).val());

	if ($('#dataFim').val() < hoje || $('#dataFim').val() < $(this).val()) {
		$('#dataFim').val($(this).val());
	}
});

$('#dataFim').on('change', function() {
	if ($(this).val() < hoje || $(this).val() < $('#dataIni').val()) {
		$(this).val($('#dataIni').val());
	}
});

$("#form-user-parceiro").submit(function(e) {
	e.preventDefault();
	 var descricaoSemSimbolos = $('#descricao').val().replace(/[^\w\s]|_/gi, '');
	var tipo = $('input[name="tipo"]').is(':checked') ? 'S' : 'N'



	if (tipo == 'S') {
		tipo = 'V'
	}
	else {
		tipo = 'P'
	}


	$.ajax({
		url: url_base + `/alterarDesconto?idDesconto=${idDesconto}&descricao=${descricaoSemSimbolos}&valor=${$('#valor').val()}&tipo=${tipo}&duracao=${$('#duracao').val()}&tipoIngresso=${$('#tipoIngresso').val()}&curso=${$('#cursos').val()}&modalidade=${$('#modalidade').val()}&dataInicio=${$('#dataIni').val()}&dataFim=${$('#dataFim').val()}&quantidade=${$('#quantidade').val()}&expiracao=${$('#expiracao').val()}&tipoDuracao=${$('#mesSemestre').val()}`,
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
				window.location.href = 'listarDescontos';
			}, 1000);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Erro ao cadastrar')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});


$("#tipoIngresso").change(function() {
	$("#modalidade").change();
	$("#cursos").empty();




});

$("#modalidade").change(function() {
	$("#cursos").empty();

	$.ajax({
		url: url_base + '/listaConcursoAtivo?P_MODALIDADE=' + $("#modalidade").val() +
			'&P_TIPO_INGRESSO=' + $("#tipoIngresso").val(),
		type: "GET",
	})
		.done(function(data) {

			if (data == 0) {
				alert("Nao há cursos para esse tipo/modalidade")
			}
			$('#cursos').append($('<option>', {
				value: "todos",
				text: "Todos os cursos",
				disabled: true,
				selected: true,
			}));

			$.each(data, function(index, item) {
				$('#cursos').append($('<option>', {
					value: item.curso,
					text: item.nome,
					name: item.nome
				}));


			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Erro ao cadastrar')
			console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
		});

});




function formatNumber(n) {
	return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


function formatCurrency(input, blur) {
	var input_val = input.val();

	if (input_val === "") { return; }

	var original_len = input_val.length;

	var caret_pos = input.prop("selectionStart");

	if (input_val.indexOf(".") >= 0) {

		var decimal_pos = input_val.indexOf(".");

		var left_side = input_val.substring(0, decimal_pos);
		var right_side = input_val.substring(decimal_pos);

		left_side = formatNumber(left_side);

		right_side = formatNumber(right_side);

		if (blur === "blur") {
			right_side += "00";
		}

		right_side = right_side.substring(0, 2);

		input_val = "$" + left_side + "." + right_side;

	} else {

		input_val = formatNumber(input_val);
		input_val = "R$ " + input_val;

		if (blur === "blur") {
			input_val += ".00";
		}
	}

	input.val(input_val);

	var updated_len = input_val.length;
	caret_pos = updated_len - original_len + caret_pos;
	input[0].setSelectionRange(caret_pos, caret_pos);
}
