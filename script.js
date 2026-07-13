// Aguarda todo o conteúdo HTML (DOM) carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    const posts = document.querySelectorAll(".post"); //Seleciona todas as tarefas (post-its)
	//Seleciona todas as áreas onde as tarefas podem ser soltas
    const containers = document.querySelectorAll('.post-its');

    posts.forEach(post => {
        // Garante que a tag HTML tenha a propriedade arrastar
        post.setAttribute("draggable", "true");
        // Função disparada no exato momento em que o usuário COMEÇA a arrastar
        post.addEventListener("dragstart", () => {
            // Adicionamos uma classe para dar um estilo visual (ex: deixar meio transparente)
            post.classList.add('dragging');
        });
        // Função disparada no exato momento em que o usuário SOLTA o clique
        post.addEventListener("dragend", () => {
            // Removemos a classe visual quando o arrasto termina
            post.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        // O evento 'dragover' é disparado continuamente enquanto algo é arrastado POR CIMA do container
        container.addEventListener("dragover", e => {
            // Previne o comportamento padrão da página (que proíbe soltar elementos por padrão)
            e.preventDefault(); 

            // Identifica qual elemento está imediatamente abaixo do ponteiro do mouse
            const afterElement = getDragAfterElement(container, e.clientY);
            
            // Pega o post que está sendo arrastado no momento (que tem a classe 'dragging')
            const draggable = document.querySelector(".dragging");

            // Se não houver nenhum elemento abaixo do mouse, joga a tarefa pro final da coluna
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                // Caso contrário, insere a tarefa antes do elemento que está abaixo do mouse
                container.insertBefore(draggable, afterElement);
            }
        });
    });

    // Esta função descobre em qual vão entre as tarefas o mouse está posicionado
    function getDragAfterElement(container, y) {
        // Pega todos os posts dentro da coluna, EXCETO o que está sendo arrastado no momento
        const draggableElements = [...container.querySelectorAll(".post:not(.dragging)")];

        // Compara a posição Y (vertical) do mouse com a posição de cada post
        return draggableElements.reduce((closest, child) => {
            // Pega o tamanho e posição do post atual do loop
            const box = child.getBoundingClientRect();
            // Calcula a distância entre o centro do post e o cursor do mouse
            const offset = y - box.top - box.height / 2;

            // Se o mouse estiver acima do meio do elemento, e for o mais próximo até agora...
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        // Retorna apenas o elemento HTML descoberto na lógica acima
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
