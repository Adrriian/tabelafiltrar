let lista1 = [];
let lista2 = [];

function adicionarLista(numLista) {
    const valores = document.getElementById("inputValores").value
        .split(/[,\s]+/)
        .map(Number)
        .filter(num => !isNaN(num));

    if (numLista === 1) {
        lista1 = valores;
        atualizarTabela("tabela1", lista1);
    } else {
        lista2 = valores;
        atualizarTabela("tabela2", lista2);
    }
}

function atualizarTabela(idTabela, lista, repetidos = []) {
    const tabela = document.getElementById(idTabela);
    tabela.innerHTML = "";
    lista.forEach(num => {
        let row = tabela.insertRow();
        let cell = row.insertCell(0);
        cell.textContent = num;
        if (repetidos.includes(num) && idTabela === "tabela2") {
            row.classList.add("repetido");
        }
    });
}

function filtrar() {
    let repetidos = lista1.filter(num => lista2.includes(num));
    let uniaoSemRepetidos = [...new Set([...lista1, ...lista2].filter(num => !repetidos.includes(num)))];

    atualizarTabela("tabela2", lista2, repetidos);
    atualizarTabela("tabelaFiltrada", uniaoSemRepetidos);
}
