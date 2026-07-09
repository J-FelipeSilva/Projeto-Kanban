document.addEventListener("DOMContentLoaded", () => {
  const postIt = document.querySelectorAll(".post");
  const coluna = document.querySelectorAll(".post-it");
  const addButton = document.querySelectorAll(".add-post-it");
}
// 1. Inicializar os cartões existentes como "arrastáveis"
cards.forEach(card => {
    card.setAttribute("draggable", "true");
    addDragEvents(card);
});

// 2. Lógica de Arrastar e Soltar (Drag and Drop)
function addDragEvents(card) {
    card.addEventListener("dragstart", () => {
        card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        updateCardCounts();
    });
}

columns.forEach(column => {
    // Permite que o item seja solto na coluna
    column.addEventListener("dragover", e => {
        e.preventDefault();
        column.classList.add("drag-over");
        
        // Descobre a posição exata para soltar o cartão entre os outros
        const afterElement = getDragAfterElement(column, e.clientY);
        const draggable = document.querySelector(".dragging");
        
        if (afterElement == null) {
            column.appendChild(draggable);
        } else {
            column.insertBefore(draggable, afterElement);
        }
    });

    // Remove o efeito visual quando o cartão sai da coluna
    column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
    });

    // Finaliza a ação de soltar
    column.addEventListener("drop", () => {
        column.classList.remove("drag-over");
    });
});

// Função matemática para calcular onde o cartão deve cair (antes ou depois dos outros)
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".post:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
    } else {
        return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY }).element;
}

// 3. Lógica para o botão "+ Adicionar cartão"
addButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const columnCards = btn.previousElementSibling; // Pega a div .kanban-cards logo acima do botão
        
        // Usando um prompt simples para pegar o título da nova tarefa
        const title = prompt("Digite o título da nova tarefa:");
        
        if (title && title.trim() !== "") {
            // Cria o novo elemento HTML do cartão
            const newCard = document.createElement("div");
            newCard.classList.add("post");
            newCard.setAttribute("draggable", "true");
            
            newCard.innerHTML = `
                <div class="card-title">${title}</div>
                <div class="card-footer">
                    <span>📅 Novo</span>
                    <div class="avatar">EU</div>
                </div>
            `;
            
            // Adiciona os eventos de arrastar ao novo cartão e joga ele na coluna
            addDragEvents(newCard);
            columnCards.appendChild(newCard);
            updateCardCounts();
        }
    });
});

// 4. Atualizar o contador de tarefas nas colunas
function updateCardCounts() {
    const allColumns = document.querySelectorAll(".coluna");
    allColumns.forEach(col => {
        const count = col.querySelectorAll(".post").length;
        const countElement = col.querySelector(".contador");
        if (countElement) {
            countElement.textContent = count;
        }
    });
}
});
