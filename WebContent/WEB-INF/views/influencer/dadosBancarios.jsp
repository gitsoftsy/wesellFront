<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>

<% String contextPath = request.getContextPath(); %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ taglib
uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
      crossorigin="anonymous"
    />
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
      rel="stylesheet"
    />
    <script
      charset="UTF-8"
      src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"
    ></script>

    <!-- CSS -->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- FontAwesome -->
    <script
      charset="UTF-8"
      src="https://kit.fontawesome.com/3ce21ff22c.js"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="<%=contextPath%>/resources/assets/css/dadosDeCadastro.css"
    />

    <!-- Animation-css -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />

    <!-- Sweetalert -->
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
    ></script>
    <script charset="UTF-8" src="sweetalert2.all.min.js"></script>
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

    <header class="d-flex flex-column menuPrincipal">
      <div
        class="d-flex justify-content-between align-items-center shadowNovo menu-alto"
      >
        <img
          alt="logo"
          src="<%=contextPath%>/resources/assets/img/wesell_horizontal_azul.png"
          class="logo-menu"
        />
        <div class="p-4 d-flex gap-3">
          <a href="#"><i class="fa-solid fa-bell icone-menu icone-menu"></i></a>
        </div>
      </div>

      <div
        class="abracaMenu modalMenu d-flex flex-column justify-content-between menu-baixo shadowNovo h-100"
      >
        <nav class="menu">
          <div class="item">
            <a class="sub-btn d-flex align-items-center"
              ><i class="fa-solid fa-cube icone-menu"></i>Usuário
              <i class="fas fa-angle-right dropdown"></i>
            </a>
            <div class="sub-menu">
              <a
                href="dadosDeCadastro"
                class="sub-item d-flex align-items-center"
                >Dados Pessoais</a
              >
              <a
                href="dadosBancarios"
                class="sub-item d-flex align-items-center"
                >Dados Bancários</a
              >
              <a href="meusProdutos" class="sub-item">Meus Produtos</a>
            </div>
          </div>
          <div class="item">
            <a class="sub-btn d-flex align-items-center"
              ><i class="fa-solid fa-cubes-stacked icone-menu"></i> Afiliação
              <i class="fas fa-angle-right dropdown"></i>
            </a>
            <div class="sub-menu">
              <a href="mercado" class="sub-item d-flex align-items-center"
                >Mercado</a
              >
            </div>
          </div>
        </nav>

        <a
          href="loginInfluencer"
          class="d-flex align-items-center gap-3 text-decoration-none colorPreto"
        >
          <i class="fa-solid fa-arrow-left icone-menu"></i> Sair
        </a>
      </div>
    </header>

    <main class="main">
      <h1 style="font-weight: 300" class="mt-2 text-center mt-5">
        Dados Bancários
      </h1>

      <form
        id="formBancario"
        class="d-flex flex-column align-items-center card form p-2 col-8 mx-auto animate__animated"
      >
        <div class="col-md-10 mb-4 d-flex flex-column mt-2">
          <label for="banco" class="form-label"
            >Banco:<span class="red">*</span></label
          >
          <select id="banco" required class="form-select"></select>
        </div>

        <div class="col-md-10 mb-4 d-flex gap-2 container-nomes pt-2">
          <div class="d-flex flex-column col-md-6">
            <label for="agencia" class="form-label"
              >Agência:<span class="red">*</span></label
            >
            <input
              required
              autocomplete="off"
              type="number"
              id="agencia"
              name="agencia"
              class="form-control inputForm"
              maxlength="4"
            />
          </div>

          <div class="d-flex flex-column col-md-6">
            <label for="digitoAgencia" class="form-label"
              >Dígito:<span class="red">*</span></label
            >
            <input
              required
              autocomplete="off"
              type="number"
              id="digitoAgencia"
              name="digitoAgencia"
              class="form-control inputForm"
              maxlength="3"
            />
          </div>
        </div>

        <div class="col-md-10 mb-4 d-flex gap-2 container-nomes pt-2">
          <div class="d-flex flex-column col-md-6">
            <label for="conta" class="form-label"
              >Conta:<span class="red">*</span></label
            >
            <input
              required
              autocomplete="off"
              type="number"
              id="conta"
              name="conta"
              class="form-control inputForm"
              maxlength="4"
            />
          </div>

          <div class="d-flex flex-column col-md-6">
            <label for="digitoConta" class="form-label"
              >Dígito:<span class="red">*</span></label
            >
            <input
              required
              autocomplete="off"
              type="number"
              id="digitoConta"
              name="digitoConta"
              class="form-control inputForm"
              maxlength="3"
            />
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <button
            id="enviarFormInfluencer"
            class="btn btn-success btn-lg btn-block w-100"
          >
            Salvar
          </button>
        </div>
      </form>
    </main>

    <!--  	<footer >Copyright @ 2000-2024 - Todos os direitos reservados - Desenvolvido pela Softsy</footer> -->

    <script
      charset="UTF-8"
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
      integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script
      charset="UTF-8"
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/toastify-js"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"
    ></script>
    <script
      charset="UTF-8"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/comum.js?v=<%=(int)(Math.random()*10000)%>"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/influencer/dadosBancarios.js?v=<%=(int) (Math.random() * 10000)%>"
    ></script>
  </body>
</html>
