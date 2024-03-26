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

<title>Centro Universitário Sumaré</title>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script
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
<script
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
<script src="https://kit.fontawesome.com/2476720ce5.js"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="<%=contextPath%>/resources/assets/css/cadastroEmpresa.css" />

<!-- Animation-css -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
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
	
	    <main class="d-flex ">

<section class="w-50 d-flex flex-column mt-5">

    <h2 class="">TESTE</h2>
    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam molestias ducimus autem, voluptatibus natus repellat! Pariatur repellendus quo recusandae unde nulla laboriosam incidunt fugiat praesentium, cum, animi nam atque perspiciatis.</h1>
    <h2>Vamos te ajudar desde os primeiros passos. <br>
    Cadastre-se gratís.</h2>

    <img src="#" alt="logo">
</section>

<section class="w-50 mt-5">

    <form id="formInfluencer" class="d-flex flex-column align-items-center">

        <div class="col-md-8 mb-4">
            <label for="nome" class="form-label">Nome:<span class="red">*</span></label> <input required
            autocomplete="off" type="text" id="nome" name="nome"
            class="form-control inputForm" maxlength="255" />
        </div>

        <div class="col-md-8 mb-4">
            <label for="data" class="form-label">Data de Nascimento:<span class="red">*</span></label> <input required
            autocomplete="off" type="date" id="dataNascimento" name="data"
            class="form-control inputForm" />
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
            <input required autocomplete="off" type="text" id="cpf" name="cpf"
            class="form-control inputForm" maxlength="255" placeholder="000.000.000-00" 
            data-mask="000.000.000-00"/>
        </div>

        <div id="container-cnpj" class="col-md-8 mb-4 d-none">
            <input required autocomplete="off" type="text" id="cnpj" name="cnpj"
            class="form-control inputForm" maxlength="255" placeholder="00.000.000/0000-00" 
            data-mask="00.000.000/0000-00"/>
        </div>

        <div class="col-md-8 mb-4">
           <button id="enviarFormInfluencer" class="btn btn-success btn-lg btn-block w-100">Cadastre-se</button>
        </div>


    </form>
    
    <form id="formInfor" class="d-flex flex-column align-items-center d-none">

        <div class="col-md-8 mb-4">
            <label for="redeSocial" class="form-label">Qual a sua rede social principa?<span class="red">*</span></label> <select
                id="redeSocial" required autocomplete="off"
                class="form-select selectForm">
                <option value="">Selecione...</option>
                <option value="">Instagram</option>
                <option value="">Facebook</option>
                <option value="">YouTube</option>
                <option value="">TikTok</option>
                <option value="">Twitter</option>
            </select>
        </div>

        <div class="col-md-8 mb-4 ">
            <label for="redeSocial" class="form-label">Qual seu nome de usuário nesta rede?<span class="red">*</span></label> 
            <input required autocomplete="off" type="text" id="usuario" name="usuario"
            class="form-control inputForm" maxlength="255" placeholder="usuário123">
        </div>

        <div class="col-md-8 mb-4">
            <label for="seguidores" class="form-label">Quantos seguidores você possui nesta rede?<span class="red">*</span></label> <select
                id="redeSocial" required autocomplete="off"
                class="form-select selectForm">
                <option value="">Selecione...</option>
                <option value="">1.000 seguidores</option>
                <option value="">10.000 seguidores</option>
                <option value="">+ de 10.000 seguidores</option>
                <option value="">1.000.000 seguidores</option>
            </select>
        </div>

        <div class="col-md-8 mb-4">
            <button id="enviarFormInfor" class="btn btn-success btn-lg btn-block w-100">Enviar</button>
         </div>

    </form>
</section>

</main>
	
	
	
	
	
	
		<footer>Copyright @ 2000-2024 - Todos os direitos reservados - Desenvolvido pela Softsy</footer>
	<script src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="<%=contextPath%>/resources//assets/js/cadastroInfluencer.js"></script>
</body>
</html>
