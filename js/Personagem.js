export default class Personagem{
    constructor({ctx, nome, spriteSrc, 
        spriteX, spriteY,
        tamanhoSpriteX, tamanhoSpriteY,
        posX, posY,
        tipoControle = 'primario'
    }){
        this.ctx = ctx;
        this.nome = nome;
        this.spriteSrc = spriteSrc;

        //posição da img dentro do spriteSheet
        this.spriteX = spriteX; 
        this.spriteY = spriteY; 
        //dimensão de cada frame
        this.tamanhoSpriteX = tamanhoSpriteX; 
        this.tamanhoSpriteY = tamanhoSpriteY;
        //posição inicial na tela
        this.posX = posX; 
        this.posY = posY;

        const vet = this.geraAnimacoes(spriteX, spriteY);
        this.frameAnimacaoHorizontal = vet.animHor;
        this.frameAnimacaoVertical = vet.animVer;
        
        this.frameAtual = 0;

        this.teclado = {};

        this.frame = 0;

        this.controle = tipoControle
    }

    toString(){
        console.log(this.nome, this.spriteSrc);
    }

    inicializa(){
        this.sprite = new Image();
        this.sprite.src = this.spriteSrc;
    }


    atualizaFrameAtual(){
        const intervaloDeFrames = 16;
        const passouIntervalo = this.frame % intervaloDeFrames === 0;

        if(passouIntervalo){
            const baseIncremento = 1;
            const incremento = baseIncremento + this.frameAtual;
            const baseRepeticao = this.frameAnimacaoHorizontal.length;
            this.frameAtual = incremento % baseRepeticao;
        }
    }


    desenha(){
        this.atualizaFrameAtual();
        this.ctx.drawImage(
            this.sprite,
            this.spriteX, this.spriteY,
            this.tamanhoSpriteX, this.tamanhoSpriteY,
            this.posX, this.posY,
            this.tamanhoSpriteX, this.tamanhoSpriteY,
        );
        this.frame++;
    }

    andar(){

        this.spriteX = this.frameAnimacaoHorizontal[ this.frameAtual ];

        if(this.controle === 'primario'){
            if(this.teclado.keys && this.teclado.keys['ArrowDown']){
                this.posY += 2;
                this.spriteY = this.frameAnimacaoVertical.frente;
            }

            if(this.teclado.keys && this.teclado.keys['ArrowUp']){
                this.posY -= 2;
                this.spriteY = this.frameAnimacaoVertical.costa;
            }

            if(this.teclado.keys && this.teclado.keys['ArrowLeft']){
                this.posX -= 2;
                this.spriteY = this.frameAnimacaoVertical.esquerda;
            }

            if(this.teclado.keys && this.teclado.keys['ArrowRight']){
                this.posX += 2;
                this.spriteY = this.frameAnimacaoVertical.direita;
            }
        }else if(this.controle === 'secundario'){
            if(this.teclado.keys && this.teclado.keys['KeyS']){
                this.posY += 2;
                this.spriteY = this.frameAnimacaoVertical.frente;
            }

            if(this.teclado.keys && this.teclado.keys['KeyW']){
                this.posY -= 2;
                this.spriteY = this.frameAnimacaoVertical.costa;
            }

            if(this.teclado.keys && this.teclado.keys['KeyA']){
                this.posX -= 2;
                this.spriteY = this.frameAnimacaoVertical.esquerda;
            }

            if(this.teclado.keys && this.teclado.keys['KeyD']){
                this.posX += 2;
                this.spriteY = this.frameAnimacaoVertical.direita;
            }
        }
    }

    setKeyDown(e){
        this.teclado.keys = (this.teclado.keys || []);
        this.teclado.keys[e.code] = (e.type === 'keydown')
    }

    setKeyUp(e){
        this.teclado.keys[e.code] = (e.type === "keydown");
    }

    atualiza(){
        this.andar();
    }

    geraAnimacoes(x, y){
        const animHor = [];
        animHor.push(x);
        animHor.push(x+48);
        animHor.push(x+48*2);
        
        const animVer = {
            frente: y,
            esquerda: y+48,
            direita: y+48*2, 
            costa: y+48*3
        }

        return {animHor, animVer};
    }

}