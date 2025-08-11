const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

const telaInicial = document.querySelector(".tela-inicial");
const telaJogo = document.querySelector(".tela-jogo");
const telaResultado = document.querySelector(".caixa-resultado");
const btnIniciar = document.querySelector("#btnIniciar");
const btnReiniciar = document.querySelector("#btnReiniciar");
const nomeInput = document.querySelector("#nomeJogador");

let nomeJogador = "";
let atual = 0;
let historiaFinal = "";
let pontosSaudaveis = 0;

const perguntas = [
  {
    enunciado: (nome) => `${nome}, você acorda e percebe que dormiu pouco por ficar no celular. O que faz?`,
    alternativas: [
      { texto: "Levanto mesmo cansado(a) e sigo o dia.", afirmacao: "Começou o dia mais cansado(a).", pontos: 0 },
      { texto: "Decido dormir mais cedo nas próximas noites.", afirmacao: "Aprendeu que o sono é importante.", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `No café da manhã, ${nome} sente fome. O que escolhe?`,
    alternativas: [
      { texto: "Salgadinho e refrigerante da cantina.", afirmacao: "Escolha rápida, mas pouco nutritiva.", pontos: 0 },
      { texto: "Fruta ou sanduíche natural.", afirmacao: "Se alimentou bem e ganhou energia.", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `Durante o intervalo, ${nome} vê os amigos no celular. Você decide...`,
    alternativas: [
      { texto: "Ficar no celular também.", afirmacao: "Ficou parado e sem movimento.", pontos: 0 },
      { texto: "Dar uma volta ou se movimentar.", afirmacao: "Sentiu-se mais disposto(a).", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `Após as aulas, ${nome} pode...`,
    alternativas: [
      { texto: "Ficar deitado(a) no sofá o dia todo.", afirmacao: "Sedentarismo dominou seu dia.", pontos: 0 },
      { texto: "Praticar alguma atividade física.", afirmacao: "Ganhou disposição e alegria.", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `À noite, ${nome} está ansioso(a). O que faz?`,
    alternativas: [
      { texto: "Ficar no celular até tarde.", afirmacao: "Dormiu mal e acordou cansado(a).", pontos: 0 },
      { texto: "Fazer algo relaxante.", afirmacao: "Dormiu bem e acordou renovado(a).", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `${nome}, no almoço de domingo, há várias opções...`,
    alternativas: [
      { texto: "Comer muito fast-food.", afirmacao: "Se sentiu pesado(a) depois.", pontos: 0 },
      { texto: "Montar um prato equilibrado.", afirmacao: "Se sentiu bem e leve.", pontos: 1 }
    ]
  },
  {
    enunciado: (nome) => `${nome} tem tempo livre à tarde. O que faz?`,
    alternativas: [
      { texto: "Maratonar séries sem parar.", afirmacao: "Ficou muito tempo sentado(a).", pontos: 0 },
      { texto: "Sair para caminhar.", afirmacao: "Teve mais energia e bom humor.", pontos: 1 }
    ]
  }
];

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  const perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado(nomeJogador);
  caixaAlternativas.innerHTML = "";

  perguntaAtual.alternativas.forEach(alternativa => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => {
      historiaFinal += alternativa.afirmacao + " ";
      pontosSaudaveis += alternativa.pontos;
      atual++;
      mostraPergunta();
    });
    caixaAlternativas.appendChild(botao);
  });
}

function mostraResultado() {
  telaJogo.style.display = "none";
  telaResultado.style.display = "block";

  let mensagemFinal = "";

  if (pontosSaudaveis <= 2) {
    mensagemFinal = `${nomeJogador}, você fez muitas escolhas pouco saudáveis. No futuro, poderá sentir os impactos disso.`;
  } else if (pontosSaudaveis <= 4) {
    mensagemFinal = `${nomeJogador}, você fez algumas boas escolhas, mas ainda pode melhorar seu estilo de vida.`;
  } else {
    mensagemFinal = `${nomeJogador}, parabéns! Suas escolhas mostram um futuro muito saudável e equilibrado.`;
  }

  textoResultado.textContent = historiaFinal + " " + mensagemFinal;
}

btnIniciar.addEventListener("click", () => {
  nomeJogador = nomeInput.value.trim() || "Jogador";
  telaInicial.style.display = "none";
  telaJogo.style.display = "block";
  atual = 0;
  historiaFinal = "";
  pontosSaudaveis = 0;
  mostraPergunta();
});

btnReiniciar.addEventListener("click", () => {
  telaResultado.style.display = "none";
  telaInicial.style.display = "block";
});
