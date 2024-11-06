document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.getElementById('carrosselPromo');
    const slides = carrossel.getElementsByClassName('slide');
    const containerIndicadores = carrossel.querySelector('.indicadores');
    let slideAtual = 0;
    let temporizador;

    // Criar indicadores
    for (let i = 0; i < slides.length; i++) {
        const indicador = document.createElement('div');
        indicador.className = `indicador ${i === 0 ? 'ativo' : ''}`;
        indicador.addEventListener('click', () => irParaSlide(i));
        containerIndicadores.appendChild(indicador);
    }

    // Funções de navegação
    function mostrarSlide(n) {
        const indicadores = carrossel.getElementsByClassName('indicador');
        
        // Remover classe ativo de todos os slides e indicadores
        Array.from(slides).forEach(slide => slide.classList.remove('ativo'));
        Array.from(indicadores).forEach(ind => ind.classList.remove('ativo'));
        
        // Atualizar slide atual
        slideAtual = (n + slides.length) % slides.length;
        
        // Adicionar classe ativo ao slide e indicador atual
        slides[slideAtual].classList.add('ativo');
        indicadores[slideAtual].classList.add('ativo');
    }

    function proximoSlide() {
        mostrarSlide(slideAtual + 1);
    }

    function slideAnterior() {
        mostrarSlide(slideAtual - 1);
    }

    function irParaSlide(n) {
        mostrarSlide(n);
        reiniciarTemporizador();
    }

    // Configurar navegação automática
    function iniciarTemporizador() {
        temporizador = setInterval(proximoSlide, 5000);
    }

    function reiniciarTemporizador() {
        clearInterval(temporizador);
        iniciarTemporizador();
    }

    // Event listeners
    carrossel.querySelector('.anterior').addEventListener('click', () => {
        slideAnterior();
        reiniciarTemporizador();
    });

    carrossel.querySelector('.proximo').addEventListener('click', () => {
        proximoSlide();
        reiniciarTemporizador();
    });

    carrossel.querySelector('.fechar').addEventListener('click', () => {
        carrossel.style.display = 'none';
    });

    // Iniciar carrossel
    iniciarTemporizador();
});