import Grid from './js/grid.js';

document.addEventListener("DOMContentLoaded", () => {
    const nomes = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"];
    const grid = [];
    
    function gerarDataAleatoria() {
      const start = new Date(2020, 0, 1);
      const end = new Date(2023, 11, 31);
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0];
    }
    
    function gerarPrecoAleatorio() {
      return (Math.random() * (100 - 10) + 10).toFixed(2);
    }
    
    function gerarBooleanoAleatorio() {
      return Math.random() < 0.5;
    }
    
    for (let i = 1; i <= 100; i++) {
      const item = {
        coluna1: i,
        coluna2: nomes[Math.floor(Math.random() * nomes.length)],
        coluna3: gerarDataAleatoria(),
        coluna4: gerarPrecoAleatorio(),
        coluna5: gerarBooleanoAleatorio()
      };
      grid.push(item);
    }

  const config = {
    idGrid: "itensGrid", // ID do contêiner onde a grid será renderizada
    idSortBotao: "#btOrdenar", // Id do Seletor dos botões de ordenação
    idInputBusca: "#campoBusca", // Id do Seletor do campo de busca
    idPaginacao: "paginacao", // ID do contêiner de paginação
    itensPorPagina: 10, // Quantidade de itens por pagina
    formatarGrid: (item) => {
      let gridRow = `
        <td data-label="Coluna 1">${item.coluna1}</td>
        <td data-label="Coluna 2">${item.coluna2}</td>
        <td data-label="Coluna 3">${item.coluna3}</td>
        <td data-label="Coluna 4">${item.coluna4}</td>
        <td data-label="Coluna 5">${item.coluna5}</td>
      `;
      return gridRow;
    },
    addEventos: null,
    atualizarTotal: null
  };

  const outraGrid = new Grid(grid, config);
});
