//objeto literal
let perfilConservador = {
    perfil: "Conservador",
    descricao: "é aquele que opta pela segurança do seu capital acima das possibilidades de ganho. É o perfil mais adotado no começo da jornada do investidor. Neste perfil é natural que sua carteira contenha mais ativos de renda fixa, nisso ele será recompensado em um menor risco e um retorno proporcional. Geralmente investidores com perfil conservador dão prioridade a investimentos com liquidez diária ou com curto prazo de vencimento."
}
let perfilModerado = {
    perfil: "Moderado",
    descricao: "é o meio termo entro o conservador e o agressivo. Ele abre mão da segurança, porém se arrisca em empreitadas mais lucrativas. A diversificação neste perfil é mais abrangente que o conservador quando pensamos nas classes de ativos, assim como no prazo. Investidores com este perfil geralmente investem em titulos atrelados ao IPCA+ ou correções monetárias, mas também buscam em partes investimentos com maior risco e retorno como ações, fundos imobiliários e fundos multimercados."
}
let perfilAgressivo = {
    perfil: "Agressivo", 
    descricao: "é o investidor que direciona todos os seus esforços em fazer a maior quantidade de dinheiro. Tem baixa aversão ao risco de perda, o que traduz em empreendimentos mais audazes. É um perfil que alinha muito capital e conhecimento, com apetite maior aos riscos. Este investidor também não tem grandes preocupações com a liquidez dos investimentos, tendo uma visão de longo prazo para sua carteira."
}

function calcularPerfil(){
    const objetivo = parseInt(document.querySelector('input[name="objetivo"]:checked').value);
    const emocional = parseInt(document.querySelector('input[name="emocional"]:checked').value);
    const investimento = parseInt(document.querySelector('input[name="investimento"]:checked').value);
    const conhecimento = parseInt(document.querySelector('input[name="conhecimento"]:checked').value);

    const resultado = objetivo + emocional + investimento + conhecimento;
    return resultado;
}

function criarPerfil(){
    const resultado = calcularPerfil();
    let perfilTitulo, descricao;

    if (resultado <= 5){
        perfilTitulo = perfilConservador.perfil;
        descricao = perfilConservador.descricao;
    }else if (resultado > 5 && resultado <=9){
        perfilTitulo = perfilModerado.perfil;
        descricao = perfilModerado.descricao;
    } else{
        perfilTitulo = perfilAgressivo.perfil;
        descricao = perfilAgressivo.descricao;
    }
    
    const titulo = document.createElement("h2");
    titulo.innerHTML = `Seu perfil de investimento é: <span id="resultado">${perfilTitulo}</span>`;
    titulo.style.marginBottom = "20px";
       
    const texto = document.createElement("p");
    texto.innerHTML = `O <strong>perfil de investimento ${perfilTitulo}</strong> ${descricao}`; 
    
    const resultadoSection = document.getElementById("resultado-section");
    resultadoSection.innerHTML = ""; // Limpa qualquer resultado anterior
    resultadoSection.appendChild(titulo);
    resultadoSection.appendChild(texto);
    resultadoSection.style.display = "block"; // Torna a seção visível
}

function MostrarPerfil(){
    criarPerfil();
};