
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
let FRAME = 0
const cfg = {
    teclado: {},
}


const telas = {
    INICIO: {
        nome: 'telaInicial',
        telainicial: {},
        inicializa(){
            this.telaInicial = new Image();
            this.telaInicial.src = './img/telaInicio.png'
        },
        atualiza(){
            

            if(cfg.teclado.keys && cfg.teclado.keys['KeyI']){
                telas.mudaParaTela(telas.JOGO);
            }

        },
        desenha(){
            const telaInicialCfg = {
                spriteX: 0,
                spriteY: 0,
                spriteWidth: 720,
                spriteHeight: 528,
                posX: 0,
                posY: 0
            }

            contexto.drawImage(
            this.telaInicial,
            telaInicialCfg.spriteX, telaInicialCfg.spriteY,
            telaInicialCfg.spriteWidth, telaInicialCfg.spriteHeight,
            telaInicialCfg.posX, telaInicialCfg.posY,
            telaInicialCfg.spriteWidth, telaInicialCfg.spriteHeight
            )


        }
    },
    MENU: {
        nome: 'menu',
        sprMenu: {},
        inicializa(){
            this.sprMenu = new Image();
            this.sprMenu.src = './img/menu.png'
        },
        atualiza(){
            if(cfg.teclado.keys && cfg.teclado.keys['Escape']){
                telas.mudaParaTela(telas.JOGO);
            }
        },
        desenha(){
            const menu = {
                spriteX: 0,
                spriteY: 0,
                spriteWidth: 48,
                spriteHeight: 48,
                posX: 52,
                posY: 200
            }

            contexto.drawImage(
            this.sprMenu,
            menu.spriteX, menu.spriteY,
            menu.spriteWidth, menu.spriteHeight,
            menu.posX, menu.posY,
            menu.spriteWidth, menu.spriteHeight
            )
        }
    },
    JOGO: {
        nome: 'jogo',
        inicializa(){
            personagem.inicializa();
        },
        desenha(){
            personagem.desenha();
        },
        atualiza(){
            personagem.atualiza();
        }
    },
    ativa: {},
    mudaParaTela(novaTela){
        this.ativa = novaTela;
        this.ativa.inicializa();
    },
    limpar(){
        contexto.fillStyle='#333';
        contexto.fillRect(0,0,canvas.width,canvas.height);
    }
}


function start() {
    
    

    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        cfg.teclado.keys = (cfg.teclado.keys || []);
        cfg.teclado.keys[e.code] = (e.type === 'keydown')
        console.log('keydown', e.code);
        
        
    });

    document.addEventListener('keyup', function (e) {
        cfg.teclado.keys[e.code] = (e.type === "keydown");
        console.log('keyup', e.code);
    });
}


const personagem = {
    spriteX: 48,
    spriteY: 0,
    spriteWidth: 48,
    spriteHeight: 48,
    posX: 20,
    posY: 20,
    gravidade: 0.25,
    velocidade: 0,
    frameAnimacaoHorizontal: [0,48,96],
    frameAnimacaoVertical: {
                            frente: 0,
                            esquerda: 48,
                            direita: 96, 
                            costa: 144
                        },
    frameAtual: 0,
    spritesPersonagens: {},
    inicializa(){
        this.spritesPersonagens = new Image();
        this.spritesPersonagens.src = './img/People2.png'
    },
    atualizaFrameAtual(){
        
        const intervaloDeFrames = 16;
        const passouIntervalo = FRAME % intervaloDeFrames === 0;

        if(passouIntervalo){
            const baseIncremento = 1;
            const incremento = baseIncremento + this.frameAtual;
            const baseRepeticao = this.frameAnimacaoHorizontal.length;
            this.frameAtual = incremento % baseRepeticao;
        }
    },
    andar(tecla){

        this.spriteX = this.frameAnimacaoHorizontal[ this.frameAtual ];

        if(cfg.teclado.keys && cfg.teclado.keys['KeyM']){
            telas.mudaParaTela(telas.MENU);
        }

        if(cfg.teclado.keys && cfg.teclado.keys['ArrowDown']){
            this.posY += 2;
            this.spriteY = this.frameAnimacaoVertical.frente;
        }

        if(cfg.teclado.keys && cfg.teclado.keys['ArrowUp']){
            this.posY -= 2;
            this.spriteY = this.frameAnimacaoVertical.costa;
        }

        if(cfg.teclado.keys && cfg.teclado.keys['ArrowLeft']){
            this.posX -= 2;
            this.spriteY = this.frameAnimacaoVertical.esquerda;
        }

        if(cfg.teclado.keys && cfg.teclado.keys['ArrowRight']){
            this.posX += 2;
            this.spriteY = this.frameAnimacaoVertical.direita;
        }
    },

    atualiza(){
        this.andar();

    },
    desenha(){
        this.atualizaFrameAtual();

        contexto.drawImage(
        this.spritesPersonagens,
        personagem.spriteX, personagem.spriteY,
        personagem.spriteWidth, personagem.spriteHeight,
        personagem.posX, personagem.posY,
        personagem.spriteWidth, personagem.spriteHeight,
        );
    }
}





start();

//
//Responsável por atualizar os frames
//
function loop(){
    telas.limpar();

    
    telas.ativa.desenha();
    telas.ativa.atualiza();



    //setTimeout('loop();', 1);
    FRAME++;
    requestAnimationFrame(loop);
}

telas.mudaParaTela(telas.INICIO);
loop();