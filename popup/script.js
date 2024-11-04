import { Popup } from './js/popup.js';

const body = `<form class="form"> 
<label class="input-label">Selecione o tipo de entrega</label>
<div class="form-group">
    <div class="input-container">
        <label>
            <input checked class="input-radio" id="tipo_entrega_digix" type="radio" name="tipo_entrega" value="digix">
            Retirar na Digix
        </label>
    </div>
    <div class="input-container">
        <label>
            <input class="input-radio" id="tipo_entrega_endereco" type="radio" name="tipo_entrega" value="endereco">
            Entregar no endereço
        </label>
    </div>
</div>
<div class="form-endereco-desativado" id="endereco">
    <span class="obs"><span class="asterisco">*</span> Campos obrigatórios</span>
    <div class="form-group">
        <div class="input-container">
            <label for="cep">Cep<span class="asterisco">*</span></label>
            <input
                class="input-text required"
                type="text"
                name="cep"
                disabled
            />
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="cidade">Cidade<span class="asterisco">*</span></label>
            <input
                class="input-text required"
                type="text"
                name="cidade"
                disabled
            />
        </div>
        <div class="input-container">
            <label for="estado">Estado<span class="asterisco">*</span></label>
            <select disabled class="input-select required" name="estado">
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option selected value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="bairro">Bairro<span class="asterisco">*</span></label>
            <input
                class="input-text required"
                type="text"
                name="bairro"
                disabled
            />
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="rua">Rua<span class="asterisco">*</span></label>
            <input
                class="input-text required"
                type="text"
                name="rua"
                disabled
            />
        </div>
    </div>
    <div class="form-group">
        <div class="input-container">
            <label for="numero">Número<span class="asterisco">*</span></label>
            <input
                class="input-text required"
                type="text"
                name="numero"
                disabled
            />
        </div>
        <div class="input-container">
            <label for="complemento">Complemento</label>
            <input
                class="input-text"
                type="text"
                name="complemento"
                disabled
            />
        </div>
    </div>
</div>
<div class="form-group">
    <button class="input-button" type="submit">Concluir Pedido</button>
</div>
</form>`;

function criarPopup(tipo) {
    // Instancia a classe Popup
    const config = { // Configura o popup
        fecharComEsc: true,
        estilo: tipo,
        titulo:'Finalizar Compra',
        conteudo: body
    }
    const popup = new Popup(config); // Instancia o popup

    // Chama a funcionalidade de mostrar o popup    
    popup.showPopup(() => {
        // Adiciona eventos aos inputs após a criação do popup
        document.getElementById('tipo_entrega_digix').addEventListener('click', () => desativarEnderecoForm(true));
        document.getElementById('tipo_entrega_endereco').addEventListener('click', () => desativarEnderecoForm(false));
    });
}

function desativarEnderecoForm(acao) {
    const enderecoForm = document.getElementById('endereco');
    if (acao) {
        console.log('desativar');
        const camposForms = enderecoForm.querySelectorAll('input, select');
        [].forEach.call(camposForms, function (el) {
            el.setAttribute('disabled', 'disabled');
        });
        enderecoForm.classList.remove('form-endereco-ativo');
        enderecoForm.classList.add('form-endereco-desativado');
    } else {
        console.log('ativar');
        // ativa inputs e selects
        const camposForms = enderecoForm.querySelectorAll('input, select');
        [].forEach.call(camposForms, function (el) {
            el.removeAttribute('disabled');
        });
        enderecoForm.classList.remove('form-endereco-desativado');
        enderecoForm.classList.add('form-endereco-ativo');
    }
}

const botaoAdmin = document.getElementById("btnPopupAdmin");
const botaoColaborador = document.getElementById("btnPopupColaborador");
botaoAdmin.addEventListener("click", () => criarPopup('admin'));
botaoColaborador.addEventListener("click", () => criarPopup('colaborador'));


