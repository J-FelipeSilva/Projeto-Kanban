function dragstartHandler(event) {
	event.dataTransfer.setData("text", event.target.id);
}
function dragoverHandler(event) {
	event.preventDefault();
}
function dropHandler(event) {
	event.preventDefault();
	const info = event.dataTransfer.getData("text");
	const localCerto = event.target.closest(".post-its");
	if (localCerto) {
		localCerto.appendChild(document.getElementById(info));
	}
}

function criarTarefa(buttonElement) {
	//recebe o texto da tarefa
	const texto = prompt("Descreva a tarefa");
	if (texto===null || texto.trim()=="") {
		return;
	}
	//cria os elementos necessários do DOM html
	const newDiv = document.createElement("div");
	const newSpan = document.createElement("span");
	newDiv.id = "tarefa-" + Date.now();
	newDiv.className = "post";
	newDiv.setAttribute("draggable", "true");
	newDiv.setAttribute("ondragstart", "dragstartHandler(event)");
	newSpan.innerText = texto;
	newDiv.appendChild(newSpan);
	//adiciona na coluna
	const coluna = buttonElement.closest(".coluna");
	if (coluna) {
		const colunaCerta = coluna.querySelector(".post-its");
		colunaCerta.appendChild(newDiv);
	}
}

function criarFluxoDeTrabalho() {
	//recebe o título da Etapa de Trabalho
	const texto = prompt("Título");
	if (texto===null || texto.trim()=="") {
		return;
	}
	
	const quadro = document.getElementById("quadro");
	const newColuna = document.createElement("div");
	const newSpan = document.createElement("span");
	
	newColuna.id = "coluna-" + Date.now();
	newColuna.className = "coluna";
}
