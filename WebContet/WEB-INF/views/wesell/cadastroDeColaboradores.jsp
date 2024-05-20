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

<!-- Sweetalert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="sweetalert2.all.min.js"></script>

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
	href="<%=contextPath%>/resources/assets/css/style.css" />
	
<!-- Animation-css -->
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>

<body>

	<header id="menu" ></header>

	<div class="bg-loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
		</div>
	</div>
	
		<button id="teste" type="button" class="btn botaoDesativaMenu "><i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i></button>
	
	<button type="button" class="btn botaoAtivaMenu "><i class="fa-solid fa-arrow-left mover-left"></i></button>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-regular fa-handshake"></i>  <span id="tituloPagina">Cadastro
						de Colaboradores</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-funcionario" 
				class="card form p-5 col-8 mx-auto animate__animated animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Colaborador</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nome" class="form-label">Nome:<span class="red">*</span></label> <input required
							autocomplete="off" type="text" id="nome" name="nome"
							class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="cpf" class="form-label">CPF:<span class="red">*</span></label> <input required
							autocomplete="off" type="text" id="cpf" name="cpf"
							class="form-control inputForm" maxlength="11" required data-mask="000.000.000-00" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="usuario" class="form-label">Usuário:<span class="red">*</span></label> <input
							type="text" id="usuario" required autocomplete="off" name="usuario"
							class="form-control inputForm" maxlength="40" />
					</div>
					<div class="col-md-6">
						<label for="email" class="form-label">E-mail:<span class="red">*</span></label> <input
							type="email" id="email" required="required" autocomplete="off" name="email"
							class="form-control inputForm" 
							maxlength="255" />
					</div>

				</div>

				<div class="row mb-2">
					<div id="escondeSenha" class="col-md-6">
						<label id="labelSenha" for="senha" class="form-label animate__animated">Senha:<span class="red">*</span></label> <input
							type="password" id="senha" required autocomplete="off" name="senha"
							class="form-control inputForm" maxlength="255" />
					</div>
					<div id="escondeSenha" class="col-md-6">
						<label id="confirmarSenhaLabel"  for="confirmarSenha" class="form-label">Confirmar Senha:<span class="red">*</span></label> <input
							type="password" id="confirmarSenha" required autocomplete="off" name="confirmarSenha"
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>
				
				<div class="row mb-2"  >
					<div class="col-md  none" id="alteraSen">
						<div class="form-control border-0 p-0">
							<button onclick="ativaSenhas()" type="button" class="btn btn-primary">Alterar Senha</button>
						</div>
					</div>
				</div>
				
				<div class="row mb-2"  >
					<div class="col-md-2">
						<label for="adm" class="form-label">Administrador:<span class="red">*</span></label>
						<div class="form-control border-0 p-0">
							<input id="administrador" type="checkbox" name="adm" checked="checked" data-toggle="toggle"
								data-onstyle="secondary" data-offstyle="dark" data-on="Sim"
								data-off="Não" data-width="100%" data-height="40" data-size="sm" />
						</div>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">Cadastrar</button>
					</div>
				</div>
				<!-- Button trigger modal -->
				<button type="button" style="display: none;" class="btn btn-primary"
					id="openModalBtn" data-bs-toggle="modal"
					data-bs-target="#exampleModal">Launch demo modal</button>

				<!-- Button modal de cadastro  -->
				<button type="button" style="display: none;" class="btn btn-primary"
					id="openModalBtn" data-bs-toggle="modal"
					data-bs-target="#exampleModal">Launch demo modal</button>

				<!-- Modal de cadastro -->
				<div class="modal fade" id="exampleModal" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<i id="icone-modal" class="fa-solid fa-check circulo-border"></i>
								<h1 class="modal-title fs-5 titulo-modal" id="exampleModalLabel">Seu
									Cadastro Foi Realizado!</h1>
							</div>
						</div>
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
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="<%=contextPath%>/resources//assets/js/colaborador/cadastroDeColaboradores.js"></script>
</body>
</html>
