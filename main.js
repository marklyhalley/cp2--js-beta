


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
// Esperado: "OñzPfmwl" (Nota: pode variar dependendo da sua implementação de caracteres especiais/ASCII)

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
console.log(cifrarCesar("fulswrjudiia", -3)); // Esperado: "criptografia"



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

