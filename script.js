// Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

// Seletores de elementos DOM
const inputs = document.querySelectorAll(".inputs input");
const firstInput = document.getElementById("first-input");
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

// Função para login
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user);
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

      try {
        const snapshot = await get(userRef);
        const dataAtual = obterDataAtual();
        const fraseAtual = frases[0];

        if (!snapshot.exists()) {
          await set(userRef, { data: dataAtual, frase: fraseAtual });
          fraseCeu.textContent = fraseAtual;
        } else {
          const ultimoAcesso = snapshot.val();
          if (ultimoAcesso.data !== dataAtual) {
            let novaFrase;
            do {
              novaFrase = frases[Math.floor(Math.random() * frases.length)];
            } while (novaFrase === ultimoAcesso.frase);

            await set(userRef, { data: dataAtual, frase: novaFrase });
            fraseCeu.textContent = novaFrase;
          } else {
            fraseCeu.textContent = ultimoAcesso.frase;
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
  if(largura > 700){
    ceuSection.classList.add("desabilita-cliques"); 
  }
}

// Exibe a seção desejada
function exibirSeccao(seccao) {
  const largura = window.screen.width;
  if(largura < 700){
    authSection.style.display = "none";
    ceuSection.style.display = "none";
    tempoSection.style.display = "none";
    seccao.style.display = "flex";
  }else{
    authSection.style.display = "none";
  }
}

// Limpa os inputs de senha
function limparInputs() {
  inputs.forEach(input => input.value = "");
  firstInput.focus();
}

// Retorna a data no formato YYYY-MM-DD
function obterDataAtual() {
  return new Date().toISOString().split("T")[0];
}

// Evento de clique na seção "ceu"
ceuSection.addEventListener("click", () => {
  exibirSeccao(tempoSection);
  const audio = new Audio("assets/song.mp3");
  audio.loop = true;
  audio.play();
});

// Inicializa as funcionalidades ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  desativarCliques();
  configurarInputs();
  verificarAcesso();
  contarDias();
});