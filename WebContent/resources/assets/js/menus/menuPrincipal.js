  const botaoDesativa = document.querySelector('#teste');
  const botaoAtiva = document.querySelector('.botaoAtivaMenu');

  botaoDesativa.addEventListener('click', () => {
  	elemento.classList.add('animar-sair');
  	elemento.classList.remove('animar-entrar');

  });

  botaoAtiva.addEventListener('click', () => {
  	elemento.classList.add('animar-entrar');
  	elemento.classList.remove('animar-sair');
  });