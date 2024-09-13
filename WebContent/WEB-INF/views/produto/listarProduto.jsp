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
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int)(Math.random()*10000)%>" />

</head>

<body>

	<header id="menu"> </header>

	<div class="bg-loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
		</div>
	</div>

	<button id="teste" type="button" class="btn botaoDesativaMenu ">
		<i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i>
	</button>

	<button type="button" class="btn botaoAtivaMenu ">
		<i class="fa-solid fa-arrow-left mover-left "></i>
	</button>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-barcode"></i> <span>Lista de Produtos
					</span>
				</div>
			</div>
		</section>
		<section class="pt-4 card card-table px-5 py-3">
			<div class="mt-3 mb-2"
				style="display: flex; flex-flow: column; align-items: left; gap: 20px">
				<div class="d-flex gap-4">
					<a 	
						href="importarProdutos" 
						id="import-excel" 
						class="btn btn-success gap-2 d-flex align-items-center justify-content-center">
						<i class="fa-solid fa-file-export"></i>Importar
					</a>
					<a href="cadastroDeProduto" id="cadastroDeProdutoLink"
						class="btn botaoCadastro gap-2 d-flex align-items-center justify-content-center"><i
						class="fa-regular fa-pen-to-square"></i>Novo Produto</a>
					<button id="exportar-excel"
						class="btn btn-success gap-2 d-flex align-items-center justify-content-center">
						<i class="fa-solid fa-file-export"></i>Exportar
					</button>
				</div>
				<div class="input-group">
					<input id="inputBusca" type="text" class="form-control inputForm"
						placeholder="Buscar" /> <span
						class="input-group-text icone-pesquisa"><i
						class="fas fa-search"></i></span>
				</div>

			</div>

			<table
				class="table tabela-funcionarios table-striped table-bordered mb-0 caption-top mx-auto">
				<caption>Produtos cadastrados</caption>
				<thead>
					<tr>
						<th scope="col" width="10%">Ativo</th>
						<th scope="col">Nome</th>
						<th scope="col">Categoria</th>
						<th scope="col">Sub-Categoria</th>
						<th scope="col">Preço</th>
						<th scope="col">Comissão</th>
						<th scope="col">Loja</th>
						<th scope="col" width="15%">Ações</th>
					</tr>
				</thead>
				<tbody id="colaTabela" class="table-group-divider"></tbody>
			</table>
			<nav aria-label="Page navigation example">
				<ul id="pagination-list" class="pagination">
					
				</ul>
			</nav>

		</section>
	</main>

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
		src="<%=contextPath%>/resources/assets/js/comum.js?v=<%=(int)(Math.random()*10000)%>"></script>
		<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/produto/listarProduto.js"></script>
		<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
</body>
</html>
