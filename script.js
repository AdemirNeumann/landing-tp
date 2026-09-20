document.getElementById('newsletterForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  const assunto = encodeURIComponent('Novo contato pela landing page');
  const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}`);

  window.location.href = `mailto:tacianepaloschi@gmail.com?subject=${assunto}&body=${corpo}`;
});


function animarContagem(elemento) {
  const target = parseInt(elemento.dataset.target, 10);
  const prefix = elemento.dataset.prefix || '';
  const suffix = elemento.dataset.suffix || '';
  const pad = parseInt(elemento.dataset.pad, 10) || 0;
  const duracao = 1500;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = Math.floor(progresso * target);
    const valorFormatado = String(valorAtual).padStart(pad, '0');

    elemento.textContent = prefix + valorFormatado + suffix;

    if (progresso < 1) {
      requestAnimationFrame(passo);
    }
  }

  requestAnimationFrame(passo);
}

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      animarContagem(entrada.target);
      observador.unobserve(entrada.target);
    }
  });
}, {threshold: 0.5});

document.querySelectorAll('.stat-number').forEach(function (numero) {
  observador.observe(numero);
});


const fotos = document.querySelectorAll('.mosaic-item');
let posicoes = ['pos-0', 'pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];

function aplicarPosicoes() {
  fotos.forEach(function (foto, index) {
    posicoes.forEach(function (classe) {
      foto.classList.remove(classe);
    });
    foto.classList.add(posicoes[index]);
  })
}

function girarMosaico() {
  posicoes.push(posicoes.shift());
  aplicarPosicoes();
}

aplicarPosicoes();
setInterval(girarMosaico, 3000);
