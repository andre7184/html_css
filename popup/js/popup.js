export class Popup {
    constructor(config = {}) {
        if(config.fecharComEsc){
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    this.hidePopup();
                }
            });
        }
    }

    async showPopup(conteudo, titulo = ' ', tipo = 'branco', callback = null) {
        if (tipo === 'branco') {
            await this.loadCSS('./css/popup_branco.css');
        } else {
            await this.loadCSS('./css/popup_azul.css');
        }

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
        popup.className = "popup";
        popupHeader.className = "popup-header";
        popupLogo.className = "popup-logo";
        popupTitulo.className = "popup-titulo";
        imgClosed.className = "popup-closed";
        if (tipo === 'branco') {
            popupLogo.src = "";
            imgClosed.src = "./img/bt_closed_preto.png";
        } else {
            popupLogo.src = "./img/logo.png";
            imgClosed.src = "./img/bt_closed_branco.png";
        }
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
        popupTitulo.innerHTML = titulo;
        popupBody.innerHTML = conteudo;

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
        if (overlay) overlay.style.display = "none";
        document.body.classList.remove('no-scroll');
    }
}


export default Popup; // Exporta a classe