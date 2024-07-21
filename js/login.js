/*------VALIDAÇÃO NOME USUÁRIO------*/
let nomeInput = document.getElementById("nomeUsuario");
let nomeHelper = document.getElementById("nome-helper");

nomeInput.addEventListener("change", (e) =>{
    let valor = e.target.value;

    if (valor.length <5){
        nomeInput.classList.remove("correta");
        nomeInput.classList.add("erro");
        nomeHelper.innerText = "Nome invalido. Favor inserir um nome válido";

    } else{
        nomeInput.classList.remove("erro");
        nomeInput.classList.add("correta");
        nomeHelper.innerText = "";
    }
});


/*------VALIDAÇÃO NOME EMAIL------*/
let emailInput = document.getElementById("email");
let emailHelper = document.getElementById("email-helper");

emailInput.addEventListener("change", (e) =>{
    let valor = e.target.value;

    if (valor.includes("@") && valor.includes(".com")){
        emailInput.classList.remove("erro");
        emailInput.classList.add("correta");
        emailHelper.innerText = "";
        
    } else{
        emailInput.classList.remove("correta");
        emailInput.classList.add("erro");
        emailHelper.innerText = "E-mail invalido. Favor inserir um e-mail válido";
    }
});

/*------VALIDAÇÃO NOME SENHA------*/
let senhaCadastroInput = document.getElementById("senhaCadastro");
let senhaCadastroHelper = document.getElementById("senha-cadastro-helper");

senhaCadastroInput.addEventListener("change", (e) =>{
    let valor = e.target.value;
    
    if(valor.length < 6){
        senhaCadastroHelper.innerText = "";
        senhaCadastroInput.classList.remove("correta");
        senhaCadastroInput.classList.add("erro");
        senhaCadastroHelper.innerText = "A senha deve conter no mínimo 6 caracteres";
    } else{
        senhaCadastroInput.classList.remove("erro");
        senhaCadastroInput.classList.add("correta");
        senhaCadastroHelper.innerText = "";
    }
});

/*------VALIDAÇÃO NOME CONFIRMAÇÃO SENHA------*/
let confirmaSenhaInput = document.getElementById("senhaConfirmacao");
let confirmaSenhaHelper = document.getElementById("confirma-senha-helper");

confirmaSenhaInput.addEventListener("change", (e) =>{
    let senha = senhaCadastroInput.value;
    let confirmacao = e.target.value;

    if(senha !== confirmacao){
        confirmaSenhaHelper.innerText = "";
        confirmaSenhaInput.classList.remove("correta");
        confirmaSenhaInput.classList.add("erro");
        confirmaSenhaHelper.innerText = "As senhas não correspondem.";
    } else{
        confirmaSenhaInput.classList.remove("erro");
        confirmaSenhaInput.classList.add("correta");
        confirmaSenhaHelper.innerText = "";
    }
});

/*------Função cadastrar------*/
function cadastrar(){
    let nomeValido = nomeInput.classList.contains("correta");
    let emailValido = emailInput.classList.contains("correta");
    let senhaValida = senhaCadastroInput.classList.contains("correta");
    let confirmaSenhaValida = confirmaSenhaInput.classList.contains("correta");

    if (nomeValido && emailValido && senhaValida && confirmaSenhaValida) {
        //armazenando os dados para usar no login
        let nomeLogin = nomeInput.value;
        let senhaLogin = senhaCadastroInput.value;

        localStorage.setItem("nomeLogin", nomeLogin);
        localStorage.setItem("senhaLogin", senhaLogin);

        alert("Cadastro realizado com sucesso!");

        // Limpar campos
        nomeInput.value = "";
        emailInput.value = "";
        senhaCadastroInput.value = "";
        confirmaSenhaInput.value = "";
        nomeInput.classList.remove("correta");
        emailInput.classList.remove("correta");
        senhaCadastroInput.classList.remove("correta");
        confirmaSenhaInput.classList.remove("correta");

    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}
/*------Função Login------*/
function logar(){
    let nomeLoginInput = document.getElementById("nomeLogin");
    let senhaLoginInput = document.getElementById("senhaLogin");
    let confirmaLogin = document.getElementById("confirma-login-helper");
    let btnLogin = document.getElementById("btnLogin");
    let formLogin = document.querySelector("#login");
    let formCadastro = document.querySelector("#cadastro");
    let mensagembemVindo = document.getElementById("mensagem-boa-vinda");

    let nomeLogin = localStorage.getItem("nomeLogin");
    let senhaLogin = localStorage.getItem("senhaLogin");

    if (nomeLoginInput.value === nomeLogin && senhaLoginInput.value === senhaLogin){
        nomeLoginInput.classList.remove("erro");
        senhaLoginInput.classList.remove("erro");
        btnLogin.innerText = `${nomeLoginInput.value}`;
        formLogin.style.display = "none";
        formCadastro.style.display = "none";
        mensagembemVindo.style.display = "block"
        mensagembemVindo.innerHTML = `<h1>Seja bem vindo ${nomeLoginInput.value}</h1>`;
        
    } else{
        confirmaLogin.innerText = "Nome Usuário/Senha incorretos."
        nomeLoginInput.classList.add("erro");
        senhaLoginInput.classList.add("erro");
    }
}