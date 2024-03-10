const body = document.querySelector("body");
const podium = document.querySelector(".podium");
const scoreBoard = document.querySelector(".scoreboard");

const avatarHomem = "assets/imgs/avatar-homem.jpg";
const avatarMulher = "assets/imgs/avatar-mulher.jpg";
const upMarker = "assets/imgs/up.svg";
const downMarker = "assets/imgs/down.svg";
const neutralMarker = "assets/imgs/neutral.svg";
let rankingDisplay = document.querySelector(".ranking-display");
let ctnImg = document.querySelectorAll(".ctn-img");
let cardInfo = document.querySelectorAll(".card-info");

ctnImg.forEach((element) => {
    element.addEventListener("click", () => {
        cardInfo.forEach((element) => {
            element.style.display = "flex";
        })
    })
})

function loadLottieAnimation(containerSelector, animationPath) {
    setTimeout(function () {
        var container = document.querySelector(containerSelector);
        if (!container) {
            return;
        }
        bodymovin.loadAnimation({
            container: container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: animationPath,
        });
    }, 100);
}

podium.style.height = "0px";
podium.style.border = "none";

let loaderCtn = document.querySelector(".ranking-loader");

loaderCtn.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    const loaderText = document.querySelector(".loader-text");
    const loader = document.querySelector(".loader");
    const pageRanking = document.querySelector(".page-ranking");

    const messages = ["Ajustando a redinha", "Verificando a raquete", "Preparando saque", "Devolvendo com efeito", "Verificando a mesa"];

    let index = 0;

    function displayMessage() {
        loaderText.textContent = messages[index];
        index = (index + 1) % messages.length;
    }
    const intervalId = setInterval(displayMessage, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
        if (loader.style.display === "flex") {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "auto";
        }
        loader.style.display = "none";
    }, 4500);


    setTimeout(() => {
        pageRanking.style.display = "block";
    }, 5500);
});

function lerJogadores(callback) {
    fetch("players.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao carregar os jogadores");
            }
            return response.json();
        })
        .then((data) => {
            data.sort((a, b) => b.vitorias - a.vitorias);
            callback(null, data);
        })
        .catch((error) => callback(error, null));
}

function atualizarPosicoes(jogadores) {
    Object.keys(jogadores[0].vitorias)
        .sort()
        .forEach((data, index, datas) => {
            jogadores.forEach((jogador) => {
                if (!jogador.marcadores) {
                    jogador.marcadores = {};
                }
            });

            const rankingAtual = gerarRanking(jogadores, data);

            const rankingAnterior = index > 0 ? gerarRanking(jogadores, datas[index - 1]) : null;

            if (rankingAnterior) {
                jogadores.forEach((jogador) => {
                    const posicaoAtual = rankingAtual.findIndex((r) => r.nome === jogador.nome);
                    const posicaoAnterior = rankingAnterior.findIndex((r) => r.nome === jogador.nome);

                    if (posicaoAtual < posicaoAnterior) {
                        jogador.marcadores[data] = upMarker;
                    } else if (posicaoAtual > posicaoAnterior) {
                        jogador.marcadores[data] = downMarker;
                    } else {
                        jogador.marcadores[data] = neutralMarker;
                    }
                });
            } else {
                jogadores.forEach((jogador) => {
                    jogador.marcadores[data] = neutralMarker;
                });
            }
        });
}

function gerarRanking(jogadores, data) {
    return jogadores.slice().sort((a, b) => {
        const totalVitoriasA = calcularTotalVitoriasAteData(a, data);
        const totalVitoriasB = calcularTotalVitoriasAteData(b, data);
        return totalVitoriasB - totalVitoriasA;
    });
}

function calcularTotalVitoriasAteData(jogador, data) {
    let totalVitorias = 0;
    const datas = Object.keys(jogador.vitorias);
    for (const d of datas) {
        if (d <= data) {
            totalVitorias += jogador.vitorias[d];
        }
    }
    return totalVitorias;
}

function atualizarUI(jogadores) {
    loadLottieAnimation(".lottie-one", "assets/json/winner.json");
    loadLottieAnimation(".lottie-two", "assets/json/lottie-2.json");
    loadLottieAnimation(".lottie-three", "assets/json/lottie-3.json");
    loadLottieAnimation(".fire-1", "assets/json/fire-1.json");
    loadLottieAnimation(".fire-2", "assets/json/fire-2.json");
    loadLottieAnimation(".fire-3", "assets/json/fire-3.json");
    loadLottieAnimation(".fire-1-mobile", "assets/json/fire-1.json");
    loadLottieAnimation(".fire-2-mobile", "assets/json/fire-2.json");
    loadLottieAnimation(".fire-3-mobile", "assets/json/fire-3.json");
    loadLottieAnimation(".ping-loader", "assets/json/ping-loader.json");
    loadLottieAnimation(".festa", "assets/json/festa.json");
    
    podium.innerHTML = "";
    scoreBoard.innerHTML = "";
    for (let i = 0; i < jogadores.length; i++) {
        var jogador = jogadores[i];
        const marcadores = jogador.marcadores || {};
        const datas = Object.keys(marcadores);

        datas.sort((a, b) => new Date(a) - new Date(b));

        const marcador = marcadores[datas[datas.length - 1]] || neutralMarker;

        let vitorias = 0;
        for (const data in jogador.vitorias) {
            vitorias += jogador.vitorias[data];
            if (vitorias > 0 || innerWidth > 1024) {
                podium.style.height = "550px";
                podium.style.borderBottom = "4px solid rgb(95, 95, 95)";
            } else {
                podium.style.height = "auto";
                podium.style.borderBottom = "none";
            }
        }
        let totalVitorias = jogador.totalVitorias;

        if (i === 0 && vitorias > 0) {
            const jogadorNome = jogador.nome;
            podium.innerHTML += `
            <div class="col-12 col-lg-3" id="podium">
                <div id="lottie">
                    <div class="card-info">
                        <div><img class="avatar" src="${jogador.avatar}" alt="avatar" /></div>
                        <div class="info">
                            <div class="title">Perfil de ${jogador.nome}</div>
                            <div>Vitórias na carreira: ${totalVitorias}</div>
                            <div>Estilo de jogo: ${jogador.estilo}</div>
                        </div>
                    </div>
                    <div class="fire-1-mobile d-lg-none"></div>
                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i + 1}º</span></div>
                    <div class="festa"></div>
                    <div class="lottie-one lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                            <h4>Vitórias:<br class="d-lg-none"> <span> ${vitorias}</span></h4>
                    </div>
                </div>
            </div>
            <div class="bar col-lg-3">
                <span class="number">${i + 1}º</span>
                <img src="${marcador}" alt="marker" class="marker">
                <div class="fire-1"></div>
            </div>
            `;
        } else if (i === 1 && vitorias > 0) {
            podium.innerHTML += `
            <div class="col-12 col-lg-3" id="podium">
                <div id="lottie">
                    <div class="card-info">
                        <div><img class="avatar" src="${jogador.avatar}" alt="avatar" /></div>
                        <div class="info">
                            <div class="title">Perfil de ${jogador.nome}</div>
                            <div>Vitórias na carreira: ${totalVitorias}</div>
                            <div>Estilo de jogo: ${jogador.estilo}</div>
                        </div>
                    </div>
                    <div class="fire-2-mobile d-lg-none"></div>
                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i + 1}º</span></div>
                    <div class="lottie-two lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                        <h4>Vitórias:<br class="d-lg-none"> <span> ${vitorias}</span></h4>
                        </div>
                </div>
            </div>
            <div class="bar col-lg-3">
                <span class="number">${i + 1}º</span>
                <img src="${marcador}" alt="marker" class="marker">
                <div class="fire-2"></div>
            </div>
        `;
        } else if (i === 2 && vitorias > 0) {
            podium.innerHTML += `
            <div class="col-12 col-lg-3" id="podium">
                <div id="lottie">
                    <div class="card-info">
                        <div><img class="avatar" src="${jogador.avatar}" alt="avatar" /></div>
                        <div class="info">
                            <div class="title">Perfil de ${jogador.nome}</div>
                            <div>Vitórias na carreira: ${totalVitorias}</div>
                            <div>Estilo de jogo: ${jogador.estilo}</div>
                        </div>
                    </div>
                    <div class="fire-3-mobile d-lg-none"></div>
                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i + 1}º</span></div>
                    <div class="lottie-three lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                        <h4>Vitórias:<br class="d-lg-none"> <span> ${vitorias}</span></h4>
                        </div>
                </div>
            </div>
            <div class="bar col-lg-3">
                <span class="number">${i + 1}º</span>
                <img src="${marcador}" alt="marker" class="marker">
                <div class="fire-3"></div>
            </div>
            `;
        } else {
            function content() {
                if (vitorias === 0) {
                    return "-";
                } else {
                    return i + 1 + "º";
                }
            }
            scoreBoard.innerHTML += `
            <div class="score">
                <h4 class="col-lg-2 marker-ctn">
                <img src="${marcador}" alt="marker" class="marker">
                ${content()}</h4>
                <div class="col-lg-4 ctn-img">
                <div class="card-info">
                        <div><img class="avatar" src="${jogador.avatar}" alt="avatar" /></div>
                        <div class="info">
                            <div class="title">Perfil de ${jogador.nome}</div>
                            <div>Vitórias na carreira: ${totalVitorias}</div>
                            <div>Estilo de jogo: ${jogador.estilo}</div>
                        </div>
                    </div>
                    <img class="avatar" src="${jogador.avatar}" alt="avatar" /> 
                    <div>${jogador.nome}</div>
                    
                </div>
                <h4 class="col-lg-4"> ${vitorias}</h4>
            </div>
        `;
        }
    }
    const score = document.querySelectorAll(".score");
    score.forEach((element, index) => {
        if (index === 0 && jogadores.length > 4) {
            element.style.borderRadius = "16px 16px 0 0";
        } else if (index === 0 && jogadores.length <= 4) {
            element.style.borderRadius = "16px 16px 16px 16px";
        }
        if (index % 2 === 0) {
            element.style.backgroundColor = "rgb(128, 128, 128, 0.6)";
        } else {
            element.style.backgroundColor = "rgb(128, 128, 128, 0.8)";
        }
    });
}

lerJogadores((err, jogadores, listaDinamica) => {
    if (err) {
    } else {
        jogadores.sort((a, b) => {
            const totalVitoriasA = Object.values(a.vitorias).reduce((acc, cur) => acc + cur, 0);
            const totalVitoriasB = Object.values(b.vitorias).reduce((acc, cur) => acc + cur, 0);
            return totalVitoriasB - totalVitoriasA;
        });

        var jogadorasFeminino = [];

        var jogadoresMasculino = [];

        var listaDinamica = [];

        jogadores.forEach((jogador) => {
            if (jogador.genero === "feminino") {
                jogadorasFeminino.push(jogador);
            } else if (jogador.genero === "masculino") {
                jogadoresMasculino.push(jogador);
            }
        });


        const btnGeral = document.querySelector(".btn-geral");
        const btnFeminino = document.querySelector(".btn-feminino");
        const btnMasculino = document.querySelector(".btn-masculino");


        btnGeral.addEventListener("click", () => {
            btnGeral.classList.add("active");
            btnFeminino.classList.remove("active");
            btnMasculino.classList.remove("active");
            rankingDisplay.style.opacity = "0";
            loaderCtn.style.display = "grid";
            listaDinamica = [];
            listaDinamica = jogadores;
            atualizarPosicoes(listaDinamica);
            atualizarUI(listaDinamica);
            setTimeout(() => {
                rankingDisplay.style.opacity = "1";
                loaderCtn.style.display = "none";
            }, 500);
        });

        btnFeminino.addEventListener("click", () => {
            btnFeminino.classList.add("active");
            btnMasculino.classList.remove("active");
            btnGeral.classList.remove("active");
            rankingDisplay.style.opacity = "0";
            loaderCtn.style.display = "grid";
            listaDinamica = [];
            listaDinamica = jogadorasFeminino;
            atualizarPosicoes(listaDinamica);
            atualizarUI(listaDinamica);
            setTimeout(() => {
                rankingDisplay.style.opacity = "1";
                loaderCtn.style.display = "none";
            }, 500);
        });
        btnMasculino.addEventListener("click", () => {
            btnMasculino.classList.add("active");
            btnFeminino.classList.remove("active");
            btnGeral.classList.remove("active");
            rankingDisplay.style.opacity = "0";
            loaderCtn.style.display = "grid";
            listaDinamica = [];
            listaDinamica = jogadoresMasculino;
            atualizarPosicoes(listaDinamica);
            atualizarUI(listaDinamica);
            setTimeout(() => {
                rankingDisplay.style.opacity = "1";
                loaderCtn.style.display = "none";
            }, 500);
        });

        atualizarPosicoes(jogadores);
        atualizarUI(jogadores);
    }
});

var animacao;
var toggle = false;
let toggleMenu = document.getElementById('toggle-btn');
let dropDown = document.querySelector('.mobile-dropdown');
let btnMenu = document.querySelectorAll('.btn-menu');

function carregarAnimacao() {
    animacao = bodymovin.loadAnimation({
        container: toggleMenu,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/json/close.json'
    });
    
    document.getElementById('toggle-btn').addEventListener('click', toggleAnimacao);
}

for (let i = 0; i < btnMenu.length; i++) {
    btnMenu[i].addEventListener('click', toggleAnimacao);
}

function toggleAnimacao() {
    if (!toggle) {
        animacao.playSegments([0, 120], true);
        dropDown.classList.remove('inactive-dropdown');
        dropDown.classList.add('active-dropdown');
    } else {
        animacao.playSegments([120, 170], true);
        dropDown.classList.remove('active-dropdown');
        dropDown.classList.add('inactive-dropdown');
    }
    toggle = !toggle;
}
if (window.innerWidth < 1024) {
    carregarAnimacao();
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
        location.reload();
    }
})