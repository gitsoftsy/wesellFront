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
	};

	$.ajax({

		url: url_base + '/categorias',
		type: "post",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.error,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			console.log(e.responseJSON)

		}
	}).done(function(data) {
		Toastify({
			text: "cadastrado com sucesso!",
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		setTimeout(function() {
			window.location.href = 'listarCategoria';
		}, 2000);
	})
}

function editar() {

	var objetoEdit = {
		"idCategoria": idCategoria,
		"categoria": $('#descricaoCategoria').val(),
	}

	$.ajax({
		url: url_base + "/categorias",
		type: "PUT",
		data: JSON.stringify(objetoEdit),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			Toastify({
				text: e.responseJSON.error,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			console.log(e.responseJSON)
		}
	}).done(function(data) {
		Toastify({
			text: "Editado com sucesso!",
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		setTimeout(function() {
			window.location.href = 'listarCategoria';
		}, 2000);
	})
}





$(document).ready(function() {




	if (idCategoria == undefined) {

	} else {

		$("#tituloPagina, #tituloForm").text("Editar Categoria")
		$("#btn-submit").text("Editar")

		$.ajax({
			url: url_base + "/categorias/" + idCategoria,
			type: "GET",
			async: false,
		})
			.done(function(data) {
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