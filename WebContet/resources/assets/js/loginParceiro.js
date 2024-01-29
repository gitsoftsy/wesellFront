

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










$("#form-login").submit(function (e) {
    e.preventDefault();
    var formArray = $("#form-login").serializeArray();

    var userData = {};
    $(formArray).each(function (index, obj) {
      userData[obj.name] = obj.value;
    });

    $.ajax({
       url:
        url_base +
         `/loginUsuarioParceiro?email=${userData.email}&senha=${userData.senha}`,
       type: "GET",
     }).done(function (data) {
       if (data.idParceiro !== null) {
		   $.ajax({
				url: 'https://sumare.edu.br/descontoParceiro/sessaoParceiro',
				type: "POST",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
			}).done(function(data) {
				window.location.href = "listarCandidatos";
			});
         
       } else {
         alert("Login Inválido!");
       }
    });
  });