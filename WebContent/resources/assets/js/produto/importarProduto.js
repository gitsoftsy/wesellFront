$(document).ready(function () {
  fetchData("/categorias/ativos", "#categoria", "idCategoria", "categoria");

  async function fetchData(endpoint, selectId, valueKey, textKey) {
    try {
      const response = await $.ajax({
        url: url_base + endpoint,
        type: "GET",
        async: false,
      });

      response.forEach((item) => {
        $(selectId).append(
          $("<option>", {
            value: item[valueKey],
            id: item[valueKey],
            text: item[textKey],
            name: item[textKey],
          })
        );
      });
    } catch (error) {
      console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    }
  }
});

$("#categoria").change(function () {
  const categoryId = $(this).val();
  loadSubCategories(categoryId);
});

async function loadSubCategories(categoryId) {
  await $.ajax({
    url: `${url_base}/subcategorias/categoria/${categoryId}`,
    type: "GET",
    success: function (data) {
      const subCategoriaSelect = $("#subCategoria").empty();
      subCategoriaSelect.append(
        $("<option>", {
          value: "",
          text: "Selecione...",
          disabled: true,
          selected: true,
        })
      );

      data.forEach((item) => {
        subCategoriaSelect.append(
          $("<option>", {
            value: item.id,
            text: item.nome,
          })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Erro ao buscar subcategorias:", status, error);
    },
  });
}
