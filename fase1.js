
            var img, cenario,canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 1, estadoAtual, recorde, canvas2, 
            botao, botao2, velocidadeBala = 2,velocidadeBalaMonstro=2,inicioObstaculoGlobal=[],inicioBalaMonstroGlobal= [], alturaObs, matou=0, dano = 10, danoMonstro=10,  vida = 100,vidaTotal = 100,
            vidaTotalBloco=100, botaoPausa,

            estados = {
                jogar:0,
                jogando:1,
                perdeu:2,
                pausado:3
            },
            chao = {
                y: 550,
                altura:50,
                cor: "#ffdf70",

                desenha:function(){
                    ctx.fillStyle= this.cor;
                    ctx.fillRect(0,this.y, LARGURA, this.altura)
                }
            },
            bloco = {
                x:-50,
                y:380,
                altura:imgBloco.altura,
                largura:imgBloco.largura,
                cor:"#ff4e4e",
                gravidade:1.5,
                velocidade:0,
                forcaDoPulo:20,
                qtsPulos:0,
                score:0,

                atualiza:function(){

                //faz o bloco principal entrar no cenario da esqueda -50 até 50
                    if (this.x <= 50){
                    this.x += velocidade;
                    }
                //faz o bloco principal entrar no cenario da esqueda -50 até 50

                    this.velocidade += this.gravidade;
                    this.y += this.velocidade;

                    if(this.y > chao.y - this.altura && estadoAtual != estados.perdeu){
                        this.y = chao.y - this.altura;
                        this.qtsPulos=0;
                        this.velocidade= 0;
                    }
                },

                pula:function(){
                    if (this.qtsPulos < maxPulos){
                    this.velocidade = -this.forcaDoPulo;
                    this.qtsPulos ++;
                    }
                },
                pausa: function(){
                    
                },

                reset: function(){
                    bloco.velocidade =0;
                    bloco.y = 0;

                    if (this.score > recorde){
                        localStorage.setItem("recorde", this.score)
                        recorde = this.score;
                    }


                    this.score = 0;
                },

                desenha:function(){
                    // aqui é o desenho do bloco principal
                    imgBloco.desenha(this.x,this.y);
                    // aqui é o desenho do bloco principal
                }
            },

            obstaculo ={
                _obs: [],
                bala: [],
                inicioBala: 300,
                cor:["#78ff5d"],
                tempoInsere:0,
                altura_obs: 170, 

                insere: function(){
                    this._obs.unshift({
                        x: LARGURA,
                        largura: 130 ,
                        altura: this.altura_obs,
                        cor: this.cor,
                    });
                    

                    this.tempoInsere = 30 + Math.floor(500 * Math.random());
                },
                atualiza: function(){
                    if(this.tempoInsere == 0)
                    this.insere();
                    else this.tempoInsere--;

                    for(i=0, tam=this._obs.length; i< tam; i++){
                        var obs = this._obs[i];
                        alturaObs = obs.altura;

                        obs.x -= velocidade;
                        
                        if(this._obs.length>0){
                           inicioObstaculoGlobal[0] = obs.x;
                           inicioBalaMonstroGlobal[0] = obs.x;

                        }
                        if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura>= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura){
                            estadoAtual = estados.perdeu;

                            //apaga o botao de pausa se o jogo for perdido pelo toque do obs no bloco
                                apagarBotaoPausa = document.getElementById("botaoPausa");
                                if (apagarBotaoPausa.parentNode){
                                apagarBotaoPausa.parentNode.removeChild(apagarBotaoPausa);
                                }   
                            //apaga o botao de pausa se o jogo for perdido pelo toque do obs no bloco                 
                        
                        
                        }
                        else if (obs.x == 0){
                            bloco.score++;
                        }

                        else if(obs.x <= -obs.largura){
                            this._obs.splice(i,1);
                            tam--;
                            i--;
                        }
                    }
                },
                limpa: function(){
                    this._obs = [];
                },
                pausa:function(){
                    velocidade = 0;
                },
                play:function(){
                    velocidade = 1.25;
                },
                
                desenha: function(){
                    for (var i=0,tam=this._obs.length;i<tam;i++){
                        var obs = this._obs[i]
                       // ctx.fillStyle = obs.cor;
                       // ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
                        imgObs.desenha(obs.x,chao.y - obs.altura);                     
                        
                    }
                },
                vida:function(){

                }
            },
            // "tiro" é o tiro que o bloco dispara
            tiro={
                bala:[],                
                cor:"#000",                
                inicioBala:bloco.x + 215,

                insere: function (){
                    if(bloco.y +bloco.altura  == chao.y && estadoAtual == estados.jogando ){
                    this.bala.unshift({
                        x: this.inicioBala,
                        largura: 20,
                        altura: 10,
                        
                    });
                    }
                },


                atualiza: function(){
                    for(var i=0, tam=this.bala.length;i<tam;i++){
                        _bala = this.bala[i];
                        _bala.x += velocidadeBala;
                    
                     if (_bala.x > LARGURA){
                         this.bala.splice(i,1);
                         tam--;
                         i--;
                     }
                    }
                },

                limpa: function(){
                    this.bala=[];
                },

                desenha: function(){
                    for (var i=0, tam =this.bala.length; i<tam;i++){
                        _bala = this.bala[i];
                        
                     //   ctx.fillStyle = this.cor;
                      //  ctx.fillRect(_bala.x, chao.y - 68, _bala.largura, _bala.altura);
                        imgBalaBloco.desenha(_bala.x,chao.y -110); 

                        
                        // desenho do life do obstaculo
                        if (inicioObstaculoGlobal >= 0 && obstaculo._obs.length > 0){
                        ctx.fillStyle = "#000";
                        ctx.fillRect(inicioObstaculoGlobal, chao.y - obstaculo.altura_obs - 15 , vidaTotal, 5);
                        }
                        // desenho do life do obstaculo

                        if (inicioObstaculoGlobal <= _bala.x + _bala.largura && inicioObstaculoGlobal[0] >= bloco.x + bloco.largura  ){                        
                              
                            this.bala.pop();
                           
                            vidaTotal -= dano
                        //o obstaculo explode depois que a vida chegar em zero
                            if(vidaTotal <= 0){
                                obstaculo._obs.pop();
                                inicioObstaculoGlobal = []
                                matou++;
                           
                                vidaTotal = 50;
                            }
                        //o obstaculo explode depois que a vida chegar em zero  
                            
                        }                    
                    }
                }
            },

            tiroBala2={
                bala:[],                
                cor:"#000",                
                inicioBala:bloco.x + 215,

                insere: function (){
                    if(bloco.y +bloco.altura  == chao.y && estadoAtual == estados.jogando ){
                    this.bala.unshift({
                        x: this.inicioBala,
                        largura: 20,
                        altura: 10,
                        
                    });
                    }
                },

                atualiza: function(){
                    for(var i=0, tam=this.bala.length;i<tam;i++){
                        _bala = this.bala[i];
                        _bala.x += velocidadeBala;
                    
                     if (_bala.x > LARGURA){
                         this.bala.splice(i,1);
                         tam--;
                         i--;
                     }
                    }
                },

                limpa: function(){
                    this.bala=[];
                },

                desenha: function(){
                    for (var i=0, tam =this.bala.length; i<tam;i++){
                        _bala = this.bala[i];
                        
                     //   ctx.fillStyle = this.cor;
                      //  ctx.fillRect(_bala.x, chao.y - 68, _bala.largura, _bala.altura);
                        imgBala2Bloco.desenha(_bala.x,chao.y -110); 

                        
                        // desenho do life do obstaculo
                        if (inicioObstaculoGlobal >= 0 && obstaculo._obs.length > 0){
                        ctx.fillStyle = "#000";
                        ctx.fillRect(inicioObstaculoGlobal, chao.y - obstaculo.altura_obs - 15 , vidaTotal, 5);
                        }
                        // desenho do life do obstaculo

                        if (inicioObstaculoGlobal <= _bala.x + _bala.largura && inicioObstaculoGlobal[0] >= bloco.x + bloco.largura  ){                        
                              
                            this.bala.pop();
                           
                            vidaTotal -= dano
                        //o obstaculo explode depois que a vida chegar em zero
                            if(vidaTotal <= 0){
                                obstaculo._obs.pop();
                                inicioObstaculoGlobal = []
                                matou++;
                           
                                vidaTotal = 50;
                            }
                        //o obstaculo explode depois que a vida chegar em zero  
                            
                        }                    
                    }
                }
            },

            tiroMonstro={
                balaMonstro:[],
                cor:"#000",
                inicioBala: inicioBalaMonstroGlobal,
                YBala:400,
                tempoTiroMonstro:0,
                
                dano:10,
                corVida: "#000",

                insere:function(){
                    if(obstaculo._obs.length > 0){
                    this.balaMonstro.unshift({
                        x: this.inicioBala,
                        largura:20,
                        altura:10,
                    }
                    );}
                    this.tempoTiroMonstro = 70 + Math.floor(200 * Math.random());
                },
            
                atualiza:function(){
                    if(this.tempoTiroMonstro == 0)
                    this.insere();
                    else this.tempoTiroMonstro--;

                for(var i=0, tam=this.balaMonstro.length;i<tam;i++){
                    _balaMonstro = this.balaMonstro[i]
                    _balaMonstro.x -= velocidadeBalaMonstro;
                
//explode a bala do monstro depois que atingir o bloco 
//principal e nao atinge se pular
                    if(_balaMonstro.x <= bloco.x + bloco.largura - 55+ _balaMonstro.largura &&  /*permite pular a bala----->*/ this.YBala <= (bloco.y + bloco.altura)){
                        this.balaMonstro.splice(i,1);
                        vidaTotalBloco -= danoMonstro;
//explode a bala do monstro depois que atingir o bloco 
//principal e nao atinge se pular

// diminui a vida do bloco principal
                    if (_balaMonstro.x <= bloco.x){ 
                        vidaTotalBloco += danoMonstro;
                    }
// diminui a vida do bloco principal

                        tam--;
                        i--;

                    }
                  
// aqui é pra destruir o bloco principal
                    if (vidaTotalBloco<= 9){
                        estadoAtual = estados.perdeu

    //apaga o botao de pausa se o jogo for perdido pelos tiros dos OBS

                            apagarBotaoPausa = document.getElementById("botaoPausa");
                            if (apagarBotaoPausa.parentNode){
                                apagarBotaoPausa.parentNode.removeChild(apagarBotaoPausa);
                            }   

    //apaga o botao de pausa se o jogo for perdido pelos tiros dos OBS
                    }
// aqui é pra destruir o bloco principal
                }
                },

                limpa:function(){
                    this.balaMonstro=[];
                },

                desenha:function(){
                    for(var i=0, tam=this.balaMonstro.length;i<tam;i++){
                        _balaMonstro = this.balaMonstro[i];

                        //ctx.fillStyle= this.cor;
                        //ctx.fillRect(_balaMonstro.x - _balaMonstro.largura, this.YBala, _balaMonstro.largura, _balaMonstro.altura);
                        imgBalaMonstro.desenha(_balaMonstro.x - _balaMonstro.largura, this.YBala);

                    // desenha o life do bloco principal
                    if (obstaculo._obs.length > 0){
                        ctx.fillStyle= this.corVida;
                        ctx.fillRect(bloco.x, bloco.y - 10, vidaTotalBloco, 5) 
                    }
                    // desenha o life do bloco principal                  
                           
                    }
                }                
            }
            
            
            

            
            function clique(event){
                if (estadoAtual == estados.jogar){
                botaoPausa = document.createElement("button");
                botaoPausa.id = "botaoPausa";
                botaoPausa.innerText="Pausa";                                
                botaoPausa.setAttribute('onclick', 'pausar()');
                
                document.body.appendChild(botaoPausa);

                botaoArma2 = document.createElement("button");
                botaoArma2.id = "botaoArma2";
                botaoArma2.innerText="Arma2";
                botaoArma2.setAttribute('onclick', 'atirar2()');
                
                document.body.appendChild(botaoArma2);

                }
                
                if (estadoAtual == estados.jogando){
                bloco.pula();

                }
                else if (estadoAtual == estados.jogar){
                    estadoAtual = estados.jogando;

                }

                else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA){
                    estadoAtual = estados.jogar;
                    obstaculo.limpa();
                    tiro.limpa();
                    bloco.reset();
                }
            }
            function atirar(event){
                
                tiro.insere()  

                document.getElementById("botaoAtirar").disabled = true;
                
                setTimeout(function tempoAtirar(){
                document.getElementById("botaoAtirar").disabled = false;
                },3000);
        
            };

            function atirar2(event){
                if(obstaculo._obs.length > 0){
                dano = 25;
                tiroBala2.insere()

                document.getElementById("botaoArma2").disabled = true;
                
                setTimeout(function tempoAtirar2(){
                document.getElementById("botaoArma2").disabled = false;
                },1000);


                }  
            
            }

            function pausar(){
                obstaculo.pausa();
                estadoAtual = estados.pausado;
               
                

                if(estadoAtual == estados.pausado){
                botaoPlay = document.createElement("button");
                botaoPlay.id = "botaoPlay";
                botaoPlay.innerText="Play";
                botaoPlay.setAttribute('onclick', 'play()');
                document.body.appendChild(botaoPlay);
                }
            }

            function play(){
                obstaculo.play();
                estadoAtual = estados.jogando;
                
                botaoPlay = document.getElementById("botaoPlay");
               
                botaoPlay.remove();

                
            }

            function teste(){
                alert("teste")
            }

            function main  (){
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
                ctx = canvas.getContext("2d");
                document.body.appendChild(canvas);
              //  document.addEventListener("mousedown", clique);

                botaoPular = document.createElement("button");
                botaoPular.id = "botaoPular";
                botaoPular.innerText="Iniciar";
                botaoPular.setAttribute('onclick', 'clique()');
                
                document.body.appendChild(botaoPular);

                botaoAtirar = document.createElement("button");
                botaoAtirar.id = "botaoAtirar";
                botaoAtirar.innerText="Atirar";
                botaoAtirar.setAttribute('onclick', 'atirar()');
                
                document.body.appendChild(botaoAtirar);
                                        
                estadoAtual = estados.jogar;
                
               

                recorde = localStorage.getItem("recorde");

                if (recorde == null){
                    recorde = 0
                }
                img=new Image();
                img.src = "img.png";
                cenario=new Image();
                cenario.src = "cenario.png";
                roda();
            }

            function roda(){
                atualiza();
                desenha();
                botoes();
                window.requestAnimationFrame(roda);
            }

            function atualiza(){
                frames++;

                bloco.atualiza();

                if(estadoAtual == estados.jogando){



                    
                obstaculo.atualiza();
                tiro.atualiza();
                tiroBala2.atualiza();
                tiroMonstro.atualiza();
                //tiroMonstro.insere();
                }
                
                
                
                
            }

            function botoes(){


            }

            function desenha(){
                //ctx.fillStyle = "#50beff";
                //ctx.fillRect(0,0,LARGURA, ALTURA)
                
                imgCenario.desenhaCenario(0,0)
                
                imgBloco.desenha(bloco.x,bloco.y);
             
             
                ctx.fillStyle = "#fff";
                ctx.font = "40px Arial";
                ctx.fillText(bloco.score, 30,68);

                ctx.fillStyle = "#fff";
                ctx.font = "40px Arial";
                ctx.fillText(matou, LARGURA - 80, 68);


                if(estadoAtual == estados.jogar){
                    ctx.fillStyle = "green";
                    ctx.fillRect(LARGURA/2 - 50, ALTURA/2 -50, 100,100);
                 
                } 
                
                else if(estadoAtual == estados.perdeu){

                   
                                
                    ctx.fillStyle = "red";
                    ctx.fillRect(LARGURA/2 - 50, ALTURA/2 -50, 100,100);
                    
                    ctx.fillStyle = "#fff";
                    ctx.fillText("Perdeu!", LARGURA/2 -70, ALTURA/2-150)

                    ctx.save();
                    ctx.translate(LARGURA/2, ALTURA/2);
                    ctx.fillStyle = "#fff";

                    if (bloco.score > recorde){
                        ctx.fillText("Novo Record!", -150, -65)
                    }
                    else if (recorde < 10){
                        ctx.fillText("Record " + recorde, -99, -65)
                    }
                    else if (recorde >= 10 && recorde < 100){
                        ctx.fillText("Record " + recorde, -112, -65)
                    }
                    else {
                        ctx.fillText("Record " + recorde, -125, -65)
                    }

                    if (bloco.score < 10){
                    ctx.fillText(bloco.score, -13,19);
                    }
                    else if (bloco.score >= 10 && bloco.score <100 ){
                    ctx.fillText(bloco.score, -26,19); 
                    }
                    else {
                    ctx.fillText(bloco.score, -39,19); 
                    }

                    ctx.fillStyle = "#fff";
                    ctx.font = "40px Arial";
                    ctx.fillText("Destruição " + matou, -112, 90);
                    
                    
                    
                    ctx.restore();
                }
                else if(estadoAtual == estados.pausado){
                    ctx.fillStyle = "blue";
                    ctx.fillRect(LARGURA/2 - 50, ALTURA/2 -50, 100,100);
                    obstaculo.desenha();
                    tiro.desenha();
                    tiroBala2.desenha();
                    tiroMonstro.desenha();

                } 
                
                else if(estadoAtual == estados.jogando){
                    obstaculo.desenha();
                    tiro.desenha();
                    tiroBala2.desenha();
                    tiroMonstro.desenha();
                }
                
                
              //  chao.desenha();
                
                bloco.desenha();
                
                
               
                
            }

            main();


        