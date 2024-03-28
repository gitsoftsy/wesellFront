


$(document).ready(function() {

	$.ajax({
		url: url_base + '/redesSociais',
		type: "GET",
		async: false,
		error: function(e) {
			
			Toastify({
				text:  e.responseJSON.error,
				duration: 2000,
				position: "center",
				backgroundColor: "red",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
			console.log(e.responseJSON)
		}
	}).done(function(data) {
	
	$('#rede').append($('<option>', { 
			 value: "",
			 text : "Selecione...", }));
		
		
		$.each(data, function(index, item) {
				
               		 $('#rede').append($('<option>', { 
                     value: item.idRedesSociais,
                     id: item.idRedesSociais,
                     text : item.redesSociais ,
                     name : item.redesSociais 
                 }));
           })
	
	})
	
	
	
	});


$("#enviarFormInfor").click(function(){
	
	
	var objetoInfor = {
		
		
    "vendedorId": 3,
    "redesSociaisId": $("#rede option:selected").attr("id"),
    "perfil": $("#usuario").val(),
    "urlPerfil": "instagram.com/" + $("#usuario").val(),
    "qtdSeguidores": $("#seguidores option:selected").val()

		
	}
	
	$.ajax({

		url: url_base + "/vendedor",
		type: "post",
		data: JSON.stringify(objetoInfor),
		contentType: "application/json; charset=utf-8",
		error: function(e) {
			
			Toastify({
				text:  e.responseJSON.error,
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
				text:  "Cadastrado com Sucesso!",
				duration: 2000,
				position: "center",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
		
		setTimeout(function() {
				window.location.href = 'perguntaInfluencer';
			}, 3000);
		
		
		})
	
})