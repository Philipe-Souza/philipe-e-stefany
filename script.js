function contarDias() {
    const dataInicial = new Date("2024-09-09");
    const dataAtual = new Date();

    dataAtual.setHours(dataAtual.getHours() - 3);
    const diferencaTempo = dataAtual - dataInicial;
    const diasPassados = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

    document.getElementById("days").textContent = ' ' + diasPassados + ' dias ';

    const audio = new Audio('assets/song.mp3');
    audio.loop = true;

    const main = document.getElementById('main-content');
    const section = document.getElementById('content');
    const h1 = document.getElementById('clique-aqui');
    
    main.addEventListener('click', () => {
        h1.style.display = 'none'
        section.style.display = 'flex';
        audio.play();
    });
}