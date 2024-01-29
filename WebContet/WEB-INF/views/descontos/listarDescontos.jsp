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
/>
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
					<i class="fa-solid fa-percent fa-xl"></i></i> <span>Lista de
						Descontos</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-2"
				style="display: flex; justify-content: space-between">
				<div class="input-group" style="width: 30%">
					<input id="inputBusca" type="text" class="form-control inputForm"
						placeholder="Buscar desconto" /> <span class="input-group-text"><i
						class="fas fa-search"></i></span>
				</div>
				<a href="cadastrarDesconto" class="btn btn-primary btn-lg px-3 py-1">Novo
					Desconto</a>
			</div>

			<table
				class="table tabela-descontos table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Descontos cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" width="8%">Ativo</th>
						<th scope="col">Desconto</th>
						<th scope="col" width="10%">Valor</th>
						<th scope="col" width="12%">Tipo desconto</th>
						<th id='th-duracao' scope="col" width="14%">Duração</th>
						<th id='th-acao' scope="col" width="18%">Ações</th>
					</tr>
				</thead>
				<tbody id="colaTabela" class="table-group-divider"></tbody>
			</table>
			<div id="pagination" class="mx-auto">
				<button id="prev" class="btn btn-sm">
					<i class="fa-solid fa-angle-left fa-xl"></i>
				</button>
				<button id="next" class="btn btn-sm">
					<i class="fa-solid fa-angle-right fa-xl"></i>
				</button>
			</div>
		</section>
		<div class="modal fade" id="exampleModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-xl">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class='mb-0'>Vincular parceiro ao desconto</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div class="modal-body px-5">
						<form id="form-vincular" class="form mt-3 mb-4">
							<div class="row mt-2">
								<input type="text" id="usuarioCadastro" hidden
									value="${funcionario.idUsuario}" />
								<div class="col-md-5">

									<label for="parceiro" class="form-label mb-2">Desconto:</label>
									<h5 id='nome-desconto' class='inputForm'></h5>
								</div>
								<div class="col-md-4">
									<label for="parceiros" class="form-label mb-2">Parceiro:</label>
									<select required id="parceiros" class="form-select inputForm"
										name="parceiros" aria-label="Default select example">
										<option value='' selected disabled>Selecione</option>
									</select>
								</div>
								<div
									class="col-md-3 d-flex justify-content-center align-items-center">
									<button id="btn-submit" class="btn btn-add btn-primary px-5"
										onclick='vincular(this)'>Vincular</button>
								</div>
							</div>
						</form>
						<h6>Parceiros vinculados:</h6>
						<table class="table tabela-modal my-3">
							<thead>
								<tr>
									<th scope="col">Ativo</th>
									<th scope="col">Parceiro</th>
									<th scope="col">Ativar/Desativar</th>
								</tr>
							</thead>
							<tbody id='parceiros-vinculados'>

							</tbody>
						</table>
						<div id="pagination" class="d-flex justify-content-center">
							<button id="prevModal" class="btn btn-sm">
								<i class="fa-solid fa-angle-left fa-xl"></i>
							</button>
							<button id="nextModal" class="btn btn-sm">
								<i class="fa-solid fa-angle-right fa-xl"></i>
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
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
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script src="<%=contextPath%>/resources//assets/js/listarDescontos.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
