function sprite(x,y, largura, altura){
this.x = x;
this.y = y;
this.largura= largura;
this.altura = altura;

this.desenha = function(xCanvas, yCanvas){
    ctx.drawImage(img, this.x,this.y,this.largura,this.altura, xCanvas, yCanvas, this.largura,this.altura);
    
},
this.desenhaCenario = function(xCanvas,yCanvas){
    ctx.drawImage(cenario, this.x,this.y,this.largura,this.altura, xCanvas, yCanvas, this.largura,this.altura);
}

}

var imgBloco = new sprite(14,257, 130, 170)
var imgObs = new sprite(7,485,130,170)
var imgBalaBloco = new sprite(315,14,50,20)
var imgBala2Bloco = new sprite(212,11,85,20)
var imgBalaMonstro = new sprite(4,14,50,20)

var imgCenario = new sprite(41,21,600,600)