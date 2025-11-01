


function cifrarAtbash(texto) {
    let alfaMaiusculo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alfaMinusculo = "abcdefghijklmnopqrstuvwxyz";
    let saida = "";

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        let indice, indiceInvertido;

        if (alfaMaiusculo.indexOf(char) !== -1) {
            indice = alfaMaiusculo.indexOf(char);
            indiceInvertido = 25 - indice;
            saida += alfaMaiusculo[indiceInvertido];
        } else if (alfaMinusculo.indexOf(char) !== -1) {
            indice = alfaMinusculo.indexOf(char);
            indiceInvertido = 25 - indice;
            saida += alfaMinusculo[indiceInvertido];
        } else {
            saida += char;
        }
    }

    return saida;
}

console.log(cifrarAtbash("OlaMundo")); 
console.log(cifrarAtbash("LozNfmwl"));

function cifrarCesar(mensagem, chave) {
  let resultado = "";

  for (let i = 0; i < mensagem.length; i++) {
    let char = mensagem[i];

    if (char >= 'A' && char <= 'Z') {
      let codigo = ((char.charCodeAt(0) - 65 + chave + 26) % 26) + 65;
      resultado += String.fromCharCode(codigo);
    }
    else if (char >= 'a' && char <= 'z') {
      let codigo = ((char.charCodeAt(0) - 97 + chave + 26) % 26) + 97;
      resultado += String.fromCharCode(codigo);
    }
    else {
      resultado += char;
    }
  }

  return resultado;
}

console.log(cifrarCesar("criptografia", 3)); // Esperado: "fulswrjudiia"
console.log(cifrarCesar("fulswrjudild", -3)); // Esperado: "criptografia"

function cifrarVigenere(mensagem, palavraChave, modo = 'codificar') {
    let resultado = "";
    let chaveIndex = 0;  
    let chave = palavraChave.toUpperCase();  

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];


        if (char >= 'A' && char <= 'Z') {
            let deslocamento = chave.charCodeAt(chaveIndex % chave.length) - 65; 
            if (modo === 'decodificar') {
                deslocamento = -deslocamento;
            }

            let novoCodigo = (char.charCodeAt(0) - 65 + deslocamento + 26) % 26 + 65;
            resultado += String.fromCharCode(novoCodigo);

            chaveIndex++;  
        }
        
        else if (char >= 'a' && char <= 'z') {
            let deslocamento = chave.charCodeAt(chaveIndex % chave.length) - 65;
            if (modo === 'decodificar') {
                deslocamento = -deslocamento;  
            }

            let novoCodigo = (char.charCodeAt(0) - 97 + deslocamento + 26) % 26 + 97;
            resultado += String.fromCharCode(novoCodigo);

            chaveIndex++; 
        }
        else {
            resultado += char;
        }
    }

    return resultado;
}

const chaveV = "CHAVE";
const codificadoV = cifrarVigenere("Enigma!", chaveV, 'codificar'); 
console.log(codificadoV); // Ex: "Gñlgnx!"
console.log(cifrarVigenere(codificadoV, chaveV, 'decodificar')); // Esperado: "Enigma!"

/* * FUNÇÃO FORNECIDA - NÃO É NECESSÁRIO MODIFICAR. */
function gerarChavesRSA_Didaticas(p, q) {
    if (p <= 1 || q <= 1) return null; 
    
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
    
    let E = 3;
    while (E < phi_N) {
        // Encontrar o primeiro E que é coprimo de phi_N
        if ((phi_N % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) {
             // Otimização: A verificação (p-1)%E e (q-1)%E não é rigorosamente a do RSA, 
             // mas é didática e evita fatores óbvios para primos pequenos.
            break;
        }
        E++;
    }

    let D = 1;
    while (D < phi_N) {
        // Encontrar D tal que (D * E) % phi_N === 1
        if ((D * E) % phi_N === 1) {
            break;
        }
        D++;
    }
    
    return {
        publica: { E, N }, // Use E e N para CIFRAR
        privada: { D, N }  // Use D e N para DECIFRAR
    };
}


function cifrarRSA_Didatico(mensagem, E, N) {
    let resultado = [];

    for (let i = 0; i < mensagem.length; i++) {
        let x = mensagem.charCodeAt(i); 
        let cifrado = 1;


        for (let j = 0; j < E; j++) {
            cifrado = (cifrado * x) % N;
        }

        resultado[i] = cifrado; 
    }

    return resultado;
}


function decifrarRSA_Didatico(mensagemCifrada, D, N) {
    let resultado = "";

    for (let i = 0; i < mensagemCifrada.length; i++) {
        let C = mensagemCifrada[i]; 
        let decifrado = 1;

        for (let j = 0; j < D; j++) {
            decifrado = (decifrado * C) % N;
        }

        resultado += String.fromCharCode(decifrado);
    }

    return resultado;
}

const PRIMO_1 = 17;
const PRIMO_2 = 19;
const CHAVES = gerarChavesRSA_Didaticas(PRIMO_1, PRIMO_2); 

const textoOriginal = "OLA"; 


const cifrado = cifrarRSA_Didatico(textoOriginal, CHAVES.publica.E, CHAVES.publica.N);
console.log("RSA Cifrado:", cifrado); 


const decifrado = decifrarRSA_Didatico(cifrado, CHAVES.privada.D, CHAVES.privada.N);
console.log("RSA Decifrado:", decifrado); 