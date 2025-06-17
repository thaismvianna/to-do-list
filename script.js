const button = document.querySelector(".add-task")
const input = document.querySelector(".input-task")
const listaCompleta = document.querySelector(".list-tasks")

let listaDeItens = []

function adicionarNovaTarefa() {
    if (input.value.trim() !== '') {
        listaDeItens.push({
            tarefa: input.value,
            concluida: false
        })

        input.value = ""
        mostrarTarefas()
    }
}

function mostrarTarefas() {
    let novaLi = ''

    listaDeItens.forEach((item, posicao) => {
        novaLi += `
            <li class="task ${item.concluida ? "done" : ""}">
                <img src="./img/check.png" alt="Imagem de check na tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/delete.png" alt="Imagem de deletar na tarefa" onclick="deletarItem(${posicao})">
            </li>
        `
    })

    listaCompleta.innerHTML = novaLi
    localStorage.setItem("lista", JSON.stringify(listaDeItens))
}

function concluirTarefa(posicao) {
    listaDeItens[posicao].concluida = !listaDeItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) {
    listaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem("lista") 
    if (tarefasDoLocalStorage) {
        listaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener("click", adicionarNovaTarefa)

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        adicionarNovaTarefa()
    }
})