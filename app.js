// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto' 

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';

let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.0});
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou !!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');  
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        exibirTextoNaTela('h1', 'Tente novamente');
    }
    tentativas++;
    limparCampo();
}

//-==-=-====-=- FUNÇÕES-==-=-====-=-

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosDaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido
    }
}


function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Bem vindo ao jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
