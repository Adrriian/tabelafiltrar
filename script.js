let lista1 = [];
let lista2 = [];

function adicionarLista(numLista) {
    const valores = document.getElementById("inputValores").value
        .split(/[,\s]+/)
        .map(Number)
        .filter(num => !isNaN(num));

    if (numLista === 1) {
        lista1 = [...lista1, ...valores]; // Adiciona à lista 1 sem sobrescrever
        atualizarTabela("tabela1", lista1);
    } else {
        lista2 = [...lista2, ...valores]; // Adiciona à lista 2 sem sobrescrever
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
    if (lista1.length === 0 || lista2.length === 0) {
        alert("Por favor, adicione números às listas antes de filtrar.");
        return;
    }

    let repetidos = lista1.filter(num => lista2.includes(num));
    let uniaoSemRepetidos = [...new Set([...lista1, ...lista2].filter(num => !repetidos.includes(num)))];

    atualizarTabela("tabela2", lista2, repetidos);
    atualizarTabela("tabelaFiltrada", uniaoSemRepetidos);
}

function copiar() {
    let tabela = document.getElementById("tabelaFiltrada");
    let numeros = Array.from(tabela.getElementsByTagName("td"))
                        .map(td => td.textContent);

    // Criar uma estrutura de dados para o Excel
    let dados = numeros.map(num => [num]);  // Cada número vai para uma linha na coluna

    // Criação de uma planilha
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(dados);  // Converte os dados para uma planilha

    // Adiciona a planilha ao livro
    XLSX.utils.book_append_sheet(wb, ws, "Números");

    // Gerar e baixar o arquivo Excel
    XLSX.writeFile(wb, "numeros.xlsx");
}

