export class Popup {
    constructor(config = {}) {
        this.estilos = ['admin', 'colaborador']; // Lista de estilos disponíveis
        this.estilo = config.estilo && this.estilos.includes(config.estilo) ? config.estilo : this.estilos[0]; //
        this.titulo = config.titulo || ' ';
        this.conteudo = config.conteudo || ' ';
        if (config.fecharComEsc) {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.hidePopup();
                }
            });
        }
    }

    async showPopup(callback = null) {
        await this.loadCSS('./css/popup.css'); // Carrega um único arquivo CSS
        // Remove o elemento anterior, se existir
        const oldPopup = document.querySelector(".overlay");
        if (oldPopup) oldPopup.remove();
        // Cria os elementos
        const overlay = document.createElement("div");
        const popup = document.createElement("div");
        const popupHeader = document.createElement("div");
        const popupLogo = document.createElement("img");
        const popupTitulo = document.createElement("div");
        const imgClosed = document.createElement("img");
        const popupBody = document.createElement("div");

        // Define as classes e atributos
        overlay.className = "overlay";
        popup.className = `popup popup-${this.estilo}`; // Adiciona a classe de estilo
        popupHeader.className = "popup-header";
        popupLogo.className = "popup-logo";
        popupLogo.src = `./img/logo_${this.estilo}.png`; // Usa o índice para definir a imagem
        popupTitulo.className = "popup-titulo";
        imgClosed.className = "popup-closed";
        imgClosed.src = `./img/bt_closed_${this.estilo}.png`; // Usa o índice para definir a imagem
        imgClosed.alt = "Fechar";
        imgClosed.addEventListener("click", () => this.hidePopup());
        popupBody.className = "popup-body";

        // Adiciona os elementos ao DOM
        popupHeader.appendChild(popupLogo);
        popupHeader.appendChild(popupTitulo);
        popupHeader.appendChild(imgClosed);
        popup.appendChild(popupHeader);
        popup.appendChild(popupBody);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Adiciona o conteúdo
        popupTitulo.innerHTML = this.titulo;
        popupBody.innerHTML = this.conteudo;

        // Mostra o popup
        overlay.style.display = "flex";
        document.body.classList.add('no-scroll');

        // Chama a função de callback, se fornecida
        if (callback) {
            callback();
        }
    }

    async loadCSS(cssUrl) {
        // Verifica se o CSS já está carregado
        if (!document.querySelector(`link[href="${cssUrl}"]`)) {
            // Cria um novo elemento link
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssUrl;

            // Adiciona o link ao head do documento
            document.head.appendChild(link);

            // Espera o CSS ser carregado
            await new Promise((resolve) => {
                link.onload = resolve;
            });
        }
    }

    hidePopup() {
        const overlay = document.querySelector(".overlay");
        if (overlay) {
            overlay.style.display = "none";
            overlay.remove(); // Remove o elemento do DOM
        }
        document.body.classList.remove('no-scroll');
    }
}

export default Popup;
