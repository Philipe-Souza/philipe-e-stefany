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
<<<<<<< HEAD

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

=======
>>>>>>> 123ae73a5b3eb35d47e3b925c673af8a4866c26c
const tempoSection = document.getElementById("tempo");
const ceuSection = document.getElementById("ceu");
const authSection = document.getElementById("auth");
const fraseCeu = document.getElementById("frase-ceu");
const allSections = document.querySelectorAll(".content");

// Lista de frases
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
  "Eu troco mil estrelas pra te dar a lua, e tudo que você quiser",
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

<<<<<<< HEAD
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
=======
// Função para carregar uma imagem aleatória
async function carregarImagemAleatoria(imagemAtual = null) {
  try {
    const pastaImagens = storageRef(storage, "images/nos/");
    const arquivos = await listAll(pastaImagens);
>>>>>>> 123ae73a5b3eb35d47e3b925c673af8a4866c26c

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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    exibirSeccao(ceuSection);
    return userCredential.user;
  } catch (error) {
    alert("Código incorreto");
    limparInputs();
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
}

// Configura eventos de inputs
function configurarInputs() {
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) inputs[index - 1].focus();
      if (e.key === "Enter") enviarSenha();
    });
  });
}

// Captura e concatena a senha dos inputs
function enviarSenha() {
  const senha = Array.from(inputs).map(input => input.value).join("");
  loginUser("psouza191@gmail.com", senha);
}

// Verifica o acesso do usuário e gerencia exibição de frases
function verificarAcesso() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      exibirSeccao(ceuSection);

      const userRef = ref(db, `users/${user.uid}/ultimoAcesso`);
      const dataAtual = obterDataAtual();
      const fraseAtual = frases[0];
      const imgNos = document.getElementById("nos-img");

      try {
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
          const imagemInicial = await carregarImagemAleatoria(); // Obtém a primeira imagem
          await set(userRef, { data: dataAtual, frase: fraseAtual, imagem: imagemInicial });
          fraseCeu.textContent = fraseAtual;
          imgNos.src = imagemInicial;
        } else {
          const ultimoAcesso = snapshot.val();

          // Atualiza frase se a data mudou
          if (ultimoAcesso.data !== dataAtual) {
            let novaFrase;
            do {
              novaFrase = frases[Math.floor(Math.random() * frases.length)];
            } while (novaFrase === ultimoAcesso.frase);

            const novaImagem = await carregarImagemAleatoria(ultimoAcesso.imagem); // Gera uma nova imagem diferente da atual
            await set(userRef, { data: dataAtual, frase: novaFrase, imagem: novaImagem });

            fraseCeu.textContent = novaFrase;
            imgNos.src = novaImagem;

          } else {
            fraseCeu.textContent = ultimoAcesso.frase;
            imgNos.src = ultimoAcesso.imagem; // Recarrega a imagem anterior
          }
        }
      } catch (error) {
        console.error("Erro ao acessar o banco de dados:", error);
      }
    } else {
      exibirSeccao(authSection);
      firstInput.focus();
    }
  });
}

// Atualiza o contador de tempo desde uma data específica
function contarDias() {
  function atualizarContador() {
    const dataInicio = new Date(Date.UTC(2024, 8, 9, 18, 5, 0));
    const agora = new Date();
    const diferenca = agora - dataInicio;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
    setTimeout(atualizarContador, 1000);
  }
  atualizarContador();
}

// Desativa cliques em elementos específicos para larguras maiores
function desativarCliques() {
  const largura = window.screen.width;
  if (largura > 700) {
    ceuSection.classList.add("desabilita-cliques");
  }
}

// Exibe a seção desejada
function exibirSeccao(seccao) {
  const largura = window.screen.width;
  if (largura < 700) {
    authSection.style.display = "none";
    ceuSection.style.display = "none";
    tempoSection.style.display = "none";
    seccao.style.display = "flex";
  } else {
    authSection.style.display = "none";
  }
}

<<<<<<< HEAD
function tocarMusica(musica) {
  const audio = new Audio(`assets/${musica}`);
  audio.loop = true;
  audio.play();
};

//chama função inicio ao carregar a pagina
document.addEventListener("DOMContentLoaded", () => {
  inicio();
});
=======
// Limpa os inputs de senha
function limparInputs() {
  inputs.forEach(input => input.value = "");
  firstInput.focus();
}
>>>>>>> 123ae73a5b3eb35d47e3b925c673af8a4866c26c

// Retorna a data no formato YYYY-MM-DD
function obterDataAtual() {
  return new Date().toISOString().split("T")[0];
}

// Evento de clique na seção "ceu"
ceuSection.addEventListener("click", () => {
<<<<<<< HEAD
  ceuSection.style.display = "none";
  tempoSection.style.display = "flex";
=======
  exibirSeccao(tempoSection);
  const audio = new Audio("assets/song.mp3");
  audio.loop = true;
  audio.play();
>>>>>>> 123ae73a5b3eb35d47e3b925c673af8a4866c26c
});

// Inicializa as funcionalidades ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  desativarCliques();
  configurarInputs();
  verificarAcesso();
  contarDias();
});