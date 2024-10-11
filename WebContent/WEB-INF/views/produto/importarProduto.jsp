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

<title>ADM - Wesell</title>

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

<!-- Bootstrap -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous" />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
	rel="stylesheet" />
<link
	href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
	rel="stylesheet" />
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- CSS -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css" />
<link rel="stylesheet" type="text/css"
	href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
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
	href="<%=contextPath%>/resources/assets/css/style.css?v=<%=(int) (Math.random() * 10000)%>" />

<!-- Animation-css -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

<!-- swiper -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</head>

<body>
	<header id="menu"></header>

	<div class="bg-loading">
		<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
		</div>
	</div>

	<button id="teste" type="button" class="btn botaoDesativaMenu">
		<i class="fa-solid fa-arrow-right" style="color: #ffffff"></i>
	</button>

	<button type="button" class="btn botaoAtivaMenu">
		<i class="fa-solid fa-arrow-left mover-left"></i>
	</button>
	<main class="py-4 container-res">
		<section id="section" class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-file-export fa-lg"></i> <span
						id="tituloPagina">Importar Produtos</span>
				</div>
			</div>
		</section>
		<section>
			<form id="form-cadastro"
				class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Dados de
					Importação</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2">

					<div class="col-md-6">
						<label for="lojista" class="form-label">Lojista:<span
							class="red">*</span></label> <select id="lojista" required name="lojista"
							class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>

					<div class="col-md-6">
						<label for="lojistaId" class="form-label">Usuário do
							Lojista a Ser notificado da Importação :<span class="red">*</span>
						</label> <select id="lojistaId" name="lojistaId"
							class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>

				</div>

				<div class="row mb-3">

					<div class="col-md-6">
						<label for="categoria" class="form-label">Categoria:<span
							class="red">*</span></label> <select id="categoria" required
							class="form-select">
							<option value="" selected disabled>Selecione a categoria
							</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="subCategoria" class="form-label">Sub-Categoria:<span
							class="red">*</span></label> <select id="subCategoria"
							name="subCategoria" class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>




				</div>

				<div class="row mb-3">
					<div class="col-md-6">
						<label for="modelo" class="form-label">Baixe o modelo de
							arquivo a ser preenchido:</label>
						<button id="btnDownload" type="button" style="width: 100%"
							class="btn btn-secondary form-input inputForm gap-2 d-flex align-items-center justify-content-center">
							<i class="fa-solid fa-file-arrow-down"></i>Baixar modelo
						</button>
					</div>

					<div class="col-md-6">

						<label for="fileExcel" class="form-label">Importar
							arquivo:<span class="red">*</span>
						</label> <input class="form-control" required type="file" id="fileExcel"
							accept=".xls,.xlsx,.csv" />
					</div>
				</div>
				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">Importar</button>
					</div>
				</div>
			</form>
		</section>
	</main>

	<script charset="UTF-8" src="https://code.jquery.com/jquery-3.7.1.js"
		integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
		integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
		crossorigin="anonymous"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
	<script charset="UTF-8" type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js?v=<%=(int) (Math.random() * 10000)%>"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/produto/importarProduto.js?v=<%=(int) (Math.random() * 10000)%>"></script>
	<script charset="UTF-8"
		src="https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"></script>
</body>
</html>
