function contarDias() {
    function atualizarContador() {
        // Data de início (09/09/2024 18:05:00) em UTC
        const dataInicio = new Date(Date.UTC(2024, 8, 9, 0, 5, 0)); // Setembro é 8 porque os meses começam do 0

        // Data atual em UTC
        const agora = new Date(); // Data local

        // Para garantir que estamos calculando em relação ao UTC, ajustamos as horas para UTC
        const agoraUTC = new Date(agora.getUTCFullYear(), agora.getUTCMonth(), agora.getUTCDate(), agora.getUTCHours(), agora.getUTCMinutes(), agora.getUTCSeconds());

        // Diferença entre a data atual e a data de início
        const diferenca = agoraUTC - dataInicio;

        // Calculando o total de dias passados, de forma exata
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // 1000 * 60 * 60 * 24 = milissegundos em um dia

        // Calculando as horas restantes após calcular os dias
        var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // Calculando os minutos restantes após calcular as horas
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

        // Calculando os segundos restantes após calcular os minutos
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Exibir o contador
        document.getElementById("days").innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;

        // Atualizar o contador a cada 1 segundo
        setTimeout(atualizarContador, 1000);
    }

    // Inicializar o contador
    atualizarContador();
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