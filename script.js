let telaAtual = "tela-inicio";
let xp = 0;
let badges = [];
let progressoAtual = 0;

let acertosPilares = 0;
let desafioPilarAtual = 0;

let comandos = [];
let acertosFase1 = 0;
let jogador = { x: 0, y: 0 };
let objetivo = { x: 4, y: 4 };

let acertosFase2 = 0;
let desafioFluxoAtual = 0;
let respostaFluxo = [];

let acertosFase3 = 0;
let desafioCodigoAtual = 0;

const desafiosPilares = [
  {
    problema: "O Capitão Code precisa preparar a viagem e separa a missão em partes: mapa, tripulação, mantimentos e rota. Qual pilar ele usou?",
    opcoes: ["Decomposição", "Abstração", "Padrões", "Algoritmos"],
    correta: 0,
    explicacao: "Decomposição é dividir uma missão grande em partes menores."
  },
  {
    problema: "A pirata observa que os símbolos de caveira sempre aparecem perto de armadilhas no mapa. Qual pilar aparece aqui?",
    opcoes: ["Algoritmos", "Padrões", "Abstração", "Decomposição"],
    correta: 1,
    explicacao: "Reconhecimento de padrões é perceber repetições e pistas parecidas."
  },
  {
    problema: "No mapa, o pirata ignora desenhos decorativos e olha apenas ilhas, pontes, direção e localização do baú. Qual pilar foi usado?",
    opcoes: ["Padrões", "Algoritmos", "Abstração", "Decomposição"],
    correta: 2,
    explicacao: "Abstração é focar apenas nas informações importantes para resolver o problema."
  },
  {
    problema: "O pergaminho diz: avance duas casas, vire à direita, atravesse a ponte e abra o baú. Qual pilar isso representa?",
    opcoes: ["Abstração", "Padrões", "Decomposição", "Algoritmos"],
    correta: 3,
    explicacao: "Algoritmo é uma sequência de passos para chegar a um resultado."
  }
];

const desafiosFluxo = [
  {
    problema: "Missão: atravessar a ponte da ilha sem cair na armadilha.",
    blocos: ["Observar a ponte", "Verificar se há armadilhas", "Atravessar com cuidado"],
    resposta: ["Observar a ponte", "Verificar se há armadilhas", "Atravessar com cuidado"]
  },
  {
    problema: "Missão: abrir o baú secreto do Capitão Code.",
    blocos: ["Ler a pista", "Digitar a senha do baú", "Girar a chave"],
    resposta: ["Ler a pista", "Digitar a senha do baú", "Girar a chave"]
  },
  {
    problema: "Missão: calcular quantas moedas cada pirata receberá.",
    blocos: ["Contar as moedas", "Contar os piratas", "Dividir as moedas", "Entregar a parte de cada um"],
    resposta: ["Contar as moedas", "Contar os piratas", "Dividir as moedas", "Entregar a parte de cada um"]
  }
];

const desafiosCodigo = [
  {
    problema: "O capitão quer enviar uma mensagem no console do navio. Qual código funciona?",
    opcoes: [
      "console.log('Tesouro à vista!');",
      "mostrar = 'Tesouro à vista!';",
      "printar('Tesouro à vista!');"
    ],
    correta: 0
  },
  {
    problema: "O pirata quer guardar 18 moedas em uma variável chamada moedas. Qual código está correto?",
    opcoes: [
      "moedas == 18;",
      "let moedas = 18;",
      "variavel moedas: 18;"
    ],
    correta: 1
  },
  {
    problema: "O baú só abre se a senha for 'ilha'. Qual código representa essa condição?",
    opcoes: [
      "if (senha === 'ilha') { console.log('Baú aberto'); }",
      "se senha igual ilha então abrir;",
      "senha === ilha = abrir;"
    ],
    correta: 0
  }
];

function trocarTela(id) {
  document.getElementById(telaAtual).classList.remove("ativa");
  document.getElementById(id).classList.add("ativa");
  telaAtual = id;
}

function iniciarJogo() {
  atualizarProgresso(5);
  adicionarBadge("🏴‍☠️ Explorador dos Algoritmos");
  trocarTela("tela-pilares");
}

function irParaJogoPilares() {
  atualizarProgresso(15);
  trocarTela("tela-jogo-pilares");
  carregarPilar();
}

function carregarPilar() {
  document.getElementById("feedback0").textContent = "";

  const desafio = desafiosPilares[desafioPilarAtual];
  document.getElementById("problemaPilar").textContent = desafio.problema;

  const opcoes = document.getElementById("opcoesPilar");
  opcoes.innerHTML = "";

  desafio.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarPilar(index);
    opcoes.appendChild(botao);
  });
}

function verificarPilar(index) {
  const desafio = desafiosPilares[desafioPilarAtual];

  if (index === desafio.correta) {
    xp += 75;
    acertosPilares++;
    desafioPilarAtual++;

    document.getElementById("acertos0").textContent = acertosPilares;
    document.getElementById("feedback0").textContent = "Pista decifrada! " + desafio.explicacao + " +75 XP";
    atualizarXP();

    if (acertosPilares >= 4) {
      setTimeout(() => {
        irParaTeoria1();
      }, 1300);
    } else {
      setTimeout(carregarPilar, 1300);
    }
  } else {
    document.getElementById("feedback0").textContent = "Ainda não. Reveja a pista do mapa e escolha o pilar mais adequado.";
  }
}

function irParaTeoria1() {
  atualizarProgresso(30);
  adicionarBadge("🧩 Mestre da Decomposição");
  trocarTela("tela-teoria1");
}

function irParaFase1() {
  atualizarProgresso(40);
  trocarTela("tela-fase1");
  novoTabuleiro();
}

function irParaTeoria2() {
  atualizarProgresso(60);
  adicionarBadge("🔍 Caçador de Padrões");
  trocarTela("tela-teoria2");
}

function irParaFase2() {
  atualizarProgresso(70);
  trocarTela("tela-fase2");
  carregarFluxograma();
}

function irParaTeoria3() {
  atualizarProgresso(82);
  adicionarBadge("⚙️ Engenheiro de Algoritmos");
  trocarTela("tela-teoria3");
}

function irParaFase3() {
  atualizarProgresso(90);
  trocarTela("tela-fase3");
  carregarCodigo();
}

function obterNivel() {
  if (xp >= 1500) return "Lenda dos Algoritmos";
  if (xp >= 1000) return "Capitão do Código";
  if (xp >= 700) return "Navegador Lógico";
  if (xp >= 400) return "Explorador";
  return "Marinheiro";
}

function adicionarBadge(nome) {
  if (!badges.includes(nome)) {
    badges.push(nome);
    atualizarBadges();
  }
}

function atualizarBadges() {
  const contador = document.getElementById("contadorBadges");
  const final = document.getElementById("badgesFinal");
  if (contador) contador.textContent = badges.length;
  if (final) {
    final.innerHTML = "";
    badges.forEach(badge => {
      const item = document.createElement("span");
      item.classList.add("badge-final");
      item.textContent = badge;
      final.appendChild(item);
    });
  }
}

function atualizarProgresso(valor) {
  progressoAtual = Math.max(progressoAtual, valor);
  const barra = document.getElementById("barraProgresso");
  const texto = document.getElementById("textoProgresso");
  if (barra) barra.style.width = progressoAtual + "%";
  if (texto) texto.textContent = progressoAtual + "% concluído";
}

function atualizarXP() {
  ["xp0", "xp1", "xp2", "xp3", "xpTotal", "xpGlobal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = xp;
  });

  const nivel = obterNivel();
  const nivelGlobal = document.getElementById("nivelGlobal");
  const nivelFinal = document.getElementById("nivelFinal");
  if (nivelGlobal) nivelGlobal.textContent = nivel;
  if (nivelFinal) nivelFinal.textContent = nivel;
  atualizarBadges();
}

function sortearPosicao() {
  return {
    x: Math.floor(Math.random() * 5),
    y: Math.floor(Math.random() * 5)
  };
}

function novoTabuleiro() {
  comandos = [];
  limparComandos();

  jogador = sortearPosicao();
  objetivo = sortearPosicao();

  while (jogador.x === objetivo.x && jogador.y === objetivo.y) {
    objetivo = sortearPosicao();
  }

  desenharTabuleiro();
}

function desenharTabuleiro() {
  const tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");

      if (x === jogador.x && y === jogador.y) {
        celula.classList.add("personagem");
        celula.textContent = "🏴‍☠️";
      } else if (x === objetivo.x && y === objetivo.y) {
        celula.classList.add("objetivo");
        celula.textContent = "💎";
      }

      tabuleiro.appendChild(celula);
    }
  }
}

function adicionarComando(comando) {
  comandos.push(comando);
  const simbolos = {
    cima: "↑",
    baixo: "↓",
    esquerda: "←",
    direita: "→"
  };

  document.getElementById("lista-comandos").textContent =
    comandos.map(c => simbolos[c]).join(" ");
}

function limparComandos() {
  comandos = [];
  document.getElementById("lista-comandos").textContent = "nenhum";
  document.getElementById("feedback1").textContent = "";
}

function executarComandos() {
  let posicaoFinal = { ...jogador };

  comandos.forEach(comando => {
    if (comando === "cima" && posicaoFinal.y > 0) posicaoFinal.y--;
    if (comando === "baixo" && posicaoFinal.y < 4) posicaoFinal.y++;
    if (comando === "esquerda" && posicaoFinal.x > 0) posicaoFinal.x--;
    if (comando === "direita" && posicaoFinal.x < 4) posicaoFinal.x++;
  });

  if (posicaoFinal.x === objetivo.x && posicaoFinal.y === objetivo.y) {
    xp += 100;
    acertosFase1++;
    document.getElementById("acertos1").textContent = acertosFase1;
    document.getElementById("feedback1").textContent = "Rota perfeita! O pirata chegou ao tesouro. +100 XP";
    atualizarXP();

    if (acertosFase1 >= 3) {
      setTimeout(() => {
        irParaTeoria2();
      }, 1000);
    } else {
      setTimeout(novoTabuleiro, 1000);
    }
  } else {
    document.getElementById("feedback1").textContent = "Quase! Ajuste a rota para o pirata não se perder na ilha.";
  }
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function carregarFluxograma() {
  respostaFluxo = [];
  document.getElementById("feedback2").textContent = "";
  document.getElementById("respostaFluxo").innerHTML = "";

  const desafio = desafiosFluxo[desafioFluxoAtual];
  document.getElementById("problemaFluxo").textContent = desafio.problema;

  const opcoes = document.getElementById("opcoesFluxo");
  opcoes.innerHTML = "";

  embaralhar([...desafio.blocos]).forEach(bloco => {
    const botao = document.createElement("button");
    botao.textContent = bloco;
    botao.onclick = () => adicionarBlocoFluxo(bloco);
    opcoes.appendChild(botao);
  });
}

function adicionarBlocoFluxo(bloco) {
  respostaFluxo.push(bloco);

  const item = document.createElement("span");
  item.classList.add("bloco-resposta");
  item.textContent = bloco;
  document.getElementById("respostaFluxo").appendChild(item);
}

function limparFluxograma() {
  respostaFluxo = [];
  document.getElementById("respostaFluxo").innerHTML = "";
  document.getElementById("feedback2").textContent = "";
}

function verificarFluxograma() {
  const desafio = desafiosFluxo[desafioFluxoAtual];
  const correta = JSON.stringify(respostaFluxo) === JSON.stringify(desafio.resposta);

  if (correta) {
    xp += 150;
    acertosFase2++;
    desafioFluxoAtual++;
    document.getElementById("acertos2").textContent = acertosFase2;
    document.getElementById("feedback2").textContent = "Rota organizada com sucesso! +150 XP";
    atualizarXP();

    if (acertosFase2 >= 3) {
      setTimeout(() => {
        irParaTeoria3();
      }, 1000);
    } else {
      setTimeout(carregarFluxograma, 1000);
    }
  } else {
    document.getElementById("feedback2").textContent = "Essa rota ainda leva para uma armadilha. Reorganize os passos.";
  }
}

function carregarCodigo() {
  document.getElementById("feedback3").textContent = "";

  const desafio = desafiosCodigo[desafioCodigoAtual];
  document.getElementById("problemaCodigo").textContent = desafio.problema;

  const opcoes = document.getElementById("opcoesCodigo");
  opcoes.innerHTML = "";

  desafio.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarCodigo(index);
    opcoes.appendChild(botao);
  });
}

function verificarCodigo(index) {
  const desafio = desafiosCodigo[desafioCodigoAtual];

  if (index === desafio.correta) {
    xp += 200;
    acertosFase3++;
    desafioCodigoAtual++;
    document.getElementById("acertos3").textContent = acertosFase3;
    document.getElementById("feedback3").textContent = "Código pirata decifrado! +200 XP";
    atualizarXP();

    if (acertosFase3 >= 3) {
      setTimeout(() => {
        atualizarProgresso(100);
        adicionarBadge("💻 Programador JavaScript");
        adicionarBadge("💎 Guardião do Tesouro");
        trocarTela("tela-final");
        atualizarXP();
      }, 1000);
    } else {
      setTimeout(carregarCodigo, 1000);
    }
  } else {
    document.getElementById("feedback3").textContent = "Esse código não abre o baú. Tente outra opção.";
  }
}

function imprimirCertificado() {
  window.print();
}

function reiniciar() {
  xp = 0;
  badges = [];
  progressoAtual = 0;
  atualizarProgresso(0);
  acertosPilares = 0;
  desafioPilarAtual = 0;
  acertosFase1 = 0;
  acertosFase2 = 0;
  acertosFase3 = 0;
  desafioFluxoAtual = 0;
  desafioCodigoAtual = 0;
  comandos = [];
  respostaFluxo = [];

  document.getElementById("acertos0").textContent = "0";
  document.getElementById("acertos1").textContent = "0";
  document.getElementById("acertos2").textContent = "0";
  document.getElementById("acertos3").textContent = "0";
  document.getElementById("nomeAluno").value = "";

  atualizarXP();
  trocarTela("tela-inicio");
}

atualizarXP();
