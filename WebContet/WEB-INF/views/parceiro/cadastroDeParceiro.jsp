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
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
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
		<section class="abracaMenu">
			<img class="logoSumare"
				src="<%=contextPath%>/resources/assets/img/logo-sumare.png"
				alt="Logo Sumare" />
			<hr />
			<p>
				<i class="fa-solid fa-user me-2" style="width: 28px;"></i> <span>${funcionario.nome}</span>
			</p>
			<hr />
			<nav class="nav-sidebar">
				<a href="dashboard" class="mb-1"> <i class="fa-solid fa-house"></i>
					<span>Dashboard</span>
				</a> <a href="listarDescontos" class="mb-1"> <i
					class="fa-solid fa-percent fa-lg"></i> <span>Desconto</span>
				</a> <a href="listarFuncionarios" class="mb-1"> <i
					class="fa-solid fa-user-group"></i> <span>Funcionários</span>
				</a> <a href="listarParceiros" class="mb-1"> <i
					class="fa-solid fa-handshake"></i> <span>Parceiros</span>
				</a> <a href="listarUsuarioParceiro" class="mb-1"> <i
					class="fa-solid fa-user-group"></i> <span>Usuários Parceiros</span>
				</a> <a href="logoff" id="sair"> <i
					class="fa-solid fa-right-from-bracket"></i> <span>Sair</span>
				</a>
			</nav>
		</section>
	</header>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-user-plus fa-lg"></i> <span>Cadastro
						de Parceiros</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-parceiro" class="card form py-5 col-7 mx-auto"
				style="padding-left: 7em; padding-right: 7em;">
				<h1 class="text-center mb-5">Cadastrar Parceiro</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />
				<div class="row mb-2">
					<div class="col-md-3">
						<label for="ativo" class="form-label">Ativo:</label>
						<div class="form-control mt-1 border-0 p-0">
							<input type="checkbox" name="ativo" checked data-toggle="toggle"
								data-onstyle="secondary" data-offstyle="dark" data-on="Sim"
								data-off="Não" data-width="100%" data-height="38" data-size="sm">
						</div>
					</div>
					<div class="col-md-9">
						<label for="cnpj" class="form-label">CNPJ:</label> <input required
							autocomplete="off" type="text" id="cnpj"
							data-mask='00.000.000/0000-00' name="cnpj"
							class="form-control inputForm" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12">
						<label for="razaoSocial" class="form-label">Razão Social:</label>
						<input type="text" id="razaoSocial" required autocomplete="off"
							name="razaoSocial" class="form-control inputForm" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12">
						<label for="descricao" class="form-label">Descrição:</label>
						<div class="form-floating">
							<textarea class="form-control inputForm" name="descricao"
								required autocomplete="off" placeholder="Leave a comment here"
								id="descricao" style="height: 100px"></textarea>
						</div>
					</div>
				</div>



				<div class="row mt-2 mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn btn-primary btn-register">Cadastrar</button>
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
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script src="<%=contextPath%>/resources//assets/js/cadastroParceiro.js"></script>






</body>
</html>