// ====================== IMPORTAÇÕES FIREBASE ======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getStorage, ref as storageRef, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

// ====================== CONFIGURAÇÃO FIREBASE ======================
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
const storage = getStorage(app);

// ====================== ELEMENTOS DOM ======================
const inputs = document.querySelectorAll(".inputs input");
const firstInput = document.getElementById("first-input");
const tempoSection = document.getElementById("tempo");
const ceuSection = document.getElementById("ceu");
const authSection = document.getElementById("auth");
const fraseCeu = document.getElementById("frase-ceu");
const allSections = document.querySelectorAll(".content");
const imgNos = document.getElementById("nos-img");
const playBtn = document.getElementById("play-btn");
let musicaAtual = "Maria.mp3";

// ====================== DADOS ======================
const frases = [
  "Te encontrar foi como olhar pro céu e encontrar entre todas as estrelas a mais brilhante",
  "Voce coloriu minha vida cinza amor",
  "E a cada sorriso seu meu mundo ganha mais cor",
  "Tenho certeza que vamos conquistar nossos sonhos",
  "Sortudo sou eu. Sete bilhões de pessoas no mundo. E você me escolheu.",
  "Se o amor bateu na nossa porta, que sorte a nossa",
  "Tava escrito nas estrelas que eu ia encontrar você",
  "...Mudou de tal maneira, nossa vida já não é a mesma",
  "Ser herói de alguém e, melhor ainda, ter do lado a Mulher Maravilha",
  "Me diz quem não fica louco nesse jeito meigo bobo seu",
  "Pra falar a verdade eu acho que já te conhecia de outras vidas",
  "Pra falar a verdade eu acho que na última vida eu também te queria",
  "Você me libertou, por favor fique",
  "Eu troco mil estrelas pra te dar a lua, tudo que você quiser",
  "Você é um sonhe que se realizou",
  "Não importa quanto tempo passe, eu sempre fico bobo com seu sorriso",
  "Nunca vou esquecer nosso dia 09/09/2024",
  "Você é incrivel, maravilhosa, perfeita, minha namorada",
  "Eu amo nossos momentos juntos",
  "E os anjos cantam nosso amor",
  "Eu teamo, em cada detalhe, em cada momento, a cada batida do meu coração",
  "Anota ai, eu ainda vou me casar com você",
  "Você é minha princesa",
  "Sonho com nossa casinha, nossos filhos e bichinhos",
  "Quero ser sempre o motivo do seu sorriso, te fazer feliz é o que me deixa felix",
  "Cuidar, amar e respeitar. Eu prometo"
];

const musicas = [
  "daquiPraFrente.mp3",
  "modoObsceno.mp3",
  "prefiroVoce.mp3",
  "princesinhaMandona.mp3",
  "vemPraMinhaVida.mp3"
];

// ====================== FUNÇÕES FIREBASE ======================
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

      return novaImagemURL;
    } else {
      console.warn("Nenhuma imagem encontrada na pasta.");
      return "";
    }
  } catch (error) {
    console.error("Erro ao carregar uma imagem aleatória:", error);
    return "";
  }
}

// ====================== SALVAR ULTIMO ACESSO ======================
async function salvarUltimoAcesso(frase, imagem, musica) {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const userRef = ref(db, `users/${userId}/ultimoAcesso`);
    const dataAtual = obterDataAtual();
    const horaAtual = new Date().getHours();

    await set(userRef, {
      data: dataAtual,
      hora: horaAtual,
      frase,
      imagem,
      musica
    });
  } catch (error) {
    console.error("Erro ao salvar último acesso:", error);
  }
}

// ====================== LOGIN ======================
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    authSection.style.display = 'none';
    ceuSection.style.display = 'flex';
    return userCredential.user;
  } catch (error) {
    alert("Código incorreto");
    inputs.forEach(input => input.value = "");
    firstInput.focus();
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
}

// ====================== INPUTS ======================
function configurarInputs() {
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
    });
    input.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !input.value && index > 0) inputs[index - 1].focus();
      if (e.key === "Enter") send();
    });
  });
}

function send() {
  let pass = "";
  inputs.forEach(input => pass += input.value);
  loginUser("psouza191@gmail.com", pass);
}

configurarInputs();

// ====================== MÚSICA ======================
let audio;
function tocarMusica() {
  if (!audio) {
    audio = new Audio(`assets/${musicaAtual}`);
    audio.loop = true;
    audio.play();
  } else if (audio.src !== `${location.origin}/assets/${musicaAtual}`) {
    audio.pause();
    audio = new Audio(`assets/${musicaAtual}`);
    audio.loop = true;
    audio.play();
  } else if (audio.paused) {
    audio.play();
  }
}

// ====================== FUNÇÃO DE ATUALIZAÇÃO ======================
async function atualizarConteudo(ultimoAcesso, horaAtualSimulada = null) {
  const horaAtual = horaAtualSimulada ?? new Date().getHours();
  const dataAtual = obterDataAtual();
  const ultimoAcessoHora = ultimoAcesso.hora || 0;

  // Atualiza DOM com dados salvos
  imgNos.src = ultimoAcesso.imagem || "";
  fraseCeu.textContent = ultimoAcesso.frase || frases[0];
  musicaAtual = ultimoAcesso.musica || musicaAtual;
  tocarMusica();

  // Verifica se precisa atualizar para novo dia ou hora >= 19
  const dataUltimoAcesso = new Date(ultimoAcesso.data + "T00:00:00");
  const dataHoje = new Date(dataAtual + "T00:00:00");
  let precisaAtualizar = false;

  if (dataUltimoAcesso < new Date(dataHoje.getTime() - 24*60*60*1000)) precisaAtualizar = true;
  else if (dataUltimoAcesso.getTime() === new Date(dataHoje.getTime() - 24*60*60*1000).getTime() && ultimoAcessoHora < 19) precisaAtualizar = true;
  else if (ultimoAcesso.data === dataAtual && horaAtual >= 19 && ultimoAcessoHora < 19) precisaAtualizar = true;

  if (precisaAtualizar) {
    // Pré-carrega nova imagem, frase e música
    const novaImagem = await carregarImagemAleatoria(ultimoAcesso.imagem);
    let frase;
    do { frase = frases[Math.floor(Math.random()*frases.length)]; } while(frase===ultimoAcesso.frase);
    do { musicaAtual = musicas[Math.floor(Math.random()*musicas.length)]; } while(musicaAtual===ultimoAcesso.musica);

    // Atualiza DOM
    imgNos.src = novaImagem;
    fraseCeu.textContent = frase;
    tocarMusica();
  }

  // 🔹 Sempre salva último acesso (mesmo que nada mude)
  await salvarUltimoAcesso(fraseCeu.textContent, imgNos.src, musicaAtual);
}

// ====================== VERIFICAR ACESSO ======================
const verificarAcesso = () => {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      authSection.style.display = "flex";
      firstInput.focus();
      return;
    }

    authSection.style.display = "none";
    ceuSection.style.display = "flex";

    const userRef = ref(db, `users/${user.uid}/ultimoAcesso`);
    try {
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // Primeiro acesso → inicializa
        const dataAtual = obterDataAtual();
        const horaAtual = new Date().getHours();
        const fraseAtual = frases[0];
        const imagemInicial = await carregarImagemAleatoria();
        imgNos.src = imagemInicial;
        fraseCeu.textContent = fraseAtual;

        await salvarUltimoAcesso(fraseAtual, imagemInicial, musicaAtual);
      } else {
        // Se já existe, atualiza normalmente
        await atualizarConteudo(snapshot.val());
      }

    } catch (error) {
      console.error("Erro ao acessar o banco de dados:", error);
    }
  });
};

// ====================== CONTADOR ======================
const contarDias = () => {
  const dataInicio = new Date(2024, 8, 9, 18, 0, 0);
  let ultimoDiasContador = null;

  function atualizarContador() {
    const agora = new Date();
    let diferenca = agora - dataInicio;
    if (diferenca < 0) diferenca = 0;

    const msPorDia = 24 * 60 * 60 * 1000;
    const msPorHora = 60 * 60 * 1000;
    const msPorMinuto = 60 * 1000;
    const msPorSegundo = 1000;

    const dias = Math.floor(diferenca / msPorDia);
    const restanteDepoisDosDias = diferenca % msPorDia;

    const horas = Math.floor(restanteDepoisDosDias / msPorHora);
    const restanteDepoisDasHoras = restanteDepoisDosDias % msPorHora;

    const minutos = Math.floor(restanteDepoisDasHoras / msPorMinuto);
    const segundos = Math.floor((restanteDepoisDasHoras % msPorMinuto) / msPorSegundo);

    document.getElementById(
      "days"
    ).innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;

    const agoraHora = agora.getHours();
    if (ultimoDiasContador === null) {
      ultimoDiasContador = dias;
    } else if (dias > ultimoDiasContador || (agoraHora === 18 && ultimoDiasContador === dias)) {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = ref(db, `users/${userId}/ultimoAcesso`);
        get(userRef).then(snapshot => {
          if (snapshot.exists()) {
            atualizarConteudo(snapshot.val());
          }
        });
      }
      ultimoDiasContador = dias;
    }

    setTimeout(atualizarContador, 1000);
  }

  atualizarContador();
};

// ====================== DESATIVAR CLIQUES ======================
const desativarCliques = () => {
  const largura = window.screen.width;
  if (largura > 500) {
    allSections.forEach(section => section.classList.add("desabilita-cliques"));
  } else {
    allSections.forEach(section => section.classList.remove("desabilita-cliques"));
  }
};

// ====================== INÍCIO ======================
function inicio() {
  verificarAcesso();
  desativarCliques();
  contarDias();
}

// ====================== EVENTOS ======================
document.addEventListener("DOMContentLoaded", () => inicio());
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

// ====================== AUXILIARES ======================
const obterDataAtual = () => {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};