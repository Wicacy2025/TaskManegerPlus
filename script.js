let tarefas = [];

function criarTarefa() {
    const titulo = document.getElementById('title').value;
    const status = document.getElementById('status').value;
    
    if (titulo.trim() === '' || status === 'selecione') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        status: status
    };

    tarefas.push(tarefa);
    atualizarListaTarefas();
    limparCampos();
}

function atualizarListaTarefas() {
    const listaTarefas = document.getElementById('tarefascriadas');
    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.style.margin = '10px';
        li.style.padding = '10px';
        li.style.borderRadius = '5px';
        
        // Definir cor de fundo baseado no status
        switch(tarefa.status) {
            case 'naoconcluida':
                li.style.backgroundColor = '#ffcdd2';
                break;
            case 'emprocesso':
                li.style.backgroundColor = '#fff9c4';
                break;
            case 'concluida':
                li.style.backgroundColor = '#c8e6c9';
                break;
        }

        li.innerHTML = `
            <strong>${tarefa.titulo}</strong>
            <p>Status: ${traduzirStatus(tarefa.status)}</p>
            <button onclick="deletarTarefa(${tarefa.id})">Deletar</button>
            <button onclick="alterarStatus(${tarefa.id})">Alterar Status</button>
        `;
        
        listaTarefas.appendChild(li);
    });
}

function traduzirStatus(status) {
    const traducoes = {
        'naoconcluida': 'Não concluída',
        'emprocesso': 'Em processo',
        'concluida': 'Concluída'
    };
    return traducoes[status] || status;
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    atualizarListaTarefas();
}

function alterarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const statusArray = ['naoconcluida', 'emprocesso', 'concluida'];
    const currentIndex = statusArray.indexOf(tarefa.status);
    const nextIndex = (currentIndex + 1) % statusArray.length;
    
    tarefa.status = statusArray[nextIndex];
    atualizarListaTarefas();
}

function limparCampos() {
    document.getElementById('title').value = '';
    document.getElementById('status').value = 'selecione';
} 
