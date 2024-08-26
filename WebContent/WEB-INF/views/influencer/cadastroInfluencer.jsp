<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>

<%
String contextPath = request.getContextPath();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />

<title>Wesell</title>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script  charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />
<link
	href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
	rel="stylesheet" />
<script  charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css"
	href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script  charset="UTF-8" src="https://kit.fontawesome.com/3ce21ff22c.js"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/cadastroInfluencer.css" />

<!-- Animation-css -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

<!-- Sweetalert -->
<script  charset="UTF-8" src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script  charset="UTF-8" src="sweetalert2.all.min.js"></script>	

</head>

<body>
	<div class="bg-loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
		</div>
	</div>
	
<main class="d-flex align-items-center  h-100">

<section class="w-50 flex-column mt-5 pb-5 primeiraSection">
	<div style='margin-left: 5%;' class='container'>
		<div class='row'>
			<div class='col-md-12'>
				<img class='logoInf' width="100" src="resources/assets/img/wesell_vertical_azul.png" alt="logo">
	    		<h1 class='h1Inf'>Nunca foi tão fácil transformar o que você sabe em um negócio digital.</h1>
				<p>Vamos te ajudar desde os primeiros passos.<br> Cadastre-se grátis.</p>
			</div>
		</div>
	</div>
	 
    
</section>

<section class="pt-5 bg-light bg-gradient segundaSection h-100">

    <form id="formInfluencer" class="d-flex flex-column align-items-center">
    
    <div class="col-md-8 mb-4 text-center logoMobile">
     		<img class='logoInf' width="50%" src="resources/assets/img/logo.svg" alt="logo">
     	</div>
    
     <div class="col-md-8 mb-4">
     <h2 class="text-center">Cadastro</h2>
     </div>

        <div class="col-md-8 mb-4 d-flex gap-2 container-nomes ">

			<div class="d-flex flex-column mb-4">
        		<label for="nome" class="form-label">Nome:<span class="red">*</span></label> 
        		<input required
           		 autocomplete="off" type="text" id="nome" name="nome"
           		 class="form-control inputForm" maxlength="255" />
        	</div>
        	
        	<div class="d-flex flex-column">
        		 <label for="nome" class="form-label">Sobrenome:<span class="red">*</span></label>
        		 <input required
           		 autocomplete="off" type="text" id="sobrenome" name="nome"
          		  class="form-control inputForm" maxlength="255" />
            </div>
            
        </div>
        
      

        <div class="col-md-8 mb-4 d-flex gap-2 container-nomes">
        
         <div class="d-flex flex-column container-data mb-4">
            <label for="data" class="form-label">Data de Nascimento:<span class="red">*</span></label> <input required
            autocomplete="off"  max='3000-01-01' type="date" id="dataNascimento" name="data"
            class="form-control inputForm" />
         </div>   
            
          <div class="d-flex flex-column">
        		 <label for="numero" class="form-label">Número de Contato:<span class="red">*</span></label>
        		 <input required
           		 autocomplete="off" type="text" id="numero" name="numero"
          		  class="form-control inputForm" maxlength="11" placeholder="(00)00000-0000"
          		  data-mask="(00)00000-0000"/>
          </div>
            
        </div>

        <div class="col-md-8 mb-4">
            <label for="email" class="form-label">E-mail:<span class="red">*</span></label> <input required
            autocomplete="off" type="email" id="email" name="email"
            class="form-control inputForm" maxlength="255" />
        </div>

        <div class="col-md-8 mb-4">
            <label for="senha" class="form-label">Senha:<span class="red">*</span></label> <input required
            autocomplete="off" type="password" id="senha" name="senha"
            class="form-control inputForm" maxlength="255" />
        </div>

        <div class="col-md-8 mb-4">
            <input required autocomplete="off" type="checkbox" id="checkbox" name="checkbox"
            class=" checkbox" maxlength="255" />
            <label for="senha" class="form-label">Concordo com Os <a href="#">termos</a> de Uso.</label>
        </div>

        <div class="col-md-8 mb-4">
            <label class="form-label">Quero me cadastrar com:</label> 
            <div class="d-flex gap-1">
            <span id="cpfBotao" class="btn btn-lg w-50 btn-secondary ">CPF</span>
            <span id="cnpjBotao" class="btn btn-lg w-50 btn-secondary ">CNPJ</span>
            </div>
        </div>

        <div id="container-cpf" class="col-md-8 mb-4">
            <input  autocomplete="off" type="text" id="cpf" name="cpf"
            class="form-control inputForm" maxlength="255" placeholder="000.000.000-00" 
            data-mask="000.000.000-00"/>
        </div>

        <div id="container-cnpj" class="col-md-8 mb-4 d-none">
            <input  autocomplete="off" type="text" id="cnpj" name="cnpj"
            class="form-control inputForm" maxlength="255" placeholder="00.000.000/0000-00" 
            data-mask="00.000.000/0000-00" />
        </div>

        <div class="col-md-8 mb-4">
           <button id="enviarFormInfluencer" class="btn btn-success btn-lg btn-block w-100">Cadastre-se</button>
        </div>
        
        
         <div class="col-md-8 mb-4 text-center">
         <p>Caso já tenha cadastro click <a href="loginInfluencer">Aqui!<a></p>
         </div>


    </form>
    
</section>

</main>
	
	
	
	
	
	
		<footer >Copyright @ 2000-2024 - Todos os direitos reservados - Desenvolvido pela Softsy</footer>
	<script  charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script  charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script  charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script  charset="UTF-8" type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script  charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script  charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script  charset="UTF-8" src="<%=contextPath%>/resources/assets/js/comum.js?v=2"></script>
	<script  charset="UTF-8"
		src="<%=contextPath%>/resources//assets/js/influencer/cadastroInfluencer.js"></script>
</body>
</html>
