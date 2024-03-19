





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
		error: function(data) {
			mostraModalFeedback("erro", "erro na requisição!");
		}
	}).done(function(data){
		
		window.location.href = 'usuarioLojista';
		localStorage.setItem("usuario", JSON.stringify(data));
		
	})
	
	
	
	

	
});















	