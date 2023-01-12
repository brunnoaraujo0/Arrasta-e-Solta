let areas = { //VARIAVEL MONITORAR SE AS AREAS TAO SENDO PREENCHIDA
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart); //EVENTO DE QUANDO COMEÇA A ARRASTAR RODE ESSA FUNCAO DRAGSTAR
    item.addEventListener('dragend', dragEnd); //EVENTO DE QUANDO SOLTAR O MOUSE, ELE DISPARA O EVENTO DRAGEND
});

document.querySelectorAll('.area').forEach(area => { //PARA CADA AREA QUE PODE SER PREENCHIDA
    area.addEventListener('dragover', dragOver); //ESSE EVENTO É DISPARADO QUANDO TIVER PASSANDO ALGO POR CIMA DE UMA AREA DROPAVEL
    area.addEventListener('dragleave', dragLeave); //ESSE EVENTO DISPARA QUANDO VOCE TA EM CIMA DE UMA AREA DROPAVEL E SAI DELA (SÓ DISPARA SE SAIR DELA)
    area.addEventListener('drop', drop); //ESSE EVENTO DISPARA QUANDO VOCE SOLTAR ALGO EM CIMA DE UMA AREA DROPAVEL
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral); //EVENTO DE QUANDO TIVER PASSANDO PELA AREANEUTRA
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral); //EVENTO DE QUANDO SAIR DA ARA NEUTRA
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral); //EVENTO DE QUANDO SOLTAR ALGO EM CIMA DA AREA NEUTRA

// Functions Item
function dragStart(e) { //FUNCAO DE QUANDO O MOUSE TIVER ARRASTANDO
    e.currentTarget.classList.add('dragging'); //COLOQUE A CLASS DRAGGING (MUDA DE COR A CAIXINHA SELECIONADA)
}
function dragEnd(e) { //FUNCAO DE QUANDO SOLTAR O MOUSE
    e.currentTarget.classList.remove('dragging'); //TIRE O A CLASS DRAGGING
}

// Functions Area
function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null) { //SE NAO TIVER NADA DENTRO DA AREA
        e.preventDefault(); //PERMITE QUE ESSA AREA SEJA DROPAVEL, DE DEFAULT ELE NAO PODE SER
        e.currentTarget.classList.add('hover'); //QUANDO TIVER PASSANDO POR CIMA DA AREA DROPAVEL COLOQUE UMA COR 
    }
}
function dragLeave(e) { //FUNCAO DE QUANDO SAIR DE AREA DROPAVEL
    e.currentTarget.classList.remove('hover'); //QUANDO SAIR DA AREA DROPAVEL TIRE O A COR
}
function drop(e) { //FUNCAO DE QUANDO SOLTAR EM CIMA DA AREA DROPAVEL
    e.currentTarget.classList.remove('hover'); //TIRE O A COR DA AREA DROPAVEL

    if(e.currentTarget.querySelector('.item') === null) { //SE NAO TIVER NADA DENTRO DA AREA
        let dragItem = document.querySelector('.item.dragging'); //PEGUE O ITEM QUE TEM A CLASSE DRAGGING, OU SEJA O ITEM QUE TA SENDO ARRASTADO
        e.currentTarget.appendChild(dragItem); //E ADICIONE ELE DENTRO DA AREA DROPAVEL
        updateAreas();
    }
}

// Functions Neutral Area
function dragOverNeutral(e) { //FUNCAO DE QUANDO TIVER PASSANDO POR CIMA DA AREA NEUTRA
    e.preventDefault(); //PERMITE QUE A AREA NEUTRA SEJA DROPAVEL, POR DEFAULT NAO PODE
    e.currentTarget.classList.add('hover'); //COLOCA UM HOVER NA AREA DROPAVEL
}
function dragLeaveNeutral(e) { //FUNCAO DE QUANDO SAIR DA AREA NEUTRA
    e.currentTarget.classList.remove('hover'); //TIRE O HOVER
}
function dropNeutral(e) { //FUNCAOD DE QUANDO SOLTAR ALGO EM CIMA DA AREA NEUTRA
    e.currentTarget.classList.remove('hover');//REMOVA O HOVER
    let dragItem = document.querySelector('.item.dragging'); //PEGUE O ELEMENTO QUE TA SENDO ARRASTADO
    e.currentTarget.appendChild(dragItem); // E COLOQUE DENTRO DA AREA NEUTRA
    updateAreas();// CHAMA A FUNCAO QUE MONITORA A ORDEM
}

// Logic Functions
function updateAreas() { //FUNCAO QUE MONITORA COMO TA A ORDEM NA AREA DROPAVEL
    document.querySelectorAll('.area').forEach(area => { //PEGUE TODAS AREAS
        let name = area.getAttribute('data-name'); //PEGUE O ATRIBUTO DATA-NAME

        if(area.querySelector('.item') !== null) { // SE A AREA TIVER PREENCHIDA
            areas[name] = area.querySelector('.item').innerHTML; //PEGUE QUAL ELEMENTO NA NESSA AREA E BOTA NA POSICAO CORESPONDENTE
        } else { //SE NAO TIVER PREENCHIDA
            areas[name] = null; //DEIXA NULO
        }
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3') { //SE A ORDEM TIVER CERTA
        document.querySelector('.areas').classList.add('correct'); //DEIXA A BORDA VERDE
    } else {
        document.querySelector('.areas').classList.remove('correct'); //CASO NAO, TIRE A COR DA BORDA
    }
}