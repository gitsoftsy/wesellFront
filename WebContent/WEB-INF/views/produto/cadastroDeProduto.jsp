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
      src="https://kit.fontawesome.com/2476720ce5.js"
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

    <!-- swiper -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    />
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
            <i class="fa-solid fa-barcode"></i>
            <span id="tituloPagina">Cadastro de produto</span>
          </div>
        </div>
      </section>
      <section class="pt-4">
        <form
          id="form-cadastro"
          class="card form p-5 col-8 mx-auto animate__animated animate__bounceInUp"
        >
          <h1 id="tituloForm" class="text-center mb-5">Cadastrar produto</h1>
          <input
            type="text"
            id="usuarioCadastro"
            hidden
            value="${funcionario.idUsuario}"
          />

          <div class="row mb-2" id="area-input-edit" hidden>
            <div class="col-md-12">
              <label for="nomeProdutoEdit" class="form-label"
                >Nome do produto:<span class="red">*</span></label
              >
              <input
                type="text"
                id="nomeProdutoEdit"
                autocomplete="off"
                name="nomeProdutoEdit"
                class="form-control inputForm"
                maxlength="255"
              />
            </div>
          </div>

          <div class="row mb-2" id="area-input-cadastro">
            <div class="col-md-6">
              <label for="nomeProduto" class="form-label"
                >Nome do produto:<span class="red">*</span></label
              >
              <input
                type="text"
                id="nomeProduto"
                
                autocomplete="off"
                name="nomeProduto"
                class="form-control inputForm"
                maxlength="255"
              />
            </div>
            <div id="boxImg" class="col-md-6">
              <label for="file" class="form-label"
                >Imagens do Produto:<span class="red">*</span></label
              >
              <input
                
                autocomplete="off"
                type="file"
                accept="image/*"
                id="imagem-produto"
                name="file"
                class="form-control inputForm"
                multiple
              />
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-6">
              <label for="descricao" class="form-label"
                >Descrição:<span class="red">*</span></label
              >
              <input
                required
                autocomplete="off"
                type="text"
                id="descricao"
                name="descricao"
                class="form-control inputForm"
                maxlength="2000"
              />
            </div>

            <div class="col-md-6">
              <label for="precoDeVenda" class="form-label"
                >Preço de venda:<span class="red">*</span></label
              >
              <input
                type="text"
                id="precoDeVenda"
                required
                autocomplete="off"
                name="precoDeVenda"
                class="form-control inputForm"
                maxlength="12"
              />
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-md-6">
              <label for="comissao" class="form-label"
                >Comissão:<span class="red">*</span></label
              >
              <input
                required
                autocomplete="off"
                type="text"
                id="comissao"
                name="comissao"
                class="form-control inputForm"
                maxlength="12"
              />
            </div>

            <div class="col-md-6">
              <label for="categoria" class="form-label"
                >Categoria:<span class="red">*</span></label
              >
              <select id="categoria" required class="form-select inputForm">
                <option value="" selected disabled>Selecione...</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="subCategoria" class="form-label"
                >Sub-Categoria:</label
              >
              <select
                id="subCategoria"
                name="subCategoria"
                class="form-select inputForm"
              >
                <option value="" selected disabled>Selecione...</option>
              </select>
            </div>

            <div class="col-md-6">
              <label for="lojista" class="form-label"
                >Lojista:<span class="red">*</span></label
              >
              <select
                id="lojista"
                required
                name="lojista"
                class="form-select inputForm"
              >
                <option value="" selected disabled>Selecione...</option>
              </select>
            </div>
          </div>
          <div class="row mb-3" id="title-imagens" hidden>
            <div class="col-md-12 d-flex justify-content-between">
              <h5 class="m-0">Imagens do produto</h5>
              <button
              type="button"
                class="btn btn-success btn-sm"
                onclick="limpaInput()"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Adicionar
              </button>
            </div>
          </div>
          <div id="area-carrossel" class="mb-3" hidden>
            <div class="col-md-12 mb-2">
              <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                 
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              </div>
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
        </form>
      </section>

      <!-- modal new image -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar imagens ao produto</h5>
              <button
              id="btn-close"
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body py-5">
              <form id="form-new-image" class="row">
                <div class="col-8">
                  <input
                    required
                    autocomplete="off"
                    type="file"
                    accept="image/*"
                    id="new-imagem-produto"
                    name="new-file"
                    multiple
                    class="form-control inputForm"
                  />
                </div>
                <div class="col">
                  <button type="submit" id="btn-submit" class="btn btn-primary ms-auto">
                    Adicionar
                  </button>
                </div>
              </form>
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
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
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
      src="<%=contextPath%>/resources/assets/js/comum.js"
    ></script>
    <script
      charset="UTF-8"
      src="<%=contextPath%>/resources/assets/js/produto/cadastroDeProduto.js"
    ></script>
  </body>
</html>
