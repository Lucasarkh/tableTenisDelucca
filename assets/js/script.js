const body=document.querySelector("body");let podium=document.querySelector(".podium");const scoreBoard=document.querySelector(".scoreboard"),avatarHomem="assets/imgs/avatar-homem.jpg",avatarMulher="assets/imgs/avatar-mulher.jpg",upMarker="assets/imgs/up.svg",downMarker="assets/imgs/down.svg",neutralMarker="assets/imgs/neutral.svg";let rankingDisplay=document.querySelector(".ranking-display"),ctnImg=document.querySelectorAll(".ctn-img"),cardInfo=document.querySelectorAll(".card-info"),navBar=document.querySelector("nav"),pageRodada=document.querySelector(".page-rodada"),pageRanking=document.querySelector(".page-ranking"),loaderCtn=document.querySelector(".ranking-loader"),tittle=document.querySelector(".tittle"),rankingCtn=document.querySelector(".ranking-ctn");function lerRodadas(a){fetch("rodadas.json").then((a=>{if(!a.ok)throw new Error("Erro ao carregar as rodadas");return a.json()})).then((e=>a(null,e))).catch((e=>a(e,null)))}function loadLottieAnimation(a,e){setTimeout((function(){var n=document.querySelector(a);n&&bodymovin.loadAnimation({container:n,renderer:"svg",loop:!0,autoplay:!0,path:e})}),100)}function lerJogadores(a){fetch("players.json").then((a=>{if(!a.ok)throw new Error("Erro ao carregar os jogadores");return a.json()})).then((e=>{e.sort(((a,e)=>e.vitorias-a.vitorias)),a(null,e)})).catch((e=>a(e,null)))}function atualizarPosicoes(a){Object.keys(a[0].vitorias).sort().forEach(((e,n,i)=>{a.forEach((a=>{a.marcadores||(a.marcadores={})}));const o=gerarRanking(a,e),t=n>0?gerarRanking(a,i[n-1]):null;t?a.forEach((a=>{const n=o.findIndex((e=>e.nome===a.nome)),i=t.findIndex((e=>e.nome===a.nome));a.marcadores[e]=n<i?upMarker:n>i?downMarker:neutralMarker})):a.forEach((a=>{a.marcadores[e]=neutralMarker}))}))}function gerarRanking(a,e){return a.slice().sort(((a,n)=>{const i=calcularTotalVitoriasAteData(a,e);return calcularTotalVitoriasAteData(n,e)-i}))}function calcularTotalVitoriasAteData(a,e){let n=0;const i=Object.keys(a.vitorias);for(const o of i)o<=e&&(n+=a.vitorias[o]);return n}function atualizarUI(a){loadLottieAnimation(".lottie-one","assets/json/winner.json"),loadLottieAnimation(".lottie-two","assets/json/lottie-2.json"),loadLottieAnimation(".lottie-three","assets/json/lottie-3.json"),loadLottieAnimation(".fire-1","assets/json/fire-1.json"),loadLottieAnimation(".fire-2","assets/json/fire-2.json"),loadLottieAnimation(".fire-3","assets/json/fire-3.json"),loadLottieAnimation(".fire-1-mobile","assets/json/fire-1.json"),loadLottieAnimation(".fire-2-mobile","assets/json/fire-2.json"),loadLottieAnimation(".fire-3-mobile","assets/json/fire-3.json"),loadLottieAnimation(".ping-loader","assets/json/ping-loader.json"),loadLottieAnimation(".festa","assets/json/festa.json"),podium.innerHTML="",scoreBoard.innerHTML="";for(let i=0;i<a.length;i++){var e=a[i];const o=e.marcadores||{},t=Object.keys(o);t.sort(((a,e)=>new Date(a)-new Date(e)));const s=o[t[t.length-1]]||neutralMarker;let r=0;for(const d in e.vitorias)r+=e.vitorias[d];console.log(a[0].vitorias),a[0].vitorias[t[t.length-1]]>0?(podium.style.height="550px",podium.style.borderBottom="4px solid rgb(95, 95, 95)",tittle.style.marginTop="32px"):0===a[0].vitorias[t[t.length-1]]?(podium.style.height="0px",tittle.style.marginTop="0",podium.style.borderBottom="none"):(podium.style.height="auto",podium.style.borderBottom="none");let l=e.totalVitorias;if(0===i&&r>0){e.nome;podium.innerHTML+=`\n            <div class="col-12 col-lg-3" id="podium">\n                <div id="lottie">\n                    <div class="card-info">\n                        <div><img class="avatar" src="${e.avatar}" alt="avatar" /></div>\n                        <div class="info">\n                            <div class="title">Perfil de ${e.nome}</div>\n                            <div>Vitórias na carreira: ${l}</div>\n                            <div>Estilo de jogo: ${e.estilo}</div>\n                        </div>\n                    </div>\n                    <div class="fire-1-mobile d-lg-none"></div>\n                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i+1}º</span></div>\n                    <div class="festa"></div>\n                    <div class="lottie-one lottie"></div>\n                    <div class="avatar">\n                        <img src="${e.avatar}" alt="avatar" />\n                    </div>\n                    <div class="identificador">\n                        <h4 class="nomeJogador">${e.nome}</h4>\n                        <div class="vitorias">\n                            <h4>Vitórias:<br class="d-lg-none"> <span> ${r}</span></h4>\n                    </div>\n                </div>\n            </div>\n            <div class="bar col-lg-3">\n                <span class="number">${i+1}º</span>\n                <img src="${s}" alt="marker" class="marker">\n                <div class="fire-1"></div>\n            </div>\n            `}else if(1===i&&r>0)podium.innerHTML+=`\n            <div class="col-12 col-lg-3" id="podium">\n                <div id="lottie">\n                    <div class="card-info">\n                        <div><img class="avatar" src="${e.avatar}" alt="avatar" /></div>\n                        <div class="info">\n                            <div class="title">Perfil de ${e.nome}</div>\n                            <div>Vitórias na carreira: ${l}</div>\n                            <div>Estilo de jogo: ${e.estilo}</div>\n                        </div>\n                    </div>\n                    <div class="fire-2-mobile d-lg-none"></div>\n                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i+1}º</span></div>\n                    <div class="lottie-two lottie"></div>\n                    <div class="avatar">\n                        <img src="${e.avatar}" alt="avatar" />\n                    </div>\n                    <div class="identificador">\n                        <h4 class="nomeJogador">${e.nome}</h4>\n                        <div class="vitorias">\n                        <h4>Vitórias:<br class="d-lg-none"> <span> ${r}</span></h4>\n                        </div>\n                </div>\n            </div>\n            <div class="bar col-lg-3">\n                <span class="number">${i+1}º</span>\n                <img src="${s}" alt="marker" class="marker">\n                <div class="fire-2"></div>\n            </div>\n        `;else if(2===i&&r>0)podium.innerHTML+=`\n            <div class="col-12 col-lg-3" id="podium">\n                <div id="lottie">\n                    <div class="card-info">\n                        <div><img class="avatar" src="${e.avatar}" alt="avatar" /></div>\n                        <div class="info">\n                            <div class="title">Perfil de ${e.nome}</div>\n                            <div>Vitórias na carreira: ${l}</div>\n                            <div>Estilo de jogo: ${e.estilo}</div>\n                        </div>\n                    </div>\n                    <div class="fire-3-mobile d-lg-none"></div>\n                    <div class="d-flex d-lg-none position-absolute player-position"><span>${i+1}º</span></div>\n                    <div class="lottie-three lottie"></div>\n                    <div class="avatar">\n                        <img src="${e.avatar}" alt="avatar" />\n                    </div>\n                    <div class="identificador">\n                        <h4 class="nomeJogador">${e.nome}</h4>\n                        <div class="vitorias">\n                        <h4>Vitórias:<br class="d-lg-none"> <span> ${r}</span></h4>\n                        </div>\n                </div>\n            </div>\n            <div class="bar col-lg-3">\n                <span class="number">${i+1}º</span>\n                <img src="${s}" alt="marker" class="marker">\n                <div class="fire-3"></div>\n            </div>\n            `;else{function n(){return 0===r?"-":i+1+"º"}scoreBoard.innerHTML+=`\n            <div class="score">\n                <h4 class="col-lg-2 marker-ctn">\n                <img src="${s}" alt="marker" class="marker">\n                ${n()}</h4>\n                <div class="col-lg-4 ctn-img">\n                <div class="card-info">\n                        <div><img class="avatar" src="${e.avatar}" alt="avatar" /></div>\n                        <div class="info">\n                            <div class="title">Perfil de ${e.nome}</div>\n                            <div>Vitórias na carreira: ${l}</div>\n                            <div>Estilo de jogo: ${e.estilo}</div>\n                        </div>\n                    </div>\n                    <img class="avatar" src="${e.avatar}" alt="avatar" /> \n                    <div>${e.nome}</div>\n                    \n                </div>\n                <h4 class="col-lg-4"> ${r}</h4>\n            </div>\n        `}}document.querySelectorAll(".score").forEach(((e,n)=>{0===n&&a.length>=4?e.style.borderRadius="16px 16px 0 0":0===n&&a.length<=4&&(e.style.borderRadius="16px 16px 16px 16px"),e.style.backgroundColor=n%2==0?"rgb(128, 128, 128, 0.6)":"rgb(128, 128, 128, 0.8)"}))}var animacao;podium.style.height="0px",podium.style.border="none",loaderCtn.style.display="none",lerRodadas(((a,e)=>{if(a)console.error(a);else{let a=e;console.log(a)}})),ctnImg.forEach((a=>{a.addEventListener("click",(()=>{cardInfo.forEach((a=>{a.style.display="flex"}))}))})),document.addEventListener("DOMContentLoaded",(function(){const a=document.querySelector(".loader-text"),e=document.querySelector(".loader"),n=["Ajustando a redinha","Verificando a raquete","Preparando saque","Devolvendo com efeito","Verificando a mesa"];let i=0;const o=setInterval((function(){a.textContent=n[i],i=(i+1)%n.length}),10);setTimeout((()=>{clearInterval(o),"flex"===e.style.display?body.style.overflow="hidden":body.style.overflow="auto",e.style.display="none",navBar.style.display="flex",pageRanking.classList.add("page-ranking-margin")}),45),setTimeout((()=>{pageRanking.style.display="block"}),55)})),lerJogadores(((a,e,n)=>{if(a);else{e.sort(((a,e)=>{const n=Object.values(a.vitorias).reduce(((a,e)=>a+e),0);return Object.values(e.vitorias).reduce(((a,e)=>a+e),0)-n}));var i=[],o=[];n=[];e.forEach((a=>{"feminino"===a.genero?i.push(a):"masculino"===a.genero&&o.push(a)}));const a=document.querySelector(".btn-geral"),t=document.querySelector(".btn-feminino"),s=document.querySelector(".btn-masculino"),r=document.querySelector(".btn-rodada");a.addEventListener("click",(()=>{rankingCtn.style.backgroundColor="rgba(0, 0, 0, 0.6)",pageRanking.style.display="block",pageRodada.style.display="none",a.classList.add("active"),t.classList.remove("active"),s.classList.remove("active"),r.classList.remove("active"),rankingDisplay.style.opacity="0",loaderCtn.style.display="grid",n=[],atualizarPosicoes(n=e),atualizarUI(n),setTimeout((()=>{rankingDisplay.style.opacity="1",loaderCtn.style.display="none"}),500)})),t.addEventListener("click",(()=>{pageRanking.style.display="block",rankingCtn.style.backgroundColor="rgb(83 0 39 / 82%)",pageRodada.style.display="none",t.classList.add("active"),s.classList.remove("active"),a.classList.remove("active"),r.classList.remove("active"),rankingDisplay.style.opacity="0",loaderCtn.style.display="grid",n=[],atualizarPosicoes(n=i),atualizarUI(n),setTimeout((()=>{rankingDisplay.style.opacity="1",loaderCtn.style.display="none"}),500)})),s.addEventListener("click",(()=>{rankingCtn.style.backgroundColor="rgba(0, 0, 0, 0.6)",pageRanking.style.display="block",pageRodada.style.display="none",s.classList.add("active"),t.classList.remove("active"),a.classList.remove("active"),r.classList.remove("active"),rankingDisplay.style.opacity="0",loaderCtn.style.display="grid",n=[],atualizarPosicoes(n=o),atualizarUI(n),setTimeout((()=>{rankingDisplay.style.opacity="1",loaderCtn.style.display="none"}),500)})),r.addEventListener("click",(()=>{pageRanking.style.display="none",s.classList.remove("active"),t.classList.remove("active"),a.classList.remove("active"),r.classList.add("active"),rankingDisplay.style.opacity="0",loaderCtn.style.display="grid",n=[],atualizarPosicoes(n=o),atualizarUI(n),setTimeout((()=>{rankingDisplay.style.opacity="1",loaderCtn.style.display="none",pageRodada.style.display="block"}),500)})),atualizarPosicoes(e),atualizarUI(e)}}));var toggle=!1;let toggleMenu=document.getElementById("toggle-btn"),dropDown=document.querySelector(".mobile-dropdown"),btnMenu=document.querySelectorAll(".btn-menu");function carregarAnimacao(){animacao=bodymovin.loadAnimation({container:toggleMenu,renderer:"svg",loop:!1,autoplay:!1,path:"assets/json/close.json"}),document.getElementById("toggle-btn").addEventListener("click",toggleAnimacao)}for(let a=0;a<btnMenu.length;a++)btnMenu[a].addEventListener("click",toggleAnimacao);function toggleAnimacao(){toggle?(animacao.playSegments([120,170],!0),dropDown.classList.remove("active-dropdown"),dropDown.classList.add("inactive-dropdown")):(animacao.playSegments([0,120],!0),dropDown.classList.remove("inactive-dropdown"),dropDown.classList.add("active-dropdown")),toggle=!toggle}window.innerWidth<1024&&carregarAnimacao();