document.addEventListener('DOMContentLoaded', function() {
    // Elementos do carrossel e dos artigos
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const articles = document.querySelectorAll('.article-section');
    let currentIndex = 0;

    // Funções de navegação do carrossel
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Função para abrir o artigo e atualizar a hash na URL
    function openArticle(event) {
        const articleId = event.currentTarget.dataset.article + '-article';
        articles.forEach(article => {
            article.classList.remove('active');
        });
        const activeArticle = document.getElementById(articleId);
        activeArticle.classList.add('active');
        activeArticle.scrollIntoView({ behavior: 'smooth' });

        // Atualizar a hash na URL sem recarregar a página
        history.pushState(null, '', `#${event.currentTarget.dataset.article}`);
    }

    // Eventos do carrossel
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
    slides.forEach(slide => {
        slide.addEventListener('click', openArticle);
    });

    // Mostrar o primeiro slide inicialmente
    showSlide(currentIndex);

    // Gerenciar a exibição de artigos com base na hash da URL
    const hash = window.location.hash.substring(1);

    if (hash) {
        // Selecionar o artigo com base na hash
        const activeArticle = document.getElementById(`${hash}-article`);
        if (activeArticle) {
            activeArticle.classList.add('active');
            activeArticle.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Sempre mostrar o carrossel
    carousel.style.display = 'block';
});
