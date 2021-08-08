import Personagem from "./js/lib.js";

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
            this.sprMenu.src = './img/menu.png';
            
            this.sprMenu.PosX = 0;
        },
        atualiza(){
            if(cfg.teclado.keys && cfg.teclado.keys['Escape']){
                telas.mudaParaTela(telas.JOGO);
            }
        },
        desenha(){

            contexto.fillStyle='rgba(200,200,200,1)';
            contexto.fillRect(canvas.width/2-150, canvas.height/2-150,300,300);
            
            contexto.fillStyle='rgba(200,100,100,0.2)';
            contexto.fillRect(this.sprMenu.PosX, canvas.height/2-150,60,60);
            

            // const menu = {
            //     spriteX: 0,
            //     spriteY: 0,
            //     spriteWidth: 48,
            //     spriteHeight: 48,
            //     posX: 52,
            //     posY: 200
            // }

            // contexto.drawImage(
            // this.sprMenu,
            // menu.spriteX, menu.spriteY,
            // menu.spriteWidth, menu.spriteHeight,
            // menu.posX, menu.posY,
            // menu.spriteWidth, menu.spriteHeight
            // )
        }
    },
    JOGO: {
        nome: 'jogo',
        inicializa(){
            npc1.inicializa();
            npc2.inicializa();

        },
        desenha(){
            npc1.desenha();
            npc2.desenha();
        },
        atualiza(){
            npc1.atualiza();
            npc2.atualiza();
            if(cfg.teclado.keys && cfg.teclado.keys['KeyM']){
                telas.mudaParaTela(telas.MENU);
            }
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
        //console.log('keydown', e.code);

        npc1.setKeyDown(e);
        npc2.setKeyDown(e);
        
        
    });

    document.addEventListener('keyup', function (e) {
        cfg.teclado.keys[e.code] = (e.type === "keydown");
        //console.log('keyup', e.code);
        npc1.setKeyUp(e);
        npc2.setKeyUp(e);
    });
}

const npc1 = new Personagem({
    ctx: contexto,
    nome: 'npc1',
    spriteX: 144,
    spriteY: 0,
    spriteSrc: './img/People2.png',
    tamanhoSpriteX: 48,
    tamanhoSpriteY: 48,
    posX: 200,
    posY: 20,
});

const npc2 = new Personagem({
    ctx: contexto,
    nome: 'npc2',
    spriteX: 0,
    spriteY: 0,
    spriteSrc: './img/People2.png',
    tamanhoSpriteX: 48,
    tamanhoSpriteY: 48,
    posX: 160,
    posY: 90,
    tipoControle: 'secundario'
});




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

telas.mudaParaTela(telas.JOGO);
loop();