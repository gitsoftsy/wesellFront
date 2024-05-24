 
    

var user = localStorage.getItem("usuarioVendedor")
var vendedor = JSON.parse(user);

$("#usuarioNome").text(vendedor.nome)


 $(document).ready(function () {
   $(".sub-btn").click(function () {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
      });
      
      $.ajax({

		url: url_base + '/vendedor/' + vendedor.id,
		type: "GET",
		async: false,
		}).done(function(data) {
			
			console.log(data)
			
			$("#nome").val(data.nome)
			$("#dataNascimento").val(data.dtNasc)
			$("#numero").val(data.celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3"))
			$("#email").val(data.email)
			$("#senha").val(data.senha)
			$("#cpf").val(data.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"))
			$("#cnpj").val(data.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"))
			
			})
      
    });

	