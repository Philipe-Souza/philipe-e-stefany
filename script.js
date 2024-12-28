// Importações Firebase
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
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";


// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_QqyayWLpCzeC6hyaL72s1zsvux_QLtY",
  authDomain: "stefany-e-philipe.firebaseapp.com",
  databaseURL: "https://stefany-e-philipe-default-rtdb.firebaseio.com",
  projectId: "stefany-e-philipe",
  storageBucket: "stefany-e-philipe.firebasestorage.app",
  messagingSenderId: "754725748316",
  appId: "1:754725748316:web:39699d9e75fefb85f43099",
};

// Inicialização Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Seletores de elementos DOM
const inputs = document.querySelectorAll(".inputs input");
const firstInput = document.getElementById("first-input");
const tempoSection = document.getElementById("tempo");
const ceuSection = document.getElementById("ceu");
const authSection = document.getElementById("auth");
const fraseCeu = document.getElementById("frase-ceu");
const allSections = document.querySelectorAll(".content");
const imgNos = document.getElementById("nos-img");
const playBtn = document.getElementById("play-btn");
var musicaAtual = "Maria.mp3";

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
  "TemSentimento.mp3",
  "MinhaNamorada.mp3"
]

// Função para carregar uma imagem aleatória
async function carregarImagemAleatoria(imagemAtual = null) {
  try {
    const pastaImagens = storageRef(storage, "images/nos/");
    const arquivos = await listAll(pastaImagens);

    if (arquivos.items.length > 0) {
      let novaImagemURL;

      do {
        const imagemAleatoria = arquivos.items[Math.floor(Math.random() * arquivos.items.length)];
        novaImagemURL = await getDownloadURL(imagemAleatoria);
      } while (novaImagemURL === imagemAtual);

      deletarImagemAntiga(imagemAtual);
      return novaImagemURL;
    } else {
      console.warn("Nenhuma imagem encontrada na pasta.");
      return ""; // Retorne uma URL padrão ou vazia, conforme necessário
    }
  } catch (error) {
    console.error("Erro ao carregar uma imagem aleatória:", error);
    return ""; // Retorne uma URL padrão ou vazia, conforme necessário
  }
}

// Função para deletar o arquivo da imagem
async function deletarImagemAntiga(imagemURL) {
  try {
    // Extrai o caminho da imagem da URL
    const caminhoImagem = decodeURIComponent(imagemURL.split('/o/')[1].split('?')[0]);
    console.log("Caminho extraído:", caminhoImagem);

    // Inicializa o Storage e cria a referência usando storageRef
    const storage = getStorage();
    const imagemRef = storageRef(storage, caminhoImagem); // Use storageRef aqui
    console.log("Referência criada:", imagemRef);

    // Deleta o arquivo
    await deleteObject(imagemRef);
    console.log("Arquivo excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o arquivo:", error);
  }
}

// Função para login
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
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
      authSection.style.display = "none";
      ceuSection.style.display = "flex";
      const userId = user.uid; // Obtém o ID único do usuário
      const userRef = ref(db, `users/${userId}/ultimoAcesso`);

      try {
        const snapshot = await get(userRef);
        const dataAtual = obterDataAtual();
        var fraseAtual = "Te encontrar foi como olhar pro céu e encontrar entre todas as estrelas a mais brilhante";

        if (!snapshot.exists()) {
          // Primeiro acesso: salva a data e a frase no Firebase
          const imagemInicial = await carregarImagemAleatoria(); // Obtém a primeira imagem
          await set(userRef, { data: dataAtual, frase: fraseAtual, imagem: imagemInicial, musica: musicaAtual});
          fraseCeu.textContent = fraseAtual;
          imgNos.src = imagemInicial;
        } else {
          const ultimoAcesso = snapshot.val();

          if (ultimoAcesso.data !== dataAtual) {
            // Acessou em um novo dia: atualiza a data, frase, musica e imagem no Firebase

            const novaImagem = await carregarImagemAleatoria(ultimoAcesso.imagem); // Gera uma nova imagem diferente da atual

            do {
              var frase = frases[Math.floor(Math.random() * frases.length)];
            } while (frase === ultimoAcesso.frase);

            do {
              musicaAtual = musicas[Math.floor(Math.random() * musicas.length)];
            } while (musicaAtual === ultimoAcesso.musica);

            await set(userRef, { data: dataAtual, frase: frase, imagem: novaImagem, musica: musicaAtual});
            imgNos.src = novaImagem;
            fraseCeu.textContent = frase; // Exibe no HTML
          } else {
            // Já acessou hoje: exibe a frase atual do banco
            imgNos.src = ultimoAcesso.imagem; // Recarrega a imagem anterior
            fraseCeu.textContent = ultimoAcesso.frase};
            musicaAtual = ultimoAcesso.musica;
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

let audio;
function tocarMusica() {
  if (!audio) {
    audio = new Audio(`assets/${musicaAtual}`);
    audio.loop = true;
  }

  if (audio.paused) {
    audio.play();
  }
};

//chama função inicio ao carregar a pagina
document.addEventListener("DOMContentLoaded", () => {
  inicio();
});

ceuSection.addEventListener("click", () => {
  ceuSection.style.display = "none";
  tempoSection.style.display = "flex";
  tocarMusica();
});

tempoSection.addEventListener("click", () => {
  ceuSection.style.display = "flex";
  tempoSection.style.display = "none";
});

playBtn.addEventListener("click", () => {
  tocarMusica();
  playBtn.style.display = "none";
});


// Retorna a data no formato 'YYYY-MM-DD' no horário local
const obterDataAtual = () => {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};
