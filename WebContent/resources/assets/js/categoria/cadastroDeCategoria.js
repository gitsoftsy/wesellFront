const elemento = document.querySelector('#modalMenu');
var edição = ""
const idCategoria = params.get("id");
var base64 = "";
var usuario = "";

$(document).ready(function() {
	let cropper;
	let image = document.getElementById("imgBanner");

	$("#inputImage").on("change", function(e) {
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

	$("#staticBackdrop").on("shown.bs.modal", function() {
		const aspectRatio = 3 / 3

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

	$(window).on("resize", function() {
		if (cropper) {
			cropper.reset();
			cropper.fit();
		}
	});

	$("#btnCrop").on("click", function() {
		const croppedImageDataURL = cropper
			.getCroppedCanvas()
			.toDataURL("image/png");
		base64 = croppedImageDataURL;
		console.log(croppedImageDataURL);
	});

	$("#btnCancel").on("click", function() {
		image.src = "";
		$("#inputImage").val("");
		$("#imagePreview").html("");
		if (cropper) {
			cropper.destroy();
		}
	});
});




function cadastrar() {
	var base64SemPrefixo = base64.replace(
		/^data:image\/(png|jpeg|jpg);base64,/,
		""
	);

	var objeto = {
		"categoria": $('#descricaoCategoria').val(),
		"pathImagem": base64SemPrefixo
	};

	console.log(objeto)

	$.ajax({

		url: url_base + '/categorias',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		beforeSend: function() {
			Swal.showLoading()
		},
		error: function(e) {
			Swal.close();
			console.log(e.responseJSON.error);
			Swal.fire({
				icon: "error",
				title: e.responseJSON.error
			});
		}
	}).done(function(data) {
		Swal.close();
		Swal.fire({
			title: "Criado com sucesso",
			icon: "success"
		}).then((result) => {
			window.location.href = 'listarCategoria';
		});
	})
}

function editar() {

	if (base64 == "") {
		var objetoEdit = {
			"idCategoria": idCategoria,
			"categoria": $('#descricaoCategoria').val(),
		}

		$.ajax({
			url: url_base + "/categorias",
			type: "PUT",
			data: JSON.stringify(objetoEdit),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(e.responseJSON.error);
				Swal.fire({
					icon: "error",
					title: e.responseJSON.error
				});
			}
		}).done(function(data) {
			Swal.close();
			Swal.fire({
				title: "Editado com sucesso",
				icon: "success"
			}).then((result) => {
				window.location.href = 'listarCategoria';
			});
		})
	} else {
		var objetoEdit = {
			"idCategoria": idCategoria,
			"categoria": $('#descricaoCategoria').val(),
		}

		$.ajax({
			url: url_base + "/categorias",
			type: "PUT",
			data: JSON.stringify(objetoEdit),
			contentType: "application/json; charset=utf-8",
			beforeSend: function() {
				Swal.showLoading()
			},
			error: function(e) {
				Swal.close();
				console.log(e.responseJSON.error);
				Swal.fire({
					icon: "error",
					title: e.responseJSON.error
				});
			}
		}).done(function(data) {
			var base64SemPrefixo = base64.replace(
				/^data:image\/(png|jpeg|jpg);base64,/,
				""
			);

			let objetoImg = {
				pathImagem: base64SemPrefixo
			}

			$.ajax({
				url: url_base + `/categorias/imagem/${idCategoria}`,
				type: "PUT",
				data: JSON.stringify(objetoImg),
				contentType: "application/json; charset=utf-8",
				error: function(e) {
					Swal.close();
					console.log(e.responseJSON.error);
					Swal.fire({
						icon: "error",
						title: e.responseJSON.error
					});
				}
			}).done(function(data) {
				Swal.close();
				Swal.fire({
					title: "Editado com sucesso",
					icon: "success"
				}).then((result) => {
					window.location.href = 'listarCategoria';
				});
			})
		})
	}
}


$('input[name="alteraLogo"]').change(function() {
	if ($(this).is(':checked') == true) {
		$('#divLogoEscola').show();
		$("#inputImage").attr('required', true);
	} else {
		$('#divLogoEscola').hide();
		$("#inputImage").val(null).attr('required', false);
	}
});


$(document).ready(function() {




	if (idCategoria == undefined) {
		$("#alterarLogo").hide();
	} else {

		$("#tituloPagina, #tituloForm").text("Editar Categoria")
		$("#btn-submit").text("Editar")

		$.ajax({
			url: url_base + "/categorias/" + idCategoria,
			type: "GET",
			async: false,
		})
			.done(function(data) {
				$("#divLogoEscola").hide();
				$('#descricaoCategoria').val(data.categoria);
				edição = "sim"
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log('erro ao buscar dados.')
				console.error("Erro na solicitação AJAX:", textStatus, errorThrown);
			});
	}

});
$("#form-funcionario").on("submit", function(e) {
	e.preventDefault();
	if (edição == "sim") {

		editar()
	} else {
		cadastrar()
	}
});