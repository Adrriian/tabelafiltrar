// Função para adicionar 100 linhas automaticamente
function adicionarLinhas() {
    const tableBody = document.querySelector('#contactsTable tbody');
    
    for (let i = 0; i < 100; i++) {
        const newRow = document.createElement('tr');

        // Cria células para nome e telefone
        const nomeCell = document.createElement('td');
        const telefoneCell = document.createElement('td');
        
        // Deixa as células editáveis
        nomeCell.contentEditable = true;
        telefoneCell.contentEditable = true;

        // Adiciona as células à nova linha
        newRow.appendChild(nomeCell);
        newRow.appendChild(telefoneCell);
        
        // Adiciona a nova linha ao final do tbody
        tableBody.appendChild(newRow);
    }
}

// Função para remover linhas duplicadas, mantendo uma
function removerDuplicatas() {
    const tableBody = document.querySelector('#contactsTable tbody');
    const rows = tableBody.getElementsByTagName('tr');
    const seen = {}; // Objeto para armazenar combinações de nome e telefone únicas

    // Verifica cada linha e rastreia duplicatas
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const name = cells[0].innerText.trim();
        const phone = cells[1].innerText.trim();
        
        // Cria uma chave única combinando nome e telefone
        const key = `${name}|${phone}`;
        
        // Se a chave for única, armazena-a
        if (name !== '' && phone !== '' && !seen[key]) {
            seen[key] = rows[i]; // Armazena a linha correspondente
        } else if (seen[key]) {
            // Se já existir, remove a linha duplicada
            tableBody.removeChild(rows[i]);
            i--; // Corrige o índice após a remoção de uma linha
        }
    }
}

// Função para filtrar duplicatas e mudar cor das duplicadas
function filtrar() {
    const table = document.getElementById('contactsTable');
    const rows = table.getElementsByTagName('tr');
    const duplicates = {};

    // Ignorando a primeira linha (cabeçalho)
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const name = cells[0].innerText.trim();
        const phone = cells[1].innerText.trim();
        
        // Ignora linhas onde o nome ou telefone estejam vazios
        if (name === '' || phone === '') {
            continue;
        }

        const key = `${name}|${phone}`; // Cria uma chave única combinando nome e telefone

        if (key) {
            duplicates[key] = (duplicates[key] || 0) + 1; // Conta duplicatas
        }
    }

    // Repassa as linhas para aplicar o estilo apenas se for duplicada
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const name = cells[0].innerText.trim();
        const phone = cells[1].innerText.trim();
        
        const key = `${name}|${phone}`;

        // Se a combinação for duplicada e ambos os campos estiverem preenchidos, muda o fundo para azul
        if (name !== '' && phone !== '' && duplicates[key] > 1) {
            cells[0].style.backgroundColor = '#00EBFA'; // Nome
            cells[1].style.backgroundColor = '#00EBFA'; // Telefone
        } else {
            // Remove o fundo azul se não for duplicata
            cells[0].style.backgroundColor = ''; // Reseta para o estado original
            cells[1].style.backgroundColor = ''; // Reseta para o estado original
        }
    }
}
function limparDados() {
    // Limpa os textareas
    document.getElementById('nomeInput').value = "";
    document.getElementById('telefoneInput').value = "";

    // Limpa os dados da tabela
    const tableBody = document.querySelector('#contactsTable tbody');
    const rows = tableBody.getElementsByTagName('tr');

    // Itera sobre todas as linhas da tabela e limpa as células
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        cells[0].textContent = ""; // Limpa a célula de Nome
        cells[1].textContent = ""; // Limpa a célula de Telefone
    }
}
// Função para adicionar novos contatos à tabela
function adicionarContatos() {
    const nomes = document.getElementById('nomeInput').value.trim().split('\n'); // Divide nomes por nova linha
    const telefones = document.getElementById('telefoneInput').value.trim().split('\n'); // Divide telefones por nova linha

    const tableBody = document.querySelector('#contactsTable tbody');

    // Adiciona contatos respeitando o limite do array de telefones
    for (let i = 0; i < Math.max(nomes.length, telefones.length); i++) {
        const nome = nomes[i] || ""; // Obtém o nome ou define como vazio se não houver
        const telefone = telefones[i] || ""; // Obtém o telefone ou define como vazio se não houver

        if (nome === "" && telefone === "") continue; // Ignora se ambos os campos estiverem vazios

        // Verifica se há espaços vazios na tabela
        const rows = tableBody.getElementsByTagName('tr');
        let added = false;

        for (let j = 0; j < rows.length; j++) {
            const cells = rows[j].getElementsByTagName('td');

            // Verifica se a célula de Nome está vazia
            if (cells[0].textContent.trim() === "") {
                cells[0].textContent = nome;  // Preenche a célula de Nome
                cells[1].textContent = telefone;  // Preenche a célula de Telefone
                cells[0].contentEditable = true;  // Permite edição na célula de Nome
                cells[1].contentEditable = true;  // Permite edição na célula de Telefone
                added = true;  // Marca que um contato foi adicionado
                break;  // Sai do loop assim que um contato for adicionado
            }
        }

        // Se não houve adição em espaços vazios, cria uma nova linha
        if (!added) {
            const newRow = document.createElement('tr');
            const nomeCell = document.createElement('td');
            const telefoneCell = document.createElement('td');

            nomeCell.textContent = nome;  // Define o conteúdo da célula como o nome
            telefoneCell.textContent = telefone;  // Define o conteúdo da célula como o telefone

            nomeCell.contentEditable = true;  // Permite edição na célula de Nome
            telefoneCell.contentEditable = true;  // Permite edição na célula de Telefone

            newRow.appendChild(nomeCell);  // Adiciona a célula de Nome à nova linha
            newRow.appendChild(telefoneCell);  // Adiciona a célula de Telefone à nova linha

            tableBody.appendChild(newRow);  // Adiciona a nova linha ao corpo da tabela
        }
    }

    // Limpa os campos de entrada após adicionar
    document.getElementById('nomeInput').value = "";
    document.getElementById('telefoneInput').value = "";
}
