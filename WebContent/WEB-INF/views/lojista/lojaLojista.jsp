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

<!-- Sweetalert -->
<script charset="UTF-8"
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script charset="UTF-8" src="sweetalert2.all.min.js"></script>

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
	href="<%=contextPath%>/resources/assets/css/areaLojista.css?v=<%=(int) (Math.random() * 10000)%>" />
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

	<button type="button" class="btn botaoAtivaMenu">
		<i class="fa-solid fa-arrow-left mover-left"></i>
	</button>
	<main class="py-4 container-res">
		<section class="mb-5">
			<div class="card">
				<div class="card-body title">
					<i class="fa-solid fa-shop"></i> <span id="tituloPagina">Minha
						Loja</span>
				</div>
			</div>
		</section>
		<section class="pt-4">
			<form id="form-funcionario"
				class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp">
				<h1 id="tituloForm" class="text-center mb-5">Minha Loja</h1>

				<nav id="navEdit">
					<div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
						<button class="nav-link active" id="nav-dados-lojista-tab"
							data-bs-toggle="tab" data-bs-target="#nav-dados-lojista"
							type="button" role="tab" aria-controls="nav-dados-lojista"
							aria-selected="true">Dados Lojista</button>
						<button class="nav-link" id="nav-finan-tab" data-bs-toggle="tab"
							data-bs-target="#nav-finan" type="button" role="tab"
							aria-controls="nav-finan" aria-selected="false">Dados
							Financeiro</button>
					</div>
				</nav>
				<div class="tab-content" id="nav-tabContent">
					<div class="tab-pane fade show active mb-4" id="nav-dados-lojista"
						role="tabpanel" aria-labelledby="nav-dados-lojista-tab"
						tabindex="0">
						<input type="text" id="usuarioCadastro" hidden
							value="${funcionario.idUsuario}" />

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="nomeFantasia" class="form-label">Nome
									Fantasia:<span class="red">*</span>
								</label> <input required autocomplete="off" type="text"
									id="nomeFantasia" name="nomeFantasia"
									class="form-control inputForm" maxlength="255" />
							</div>
							<div class="col-md-6">
								<label for="razaoSocial" class="form-label">Razão
									Social:<span class="red">*</span>
								</label> <input type="text" id="razaoSocial" autocomplete="off"
									name="razaoSocial" required class="form-control inputForm"
									maxlength="255" />
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="cnpj" class="form-label">CNPJ:<span
									class="red">*</span></label> <input required autocomplete="off"
									type="text" id="cnpj" name="cnpj"
									class="form-control inputForm" maxlength="14"
									data-mask="00.000.000/0000-00" />
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
								<label for="cep" class="form-label">CEP:<span
									class="red">*</span></label> <input type="text" id="cep" required
									autocomplete="off" name="cep" class="form-control inputForm"
									maxlength="8" />
							</div>
							<div class="col-md-6">
								<label for="endereco" class="form-label">Endereço:<span
									class="red">*</span></label> <input type="text" id="endereco" required
									autocomplete="off" name="endereco"
									class="form-control inputForm" maxlength="255" />
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
								<label for="complemento" class="form-label">Complemento:</label>
								<input type="text" id="complemento" autocomplete="off"
									name="complemento" class="form-control inputForm"
									maxlength="255" />
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
								<button type="submit" id="btn-submit"
									class="btn confirm btn-primary btn-register">Salvar</button>
							</div>
						</div>

					</div>
					
					<div class="tab-pane fade mb-5" id="nav-finan" role="tabpanel"
						aria-labelledby="nav-finan-tab" tabindex="0">



						<div class="row mb-2">
							<div class="col-md-6">
								<label for="cpfRepLegal" class="form-label">CPF
									Responsável Legal: </label> <input type="text" id="cpfRepLegal"
									name="cpfRepLegal" class="form-control inputForm"
									maxlength="14" data-mask="000.000.000-00" disabled />
							</div>

							<div class="col-md-6">
								<label for="nmRepLegal" class="form-label">Nome
									Responsável Legal: </label> <input type="text" id="nmRepLegal"
									name="nmRepLegal" class="form-control inputForm"
									maxlength="255" disabled />
							</div>



						</div>



						<div class="row mb-2">
							<div class="col-md-6">
								<label for="dataNascRepLegal" class="form-label">Data de
									Nascimento Responsável Legal:</label> <input type="date"
									id="dataNascRepLegal" name="dataNascRepLegal"
									class="form-control inputForm" disabled />
							</div>


							<div class="col-md-6">
								<label for="nmMaeRepLegal" class="form-label">Nome da
									Mãe Responsável Legal:</label> <input type="text" id="nmMaeRepLegal"
									name="nmMaeRepLegal" class="form-control inputForm"
									maxlength="255" disabled />
							</div>

						</div>

						<div class="row mb-2">


							<div class="col-md-6">
								<label for="foneNumero" class="form-label">Telefone (Com
									DDD):<span class="red">*</span>
								</label> <input type="tel" id="foneNumero" autocomplete="off"
									name="foneNumero" class="form-control inputForm"
									maxlength="255" disabled />
							</div>

							<div class="col-md-6">
								<label for="tipoTelefone" class="form-label">Tipo
									Telefone : </label> <select class="form-select" id="tipoTelefone"
									name="tipoTelefone" disabled>
									<option selected disabled>Selecione uma opção</option>
									<option value="C">Celular</option>
									<option value="F">Fixo</option>
								</select>
							</div>


						</div>
						<div class="row mb-4">


							<div class="col-md-6">
								<label for="emailRepLegal" class="form-label">Email
									Responsável Legal: <span class="red">*</span>
								</label> <input type="email" id="emailRepLegal" name="emailRepLegal"
									class="form-control inputForm" maxlength="255" disabled />
							</div>


						</div>
						
						<hr>


						<div class="row mb-2">
							<div class="col-md-6">
								<label for="cep" class="form-label">CEP:<span
									class="red">*</span></label> <input type="text" id="cepFinan" disabled
									autocomplete="off" name="cep" class="form-control inputForm"
									maxlength="8" data-mask="00000-000" />
							</div>
							<div class="col-md-6">
								<label for="endereco" class="form-label">Endereço:<span
									class="red">*</span></label> <input type="text" id="enderecoFinan"
									disabled autocomplete="off" name="endereco"
									class="form-control inputForm" maxlength="255" />
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="numero" class="form-label">N°:</label> <input
									disabled autocomplete="off" type="text" id="numeroFinan"
									name="numero" class="form-control inputForm" maxlength="10" />
							</div>
							<div class="col-md-6">
								<label for="bairro" class="form-label">Bairro:</label> <input
									type="text" id="bairroFinan" disabled autocomplete="off"
									name="bairro" class="form-control inputForm" maxlength="255" />
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="complemento" class="form-label">Complemento:</label>
								<input type="text" id="complementoFinan" autocomplete="off"
									name="complemento" class="form-control inputForm"
									maxlength="255" disabled />
							</div>
							<div class="col-md-6">
								<label for="estado" class="form-label">Estado:<span
									class="red">*</span></label> <input type="text" id="estadoFinan"
									disabled autocomplete="off" name="estado"
									class="form-control inputForm" maxlength="2" />
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="cidade" class="form-label">Cidade:<span
									class="red">*</span></label> <input type="text" id="cidadeFinan"
									disabled autocomplete="off" name="text"
									class="form-control inputForm" maxlength="255" />
							</div>

						</div>
						
						<hr>

						<div class="row mb-2">

							<div class="col-md-6">
								<label for="receitaAnual" class="form-label">Receita
									Anual: </label> <input type="number" id="receitaAnual"
									name="receitaAnual" class="form-control inputForm" disabled />
							</div>
						</div>

						<div class="row mb-2">

							<div class="col-md-6">
								<label for="dataFundacaoEmpresa" class="form-label">Data
									de Fundação da Empresa: </label> <input autocomplete="off" type="date"
									id="dataFundacaoEmpresa" name="dataFundacaoEmpresa"
									class="form-control inputForm" disabled />
							</div>

							<div class="col-md-6">
								<label for="idTipoEmpresa" class="form-label">Tipo de
									Empresa: </label> <select id="idTipoEmpresa" name="idTipoEmpresa"
									class="form-select" disabled>
									<option selected disabled>Selecione um tipo</option>
								</select>
							</div>
						</div>



						<div class="row mb-2">
							<div class="col-md-6">
								<label for="rendaMensalRepLegal" class="form-label">Renda
									Mensal Responsável Legal:</label> <input type="number"
									id="rendaMensalRepLegal" name="rendaMensalRepLegal"
									class="form-control inputForm" disabled />
							</div>
							<div class="col-md-6">
								<label for="ocupacaoRepLegal" class="form-label">Ocupação
									Responsável Legal:</label> <input type="text" id="ocupacaoRepLegal"
									name="ocupacaoRepLegal" class="form-control inputForm"
									maxlength="255" disabled />
							</div>
						</div>

						<div class="row mb-4">
							<div class="col-md-6">
								<label for="transfDia" class="form-label">Dia da
									Transferência:</label> <select id="transfDia" name="transfDia"
									class="form-select" disabled>
									<option selected disabled>Selecione um dia</option>
									<option value="1">1</option>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="20">20</option>
								</select>
							</div>
							<div class="col-md-6">
								<label for="idBanco" class="form-label">Banco: </label> <select id="idBanco" name="idBanco"
									class="form-select" disabled>
									<option selected disabled value=''>Selecione um dia</option>
								</select>
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="agenciaNum" class="form-label">Agência
									Número: </label> <input type="text" id="agenciaNum" name="agenciaNum"
									class="form-control inputForm" maxlength="4" disabled />
							</div>
							<div class="col-md-6">
								<label for="agenciaDv" class="form-label">Dígito
									Verificador da Agência: </label> <input type="text" id="agenciaDv"
									name="agenciaDv" class="form-control inputForm" maxlength="1"
									disabled />
							</div>
						</div>

						<div class="row mb-2">
							<div class="col-md-6">
								<label for="contaNum" class="form-label">Conta Número:</label> <input
									type="text" id="contaNum" name="contaNum"
									class="form-control inputForm" maxlength="10" disabled />
							</div>
							<div class="col-md-6">
								<label for="contaDv" class="form-label">Dígito
									Verificador da Conta: </label> <input type="text" id="contaDv"
									name="contaDv" class="form-control inputForm" maxlength="1"
									disabled />
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
	<script charset="UTF-8"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>

	<script charset="UTF-8"
		src="<%=contextPath%>/resources//assets/js/lojista/lojaLojista.js?v=<%=(int)(Math.random()*10000)%>"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/comum.js?v=<%=(int) (Math.random() * 10000)%>"></script>

	<script charset="UTF-8"
		src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
	<script charset="UTF-8"
		src="<%=contextPath%>/resources/assets/js/lojista/comumLojista.js?v=<%=(int)(Math.random()*10000)%>"></script>
</body>
</html>
