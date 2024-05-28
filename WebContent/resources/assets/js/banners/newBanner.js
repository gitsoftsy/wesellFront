$("#form-cadastro").submit(function (e) {
  e.preventDefault();

  var dados = {
    escolaId: Number($("#escolaId").val()),
    dependenciaAdmId: Number($("#dependenciaAdmId").val()),
    creditos: Number($("#creditos").val()),
    horasAula: Number($("#horasAula").val()),
    horasLab: Number($("#horasLab").val()),
    horasEstagio: Number($("#horasEstagio").val()),
    horasAtiv: Number($("#horasAtiv").val()),
    disciplina: $("#disciplina").val(),
    nome: $("#nome").val(),
  };

  $.ajax({
    url: url_base + "/disciplina",
    type: "POST",
    data: JSON.stringify(dados),
    contentType: "application/json; charset=utf-8",
    error: function (e) {
      console.log(e);
      alert(e.responseJSON.message);
    },
  }).done(function (data) {
    Toastify({
      text: "cadastrado com sucesso!",
      duration: 2000,
      position: "center",
      close: true,
      className: "Toastify__toast--custom",
    }).showToast();
    window.location.href = "disciplinas";
  });
});
