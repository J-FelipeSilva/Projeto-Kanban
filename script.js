let colunaApontada;
let spanApontado;

function contador(coluna) {
	const divPostIts = coluna.querySelector(".post-its");
	const qntTarefas = divPostIts.querySelectorAll(".post").length;
	const spanContador = coluna.querySelector(".contador");
	if (spanContador) {
		spanContador.innerText = qntTarefas;
	}
}

//funções de arrastar e soltar
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
		const tarefa = document.getElementById(info);
		const colunaInicial = tarefa.closest(".coluna");
		const colunaFinal = localCerto.closest(".coluna");
		if(colunaInicial) {
			contador(colunaInicial);
		}
		if(colunaFinal) {
			contador(colunaFinal);
		}
	} 
}

function criarTarefa(buttonElement) {
	//recebe o texto da tarefa
	const texto = prompt("Descreva a tarefa");
	if (texto===null || texto.trim()=="") {
		return;
	}
	
	//cria os elementos necessários no DOM
	const newDiv = document.createElement("div");
	const newSpan = document.createElement("span");
	const newButton = document.createElement("button");
	
	newDiv.id = "tarefa-" + Date.now();
	newDiv.className = "post";
	newDiv.setAttribute("draggable", "true");
	newDiv.setAttribute("ondragstart", "dragstartHandler(event)");
	newButton.setAttribute("type", "button");
	newButton.className = "excluirTarefa";
	newButton.setAttribute("onclick", "excluirTarefa(this)");
	newButton.innerHTML = "<i class=\"material-icons\">close</i>";
	newSpan.innerText = texto;
	newDiv.appendChild(newButton);
	newDiv.appendChild(newSpan);

	//adiciona na coluna
	const coluna = buttonElement.closest(".coluna");
	if (coluna) {
		const colunaCerta = coluna.querySelector(".post-its");
		colunaCerta.appendChild(newDiv);
		contador(coluna); //atualiza o contador da coluna
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
	const newHeader = document.createElement("div");
	const newDiv = document.createElement("div");
	const newSpan = document.createElement("span");
	const newButton = document.createElement("button");
	const newButtonEditor = document.createElement("button");
	
	//cria uma nova coluna
	newColuna.id = "coluna-" + Date.now();
	newColuna.className = "coluna";
	quadro.appendChild(newColuna);
	
	//cria a caixa do título na coluna nova
	newHeader.className = "header";
	newSpan.innerText = (texto);
	newHeader.appendChild(newSpan);
	newColuna.appendChild(newHeader);
	
	//cria a caixa onde ficarão os post-its
	newDiv.className = "post-its";
	newDiv.setAttribute("ondrop", "dropHandler(event)");
	newDiv.setAttribute("ondragover", "dragoverHandler(event)");
	newColuna.appendChild(newDiv);
	
	//cria o botão de criar tarefa
	newButton.setAttribute("type", "button");
	newButton.className = "add-post-it";
	newButton.setAttribute("onclick", "criarTarefa(this)");
	newButton.innerText = "+ Adicionar Tarefa";
	newColuna.appendChild(newButton);
	
	//cria o botão de editar a coluna
	newButtonEditor.setAttribute("type", "button");
	newButtonEditor.className = "editarColuna";
	newButtonEditor.setAttribute("onclick", "editarColuna(this)");
	newButtonEditor.innerHTML = "<i class=\"material-icons\">edit</i>";
	newHeader.appendChild(newButtonEditor);
}

function editarColuna(buttonElement) {
	//utiliza variáveis globais não constantes para armazenar informações fora da função
	colunaApontada = buttonElement.closest(".coluna");
	spanApontado = colunaApontada.querySelector(".header span:first-child");
	const display = document.getElementById("editar-coluna");
	const input = document.getElementById("input");
	input.value = spanApontado.innerText;
	//executa o display que foi construido no html
	display.showModal();
}
function salvarColuna() {
	if(input.value.trim()!==""){
		spanApontado.innerText = input.value;
		document.getElementById("editar-coluna").close();
	}
}
function excluirColuna() {
	colunaApontada.remove();
	document.getElementById("editar-coluna").close();
}
function cancelar() {
	document.getElementById("editar-coluna").close();
}

function excluirTarefa(buttonElement) {
	const post = buttonElement.closest(".post");
	post.remove();

	//atualiza o contador da coluna
	const coluna = buttonElement.closest(".coluna");
	contador(coluna);
}

function varrer() {
	const varrerQuadro = document.querySelectorAll(".coluna");
	varrerQuadro.forEach(contador);
}
document.addEventListener("DOMContentLoaded", varrer);