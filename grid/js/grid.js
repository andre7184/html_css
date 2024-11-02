class Grid {
    constructor(itens = [], config = {}) {
      this.listaGridOriginal = [...itens]; // Mantém a lista original
      this.listaGrid = itens;
      this.config = config;
      this.ascending = true;
      this.currentPage = 1;
      this.itemsPerPage = config.itensPorPagina; // Número de itens por página
      this.maxPageButtons = 8; // Número máximo de botões de página visíveis
      this.cartItemsContainer = document.getElementById(config.containerId);
      this.botoesOrdenar = document.querySelectorAll(config.sortButtonSelector);
  
      this.botoesOrdenar.forEach((botao) => {
        const coluna = botao.getAttribute('data-valor');
        botao.addEventListener("click", () => {
          this.ordenarItensGrid(botao, coluna);
        });
      });
  
      this.preencherGrid();
      this.adicionarBusca();
      this.adicionarPaginacao();
    }
  
    preencherGrid() {
      this.cartItemsContainer.innerHTML = ""; // Limpa os itens existentes
  
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const paginatedItems = this.listaGrid.slice(start, end);
  
      paginatedItems.forEach((item) => { // Para cada item na página atual
        const itemRow = document.createElement("tr");
        itemRow.innerHTML = this.config.formatarGrid(item);
        this.cartItemsContainer.appendChild(itemRow);
      });
  
      // Adiciona os eventos após preencher a grid, se necessário
      if (this.config.addEventListeners) {
        this.config.addEventListeners(this.listaGrid);
      }
      
      if (this.config.atualizarTotal) {
        this.config.atualizarTotal();
      }
    }
  
    adicionarPaginacao() {
        const paginacaoContainer = document.getElementById(this.config.paginationContainerId);
        if (paginacaoContainer) {
            paginacaoContainer.innerHTML = ""; // Limpa a paginação existente
            const totalPages = Math.ceil(this.listaGrid.length / this.itemsPerPage);
            // Botão Primeira Página
            if (this.currentPage > 1) {
                const firstPageButton = document.createElement("button");
                firstPageButton.textContent = "<<";
                firstPageButton.addEventListener("click", () => {
                this.currentPage = 1;
                this.preencherGrid();
                this.adicionarPaginacao();
                });
                paginacaoContainer.appendChild(firstPageButton);
            }
            // Botões de Página
            let qtdBotoes = this.maxPageButtons;
            if(this.currentPage > 1 && this.currentPage < totalPages) {
                qtdBotoes = this.maxPageButtons - 2;
            }else if(this.currentPage === totalPages || this.currentPage === 1) {
                qtdBotoes = this.maxPageButtons - 1;
            }
            const startPage = Math.max(1, this.currentPage - Math.floor(qtdBotoes / 2));
            const endPage = Math.min(totalPages, startPage + qtdBotoes - 1);

            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i;
                pageButton.className = (i === this.currentPage) ? "active" : "";
                pageButton.addEventListener("click", () => {
                this.currentPage = i;
                this.preencherGrid();
                this.adicionarPaginacao();
                });
                paginacaoContainer.appendChild(pageButton);
            }
            // Botão Última Página
            if (this.currentPage < totalPages) {
                const lastPageButton = document.createElement("button");
                lastPageButton.textContent = ">>";
                lastPageButton.addEventListener("click", () => {
                this.currentPage = totalPages;
                this.preencherGrid();
                this.adicionarPaginacao();
                });
                paginacaoContainer.appendChild(lastPageButton);
            }
        }
      }
 
    ordenarItensGrid(element, coluna) {
      if (element.className === 'sort-desc') {
        element.className = 'sort-asc';
        this.listaGrid.sort((a, b) => {
          return this.compararValores(a[coluna], b[coluna]);
        });
      } else {
        element.className = 'sort-desc';
        this.listaGrid.sort((a, b) => {
          return this.compararValores(b[coluna], a[coluna]);
        });
      }
      this.preencherGrid();
    }
  
    compararValores(a, b) {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else if (a instanceof Date && b instanceof Date) {
        return a - b;
      } else if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a === b ? 0 : a ? -1 : 1;
      } else {
        return 0;
      }
    }
  
    removerItensGrid(valorId) {
      const index = this.listaGrid.findIndex(item => item.id === parseInt(valorId));
      if (index !== -1) {
        this.listaGrid.splice(index, 1);
        this.listaGridOriginal = this.listaGridOriginal.filter(item => item.id !== parseInt(valorId));
        this.preencherGrid();
        this.adicionarPaginacao();
      }
    }
  
    atualizarQtdItensGrid(valorId, novaQuantidade) {
      const index = this.listaGrid.findIndex(item => item.id === parseInt(valorId));
      if (index !== -1) {
        this.listaGrid[index].qtd = novaQuantidade;
        const originalIndex = this.listaGridOriginal.findIndex(item => item.id === parseInt(valorId));
        if (originalIndex !== -1) {
          this.listaGridOriginal[originalIndex].qtd = novaQuantidade;
        }
        this.preencherGrid();
      }
    }
  
    verificarValorMax(input) {
      var max = parseInt(input.max);
      var min = parseInt(input.min);
      if (input.value > max) {
        input.value = max;
      }
      if (input.value < min) {
        input.value = min;
      }
    }
  
    adicionarBusca() {
      const campoBusca = document.querySelector(this.config.searchInputSelector);
      if (campoBusca) {
        campoBusca.addEventListener('input', () => {
          const colunas = campoBusca.getAttribute('data-valor').split(',');
          this.buscarItens(campoBusca.value, colunas);
        });
      }
    }
  
    buscarItens(valorBusca, colunas) {
      if (valorBusca.trim() === "") {
        this.listaGrid = [...this.listaGridOriginal];
      } else {
        this.listaGrid = this.listaGridOriginal.filter(item => {
          return colunas.some(coluna => item[coluna].toString().toLowerCase().includes(valorBusca.toLowerCase()));
        });
      }
      this.currentPage = 1; // Resetar para a primeira página após a busca
      this.preencherGrid();
      this.adicionarPaginacao();
    }
  }
  
  export default Grid;
  