document.addEventListener('DOMContentLoaded', function () {
    const initialInput = document.getElementById('inicial');
    const monthlyInput = document.getElementById('mensal');

    initialInput.addEventListener('input', function () {
        this.value = formatCurrencyInput(this.value);
    });

    monthlyInput.addEventListener('input', function () {
        this.value = formatCurrencyInput(this.value);
    });
});

document.querySelector('.btn-cinza').addEventListener('click', function () {
    const tempo = parseInt(document.getElementById('tempo').value);
    const inicial = parseCurrencyInput(document.getElementById('inicial').value);
    const mensal = parseCurrencyInput(document.getElementById('mensal').value);

    if (isNaN(tempo) || isNaN(inicial) || isNaN(mensal)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const rates = {
        poupanca: 0.0025,
        tesouro: 0.0033,
        cdb: 0.0035,
        FIIS: 0.004,
    };

    const calculateCompoundInterest = (principal, rate, time, monthly) => {
        let total = principal;
        for (let i = 0; i < time; i++) {
            total += monthly;
            total *= (1 + rate);
        }
        return total;
    };

    const results = {};
    for (const investment in rates) {
        results[investment] = calculateCompoundInterest(inicial, rates[investment], tempo, mensal);
    }

    displayResults(results);
});

function parseCurrencyInput(value) {
    return parseFloat(value.replace(/[^\d,]/g, '').replace('.', '').replace(',', '.'));
}

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

function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    for (const investment in results) {
        resultDiv.innerHTML += `
            <h2>${investment.toUpperCase()}</h2>
            <p>O valor total do retorno é de: ${formatCurrency(results[investment])}</p>
        `;
    }
}
