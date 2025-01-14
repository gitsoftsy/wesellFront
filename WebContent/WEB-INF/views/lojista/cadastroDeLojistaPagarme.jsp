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
	rel="stylesheet" />
<script charset="UTF-8"
	src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

<!-- CSS -->
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

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>
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
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-shop"></i> <span id="tituloPagina">Cadastro
						de Lojista</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-funcionario" class="card form p-5 col-8 mx-auto">
				<h1 id="tituloForm" class="text-center mb-5">Cadastro
					Financeiro</h1>
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
							class="red">*</span>
						</label> <input type="text" id="razaoSocial" autocomplete="off"
							name="razaoSocial" required class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cpf" class="form-label">CPF:<span class="red">*</span></label>
						<input required autocomplete="off" type="text" id="cpf" name="cpf"
							class="form-control inputForm" maxlength="14"
							data-mask="000.000.000-00" />
					</div>
					<div class="col-md-6">
						<label for="email" class="form-label">Email:<span
							class="red">*</span>
						</label> <input type="email" id="email" autocomplete="off" name="email"
							required class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="cnpj" class="form-label">Data de Fundação da
							Empresa:<span class="red">*</span>
						</label> <input required autocomplete="off" type="date"
							id="dataFundacaoEmpresa" name="dataFundacaoEmpresa"
							class="form-control inputForm" maxlength="14" />
					</div>
					<div class="col-md-6">
						<label for="foneNumero" class="form-label">Telefone:<span
							class="red">*</span></label> <input type="tel" id="foneNumero"
							autocomplete="off" name="foneNumero" required
							class="form-control inputForm" maxlength="15" />
					</div>

				</div>


				<div class="row mb-2">
					<div class="col-md-6">

						<label for="tipoTelefone" class="form-label">Tipo
							Telefone: </label> <select class="form-select" aria-label="tipoTelefone"
							id="tipoTelefone" name="tipoTelefone">
							<option selected disabled>Selecione uma opção</option>
							<option value="M">Mobile</option>
							<option value="F">Não sei</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="foneNumero" class="form-label">Telefone:<span
							class="red">*</span>
						</label> <input type="tel" id="foneNumero" autocomplete="off"
							name="foneNumero" required class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>



				<div class="row mb-2">
					<div class="col-md-6">
						<label for="idLojista" class="form-label">ID do Lojista:</label> <input
							type="text" id="idLojista" name="idLojista"
							class="form-control inputForm" maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="receitaAnual" class="form-label">Receita
							Anual: <span class="red">*</span>
						</label> <input type="number" id="receitaAnual" name="receitaAnual"
							class="form-control inputForm" required />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="idTipoEmpresa" class="form-label">Tipo de
							Empresa:</label> <select id="idTipoEmpresa" name="idTipoEmpresa"
							class="form-select">
							<option selected disabled>Selecione um tipo</option>
							<option value="1">Microempresa</option>
							<option value="2">Pequena Empresa</option>
							<option value="3">Média Empresa</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="emailRepLegal" class="form-label">Email
							Representante Legal:</label> <input type="email" id="emailRepLegal"
							name="emailRepLegal" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nmRepLegal" class="form-label">Nome
							Representante Legal: <span class="red">*</span>
						</label> <input type="text" id="nmRepLegal" name="nmRepLegal"
							class="form-control inputForm" maxlength="255" required />
					</div>
					<div class="col-md-6">
						<label for="cpfRepLegal" class="form-label">CPF
							Representante Legal:</label> <input type="text" id="cpfRepLegal"
							name="cpfRepLegal" class="form-control inputForm" maxlength="14"
							data-mask="000.000.000-00" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="nmMaeRepLegal" class="form-label">Nome da Mãe
							Representante Legal:</label> <input type="text" id="nmMaeRepLegal"
							name="nmMaeRepLegal" class="form-control inputForm"
							maxlength="255" />
					</div>
					<div class="col-md-6">
						<label for="dataNascRepLegal" class="form-label">Data de
							Nascimento Representante Legal:</label> <input type="date"
							id="dataNascRepLegal" name="dataNascRepLegal"
							class="form-control inputForm" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="rendaMensalRepLegal" class="form-label">Renda
							Mensal Representante Legal:</label> <input type="number"
							id="rendaMensalRepLegal" name="rendaMensalRepLegal"
							class="form-control inputForm" />
					</div>
					<div class="col-md-6">
						<label for="ocupacaoRepLegal" class="form-label">Ocupação
							Representante Legal:</label> <input type="text" id="ocupacaoRepLegal"
							name="ocupacaoRepLegal" class="form-control inputForm"
							maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="transfDia" class="form-label">Dia da
							Transferência:</label> <select id="transfDia" name="transfDia"
							class="form-select">
							<option selected disabled>Selecione um dia</option>
							<option value="1">1</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="idBanco" class="form-label">Banco:</label> <select
							id="idBanco" name="idBanco" class="form-select">
							<option selected disabled>Selecione um dia</option>
						
						</select>
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="agenciaNum" class="form-label">Agência Número:</label>
						<input type="text" id="agenciaNum" name="agenciaNum"
							class="form-control inputForm" maxlength="4" />
					</div>
					<div class="col-md-6">
						<label for="agenciaDv" class="form-label">Dígito
							Verificador da Agência:</label> <input type="text" id="agenciaDv"
							name="agenciaDv" class="form-control inputForm" maxlength="1" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-6">
						<label for="contaNum" class="form-label">Conta Número:</label> <input
							type="text" id="contaNum" name="contaNum"
							class="form-control inputForm" maxlength="10" />
					</div>
					<div class="col-md-6">
						<label for="contaDv" class="form-label">Dígito Verificador
							da Conta:</label> <input type="text" id="contaDv" name="contaDv"
							class="form-control inputForm" maxlength="1" />
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



				<div class="row mb-4">
					<div class="col-md-6">
						<label for="idTransacao" class="form-label">ID da
							transação:</label> <input type="text" id="idTransacao" autocomplete="off"
							name="idTransacao" class="form-control inputForm" maxlength="255" />
					</div>
				</div>

				<div class="row mb-2">
					<div class="col-md-12 text-center">
						<button type="submit" id="btn-submit"
							class="btn confirm btn-primary btn-register">Cadastrar</button>
					</div>
				</div>

				<!-- Button modal de cadastro  -->
				<button type="button" style="display: none" class="btn btn-primary"
					id="openModalBtn" data-bs-toggle="modal"
					data-bs-target="#exampleModal">Launch demo modal</button>

				<!-- Modal de cadastro -->
				<div class="modal fade" id="exampleModal" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<i id="icone-modal" class="fa-solid fa-check circulo-border"></i>
								<h1 class="modal-title fs-5 titulo-modal" id="exampleModalLabel">
									Seu Cadastro Foi Realizado!</h1>
							</div>
						</div>
					</div>
				</div>
			</form>
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
	<script charset="UTF-8" type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js?v=<%=(int) (Math.random() * 10000)%>"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/lojista/cadastroDeLojistaPagarme.js"></script>
</body>
</html>
