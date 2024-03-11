let token="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",owner="Lucasarkh",repo="tableTenisDelucca",branch="main",rodadasUrl=`https://api.github.com/repos/${owner}/${repo}/contents/rodadas.json`,vitoriasUrl=`https://api.github.com/repos/${owner}/${repo}/contents/vitorias.json`;const url=`https://api.github.com/repos/${owner}/${repo}/contents/rodadas.json`;function adicionarPartida(){const o=document.getElementById("select-jogadores").value,e=document.getElementById("select-oponentes").value,t=document.getElementById("select-vencedor").value,n=document.getElementById("data").value,a={jogador:o,oponente:e,vencedor:t};o&&e&&t&&n?fetch(url,{method:"GET",headers:{Authorization:`token ${token}`,Accept:"application/vnd.github.v3+json"}}).then((o=>o.json())).then((o=>{const e=JSON.parse(atob(o.content));let t=e.find((o=>o[n]));t?t[n].push(a):e.push({[n]:[a]}),fetch(url,{method:"PUT",headers:{Authorization:`token ${token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({message:"Atualizar rodadas.json",content:btoa(JSON.stringify(e)),branch:branch,sha:o.sha})}).then((o=>{if(!o.ok)throw new Error("Erro ao enviar a solicitação: "+o.status);alert("Partida adicionada com sucesso!")})).catch((o=>console.error("Erro ao atualizar o arquivo JSON:",o)))})).catch((o=>console.error("Erro ao carregar o JSON:",o))):alert("Por favor, preencha todos os campos!")}function contarVitorias(o){const e={},t={};return o.forEach((o=>{const n=Object.keys(o)[0];o[n].forEach((o=>{const a=o.vencedor;a&&(e[n]||(e[n]={}),e[n][a]||(e[n][a]=0),e[n][a]++,t[a]||(t[a]=0),t[a]++)}))})),{vitoriasPorData:e,vitoriasTotais:t}}function atualizarVitorias(){fetch(rodadasUrl,{method:"GET",headers:{Authorization:`token ${token}`,Accept:"application/vnd.github.v3+json"}}).then((o=>o.json())).then((o=>{const e=contarVitorias(JSON.parse(atob(o.content)));fetch(vitoriasUrl,{method:"GET",headers:{Authorization:`token ${token}`,Accept:"application/vnd.github.v3+json"}}).then((o=>o.json())).then((o=>{const t=JSON.parse(atob(o.content));t[0]=e.vitoriasPorData,t[1].total=e.vitoriasTotais,fetch(vitoriasUrl,{method:"PUT",headers:{Authorization:`token ${token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify({message:"Atualizar vitorias.json",content:btoa(JSON.stringify(t)),branch:branch,sha:o.sha})}).then((o=>{if(!o.ok)throw new Error("Erro ao enviar a solicitação: "+o.status);console.log("JSON de vitórias atualizado com sucesso!")})).catch((o=>console.error("Erro ao atualizar o arquivo JSON de vitórias:",o)))})).catch((o=>console.error("Erro ao carregar o JSON de vitórias:",o)))})).catch((o=>console.error("Erro ao carregar o JSON de partidas:",o)))}const senhaCorreta="abc123?";function verificarSenha(){"abc123?"===document.getElementById("password").value?exibirConteudoProtegido():alert("Senha incorreta. Tente novamente.")}function exibirConteudoProtegido(){document.getElementById("login-form").style.display="none",document.getElementById("content").style.display="block"}const playersUrl="https://raw.githubusercontent.com/Lucasarkh/tableTenisDelucca/main/players.json";function obterJogadores(){fetch(playersUrl).then((o=>{if(!o.ok)throw new Error("Não foi possível obter os dados do arquivo JSON de jogadores.");return o.json()})).then((o=>{adicionarOpcoesAoSelect(o.map((o=>o.nome)))})).catch((o=>{console.error("Erro ao obter os dados do arquivo JSON de jogadores:",o)}))}function adicionarOpcoesAoSelect(o){const e=document.getElementById("select-jogadores"),t=document.getElementById("select-oponentes"),n=document.getElementById("select-vencedor");e.innerHTML="",t.innerHTML="";const a=document.createElement("option");a.value="selecionar",a.textContent="Selecionar Jogador",a.disabled=!0,a.selected=!0;const r=a.cloneNode(!0);r.value="selecionar",r.textContent="Selecionar Jogador",r.disabled=!0,r.selected=!0,e.insertBefore(a,e.firstChild),t.insertBefore(r,t.firstChild),o.forEach((o=>{const a=document.createElement("option");a.textContent=o,a.value=o;const r=a.cloneNode(!0),s=a.cloneNode(!0);e.appendChild(a),t.appendChild(r),n.appendChild(s)}))}obterJogadores();