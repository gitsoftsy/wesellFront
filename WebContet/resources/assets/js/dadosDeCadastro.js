  $(document).ready(function () {
   $(".sub-btn").click(function () {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
      });
    });
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

