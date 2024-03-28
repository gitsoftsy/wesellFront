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
	rel="stylesheet">
<script
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- CSS -->

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
	href="<%=contextPath%>/resources/assets/css/areaLojista.css" />

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
	<header>
		<section id="modalMenu" class="abracaMenu modalMenu">
			<img class="logoSumare"
				src="<%=contextPath%>/resources/assets/img/logo.svg"
				alt="Logo Sumare" />
			<button id="teste" type="button" class="btn botaoDesativaMenu "><i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i></button>
			<hr />
			<nav class="nav-sidebar">
			<a href="usuarioLojista" class="mb-1">
				<i class="fa-solid fa-user me-2" style="width: 28px;"></i> <span id="usuarioNome">Usuário</span>
			</a>
			</nav>
			<hr />
			<nav class="nav-sidebar">

				<a href="lojaLojista" class="mb-1"> <i class="fa-solid fa-shop"></i> 
				<span>Minha Loja</span>
				</a> <a href="listarFuncionarioLojista" class="mb-1"> <i class="fa-solid fa-user-group"></i> 
				<span>Funcionários</span>
				</a> <a href="listarProdutoLojista" class="mb-1"> <i class="fa-solid fa-barcode"></i> 
				<span>Produtos</span>
				</a> <a href="loginFuncionario" onclick="removeObjeto()" id="sair"> <i class="fa-solid fa-right-from-bracket"></i> 
				<span>Sair</span>
				</a>
				
			</nav>
		</section>
	</header>
	
	<button type="button" class="btn botaoAtivaMenu "><i class="fa-solid fa-arrow-left mover-left"></i></button>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-shop"></i>  <span id="tituloPagina">Minha Loja</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-funcionario" class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Minha Loja</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nomeFantasia" class="form-label">Nome Fantasia:<span class="red">*</span></label> <input required
							autocomplete="off" type="text" id="nomeFantasia" name="nomeFantasia"
							class="form-control inputForm" maxlength="255"  />
					</div>
					<div class="col-md-6">
						<label for="razaoSocial" class="form-label">Razão Social:<span class="red">*</span></label> <input type="text" id="razaoSocial"
							autocomplete="off" name="razaoSocial" required
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cnpj" class="form-label">CNPJ:<span class="red">*</span></label> <input required
							autocomplete="off" type="text" id="cnpj" name="cnpj"
							class="form-control inputForm" maxlength="14" data-mask="00.000.000/0000-00" />
					</div>
					<div class="col-md-6">
						<label for="inscricaoEstadual" class="form-label">Inscrição
							Estadual:</label> <input type="text" id="inscricaoEstadual"
							autocomplete="off" name="inscricaoEstadual"
							class="form-control inputForm" maxlength="9" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cep" class="form-label">CEP:<span class="red">*</span></label> <input
							type="text" id="cep" required autocomplete="off" name="cep"
							class="form-control inputForm" maxlength="8" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span class="red">*</span></label> <input
							type="text" id="endereco" required autocomplete="off"
							name="endereco" class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="numero" class="form-label">N°:<span class="red">*</span></label> <input
							required autocomplete="off" type="text" id="numero" name="numero"
							class="form-control inputForm" maxlength="10" />
					</div>
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span class="red">*</span></label> <input
							type="text" id="bairro" required autocomplete="off" name="bairro"
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento:</label> <input
							type="text" id="complemento" autocomplete="off"
							name="complemento" class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="estado" class="form-label">Estado:<span class="red">*</span></label> <input
							type="text" id="estado" required autocomplete="off" name="estado"
							class="form-control inputForm" maxlength="2" />
					</div>
				</div>

				<div class="row mb-2">
				<div class="col-md-6">
						<label for="cidade" class="form-label">Cidade:<span class="red">*</span></label> <input
							type="text" id="cidade" required autocomplete="off" name="text"
							class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="site" class="form-label">Site:<span class="red">*</span></label> <input
							type="text" id="site" required autocomplete="off" name="site"
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">Editar</button>
					</div>
				</div>

			</form>
		</section>
	</main>

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
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

	<script
		src="<%=contextPath%>/resources//assets/js/lojaLojista.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comumLojista.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
