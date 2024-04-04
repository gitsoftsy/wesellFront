





$("#form-login").submit(function(e) {
	e.preventDefault();
	
	var objeto = {
		"email": $("#email").val(),
		"senha": $("#senha").val(),
		"perfil": "VENDEDOR"
	}
	
	
	$.ajax({

		url: url_base + '/login',
		type: "POST",
		data: JSON.stringify(objeto),
		contentType: "application/json; charset=utf-8",
			error: function(e) {
				
			Toastify({
			text:  e.responseJSON.message,
			duration: 2000,
			position: "center",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		
		console.log(e.responseJSON)
		
		}
		})
		.done(function(data){
		
		window.location.href = 'dadosDeCadastro';
		localStorage.setItem("usuarioVendedor", JSON.stringify(data));
		
	})
	
	
	
	

	
});















	