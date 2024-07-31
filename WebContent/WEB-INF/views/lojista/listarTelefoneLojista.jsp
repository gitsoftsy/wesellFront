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
<meta charset="ISO-8859-1">
<title>Wesell</title>

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous" />
<script charset="UTF-8"
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
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- CSS -->

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />

<!-- FontAwesome -->
<script charset="UTF-8" src="https://kit.fontawesome.com/3ce21ff22c.js"
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
	<header id="menuLojista"></header>
	<button type="button" class="btn botaoAtivaMenu ">
		<i class="fa-solid fa-arrow-left mover-left"></i>
	</button>

	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-user-group fa-lg"></i> <span>Telefones</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-2"
				style="display: flex; flex-flow: column; align-items: center; gap: 20px">
				<button class="btn btn-primary btn-lg px-3 py-1"
					onclick="limpaCampo()" data-bs-toggle="modal"
					data-bs-target="#newCadastro">Novo telefone</button>
				<div class="input-group">
					<input id="inputBusca" type="text" class="form-control inputForm"
						placeholder="Buscar telefone" /> <span
						class="input-group-text icone-pesquisa"><i
						class="fas fa-search"></i></span>
				</div>

			</div>

			<table
				class="table tabela-funcionarios table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Telefones cadastrados</caption>
				<thead>
					<tr>
						<th scope="col">Telefone</th>
						<th scope="col">Tipo Telefone</th>
						<th scope="col" width="15%">Ações</th>
					</tr>
				</thead>
				<tbody id="colaTabela" class="table-group-divider"></tbody>
			</table>
			<nav aria-label="Page navigation example">
				<ul id="pagination-list" class="pagination">
					<li id="prev" class="page-item"><a class="page-link" href="#">Previous</a></li>
					<li class="page-item"><a class="page-link" href="#">1</a></li>
					<li class="page-item"><a class="page-link" href="#">2</a></li>
					<li class="page-item"><a class="page-link" href="#">3</a></li>
					<li id="next" class="page-item"><a class="page-link" href="#">Next</a></li>
				</ul>
			</nav>

		</section>
	</main>

	<div class="modal fade" id="newCadastro" tabindex="-1"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="title-novo-ato">Novo Cadastro</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form id="formCadastro">
						<div class="mb-4">
							<label for="nome" class="form-label">Telefone:</label> <input
								type="text" id="telefoneT" autocomplete="off" name="telefone"
								class="form-control inputForm" data-mask="(00)0000-0000"
								maxlength="11" /> <input type="text" id="telefoneC"
								autocomplete="off" name="telefone"
								class="form-control inputForm" data-mask="(00)00000-0000"
								maxlength="11" />
						</div>
						<div class="mb-4">
							<label for="tipoTelefone" class="form-label">Tipo de
								telefone:<span class="red">*</span>
							</label> <select id="tipoTelefone" required class="form-select inputForm"
								style="padding-top: 10px">
								<option value='C'>Celular</option>
								<option value='T'>Telefone</option>
							</select>
						</div>

						<div class="d-flex justify-content-end gap-2">

							<button type="button" class="btn btn-secondary"
								data-bs-dismiss="modal">Fechar</button>
							<button type="submit" data-bs-dismiss="modal"
								class="btn btn-primary">Salvar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="editTel" tabindex="-1"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="title-edit">Editar</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form id="formEdit">
						<div class="mb-4">
							<label for="nome" class="form-label">Telefone:</label> <input
								type="text" id="telefoneTEdit" autocomplete="off" name="telefone"
								class="form-control inputForm" data-mask="(00)0000-0000"
								maxlength="11" /> <input type="text" id="telefoneCEdit"
								autocomplete="off" name="telefone"
								class="form-control inputForm" data-mask="(00)00000-0000"
								maxlength="11" />
						</div>
						<div class="mb-4">
							<label for="tipoTelefoneEdit" class="form-label">Tipo de
								telefone:<span class="red">*</span>
							</label> <select id="tipoTelefoneEdit" required class="form-select inputForm"
								style="padding-top: 10px">
								<option value='C'>Celular</option>
								<option value='T'>Telefone</option>
							</select>
						</div>
						<div class="d-flex justify-content-end gap-2">
							<button type="button" onclick='excluir()'
								class="btn btn-danger" data-bs-dismiss="modal">Remover</button>
							<button type="button" class="btn btn-secondary"
								data-bs-dismiss="modal">Fechar</button>
							<button type="submit" data-bs-dismiss="modal"
								class="btn btn-primary">Salvar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>


	<script charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
		integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
		crossorigin="anonymous"></script>
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/lojista/listarTelefoneLojista.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comumLojista.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>