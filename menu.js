var ALTURA,LARGURA    
    
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if(LARGURA>= 500){
        LARGURA=600;
        ALTURA=600;
    }

    canvas = document.createElement("canvas");
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000"
    canvas.style.backgroundColor = "blue"
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    botaoFase1 = document.createElement("button");
    botaoFase1.id = "botaoFase1";
    botaoFase1.innerText = "Fase1";
    botaoFase1.setAttribute('onclick', 'iniciarFase1()')
    document.body.appendChild(botaoFase1);

    botaoMeuRecord = document.createElement("button");
    botaoMeuRecord.id = "botaoMeuRecord";
    botaoMeuRecord.innerText = "Mostrar Record";
    botaoMeuRecord.setAttribute('onclick', 'mostrarRecord()')
    document.body.appendChild(botaoMeuRecord);

    botaoDificuldade = document.createElement("button");
    botaoDificuldade.id = "botaoDificuldade";
    botaoDificuldade.innerText = "Dificuldade";
    botaoDificuldade.setAttribute('onclick', 'dificuldade()')
    document.body.appendChild(botaoDificuldade);



//inicia a fase 1 que está na pasta "fase1.js"


   function iniciarFase1(){
        
     canvas.remove();
     botaoDificuldade.remove();
     botaoFase1.remove();
     botaoMeuRecord.remove();

// esta funcao chama o java script em outra pagina

  function include(file_path) {
    var j = document.createElement("script");
    j.type = "text/javascript";
    j.src = file_path;
    document.body.appendChild(j);
  }
  
  include("fase1.js");

// esta funcao chama o java script em outra pagina
}

//inicia a fase 1 que está na pasta "fase1.js"

function mostrarRecord(){
    alert("record")
}

function dificuldade(){
    alert("dificuldade")
}
