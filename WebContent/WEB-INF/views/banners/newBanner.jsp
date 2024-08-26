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

    <title>Wesell</title>

    <!-- Sweetalert -->
    <script
      charset="UTF-8"
      src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
    ></script>
    <script charset="UTF-8" src="sweetalert2.all.min.js"></script>

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
      href="<%=contextPath%>/resources/assets/css/style.css"
    />

    <!-- Animation-css -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />

    <!-- cropper -->

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>
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
            <i class="fa-regular fa-plus fa-lg"></i>
            <span id="tituloPagina">Cadastro de Banner</span>
          </div>
        </div>
      </section>
      <section class="pt-4">
        <form
          id="form-cadastro"
          class="card form p-5 col-8 mx-auto animate__animated animate__animated animate__bounceInUp"
        >
          <h1 id="tituloForm" class="text-center mb-5">Cadastro</h1>
          <input
            type="text"
            id="usuarioCadastro"
            hidden
            value="${funcionario.idUsuario}"
          />

          <div class="row mb-2">
            <div class="col-md-6">
              <label for="localBanner" class="form-label"
                >Local banner<span class="red">*</span></label
              >
              <select
                class="form-select mb-3"
                aria-label="Local banner"
                id="localBanner"
                required
                name="localBanner"
              >
                <option selected disabled>Selecione o local</option>
                <option value="P">Principal</option>
                <option value="S">Secundário</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="tipoDispositivo" class="form-label"
                >Tipo de dispositivo<span class="red">*</span></label
              >
              <select
                class="form-select mb-3"
                aria-label="Tipo de dispositivo"
                id="tipoDispositivo"
                required
                name="tipoDispositivo"
              >
                <option selected disabled>Selecione o tipo</option>
                <option value="M">Mobile</option>
                <option value="D">Desktop</option>
              </select>
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-6">
              <label for="tipoBanner" class="form-label"
                >Tipo de banner<span class="red">*</span></label
              >
              <select
                class="form-select inputForm"
                aria-label="Tipo de banner"
                id="tipoBanner"
                required
                name="tipoBanner"
              >
                <option selected disabled>Selecione o tipo</option>
                <option value="I">Influenciador</option>
                <option value="C">Comprador</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="inputImage" class="form-label"
                >Imagem<span class="red">*</span></label
              >
              <input
                required
                type="file"
                id="inputImage"
                disabled
                accept="image/*"
                class="form-control inputForm"
              />
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-6">
              <label for="dtInicio" class="form-label"
                >Início de exibição<span class="red">*</span></label
              >
              <input
                required
                autocomplete="off"
                max="3000-01-01"
                type="date"
                id="dtInicio"
                name="dtInicio"
                class="form-control inputForm"
              />
            </div>
            <div class="col-md-6">
              <label for="dtFim" class="form-label"
                >Fim de exibição<span class="red">*</span></label
              >
              <input
                required
                autocomplete="off"
                max="3000-01-01"
                type="date"
                id="dtFim"
                name="dtFim"
                class="form-control inputForm"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <label for="ordem" class="form-label"
                >Ordem<span class="red">*</span></label
              >
              <input
                autocomplete="off"
                type="number"
                id="ordem"
                name="ordem"
                min="1"
                class="form-control inputForm"
              />
            </div>
            <div class="col-md-6">
              <label for="urlDestino" class="form-label"
                >URL de destino<span class="red">*</span></label
              >
              <input
                autocomplete="off"
                placeholder="https://exemplo.com"
                type="text"
                id="urlDestino"
                name="urlDestino"
                class="form-control inputForm"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-12 text-center">
              <button
                type="submit"
                id="btn-submit"
                class="btn confirm btn-primary btn-register"
              >
                Cadastrar
              </button>
            </div>
          </div>

          <!-- <button
            type="button"
            style="display: none"
            class="btn btn-primary"
            id="openModalBtn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <i
                    id="icone-modal"
                    class="fa-solid fa-check circulo-border"
                  ></i>
                  <h1
                    class="modal-title fs-5 titulo-modal"
                    id="exampleModalLabel"
                  >
                    Cadastrado com sucesso!
                  </h1>
                </div>
              </div>
            </div>
          </div> -->
        </form>
      </section>
      <!-- Modal crop-->
      <button
        type="button"
        class="btn btn-primary"
        hidden
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      ></button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <!-- <div id="imagePreview"></div> -->
              <div class="col-12">
                <div class="img-container">
                  <img id="imgBanner" src="" alt="Imagem para recortar" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="btnCancel"
                class="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                id="btnCrop"
                class="btn btn-sm btn-primary"
                data-bs-dismiss="modal"
              >
                Recortar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
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
      src="<%=contextPath%>/resources/assets/js/comum.js?v=1"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources//assets/js/banners/newBanner.js"
    ></script>
  </body>
</html>
