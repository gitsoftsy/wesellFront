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

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.css" />
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
					<i class="fa-solid fa-barcode"></i> <span id="tituloPagina">Cadastro
						de produto</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-cadastro"
				class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Cadastro</h1>
				<input type="text" id="usuarioCadastro" hidden
					value="${funcionario.idUsuario}" />

				<div class="row mb-2" id="area-input-edit" hidden>
					<div class="col-md-12">
						<label for="nomeProdutoEdit" class="form-label">Nome
							do produto:<span class="red">*</span>
						</label> <input type="text" id="nomeProdutoEdit" autocomplete="off"
							name="nomeProdutoEdit" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2" id="area-input-cadastro">
					<div class="col-md-6">
						<label for="nomeProduto" class="form-label">Nome
							do produto:<span class="red">*</span>
						</label> <input type="text" id="nomeProduto" autocomplete="off"
							name="nomeProduto" class="form-control inputForm" maxlength="255" />
					</div>
					<div id="boxImg" class="col-md-6">
						<label for="file" class="form-label">Imagens
							do Produto:<span class="red">*</span>
						</label> <input autocomplete="off" type="file" accept="image/*"
							id="imagem-produto" name="file" class="form-control inputForm"
							multiple />
					</div>
				</div>

				<div class="row mb-3">
					<div class="col-md-12">
						<label for="descricao" class="form-label">Descrição:<span
							class="red">*</span></label>
						<textarea class="form-control summernote inputForm" id="descricao"
							name="descricao"></textarea>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6" id="cardPrecoDeVenda">
						<label for="precoDeVenda" class="form-label">Preço
							de venda:<span class="red">*</span>
						</label> <input type="tel" id="precoDeVenda" required autocomplete="off"
							name="precoDeVenda" class="form-control" maxlength="12" />
					</div>
					<div class="col-md-6" id="cardPrecoPromocional">
						<label for="precoPromocional" class="form-label">Preço
							promocional:<span class="red">*</span>
						</label> <input type="tel" id="precoPromocional" required
							autocomplete="off" name="precoPromocional" class="form-control"
							maxlength="12" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6" id="cardComissao">
						<label for="comissao" class="form-label">Comissão:<span
							class="red">*</span></label> <input required autocomplete="off"
							type="tel" id="comissao" name="comissao" class="form-control"
							maxlength="12" />
					</div>
					<div class="col-md-6">
						<label for="categoria" class="form-label">Categoria:<span
							class="red">*</span></label> <select id="categoria" required
							class="form-select">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="subCategoria" class="form-label">Sub-Categoria:</label>
						<select id="subCategoria" name="subCategoria"
							class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="marca" class="form-label">Marca:</label> <select
							id="marca" name="marca" class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="lojista" class="form-label">Lojista:<span
							class="red">*</span></label> <select id="lojista" required name="lojista"
							class="form-select inputForm">
							<option value="" selected disabled>Selecione...</option>
						</select>
					</div>
					<div class="col-md-6">
						<label htmlFor="destaque" class="form-label"> Produto em
							destaque?<span class="red">*</span>
						</label>
						<div class="btn-group area-radio mb-4" role="group"
							aria-label="Basic radio toggle button group">
							<input type="radio" required class="btn-check" name="destaque"
								id="destaqueS" value="S" /> <label
								class="btn btn-outline-secondary" for="destaqueS"> Sim </label>

							<input type="radio" required class="btn-check" name="destaque"
								id="destaqueN" value="N" /> <label
								class="btn btn-outline-secondary" for="destaqueN"> Não </label>
						</div>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label htmlFor="nivel" class="form-label"> Qual o nível de
							relevância?<span class="red">*</span>
						</label>
						<div class="btn-group area-radio mb-4" role="group"
							aria-label="Basic radio toggle button group">
							<input type="radio" required class="btn-check" name="nivel"
								id="padrao" value="1" /> <label
								class="btn btn-outline-secondary" for="padrao"> Padrão </label>

							<input type="radio" required class="btn-check" name="nivel"
								id="media" value="2" /> <label
								class="btn btn-outline-secondary" for="media"> Média </label> <input
								type="radio" required class="btn-check" name="nivel" id="alta"
								value="3" /> <label
								class="btn btn-outline-secondary" for="alta"> Alta </label>
						</div>
					</div>
					<div class="col-md-6">
						<label htmlFor="possuiFrete" class="form-label"> Possui
							frete?<span class="red">*</span>
						</label>
						<div class="btn-group area-radio mb-4" role="group"
							aria-label="Basic radio toggle button group">
							<input type="radio" required class="btn-check" name="possuiFrete"
								id="possuiFreteS" value="N" /> <label
								class="btn btn-outline-secondary" for="possuiFreteS">
								Sim </label> <input type="radio" required class="btn-check"
								name="possuiFrete" id="possuiFreteN" value="S" />
							<label class="btn btn-outline-secondary" for="possuiFreteN">
								Não </label>
						</div>
					</div>
				</div>

				<div class="row mb-2 dimensoes">
					<div class="col-md-6">
						<label for="peso" class="form-label">Peso
							(kg):<span class="red">*</span>
						</label> <input type="tel" id="peso" autocomplete="off" name="peso"
							class="form-control inputForm" maxlength="12" />
					</div>
					<div class="col-md-6">
						<label for="largura" class="form-label">Largura
							(cm):<span class="red">*</span>
						</label> <input autocomplete="off" type="number" min="1" id="largura"
							name="largura" class="form-control inputForm" maxlength="12" />
					</div>
				</div>

				<div class="row mb-3 dimensoes">
					<div class="col-md-6">
						<label for="altura" class="form-label">Altura
							(cm):<span class="red">*</span>
						</label> <input type="number" min="1" id="altura" autocomplete="off"
							name="altura" class="form-control inputForm" maxlength="12" />
					</div>
					<div class="col-md-6">
						<label for="profundidade" class="form-label">Profundidade
							(cm):<span class="red">*</span>
						</label> <input autocomplete="off" type="number" min="1" id="profundidade"
							name="profundidade" class="form-control inputForm" maxlength="12" />
					</div>
					<div class="col-md-6">
						<label htmlFor="freteGratis" class="form-label"> Frete
							grátis?<span class="red">*</span>
						</label>
						<div class="btn-group area-radio mb-4" role="group"
							aria-label="Basic radio toggle button group">
							<input type="radio" required class="btn-check" name="freteGratis"
								id="freteGratisS" value="S" /> <label
								class="btn btn-outline-secondary" for="freteGratisS">
								Sim </label> <input type="radio" required class="btn-check"
								name="freteGratis" id="freteGratisN" value="N" />
							<label class="btn btn-outline-secondary" for="freteGratisN">
								Não </label>
						</div>
					</div>
				</div>

				<div class="row mb-3" id="title-imagens" hidden>
					<div class="col-md-12 d-flex justify-content-between">
						<h5 class="m-0">Imagens do produto</h5>
						<button type="button" class="btn btn-success btn-sm"
							onclick="limpaInput()" data-bs-toggle="modal"
							data-bs-target="#exampleModal">
							Adicionar</button>
					</div>
				</div>
				<div id="area-carrossel" class="mb-3" hidden>
					<div class="col-md-12 mb-2">
						<div class="swiper mySwiper">
							<div class="swiper-wrapper"></div>
							<div class="swiper-button-next"></div>
							<div class="swiper-button-prev"></div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">
							Cadastrar</button>
					</div>
				</div>
			</form>
		</section>

		<!-- modal new image -->
		<div class="modal fade" id="exampleModal" tabindex="-1"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Adicionar imagens ao produto</h5>
						<button id="btn-close" type="button" class="btn-close"
							data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body py-5">
						<form id="form-new-image" class="row">
							<div class="col-8">
								<input required autocomplete="off" type="file" accept="image/*"
									id="new-imagem-produto" name="new-file" multiple
									class="form-control inputForm" />
							</div>
							<div class="col">
								<button type="submit" id="btn-submit-modal"
									class="btn px-4 btn-primary ms-auto">
									Adicionar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
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
		src="<%=contextPath%>/resources/assets/js/produto/cadastroDeProduto.js?v=<%=(int) (Math.random() * 10000)%>"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs5.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/lang/summernote-pt-BR.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>
</body>
</html>
