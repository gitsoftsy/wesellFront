





$("#form-login").submit(function(e) {
	e.preventDefault();
	
	var objeto = {
		"email": $("#email").val(),
		"senha": $("#senha").val(),
		"perfil": "FUNCIONARIO"
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
		
		window.location.href = 'usuarioLojista';
		localStorage.setItem("usuario", JSON.stringify(data));
		
	})
	
	
	
	

	
});















	