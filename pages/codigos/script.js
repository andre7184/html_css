function testCode() {
  const htmlCode = document.getElementById("htmlCode").value;
  const cssCode = document.getElementById("cssCode").value;

  // Cria um documento temporário para analisar o HTML
  const tempDoc = document.implementation.createHTMLDocument();
  tempDoc.documentElement.innerHTML = htmlCode;

  // Extrai o conteúdo do body
  const bodyContent = tempDoc.body.innerHTML;

  // Cria o código HTML completo para a nova página
  const fullHtml = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Preview</title>
            <style>${cssCode}</style>
        </head>
        <body>
            ${bodyContent}
        </body>
        </html>
    `;

  const newWindow = window.open();
  newWindow.document.open();
  newWindow.document.write(fullHtml);
  newWindow.document.close();
}
