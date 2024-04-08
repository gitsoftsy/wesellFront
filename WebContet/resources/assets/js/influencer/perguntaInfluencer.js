


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
	
	var id = localStorage.getItem("idVendedor")
	var vendedor = JSON.parse(id);
	


$("#enviarFormInfor").click(function(e){
	  e.preventDefault();
	  
	var valor =  $("#seguidores option:selected").val()
	var numero
	
	var objetoInfor = {
		
		
    "vendedorId": vendedor.idVendedor,
    "redesSociaisId": $("#rede option:selected").attr("id"),
    "perfil": $("#usuario").val(),
    "urlPerfil": $("#usuario").val(),
    "qtdSeguidores": numero = Number(valor),

		
	}
	
	$.ajax({

		url: url_base + "/vendedorRedesSociais",
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
				duration: 5000,
				position: "center",
				backgroundColor: "green",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
		
		setTimeout(function() {
				window.location.href = 'meusProdutos';
			}, 4000);
		
		
		})
	
})