$("document").ready(function(){
	$("#cpfBotao").addClass("btn-primary").removeClass("btn-secondary")

})




$("#cpfBotao").click(function(){

$("#container-cnpj").addClass("d-none")
$("#container-cpf").removeClass("d-none")

$("#container-cnpj").prop("required", false)
$("#container-cpf").prop("required", true)

$("#cpfBotao").addClass("btn-primary").removeClass("btn-secondary")
$("#cnpjBotao").addClass("btn-secondary").removeClass("btn-primary")
})

$("#cnpjBotao").click(function(){
	

$("#container-cnpj").removeClass("d-none")
$("#container-cpf").addClass("d-none")

$("#container-cpf").prop("required", false)
$("#container-cnpj").prop("required", true)

$("#cnpjBotao").addClass("btn-primary").removeClass("btn-secondary")
$("#cpfBotao").addClass("btn-secondary").removeClass("btn-primary")

})

var dataNascimento = document.getElementById('dataNascimento');

dataNascimento.addEventListener("blur", function(){

    // Obter a data de nascimento do input
    const dataNascimento = document.getElementById('dataNascimento').value;

    // Calcular a diferença de idade em anos
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1; // Lembrando que janeiro é 0
    const diaAtual = hoje.getDate();
    const [anoNascimento, mesNascimento, diaNascimento] = dataNascimento.split('-');
    let idade = anoAtual - anoNascimento;

    // Ajustar a idade se o aniversário ainda não ocorreu este ano
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }

    // Verificar se a pessoa é menor de idade (menor que 18 anos)
    if (idade < 18) {
      Toastify({
			text: "Você é de menor, sinto muito mas não poderar efetuar cadastro!",
			duration: 5000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		
		$("#enviarFormInfluencer").prop("disabled", true)
		
    } else{$("#enviarFormInfluencer").removeAttr("disabled")}
  })
  
  $("#cpf").blur(function() {
	var cpf = $("#cpf").val();

	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999"){
		Toastify({
			text: "CPF invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		$("#enviarFormInfluencer").attr("disabled", true);
		return false;
	}
	else{
		$("#enviarFormInfluencer").attr("disabled", false);
	}
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9))){
		Toastify({
			text: "CPF Invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
			$("#enviarFormInfluencer").attr("disabled", true);
			return false;	
		}
		else{
			$("#enviarFormInfluencer").attr("disabled", false);
		}
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10))){
		Toastify({
			text: "CPF Invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		$("#enviarFormInfluencer").attr("disabled", true);
		return false;		
	}
	else{
			$("#enviarFormInfluencer").attr("disabled", false);
	}
 
	
});

 $("#cnpj").blur(function() {
	 	var cnpj = $("#cnpj").val();
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999"){
     Toastify({
			text: "CNPJ invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
		$("#enviarFormInfluencer").attr("disabled", true);
		return false;
         } else{
			$("#enviarFormInfluencer").attr("disabled", false);
		}
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)){
      Toastify({
			text: "CNPJ Invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
			$("#enviarFormInfluencer").attr("disabled", true);
			return false;	
			} else{
			$("#enviarFormInfluencer").attr("disabled", false);
		}
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
         Toastify({
			text: "CNPJ Invalido!",
			duration: 2000,
			position: "center",
			backgroundColor: "red",
			close: true,
			className: "Toastify__toast--custom"
		}).showToast();
			$("#enviarFormInfluencer").attr("disabled", true);
			return false;	
           }else{
			$("#enviarFormInfluencer").attr("disabled", false);
		}
    return true;
    
    });
    var data
    
    $("#dataNascimento").change(function() {
     data = $(this).val()
    })
    
 $("#enviarFormInfluencer").click(function(e){
	  e.preventDefault();
	  
	  var objeto = ''
  
  		if($("#cnpjBotao").hasClass("btn-primary")){
			 objeto = {
	  
    "nome": $("#nome").val() + " " + $("#sobrenome").val(),
    "dtNasc": data ,
    "cpf": null,
    "cnpj": $("#cnpj").val().replace(/[^a-zA-Z0-9 ]/g, ""),
    "email": $("#email").val(),
    "celular": $("#numero").val().replace(/[^a-zA-Z0-9 ]/g, ""),
    "senha": $("#senha").val()

  }
			  
		  }
		  else{
			 objeto = {
	  
    "nome": $("#nome").val() + " " + $("#sobrenome").val(),
    "dtNasc": data ,
    "cpf": $("#cpf").val().replace(/[^a-zA-Z0-9 ]/g, ""),
    "cnpj": null,
    "email": $("#email").val(),
    "celular": $("#numero").val().replace(/[^a-zA-Z0-9 ]/g, ""),
    "senha": $("#senha").val()

  }
		  }
 
  
  $.ajax({

		url: url_base + "/vendedor",
		type: "post",
		data: JSON.stringify(objeto),
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
		
		localStorage.setItem("idVendedor", JSON.stringify(data))
		
		Toastify({
				text:  "Cadastrado com Sucesso!",
				duration: 2000,
				position: "center",
				backgroundColor: "green",
				close: true,
				className: "Toastify__toast--custom"
			}).showToast();
		
		setTimeout(function() {
				window.location.href = 'perguntaInfluencer';
			}, 3000);
		
		
		})
		})