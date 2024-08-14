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
	href="<%=contextPath%>/resources/assets/css/cadastroEmpresa.css" />

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

	<div class="card-body title">
		<img class="img-titulo"
			src="<%=contextPath%>/resources/assets/img/logo.svg">
	</div>


	<div class="fundoBranco">
		<h3 class=" text-center tituloPrincipal">Vamos começar a
			cadastrar sua Loja</h3>
		<div class="container-i-form">
			<button id="primeiraSecao"
				class=" shadow p-2 mb-2 btn btn-light d-flex align-items-center gap-2">
				<i class="fa-solid fa-shop"></i>Dados da Empresa
			</button>
			<button id="segundaSecao"
				class=" shadow p-2 mb-2 btn btn-light d-flex align-items-center gap-2">
				<i class="fa-solid fa-user-group"></i>Dados do Funcionario
			</button>
		</div>
	</div>

	<main class="container-res">

		<section class="pt-4">

			<form id="container-empresa"
				class="card form p-5 col-10 mb-5 mt-5 mx-auto animate__animated ">

				<h4 class="text-start mb-5 mt-4">Informe os Dados da Empresa</h4>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nomeFantasia" class="form-label">Nome
							Fantasia:<span class="red">*</span>
						</label> <input required autocomplete="off" type="text" id="nomeFantasia"
							name="nomeFantasia" class="form-control inputForm"
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="razaoSocial" class="form-label">Razão Social:<span
							class="red">*</span></label> <input type="text" id="razaoSocial"
							autocomplete="off" name="razaoSocial" required
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cnpj" class="form-label">CNPJ:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="cnpj" name="cnpj" class="form-control inputForm"
							maxlength="14" data-mask="00.000.000/0000-00" />
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
						<label for="cep" class="form-label">CEP:<span class="red">*</span></label>
						<input type="text" id="cep" required autocomplete="off" name="cep"
							class="form-control inputForm" maxlength="8"
							data-mask="00000-000" />
					</div>
					<div class="col-md-6">
						<label for="endereco" class="form-label">Endereço:<span
							class="red">*</span></label> <input type="text" id="endereco" required
							autocomplete="off" name="endereco" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="numero" class="form-label">N°:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="numero" name="numero"
							class="form-control inputForm" maxlength="10" />
					</div>
					<div class="col-md-6">
						<label for="bairro" class="form-label">Bairro:<span
							class="red">*</span></label> <input type="text" id="bairro" required
							autocomplete="off" name="bairro" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="complemento" class="form-label">Complemento:</label> <input
							type="text" id="complemento" autocomplete="off"
							name="complemento" class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="estado" class="form-label">Estado:<span
							class="red">*</span></label> <input type="text" id="estado" required
							autocomplete="off" name="estado" class="form-control inputForm"
							maxlength="2" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cidade" class="form-label">Cidade:<span
							class="red">*</span></label> <input type="text" id="cidade" required
							autocomplete="off" name="text" class="form-control inputForm"
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="site" class="form-label">Site:<span
							class="red">*</span></label> <input type="text" id="site" required
							autocomplete="off" name="site" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button id="cadastrar"
							class=" btn confirm btn-primary btn-register">Cadastrar</button>
						<span id="prosseguir"
							class=" btn confirm btn-success btn-register d-none">Prosseguir</span>
					</div>
				</div>

			</form>

			<form id="container-funcionario"
				class="card form p-5 col-10 mb-5 mt-5 mx-auto animate__animated none">



				<h4 class="text-start mb-5 mt-4">Informe os dados do
					Responsável pela Empresa</h4>

				<div class="row mb-2">
					<div class="col-md-12">
						<label for="nome" class="form-label">Nome:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="text" id="nome" name="nome" class="form-control inputForm"
							maxlength="255" />
					</div>

				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span></label> <input type="email" id="email" required
							autocomplete="off" name="email" class="form-control inputForm"
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="cpf" class="form-label">CPF:<span class="red">*</span></label>
						<input type="text" id="cpf" required autocomplete="off" name="cpf"
							class="form-control inputForm" data-mask="000.000.000-00"
							maxlength="11" />
					</div>

				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="telefone" class="form-label">Telefone:<span
							class="red">*</span></label> <input type="text" id="telefone" required
							autocomplete="off" name="telefone" class="form-control inputForm"
							data-mask="(00)00000-0000" maxlength="11" />
					</div>
					<div class="col-md-6">
						<label for="cargo" class="form-label">Cargo:<span
							class="red">*</span></label> <select id="cargo" required
							autocomplete="off" class="form-select inputForm">

						</select>
					</div>
				</div>

				<div class="row mb-2">
					<div id="escondeSenha" class="col-md-6">
						<label id="labelSenha" for="senha"
							class="form-label animate__animated">Senha:<span
							class="red">*</span></label> <input type="password" id="senha" required
							autocomplete="off" name="senha" class="form-control inputForm"
							maxlength="255" />
					</div>
					<div id="escondeSenha" class="col-md-6">
						<label id="confirmarSenhaLabel" for="confirmarSenha"
							class="form-label">Confirmar Senha:<span class="red">*</span></label>
						<input type="password" id="confirmarSenha" required
							autocomplete="off" name="confirmarSenha"
							class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2 none" id="alteraSen">
					<div class="col-md">
						<div class="form-control border-0 p-0">
							<button onclick="ativaSenhas()" type="button"
								class="btn btn-primary">Alterar Senha</button>
						</div>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit" disabled
							class="btn confirm btn-primary btn-register">Cadastrar</button>
					</div>
				</div>

			</form>
		</section>
	</main>
	<footer>Copyright @ 2000-2024 - Todos os direitos reservados -
		Desenvolvido pela Softsy</footer>
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
	<script  charset="UTF-8" src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script  charset="UTF-8"
		src="<%=contextPath%>/resources//assets/js/lojista/cadastroEmpresa.js"></script>
</body>
</html>
