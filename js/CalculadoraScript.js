// Adiciona um evento que será executado quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Obtém os elementos de entrada para o valor inicial e o valor mensal
    const initialInput = document.getElementById('inicial');
    const monthlyInput = document.getElementById('mensal');

    // Adiciona um evento ao campo inicial para formatar o valor conforme o usuário digita
    initialInput.addEventListener('input', function () {
        this.value = formatCurrencyInput(this.value);
    });

    // Adiciona um evento ao campo mensal para formatar o valor conforme o usuário digita
    monthlyInput.addEventListener('input', function () {
        this.value = formatCurrencyInput(this.value);
    });
});

// Adiciona um evento ao botão de classe 'btn-cinza' para calcular os investimentos quando clicado
document.querySelector('.btn-cinza').addEventListener('click', function () {
    // Obtém os valores dos campos de entrada e converte para números
    const tempo = parseInt(document.getElementById('tempo').value);
    const inicial = parseCurrencyInput(document.getElementById('inicial').value);
    const mensal = parseCurrencyInput(document.getElementById('mensal').value);

    // Verifica se algum campo está vazio ou inválido
    if (isNaN(tempo) || isNaN(inicial) || isNaN(mensal)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return; // Sai da função se os campos estiverem inválidos
    }

    // Define as taxas de juros para diferentes tipos de investimentos
    const rates = {
        poupanca: 0.0025,
        tesouro: 0.0033,
        cdb: 0.0035,
        FIIS: 0.004,
    };

    // Função para calcular o juros composto
    const calculateCompoundInterest = (principal, rate, time, monthly) => {
        let total = principal;
        for (let i = 0; i < time; i++) {
            total += monthly; // Adiciona o aporte mensal
            total *= (1 + rate); // Aplica a taxa de juros
        }
        return total; // Retorna o valor total após o período
    };

    // Calcula os resultados para cada tipo de investimento
    const results = {};
    for (const investment in rates) {
        results[investment] = calculateCompoundInterest(inicial, rates[investment], tempo, mensal);
    }

    // Exibe os resultados calculados na página
    displayResults(results);
});

// Função para converter a entrada de moeda para um número de ponto flutuante
function parseCurrencyInput(value) {
    return parseFloat(value.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.'));
}

// Função para formatar a entrada de moeda durante a digitação
function formatCurrencyInput(value) {
    // Remove todos os caracteres que não sejam dígitos
    value = value.replace(/[^\d]/g, '');

    // Se o valor tiver menos de 3 dígitos, adicione zeros à esquerda para garantir 3 dígitos
    while (value.length < 3) {
        value = '0' + value;
    }

    // Separe os últimos 2 dígitos como parte decimal
    let integerPart = value.slice(0, -2);
    let decimalPart = value.slice(-2);

    // Remove zeros à esquerda da parte inteira
    integerPart = integerPart.replace(/^0+/, '');

    // Se a parte inteira estiver vazia, definir como zero
    if (integerPart === '') {
        integerPart = '0';
    }

    // Formatar a parte inteira com separador de milhar
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retornar o valor formatado
    return 'R$ ' + integerPart + ',' + decimalPart;
}

// Função para formatar um número como moeda brasileira
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para exibir os resultados na página
function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Limpa o conteúdo anterior
    for (const investment in results) {
        resultDiv.innerHTML += `
            <h2>${investment.toUpperCase()} :</h2>
            <p>O valor total do retorno é de: ${formatCurrency(results[investment])}</p>
        `;
    }
}
