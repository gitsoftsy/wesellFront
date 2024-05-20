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
	href="<%=contextPath%>/resources/assets/css/areaLojista.css" />

<!-- Sweetalert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="sweetalert2.all.min.js"></script>

<!-- Animation-css -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
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
		<section id="section" class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-barcode"></i> <span id="tituloPagina">Cadastro
						de Produto</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-funcionario"
				class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Cadastrar Produto</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nomeProduto" class="form-label">Nome do
							produto:<span class="red">*</span></label> <input type="text" id="nomeProduto" required
							autocomplete="off" name="nomeProduto"
							class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="descricao" class="form-label">Descrição:<span class="red">*</span></label> <input
							required autocomplete="off" type="text" id="descricao"
							name="descricao" class="form-control inputForm" maxlength="2000" />
					</div>
					
				</div>

				<div class="row mb-2">

					<div class="col-md-6">
						<label for="precoDeVenda" class="form-label">Preço de
							Venda:<span class="red">*</span></label> <input type="text" id="precoDeVenda" required
							autocomplete="off" name="precoDeVenda" class="form-control inputForm" 
							maxlength="12" />
					</div>
						<div class="col-md-6">
						<label for="comissao" class="form-label">Comissão:<span class="red">*</span></label> <input
							required autocomplete="off" type="text" id="comissao"
							name="comissao"  class="form-control inputForm"
							maxlength="12" />
					</div>

				</div>

				<div class="row mb-2">

					<div class="col-md-6">
						<label for="categoria" class="form-label">Categoria:<span class="red">*</span></label> 
						<select id="categoria" required class="form-select inputForm">
							
						</select>
					</div>
					<div class="col-md-6">
						<label for="subCategoria" class="form-label">Sub-Categoria:</label>
						<select  id="subCategoria" name="subCategoria" class="form-select inputForm">
						
						</select>
					</div>

				</div>

				<div class="row mb-2">

					
					<div id="boxImg" class="col-md-12">
						<label for="file" class="form-label">Imagens do Produto:<span class="red">*</span></label> <input
							required autocomplete="off" type="file" onchange="converterImagem();" id="imagem-produto" name="file"
							class="form-control inputForm" multiple/>
					</div>

				</div>
				
				<div class="row mb-2">
					<div class="col-md-6">
					<button class="btn btn-primary btn-register none" id="abrirModalImg" >Ver imagens</button>
					</div>
					<div id="carrossel" class="carrossel none">
			        <div class="imagens">
			          <img id="img0" src="" alt="Imagem 1" class="imagem-ativa">
			          <img id="img1" src="" alt="Imagem 2">
			          <img id="img2" src="" alt="Imagem 3">
			        </div>
			        <button class="anterior" onclick="mudarImagem(-1)">❮</button>
			        <button class="proximo" onclick="mudarImagem(1)">❯</button>
			      </div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">Cadastrar</button>
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
	<script src="<%=contextPath%>/resources/assets/js/comumLojista.js"></script>
	<script
		src="<%=contextPath%>/resources//assets/js/lojista/cadastroProdutoLojista.js"></script>
</body>
</html>
