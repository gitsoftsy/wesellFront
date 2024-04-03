  $(document).ready(function () {
   $(".sub-btn").click(function () {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
      });
    });
    

var perfil = document.getElementById("perfil")
var dadosBancario = document.getElementById("dadosBancario")


perfil.addEventListener("click", function(){
	
		$("#formBancario").addClass("d-none")
		$("#formPerfil").removeClass("d-none")
	
})

dadosBancario.addEventListener("click", function(){

		$("#formPerfil").addClass("d-none")
		$("#formBancario").removeClass("d-none")
		
})

$.ajax({

		url: url_base + '/bancos',
		type: "get",
		contentType: "application/json; charset=utf-8",
		async: false,
	}).done(function(data){
		
		 $('#banco').append($('<option>', {
				value: "Selecione um Banco",
				text : "Selecione um Banco", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#banco').append($('<option>', { 
                     value: item.nomeBanco,
                     id: item.idBanco,
                     text : item.nomeBanco ,
                     name : item.nomeBanco
                 }));
           })
	})
