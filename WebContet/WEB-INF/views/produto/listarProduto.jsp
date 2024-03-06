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
		<section id="modalMenu" class="abracaMenu modalMenu">
			<img class="logoSumare"
				src="<%=contextPath%>/resources/assets/img/logo.svg"
				alt="Logo Sumare" />
			<button id="teste" type="button" class="btn botaoDesativaMenu "><i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i></button>
			<hr />
			<p>
				<i class="fa-solid fa-user me-2" style="width: 28px;"></i> <span>${funcionario.nome}</span>
			</p>
			<hr />
			<nav class="nav-sidebar">

				
			         <a href="listarCargos" class="mb-1"><i class="fa-regular fa-address-card"></i> 
				<span>Cargos</span> 
			    </a> <a href="listarCategoria" class="mb-1"> <i class="fa-solid fa-clipboard"></i> 
				<span>Categorias</span>
				</a> <a href="listarSubCategoria" class="mb-1"> <i class="fa-solid fa-paste"></i>
				<span>Sub-Categoria</span>
				</a> <a href="listarLojista" class="mb-1"> <i class="fa-solid fa-shop"></i> 
				<span>Lojistas</span>
				</a> <a href="listarColaboradores" class="mb-1"> <i class="fa-regular fa-handshake"></i>
				<span>Colaboradores</span>
				</a> <a href="listarFuncionarios" class="mb-1"> <i class="fa-solid fa-user-group"></i> 
				<span>Funcionários</span>
				</a> <a href="listarProduto" class="mb-1"> <i class="fa-solid fa-barcode"></i> 
				<span>Produtos</span>
				</a> <a href="logoff" id="sair"> <i class="fa-solid fa-right-from-bracket"></i> 
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
					<i class="fa-solid fa-barcode"></i>  <span>Lista de
						Produtos</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-2" style="display: flex; flex-flow:column;align-items:center; gap:20px">
			<a href="cadastroDeProduto"
					class="btn btn-primary btn-lg px-3 py-1">Novo Produto</a>
				<div class="input-group">
					<input id="inputBusca" type="text" class="form-control inputForm"
						placeholder="Buscar Produto" /> <span
						class="input-group-text icone-pesquisa"><i class="fas fa-search"></i></span>
				</div>
				
			</div>

			<table
				class="table tabela-funcionarios table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Produtos cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" width="10%">Ativo</th>
						<th scope="col">Nome</th>
						<th scope="col">Descrição</th>
						<th scope="col">Categoria</th>
						<th scope="col">Sub-Categoria</th>
						<th scope="col">Preço</th>
						<th scope="col">Comissão</th>
						<th scope="col">Lojista</th>
						<th scope="col" width="15%">Ações</th>
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
			
				<button type="button" style="display: none;" class="btn btn-primary"
					id="openModalBtn" data-bs-toggle="modal"
					data-bs-target="#exampleModal">Launch demo modal</button>
			
					<div style="background-color: transparent;" class="modal fade" id="exampleModal" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div style="background-color: transparent;" class="modal-dialog">
						<div style="background-color: transparent;" class="modal-content">
							<div style="background-color: transparent; border:none;" class="modal-header">
								<img style="width: 600px; height: 600px; position:fixed; top:8px;" id="exibirImagem" alt="" src="">
							</div>
						</div>
					</div>
				</div>
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
		src="<%=contextPath%>/resources//assets/js/listarProduto.js"></script>
	<script src="<%=contextPath%>/resources/assets/js/comum.js"></script>
	<script
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
</body>
</html>
