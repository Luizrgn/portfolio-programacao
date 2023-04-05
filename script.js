// seleciona o formulário e os campos de entrada
const form = document.querySelector('.tabela-contato');
const nomeInput = document.querySelector('#nome');
const emailInput = document.querySelector('#email');
const mensagemInput = document.querySelector('#mensagem');

// adiciona um evento de "submit" ao formulário
form.addEventListener('submit', function(event) {
  // impede o comportamento padrão do formulário de enviar o email
  event.preventDefault();

  // valida o formulário antes de enviar o email
  if (!validateForm()) {
    return;
  }

  // cria um objeto com os dados do formulário
  const data = {
    nome: nomeInput.value,
    email: emailInput.value,
    mensagem: mensagemInput.value
  };

  // substitua o emailDestino pelo endereço de email onde você quer receber os formulários
  const emailDestino = 'seu-email@provedor.com';
  const assuntoEmail = 'Formulário de Contato do meu Site';

  // formata os dados do formulário como uma string de consulta para enviar no corpo do email
  const body = Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
  }).join('&');

  // cria uma solicitação HTTP usando o método POST e envia os dados do formulário para o serviço de email do FormSubmit.co
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `https://formsubmit.co/ajax/${emailDestino}`, true);
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.onreadystatechange = function() {
    // exibe uma mensagem de sucesso ou erro dependendo da resposta do servidor
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Obrigado por entrar em contato! Sua mensagem foi enviada.');
      form.reset();
    } else {
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
    }
  };
  xhr.send(body);
});

// função para validar o formulário
function validateForm() {
  let isValid = true;
  const nomeValue = nomeInput.value.trim();
  const emailValue = emailInput.value.trim();
  const mensagemValue = mensagemInput.value.trim();

  // verifica se o campo "nome" está em branco e define uma mensagem de erro se estiver
  if (nomeValue === '') {
    setErrorFor(nomeInput, 'Por favor, informe seu nome');
    isValid = false;
  } else {
    setSuccessFor(nomeInput);
  }

  // verifica se o campo "email" está em branco ou é inválido e define uma mensagem de erro se estiver
  if (emailValue === '') {
    setErrorFor(emailInput, 'Por favor, informe seu email');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(emailInput, 'Por favor, informe um email válido');
    isValid = false;
  } else {
    setSuccessFor(emailInput);
  }

  // verifica se o campo "mensagem" está em branco e define uma mensagem de erro se estiver
  if (mensagemValue === '') {
    setErrorFor(mensagemInput, 'Por favor, digite sua mensagem');
    isValid = false;
  } else {
    setSuccessFor(mensagemInput);
  }

  return isValid;
}

// função para definir uma mensagem de erro em um campo
function setErrorFor(input, message) {
    const formGroup = input.parentElement; // seleciona o elemento "form-group" que contém o campo de entrada
    const small = formGroup.querySelector('small'); // seleciona o elemento "small" que exibirá a mensagem de erro
    small.innerText = message; // define a mensagem de erro no elemento "small"
    formGroup.classList.add('error'); // adiciona a classe "error" ao elemento "form-group" para destacar o erro
  }
    
// função para definir uma mensagem de sucesso em um campo
function setSuccessFor(input) {
    const formGroup = input.parentElement; // seleciona o elemento "form-group" que contém o campo de entrada
    formGroup.classList.remove('error'); // remove a classe "error" do elemento "form-group", caso exista
  }
    
// verifica se o campo "nome" está em branco e define uma mensagem de erro se estiver
 if (nomeValue === '') {
    setErrorFor(nomeInput, 'Por favor, digite seu nome');
    isValid = false;
  } else {
    setSuccessFor(nomeInput);
  }
    
// verifica se o campo "email" está em branco e define uma mensagem de erro se estiver
 if (emailValue === '') {
    setErrorFor(emailInput, 'Por favor, digite seu e-mail');
    isValid = false;
  } else if (!isEmail(emailValue)) { // verifica se o valor do campo "email" é um e-mail válido e define uma mensagem de erro se não for
    setErrorFor(emailInput, 'Por favor, digite um e-mail válido');
    isValid = false;
  } else {
    setSuccessFor(emailInput);
  }
    
// verifica se o campo "mensagem" está em branco e define uma mensagem de erro se estiver
 if (mensagemValue === '') {
    setErrorFor(mensagemInput, 'Por favor, digite sua mensagem');
    isValid = false;
 } else {
    setSuccessFor(mensagemInput);
 }
   
   return isValid; // retorna o valor que indica se o formulário é válido ou não



  