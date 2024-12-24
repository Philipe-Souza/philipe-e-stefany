import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_QqyayWLpCzeC6hyaL72s1zsvux_QLtY",
  authDomain: "stefany-e-philipe.firebaseapp.com",
  databaseURL: "https://stefany-e-philipe-default-rtdb.firebaseio.com",
  projectId: "stefany-e-philipe",
  storageBucket: "stefany-e-philipe.firebasestorage.app",
  messagingSenderId: "754725748316",
  appId: "1:754725748316:web:39699d9e75fefb85f43099",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const inputs = document.querySelectorAll(".inputs input");
const firstInput = document.getElementById("first-input");

// Função para login
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuário logado:", userCredential.user);
    authSection.style.display = 'none';
    ceuSection.style.display = 'flex';
    return userCredential.user;
  } catch (error) {
    alert("codigo incorreto");
    inputs.forEach((input) => {
      input.value = "";
      firstInput.focus();
    });
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
}

// Função para gerenciar o foco entre os campos de entrada e enviar ao pressionar Enter
function configurarInputs() {
  inputs.forEach((input, index) => {
    // Mover para o próximo campo ao digitar
    input.addEventListener("input", () => {
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    // Lidar com o Backspace e Enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }

      if (e.key === "Enter") {
        send();
      }
    });
  });
}

// Configurar inputs
configurarInputs();

// Captura e verifica texto digitado no input indicado
function send() {
  let pass = "";

  inputs.forEach((input) => {
    pass += input.value; // Concatena o valor de cada campo
  });

  // chama a função para logar
  loginUser("psouza191@gmail.com", pass);
}

// Função para verificar o acesso
const verificarAcesso = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      ceuSection.style.display = "flex";
      const userId = user.uid; // Obtém o ID único do usuário
      const userRef = ref(db, `users/${userId}/ultimoAcesso`);

      try {
        const snapshot = await get(userRef);
        const dataAtual = obterDataAtual();
        var fraseAtual = "Te encontrar foi como olhar pro céu e encontrar entre todas as estrelas a mais brilhante";
        var musicaAtual = "Maria.mp3";

        if (!snapshot.exists()) {
          // Primeiro acesso: salva a data e a frase no Firebase
          fraseCeu.textContent = fraseAtual;
          tocarMusica(musicaAtual); // toca musica
          await set(userRef, { data: dataAtual, frase: fraseAtual, musica: musicaAtual});
        } else {
          const ultimoAcesso = snapshot.val();

          if (ultimoAcesso.data !== dataAtual) {
            // Acessou em um novo dia: atualiza a data e frase no Firebase
            do {
              var frase = frases[Math.floor(Math.random() * frases.length)];
            } while (frase === ultimoAcesso.frase);

            // Acessou em um novo dia: atualiza a data e frase no Firebase
            do {
              var music = musicas[Math.floor(Math.random() * frases.length)];
            } while (music === ultimoAcesso.musica);

            await set(userRef, { data: dataAtual, frase: frase, musica: music});
            fraseCeu.textContent = frase; // Exibe no HTML
            tocarMusica(music); // toca musica
          } else {
            // Já acessou hoje: exibe a frase atual do banco
            fraseCeu.textContent = ultimoAcesso.frase};
            tocarMusica(ultimoAcesso.musica); // toca musica
            
          }
      } catch (error) {
        console.error("Erro ao acessar o banco de dados:", error);
      }
    } else {
      authSection.style.display = "flex";
      firstInput.focus();
    }
  });
};

const tempoSection = document.getElementById("tempo");
const ceuSection = document.getElementById("ceu");
const authSection = document.getElementById("auth");

const allSections = document.querySelectorAll(".content");

const nosImg = document.getElementById("nos-img");
const fraseCeu = document.getElementById("frase-ceu");

const frases = [
  "Te encontrar foi como olhar pro céu e encontrar entre todas as estrelas a mais brilhante",
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

const musicas = [
  "AmorLivre.mp3",
  "Incondicional.mp3",
  "Maria.mp3",
  "TantosOlharesPorAi.mp3",
  "TemSentimento.mp3"
]

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

function inicio() {
  verificarAcesso(); // verifica acesso atualiza conteudos se for um dia diferente
  desativarCliques(); //se a tela for de computador
  contarDias();
}

function tocarMusica(musica) {
  const audio = new Audio(`assets/${musica}`);
  audio.loop = true;
  audio.play();
};

//chama função inicio ao carregar a pagina
document.addEventListener("DOMContentLoaded", () => {
  inicio();
});

ceuSection.addEventListener("click", () => {
  ceuSection.style.display = "none";
  tempoSection.style.display = "flex";
});

// Retorna a data no formato 'YYYY-MM-DD'
const obterDataAtual = () => {
  const data = new Date();
  return data.toISOString().split("T")[0]; 
};