function atualizarPosicoes(jogadores) {
    jogadores.forEach(jogador => {
        jogador.marcadores = {};
        const datas = Object.keys(jogador.vitorias).sort((a, b) => new Date(a) - new Date(b));
        const ultimaData = datas[datas.length - 1];
        const posicaoAtual = obterPosicao(jogadores, jogador.nome, ultimaData);
        const posicaoAnterior = datas.length > 1 ? obterPosicao(jogadores, jogador.nome, datas[datas.length - 2]) : null;

        if (posicaoAnterior !== null && posicaoAtual !== null) {
            if (posicaoAtual < posicaoAnterior) {
                jogador.marcadores[ultimaData] = downMarker;
            } else if (posicaoAtual > posicaoAnterior) {
                jogador.marcadores[ultimaData] = upMarker;
            } else {
                jogador.marcadores[ultimaData] = neutralMarker;
            }
        } else {
            jogador.marcadores[ultimaData] = neutralMarker;
        }
    });
}

function obterPosicao(jogadores, nome, data) {
    const jogadoresComVitorias = jogadores.filter(j => j.vitorias[data] > 0);
    jogadoresComVitorias.sort((a, b) => b.vitorias[data] - a.vitorias[data]);
    return jogadoresComVitorias.findIndex(j => j.nome === nome) + 1;
}


// outra


function atualizarPosicoes(jogadores) {
    jogadores.forEach(jogador => {
        jogador.marcadores = {};
        const datas = Object.keys(jogador.vitorias).sort((a, b) => new Date(b) - new Date(a));
        const posicoesPorData = {};

        // Calcular as posições dos jogadores em cada data
        datas.forEach(data => {
            const jogadoresOrdenados = [...jogadores].sort((a, b) => (b.vitorias[data] || 0) - (a.vitorias[data] || 0));
            const posicoes = jogadoresOrdenados.map(jogador => jogador.nome);
            posicoesPorData[data] = posicoes;
        });

        console.log(`Posições por data para o jogador ${jogador.nome}:`);
        console.log(posicoesPorData);

        // Comparar as posições entre datas e atualizar os marcadores
        for (let i = 0; i < datas.length - 1; i++) {
            const dataAtual = datas[i];
            const dataAnterior = datas[i + 1];
            const posicoesAtual = posicoesPorData[dataAtual];
            const posicoesAnterior = posicoesPorData[dataAnterior];
            const posicaoAtual = posicoesAtual.indexOf(jogador.nome) + 1;
            const posicaoAnterior = posicoesAnterior.indexOf(jogador.nome) + 1;

            console.log(`Jogador ${jogador.nome} na data ${dataAnterior}: Posição ${posicaoAnterior}`);
            console.log(`Jogador ${jogador.nome} na data ${dataAtual}: Posição ${posicaoAtual}`);

            if (posicaoAnterior !== -1 && posicaoAtual !== -1) {
                if (posicaoAtual < posicaoAnterior) {
                    jogador.marcadores[dataAtual] = 'up';
                } else if (posicaoAtual > posicaoAnterior) {
                    jogador.marcadores[dataAtual] = 'down';
                } else {
                    jogador.marcadores[dataAtual] = 'neutral';
                }
            } else {
                jogador.marcadores[dataAtual] = 'neutral';
            }
        }
    });
}


function obterPosicao(jogadores, nome) {
    return jogadores.findIndex(j => j.nome === nome) + 1;
}