$("#cpfBotao").click(function(){

$("#container-cnpj").addClass("d-none")
$("#container-cpf").removeClass("d-none")

$("#container-cnpj").prop("disabled", true)
$("#container-cpf").removeAttr("disabled")

$("#cpfBotao").addClass("btn-primary").removeClass("btn-secondary")
$("#cnpjBotao").addClass("btn-secondary").removeClass("btn-primary")
})

$("#cnpjBotao").click(function(){

$("#container-cnpj").removeClass("d-none")
$("#container-cpf").addClass("d-none")

$("#container-cpf").prop("disabled", true)
$("#container-cnpj").removeAttr("disabled")

$("#cnpjBotao").addClass("btn-primary").removeClass("btn-secondary")
$("#cpfBotao").addClass("btn-secondary").removeClass("btn-primary")

})

var dataNascimento = document.getElementById('dataNascimento');

dataNascimento.addEventListener("blur", function(){

    console.log("!asdfad")
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
  
  $("#enviarFormInfluencer").click(function(){
	  
	  $("#formInfluencer").addClass("d-none")
	  $("#formInfor").removeClass("d-none")
	  
  })