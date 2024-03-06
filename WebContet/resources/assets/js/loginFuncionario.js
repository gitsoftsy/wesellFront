

let olhos = document.querySelector('#olho');

olhos.addEventListener('click', function() {
	
    let input = document.querySelector('#senha');
   
    if(input.getAttribute('type') === 'password') {
		  
        input.setAttribute('type', 'text');
       $('#valor-olho').replaceWith('<i id="valor-olho" class="fa-solid fa-eye"></i>')
         
    } else{
		
        input.setAttribute('type', 'password');
		 $('#valor-olho').replaceWith('<i id="valor-olho" class="fa-solid fa-eye-slash"></i>')
       
    }

});




$("#form-login").submit(function(e) {
	e.preventDefault();
	var formArray = $("#form-login").serializeArray();
	
	var usuario = $("#user").val()
	var senha = $("#senha").val()
	
	$.ajax({

		url: url_base + '/colaboradores',
		type: "GET",
		contentType: "application/json; charset=utf-8",
		error: function(data) {
			mostraModalFeedback("erro", "erro na requisição!");
		}
	}).done(function(){
		
		
		if(usuario & senha === data.usuario & data.senha){}
		
	})
	
	
	
	

	
});















/*	var userData = {};
	$(formArray).each(function(index, obj) {
		userData[obj.name] = obj.value;
	});

	$.ajax({
		url:
			url_base +
			`/loginUsuarioInterno?usuario=${userData.usuario}&senha=${userData.senha}`,
		type: "GET",
	}).done(function(data) {
		if (data.idUsuario !== null) {
			$.ajax({
				url: 'https://sumare.edu.br/descontoParceiro/sessaoFuncionario',
				type: "POST",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
			}).done(function(data) {
				window.location.href = 'listarDescontos';
			});
		} else {
			alert("Login Inválido!");
		}
	});   */