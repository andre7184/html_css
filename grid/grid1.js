import Grid from './js/grid.js';

document.addEventListener("DOMContentLoaded", () => {
  const nomes = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Maria", "Jack"];
  const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Rodrigues", "Almeida", "Nascimento", "Lima"];
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
  
  function gerarNomeCompleto() {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome1 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const sobrenome2 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome1} ${sobrenome2}`;
  }
  
  for (let i = 1; i <= 100; i++) {
    const item = {
      coluna1: i,
      coluna2: gerarNomeCompleto(),
      coluna3: gerarDataAleatoria(),
      coluna4: gerarPrecoAleatorio(),
      coluna5: gerarBooleanoAleatorio()
    };
    grid.push(item);
  }
  
  console.log(grid);
  

  const config = {
    idGrid: "itensGrid", // ID do contêiner onde a grid será renderizada
    idSortBotao: "#btOrdenar", // Id do Seletor dos botões de ordenação
    idInputBusca: "#campoBusca", // Id do Seletor do campo de busca
    idPaginacao: "paginacao", // ID do contêiner de paginação
    itensPorPagina: 15, // Quantidade de itens por pagina
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

