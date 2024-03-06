const player = document.querySelector(".player");
const podium = document.querySelector(".podium");
const lottie = document.querySelector(".lottie");
const numbers = document.querySelector(".number");
const avatarHomem = "assets/imgs/avatar-homem.jpg";
const avatarMulher = "assets/imgs/avatar-mulher.jpg";
const scoreBoard = document.querySelector(".scoreboard");
const upMarker = "assets/imgs/up.svg";
const downMarker = "assets/imgs/down.svg";
const neutralMarker = "assets/imgs/neutral.svg";
const markerCtn = document.querySelectorAll(".marker-ctn");

podium.style.height = "0px";
podium.style.border = "none";
setTimeout(() => {
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
}, 100);


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
            console.log(`Processando data ${data}`);

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
                    console.log(`Jogador ${jogador.nome} na data ${data}: Posição ${posicaoAtual + 1}`);

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
    for (let i = 0; i < jogadores.length; i++) {
        const jogador = jogadores[i];
        const marcadores = jogador.marcadores || {};
        const datas = Object.keys(marcadores);
        

        datas.sort((a, b) => new Date(a) - new Date(b));

        const marcador = marcadores[datas[datas.length - 1]] || neutralMarker;

        let totalVitorias = 0;
        for (const data in jogador.vitorias) {
            totalVitorias += jogador.vitorias[data];
            if (totalVitorias > 0) {
                podium.style.height = "540px";
                podium.style.borderBottom = "4px solid rgb(95, 95, 95)";
                
            }
        }
        if (i === 0 && totalVitorias > 0) {
            const jogadorNome = jogador.nome;
            podium.innerHTML += `
            <div class="col-lg-3" id="podium">
                <div id="lottie">
                    <div class="festa"></div>
                    <div class="lottie-one lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                            <h4>Vitórias:<span> ${totalVitorias}</span></h4>
                    </div>
                </div>
            </div>
            <div class="bar col-lg-3">
                <span class="number">${i + 1}º</span>
                <img src="${marcador}" alt="marker" class="marker">
                <div class="fire-1"></div>
            </div>
            `;
        } else if (i === 1 && totalVitorias > 0) {
            podium.innerHTML += `
            <div class="col-lg-3" id="podium">
                <div id="lottie">
                    <div class="lottie-two lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                            <h4>Vitórias:<span> ${totalVitorias}</span></h4>
                    </div>
                </div>
            </div>
            <div class="bar col-lg-3">
                <span class="number">${i + 1}º</span>
                <img src="${marcador}" alt="marker" class="marker">
                <div class="fire-2"></div>
            </div>
        `;
        } else if (i === 2 && totalVitorias > 0) {
            podium.innerHTML += `
            <div class="col-lg-3" id="podium">
                <div id="lottie">
                    <div class="lottie-three lottie"></div>
                    <div class="avatar">
                        <img src="${jogador.avatar}" alt="avatar" />
                    </div>
                    <div class="identificador">
                        <h4 class="nomeJogador">${jogador.nome}</h4>
                        <div class="vitorias">
                            <h4>Vitórias:<span> ${totalVitorias}</span></h4>
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
            function content (){
                if (totalVitorias === 0) {
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
                <div class="col-lg-4 ctn-img"><img class="avatar" src="${jogador.avatar}" alt="avatar" /> ${jogador.nome}</div>
                <h4 class="col-lg-4"> ${totalVitorias}</h4>
            </div>
        `;
        }
    }
}



lerJogadores((err, jogadores) => {
    if (err) {
        console.error("Erro ao ler os dados dos jogadores:", err);
    } else {
        console.log("Dados dos jogadores:", jogadores);
        jogadores.sort((a, b) => {
            const totalVitoriasA = Object.values(a.vitorias).reduce((acc, cur) => acc + cur, 0);
            const totalVitoriasB = Object.values(b.vitorias).reduce((acc, cur) => acc + cur, 0);
            return totalVitoriasB - totalVitoriasA;
        });
        atualizarPosicoes(jogadores);
        atualizarUI(jogadores);
    }
});



function loadLottieAnimation(containerSelector, animationPath) {
    setTimeout(function () {
        var container = document.querySelector(containerSelector);
        if (!container) {
            console.error("Container não encontrado:", containerSelector);
            return;
        }
        bodymovin.loadAnimation({
            container: container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: animationPath,
        });
    }, 1000);
}

loadLottieAnimation(".lottie-one", "assets/json/winner.json");
loadLottieAnimation(".lottie-two", "assets/json/lottie-2.json");
loadLottieAnimation(".lottie-three", "assets/json/lottie-3.json");
loadLottieAnimation(".fire-1", "assets/json/fire-1.json");
loadLottieAnimation(".fire-2", "assets/json/fire-2.json");
loadLottieAnimation(".fire-3", "assets/json/fire-3.json");
loadLottieAnimation(".ping-loader", "assets/json/ping-loader.json");
loadLottieAnimation(".festa", "assets/json/festa.json");

window.onload = function () {
    const loader = document.querySelector(".loader");
    const body = document.querySelector("body");
    const pageRanking = document.querySelector(".page-ranking");
    setTimeout(() => {
        if (loader.style.display === "flex") {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "auto";
        }
        loader.style.display = "none";
        pageRanking.style.display = "block";
    }, 2000);
};
