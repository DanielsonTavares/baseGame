export default class Cena{
    constructor({
        ctx,
        nome
    }){
        this.ctx = ctx;
        this.nome = nome
    }

    inicializa(){
        console.log('inicializa', this.nome);
    }

    desenha(){
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "left";
        this.ctx.fillText("Créditos", 300, 50);

        this.ctx.font = "40px Arial";
        this.ctx.strokeText("Hello World2, Hello World2", 0, 100);
    }

    atualiza(){
        
    }



    toString(){
        console.log('cena', this.nome);
    }

}