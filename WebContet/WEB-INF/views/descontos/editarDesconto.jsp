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
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

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
				</a><a href="listarDescontos" class="mb-1"> <i
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
					<i class="fa-solid fa-pen-to-square fa-lg"></i> <span>Editar Desconto</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-user-parceiro" class="card form p-5 col-8 mx-auto">
				<h1 class="text-center mb-5">Editar dados</h1>
				<input type="text" id="usuarioCadastro" hidden value="${funcionario.idUsuario}" />
				<div class="row mb-2">
					<div class="col-md-12">
						<label for="descricao" class="form-label">Descrição:</label> <input
							required autocomplete="off" type="text" id="descricao"
							name="descricao" class="form-control inputForm" />
					</div>

				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label class="form-label" for="currency-field">Valor</label> <input
							required autocomplete="off" type="text" id="valor" name="valor"
							class="form-control inputForm" />
					</div>
					<div class="col-md-6">
						<label for="Tipo" class="form-label">Tipo:</label>
						<div class="form-control border-0 p-0">
							<input id='tipo' type="checkbox" name="tipo" checked
								data-toggle="toggle" data-onstyle="secondary"
								data-offstyle="dark" data-on="Valor" data-off="Percentual"
								data-width="100%" data-height="40" data-size="sm">
						</div>
					</div>

				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="duracao" class="form-label">Duração:</label> <select
							id='duracao' class="form-control inputForm" required>
							<option value=''>Selecione a Duração</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
							<option value='7'>7</option>
							<option value='8'>8</option>
							<option value='9'>9</option>
							<option value='10'>10</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="duracao" class="form-label">Tipo da Duraçao</label> <select
							id='mesSemestre' class="form-control inputForm" required>
							<option value=''>Selecione a Duração</option>
							<option value='M'>Mês</option>
							<option value='S'>Semestre</option>

						</select>
					</div>

				</div>

				<div class="row mb-2">

					<div class="col-md-6">
						<label for="tipoIngresso" class="form-label">Tipo
							Ingresso:</label> <select id='tipoIngresso'
							class="form-control inputForm">
							<option value=''>Selecione uma opção</option>
							<option value='VESTIBULAR'>Vestibular</option>
							<option value='POSGRADUACAO'>Pos-Graduação</option>
							<option value='REATIVACAO'>Reativação</option>
							<option value='TRANSFERENCIA'>Transferencia</option>
							<option value='SEGUNDAGRADUCAO'>Segunda Graduação</option>
							<option value='SEGUNDALICENCIATURA'>Segunda Licenciatura</option>

						</select>
					</div>
					<div class="col-md-6">
						<label for="modalidade" class="form-label">Modalidade:</label> <select
							id='modalidade' class="form-control inputForm">
							<option value=''>Selecione uma modalidade</option>
							<option value='EAD'>EAD</option>
							<option value='Presencial'>Presencial</option>
							<option value='HB'>Hibrído</option>
							<option value='HBL'>Hibrido ao Vivo</option>
						</select>
					</div>

					<div class="col-md-12">
						<label for="Curso" class="form-label">Cursos:</label> <select
							id='cursos' class="form-control inputForm">
							<option value='todos'>Todos os cursos</option>
						</select>
					</div>

				</div>
				<div class="row mb-2">
					<div class="col-md-4">
						<label for="dataIni" class="form-label">Data Inicio:</label> <input
							max='2999-01-01' autocomplete="off" type="date" id="dataIni"
							name="dataIni" class="form-control inputForm" />
					</div>
					<div class="col-md-4">
						<label for="dataFim" class="form-label">Data Fim:</label> <input
							max='2999-01-01' autocomplete="off" type="date" id="dataFim"
							name="dataFim" class="form-control inputForm" />
					</div>
					<div class="col-md-4">
						<label for="quantidade" class="form-label">Quantidade:</label> <input
							min='1' autocomplete="off" type="number" id="quantidade"
							name="quantidade" class="form-control inputForm" />
					</div>
					<div class="col-md-4">
						<label for="expiracao" class="form-label">Expiração:</label> <input
							min='1' autocomplete="off" type="number" id="expiracao"
							name="expiracao" class="form-control inputForm" />
					</div>

				</div>


				</div>


				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn btn-primary btn-register">
							Salvar</button>
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
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	
	<script
		src="<%=contextPath%>/resources/assets/js/editarDesconto.js"></script>



</body>
</html>