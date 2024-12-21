const main = document.getElementById("main-content");
const tempoSection = document.getElementById("tempo");
const ceuSection = document.getElementById("ceu");
const allSections = document.querySelectorAll(".content");

const nosImg = document.getElementById("nos-img");
const ceuImg = document.getElementById("ceu-img");
const fraseCeu = document.getElementById("frase-ceu");

const frases = [
  "Voce coloriu minha vida cinza amor",
  "E a cada sorriso seu meu mundo ganha mais cor",
  "Tenho certeza que vamos conquistar nossos sonhos",
  "Sortudo sou eu. Sete bilhões de pessoas no mundo. E você me escolheu.",
  "Se o amor bateu na nossa porta, que sorte a nossa",
  "Tava escrito nas estrelas que eu ia encontrar você",
  "Tem brinquedo espalhado pela casa toda e as paredes rabiscadas com o giz de cera",
  "...Mudou de tal maneira, nossa vida já não é a mesma",
  "Ser herói de alguém e, melhor ainda, ter do lado a Mulher Maravilha",
  "Me diz quem não fica louco nesse jeito meigo bobo seu",
  "Pra falar a verdade eu acho que já te conhecia de outras vidas",
  "Pra falar a verdade eu acho que na última vida eu também te queria",
  "Você me libertou, por favor fique",
  "Eu troco mil estrelas pra te dar a lua, tudo que você quiser",
  "Deus é bom o tempo todo, e tem nos abençoado muito",
  "Não importa quanto tempo passe, eu sempre fico bobo com seu sorrio",
  "Nunca vou esquecer nosso dia 09/09/2024",
  "Você é incrivel, maravilhosa, perfeita, minha namorada",
  "Teamo desde sempre e pra sempre vou te amar",
  "Em breve vamos conquistar nossa casinha",
  "Nosso sonhos são maravilhosos e eles vão se realizar",
  "Reza comigo ai",
  "Eu teamo, em cada detalhe, em cada momento, a cada batida do meu coração"
];

//calcula o tempo passado desde 09-09-2024 as 18:05
const contarDias = () => {
  function atualizarContador() {
    // Data de início (09/09/2024 18:05:00) em UTC
    const dataInicio = new Date(Date.UTC(2024, 8, 9, 0, 5, 0)); // Setembro é 8 porque os meses começam do 0
    // Data atual em UTC
    const agora = new Date(); // Data local
    // Para garantir que estamos calculando em relação ao UTC, ajustamos as horas para UTC
    const agoraUTC = new Date(
      agora.getUTCFullYear(),
      agora.getUTCMonth(),
      agora.getUTCDate(),
      agora.getUTCHours(),
      agora.getUTCMinutes(),
      agora.getUTCSeconds()
    );

    // Diferença entre a data atual e a data de início
    const diferenca = agoraUTC - dataInicio;
    // Calculando o total de dias passados, de forma exata
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // 1000 * 60 * 60 * 24 = milissegundos em um dia
    // Calculando as horas restantes após calcular os dias
    var horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    // Calculando os minutos restantes após calcular as horas
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    // Calculando os segundos restantes após calcular os minutos
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Exibir o contador
    document.getElementById(
      "days"
    ).innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
    // Atualizar o contador a cada 1 segundo
    setTimeout(atualizarContador, 1000);
  }

  // Inicializar o contador
  atualizarContador();
};

//desativa os cliques na classe informada se largura > celular
const desativarCliques = () => {
  var largura = window.screen.width;
  if (largura > 500) {
    allSections.forEach((section) => {
      section.classList.add("desabilita-cliques");
    });
  } else {
    allSections.forEach((section) => {
      section.classList.remove("desabilita-cliques");
    });
  }
}

const verificarAcesso = () => {
  // Função para obter a data no formato YYYY-MM-DD
  const obterDataAtual = () => {
    const data = new Date();
    return data.toISOString().split('T')[0]; // Retorna a data no formato 'YYYY-MM-DD'
  };

  // Obtém a data do último acesso e a data atual
  var ultimoAcesso = localStorage.getItem('ultimoAcesso');  // Último acesso armazenado como string 'YYYY-MM-DD'
  const dataAtual = obterDataAtual(); // Data atual no formato 'YYYY-MM-DD'

  if (ultimoAcesso == null) {
    // primeiro acesso salva a data
    localStorage.setItem('ultimoAcesso', dataAtual);
  } else if (ultimoAcesso !== dataAtual) {
    // acessou outro dia atualiza os conteudos e salva a data de hoje
    localStorage.setItem('ultimoAcesso', dataAtual);
    atualizarFrase();
  } else {
    // ja acessou hoje
    alert("Acho que vi uma gatinha kkk amanhã tem mais, amor. teamooo bjs");
  }
};


const atualizarFrase = () => {
  // Obtém a frase atual no elemento fraseCeu
  const fraseAtual = fraseCeu.value;
  
  let novaFrase;
  
  // Enquanto a nova frase for igual à atual, escolhe outra frase aleatória
  do {
    novaFrase = frases[Math.floor(Math.random() * frases.length)];
  } while (novaFrase === fraseAtual);

  // Atualiza o conteúdo do elemento com a nova frase
  fraseCeu.textContent = novaFrase;
}

function inicio() {
  verificarAcesso(); //atualiza conteudos se for um dia diferente
  desativarCliques(); //se a tela for de computador
  contarDias();
  ceuSection.style.display = "flex";
}

ceuSection.addEventListener("click", () => {
  ceuSection.style.display = "none";
  tempoSection.style.display = "flex";
  const audio = new Audio("assets/song.mp3");
  audio.loop = true;
  audio.play();
});

