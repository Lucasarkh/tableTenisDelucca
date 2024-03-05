const player = document.querySelector(".player");
const podium = document.querySelector(".podium");
const lottie = document.querySelector(".lottie");
const numbers = document.querySelector(".number");
const avatarHomem = "assets/imgs/avatar-homem.jpg";
const avatarMulher = "assets/imgs/avatar-mulher.jpg";
const scoreBoard = document.querySelector(".scoreboard");
const upMarker = 'assets/imgs/up.svg';
const downMarker = 'assets/imgs/down.svg';
const neutralMarker = 'assets/imgs/neutral.svg';

const jogadores = {
    listaJogadores: [],
    addJogador: function (jogador) {
        this.listaJogadores.push(jogador);
    },
};

jogadores.addJogador({
    nome: "Jogador 1",
    vitorias: 0,
    genero: "masculino",
    avatar: getAvatar,
});

jogadores.addJogador({
    nome: "Jogador 2",
    vitorias: 0,
    genero: "feminino",
    avatar: getAvatar,
});

jogadores.addJogador({
    nome: "Jogador 3",
    vitorias: 0,
    genero: "masculino",
    avatar: getAvatar,
});

jogadores.addJogador({
    nome: "Jogador 4",
    vitorias: 0,
    genero: "feminino",
    avatar: getAvatar,
});

jogadores.addJogador({
    nome: "Jogador 5",
    vitorias: 0,
    genero: "masculino",
    avatar: getAvatar,
});
jogadores.addJogador({
    nome: "Jogador 6",
    vitorias: 0,
    genero: "feminino",
    avatar: getAvatar,
});
jogadores.addJogador({
    nome: "Jogador 7",
    vitorias: 0,
    genero: "feminino",
    avatar: getAvatar,
});
jogadores.addJogador({
    nome: "Jogador 8",
    vitorias: 0,
    genero: "feminino",
    avatar: getAvatar,
});
jogadores.addJogador({
    nome: "Jogador 9",
    vitorias: 0,
    genero: "masculino",
    avatar: getAvatar,
});
jogadores.addJogador({
    nome: "Jogador 10",
    vitorias: 1,
    genero: "feminino",
    avatar: getAvatar,
});

function compareByVitorias(a, b) {
    return b.vitorias - a.vitorias; 
}

jogadores.listaJogadores.sort(compareByVitorias);

function getAvatar(genero) {
    if (genero === "masculino") {
        return avatarHomem;
    } else if (genero === "feminino") {
        return avatarMulher;
    }
}

for (let i = 0; i < jogadores.listaJogadores.length; i++) {
    const jogador = jogadores.listaJogadores[i];
    const proximoJogador = jogadores.listaJogadores[i + 1];

    let marker = neutralMarker; 

    if (proximoJogador && jogador.vitorias < proximoJogador.vitorias) {
        marker = downMarker;
    } else if (proximoJogador && jogador.vitorias > proximoJogador.vitorias) {
        marker = upMarker;
    }
    if (i === 0) {
        podium.innerHTML += `
        <div class="col-lg-3" id="podium">
            <div id="lottie">
                <div class="lottie-one lottie"></div>
                <div class="avatar">
                    <img src="${getAvatar(jogador.genero)}" alt="avatar" />
                </div>
                <div class="identificador">
                    <h4 class="nomeJogador">${jogador.nome}</h4>
                    <div class="vitorias">
                        <h4>Vitórias:<span> ${jogador.vitorias}</span></h4>
                </div>
            </div>
        </div>
        <div class="bar col-lg-3">
            <span class="number">${i + 1}º</span>
            <img src="${marker}" alt="marker" class="marker">
            <div class="fire-1"></div>
        </div>
        `;
    } 
    else if (i === 1) {
        podium.innerHTML += `
        <div class="col-lg-3" id="podium">
            <div id="lottie">
                <div class="lottie-two lottie"></div>
                <div class="avatar">
                    <img src="${getAvatar(jogador.genero)}" alt="avatar" />
                </div>
                <div class="identificador">
                    <h4 class="nomeJogador">${jogador.nome}</h4>
                    <div class="vitorias">
                        <h4>Vitórias:<span> ${jogador.vitorias}</span></h4>
                </div>
            </div>
        </div>
        <div class="bar col-lg-3">
            <span class="number">${i + 1}º</span>
            <img src="${marker}" alt="marker" class="marker">
            <div class="fire-2"></div>
        </div>
    `;
    } 
    else if (i === 2) {
        podium.innerHTML += `
        <div class="col-lg-3" id="podium">
            <div id="lottie">
                <div class="lottie-three lottie"></div>
                <div class="avatar">
                    <img src="${getAvatar(jogador.genero)}" alt="avatar" />
                </div>
                <div class="identificador">
                    <h4 class="nomeJogador">${jogador.nome}</h4>
                    <div class="vitorias">
                        <h4>Vitórias:<span> ${jogador.vitorias}</span></h4>
                </div>
            </div>
        </div>
        <div class="bar col-lg-3">
            <span class="number">${i + 1}º</span>
            <img src="${marker}" alt="marker" class="marker">
            <div class="fire-3"></div>
        </div>
        `;
    } 
    else {
        scoreBoard.innerHTML += `
        <div class="score">
            <h4 class="col-lg-2 marker-ctn"><img src="${marker}" alt="marker" class="marker">${i + 1}º</h4>
            <div class="col-lg-4 ctn-img"><img class="avatar" src="${getAvatar(jogador.genero)}" alt="avatar" /> ${jogador.nome}</div>
            <h4 class="col-lg-4">${jogador.vitorias}</h4>
        </div>
    `;
    }
}
const score = document.querySelectorAll(".score");

score.forEach((element, index) => {
    if (index === 0) {
        element.style.borderRadius = "16px 16px 0 0";
    }
    if (index % 2 === 0) {
        element.style.backgroundColor = "rgb(128, 128, 128, 0.6)";
    } else {
        element.style.backgroundColor = "rgb(128, 128, 128, 0.8)";
    }
});



var svgContainer = document.querySelector(".lottie-one");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/lottie-1.json",
});
var svgContainer = document.querySelector(".lottie-two");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/lottie-2.json",
});
var svgContainer = document.querySelector(".lottie-three");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/lottie-3.json",
});

var svgContainer = document.querySelector(".fire-1");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/fire-1.json",
});
var svgContainer = document.querySelector(".fire-2");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/fire-2.json",
});
var svgContainer = document.querySelector(".fire-3");
var object = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: "svg",
    loop: true,
    path: "assets/json/fire-3.json",
});
