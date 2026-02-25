//----------------------------------DECLARACION/ASIGNACION DE VARIABLES----------------------------------------------------------------------------------------------------------------------------------------------
const PRECIO_POCION=5;
const RECUPERACION_VIDA_POCION=10;
const MAXIMO_ORO=10;
const MAX_HEALTH = 100;
//const DIRECCION_NORTE="Norte"

//asignacion de esta variable que nos servira para depurar nuestro codigo cambiando la condicion a true o false
const DEBUG=false;

// variable (FLAG) para comporbar que busque oro
let canSearch=true;


//-----------------------------------CREACION DEL OBJETO-------------------------------------------------------------------------------------------------------------------------------------------------

//empezamos definiendo el OBJETO con el nombre que nos pide el proyexto del videojuego
//asi empezamos creando el objeto con const
const defaultGameState = {
    

    // PRIMERA PROPIEDAD DEL OBJETO que sera la de player
    
    //esta es la manera de declarar propiedades dentro de un objeto
    player: {
        name: " Gonan el terrible ", // el nombre del heroe
        health: 80,             // la salud inicial del heroe
        strength: 10,            // la fuerza inicial
        strengthBonus: 0,        // el bonus que tendra de fuerza por objetos
        defense: 5,              // la defensa inicial
        defenseBonus: 0,         // el bonus de defensa que tendra por objetos
        currentRoom: 4,          // la id de la habitacion actual
        gold: 50,                // la cantidad inicial de oro que tendra
        potions: 3               // y la cantidad de pociones inicial que tendra
    },

    
    // SEGUNDA PROPIEDAD DEL OBJETO  con las salas y enemigos

     //esta es la manera de declarar propiedades dentro de un objeto
    map: {
        
        // creamos ahora el array de habitaciones de esta manera y dentro de la PROPIEDAD DEL OBJETO "map"
        rooms: [
            
            //PRIMERA SALA
            {
                id: 1,
                monsterProb: 44,
                isShop: false,
                name: "Entrada de la caverna",
                description: "Una entrada oscura y mal oliente con mucha humedad",
                north: 0,
                south: 2,
                west: 4,
                east: 0,
                img: "img/rooms/entrada_caverna.png"
            },
            
            //SEGUNDA SALA
            {
                id: 2,
                monsterProb: 0,
                isShop: true,
                name: "Tienda del Mercader",
                description: "Un mercader ofrece sus productos mágicos.",
                north: 1,
                south: 0,
                west: 6,
                east: 0,
                img: "img/rooms/tienda_mercader.png"
            },
            //TERCERA SALA
            {
                id: 3,
                monsterProb: 82,
                isShop: false,
                name: "pasillo del castillo",
                description: "Pasillo con fuego alrededor que lleva a una especie de altar",
                north: 0,
                south:0,
                west: 0,
                east: 4,
                img: "img/rooms/pasillo_Castillo.png",
            },
            //CUARTA SALA
            {
                id: 4,
                monsterProb: 55,
                isShop: false,
                name: "Pueblo",
                description: "Un pueblo con grandes zonas verdes y rios",
                north: 5,
                south: 6,
                west: 3,
                east: 1,
                img: "img/rooms/pueblo.png",

            },
            //QUINTA SALA
            {
                id: 5,
                monsterProb: 85,
                isShop: false,
                name: "habitacion del castillo",
                description: "Una oscura habitacion humeda, con grandes cadenas, donde parece que aqui capturan criaturas...",
                north: 0,
                south: 4,
                west: 0,
                east: 0,
                img: "img/rooms/habitacion.png",
            },
            //SEXTA SALA
            {
                id: 6,
                monsterProb: 35 ,
                isShop: false,
                name: "Lugar del tesoro",
                description: "En una pequella cueva escondida entre algunas piedras, encontraremos un tesoro",
                north: 4,
                south: 0,
                west: 0,
                east: 2,
                img: "img/rooms/cueva_tesoro.png",
            }
            // aqui dentro aun del array de "rooms" podriamos seguir metiendo mas habitaciones
        ],

        
        
        // creamos ahora el array de enemigos de esta manera y dentro de la PROPIEDAD DEL OBJETO "map"
        enemies: [
            {
                name: "Goblin",
                isBoss: false,
                description: "Una criatura pequeña pero muy peligrosa",
                health: 30,
                strength: 5,
                defence: 2,
                img: "img/monsters/gooblin.png"
            },
            
            {
                name: "Dragón",
                isBoss: true,
                description: "Un poderoso dragón con poderosas escamas y que escupe fuego",
                health: 200,
                strength: 50,
                defence: 25,
                img: "img/monsters/dragon.png"
            },
            {
                name: "orco",
                isBoss: false,
                description: "un orco poderoso con grandes conocimientos sobre la guerra",
                health: 40,
                strength: 7,
                defence: 3,
                img: "img/monsters/orco.png"
            },
            {
                name: "Golem de piedra",
                isBoss: false,
                description: "criatura peligrosa, que vive en zonas con grandes rios y zonas verdes",
                health: 40,
                strength: 7,
                defence: 3,
                img: "img/monsters/golem.png"
            }


        ]
    }
};

//---------------------------------------------------------EVENTOS Y LLAMADAS-----------------------------------------------------------------------------------------------------------------------------

//con esta funcion cargamos toda la pagina para que se muestre
window.onload = function (){
   
// llamamos al metodo y le asignamos la  id con la habitacion que comenzaremos el juego (LA PRIMERA QUE VEREMOS EN LA UI)    
updateRoomUI(4);
//actualizamos nuestor jugador
updatePlayer();


// Seleccionar cada botón por su clase (individuales)
const btnNorth = document.querySelector(".north"); //boton del norte
const btnSouth = document.querySelector(".south"); //boton del sur
const btnEast = document.querySelector(".east"); //boton de este
const btnWest = document.querySelector(".west"); //boton del oeste


// Asignar eventos a cada botón de forma independiente para que nos movamos segun clikeamos una dirrecion u otra
btnNorth.addEventListener("click",()=> movePlayer("north"));
btnSouth.addEventListener("click", ()=> movePlayer("south"));
btnEast.addEventListener("click",()=> movePlayer("east"));
btnWest.addEventListener("click", ()=> movePlayer("west"));



//Añade un evento al boton de ENVIAR que al hacer clik llame a la funcion
const botonEnviar = document.getElementById("botonEnviar");
const input = document.getElementById("info");

//este para cuando clikeamos en el boton llama a la funcion
botonEnviar.addEventListener("click", comprobar);

//y este para que haga lo mismo pero que podamos usar la tecla Enter
input.addEventListener("keydown", function(event) {
    // Verificar si la tecla presionada es la tecla "Enter" (código 13)
    if (event.key === "Enter") {
        comprobar(); // Ejecutar la misma función que al hacer clic
    }
});



//------------------------------------------FUNCIONES--------------------------------------------------------------------------------------------------------------------------------------------
    

/**
 * @author bruno
 * @param {*} direction 
 */

//funcion quue a medida que cambio de sala y aparece un enemigo me da una probabilidad de obtener
// entre 0 y 10 monedas de oro
function buscarOro() {
    const oroEncontrado= Math.floor(Math.random() * MAXIMO_ORO);

    if (canSearch) {
        actualizarOro(oroEncontrado);
        mostrarMensaje(`<p>Has encontrado ${oroEncontrado} monedas de oro.</p>`);
        
    } else {
        mostrarMensaje("<p> ¡No hay oro! >");
    }
    canSearch=false;
}


//funcion que actualiza el oro que obtengo que se va sumando a mi "banco"
function actualizarOro(cantidad) {
    defaultGameState.player.gold += cantidad;
    // Busca el elemento de la clase ".gold " que muestra el oro
   
    document.querySelector("#goldQuantity").innerHTML = defaultGameState.player.gold;
}


// funcion que ahorraremos tener que andar poniendo " elemento.inerHtml .......  solo haremos el llamamiento a esta funcion"
//tb realiza un scroll donde los mensajes para queaparezca el ultimo mensaje
function mostrarMensaje (mensaje){
    elemento= document.querySelector(".messages");
    elemento.innerHTML += mensaje;
    elemento.scrollTop = elemento.scrollHeight;

}

   
//funcion que comprueba que lo qu escribo en el imput del index, accede al la id del imput y actua el boton de enviar
function comprobar() {
    
    const comando = input.value.toLowerCase();
    input.value = ""; // Limpiar el input después de darle al boton de enviar


    //ahroa quiero  poder escribir un numero  para comprar mas pociones  ejemplo : "pociones 4"
    const partes = comando.split(" "); // Dividir la entrada en palabras
    const accion = partes[0]; // Primer palabra (comando principal)
    let cantidad=1;// valor por defecto: 1 pocion
    
    if(partes.length >1){
        cantidad=parseInt(partes[1]); //intenta convertir la segunda palabra en numero
    }

    
    switch (accion) {
        case "buscar":
            buscarOro();
            break;
        case "pocion":  // Nuevo comando para comprar pociones
            comprarPocion(cantidad);
            break;
        case "usar":
            usarPocion();
            break;
        case "ayuda":
            mostrarAyuda();
            break;   
        default:
            console.log("comando no existe, escribe ayuda para obtener mas informacion");
    }
}


//funcion que al escribir ayuda en el input nos sumerge a una nueva ventana  que nos dara las opciones de la funcion de "comprobar"
function mostrarAyuda() {

    cerrarAyuda();
    let ayudaDiv = document.createElement("div");
    ayudaDiv.classList.add("ayuda-container"); // Clase CSS

    ayudaDiv.innerHTML = `
        <div class="ayuda-box">
            <h2>Opciones de Ayuda</h2>
            <p><strong>Buscar : </strong>Busca oro en la habitación.</p>
            <p><strong>Pocion : </strong> Compra una o más pociones.</p>
            <p><strong>Usar :</strong> Usa una poción.</p>
            <p></strong> con las flechas te desplazas por las habitaciones</p>
            <button id="cerrarAyudaBtn">Cerrar</button>
        </div>
    `;

   
        document.body.appendChild(ayudaDiv);
        
        // Asegurar que el botón tiene el evento de cierre
        document.getElementById("cerrarAyudaBtn").addEventListener("click", cerrarAyuda);
   
}


//funcion para cerrar esta nueva ventana
function cerrarAyuda() {
    let ayudaDiv = document.querySelector(".ayuda-container");
    if (ayudaDiv) {
        ayudaDiv.remove(); // Elimina la ventana de ayuda
    }
}


// Función para comprar poción y restar dinero y verificar si esta en la tienda o no esta
function comprarPocion(cantidad) {

    //verificamos  que la cantidad ingresada sea un número válido y mayor o igual a 1 antes de continuar con la compra.
        if (!Number.isInteger(cantidad) || cantidad < 1) {
            mostrarMensaje("Debes escribir un número válido de pociones a comprar.");
            return;
        }
    
        //verificamos  si el jugador está en la tienda y luego calculamos  el costo total de las pociones que quiere comprar.
        if (compruebaTienda(defaultGameState.player.currentRoom)) {  
            const costoTotal = PRECIO_POCION * cantidad;

            //verificamos  si el jugador tiene suficiente oro y, si es así, realizamos  la compra de las pociones.
            if (defaultGameState.player.gold >= costoTotal) {
                //actualizamos tanto las pociones como el oro
                actualizarPocion(cantidad);
                actualizarOro(-costoTotal);
    
                mostrarMensaje(`¡Has comprado ${cantidad} poción(es)! Ahora tienes ${defaultGameState.player.potions} pociones.`);
                mostrarMensaje(`Te quedan ${defaultGameState.player.gold} de oro.`);
            } else {
                mostrarMensaje(`No tienes suficiente oro para comprar ${cantidad} poción(es).`);
            }
        } else {
            mostrarMensaje("¡No estás en la tienda!");
        }
}


// Función para usar poción y restar dinero y verificar si esta en la tienda o no esta
function usarPocion() {
    const player = defaultGameState.player;
   

    // Verificar si el jugador tiene pociones y si su salud es menor a 100
    if (player.potions > 0) {
        if (player.health < MAX_HEALTH) {
            player.potions--; // Restar 1 poción
            player.health += 10; // Aumentar la salud en 10 puntos

          

            // Actualizar la UI
            updatePlayer();  

            // Mensaje de confirmación
            mostrarMensaje(`Has usado una poción. Salud: ${player.health}, Pociones restantes: ${player.potions}`);
        } else {
            mostrarMensaje("Tu salud ya está al máximo, no puedes usar más pociones.");
        }
    } else {
        mostrarMensaje("No tienes pociones para usar.");
    }
}


//funcion para actualizar la cantidad de pociones que tenemos cuando las compramos
function actualizarPocion (cantidad){
    defaultGameState.player.potions +=cantidad;
    //busca el elemento de la clase ".potions" muestra las pociones

    document.querySelector('#potionQuan').innerHTML = defaultGameState.player.potions;
}


//funcion que comprobamos/accedemos a esa id para que compuebe que sea tienda
function compruebaTienda(id){
    for (let i=0; i<defaultGameState.map.rooms.length; i++){
        if (defaultGameState.map.rooms[i].id===id){
            return defaultGameState.map.rooms[i].isShop;
        }
    }
}


// Función para mover al jugador a la habitacion deseada (sera la diereccion que nos moveremos N ,S ,E O)
function movePlayer(direction) {


    //asignamos  esta constante para estar en la id de la habitacion (currentroom)
    const currentRoom = defaultGameState.player.currentRoom;
    //asigno esta constante para comprobar que la habitacion  exista
    const currentRoomData = defaultGameState.map.rooms.find(room => room.id === currentRoom);

    
    // Accedo a [direction] solo si currentRoomData es válido.
    const nextRoom = currentRoomData[direction]; // Obtiene la ID de la siguiente sala

    // nextRoom !== 0 → Si la variable nextRoom no es 0, entonces hay una habitación a la que se puede mover.
    // nextRoom !== undefined → Si nextRoom no es undefined, significa que existe una propiedad con ese nombre en el objeto.
    if (nextRoom !== 0 && nextRoom !== undefined) {
       
        // Actualizar la habitación del jugador y la interfaz
        defaultGameState.player.currentRoom = nextRoom;
      
        
        //aqui limpiamos con esta funcion (renewMonsters)el mounstruo 
        renewMonsters();
        //y aqui actualizamos a la nueva habitacion con la nueva ID
        //updateRoomUI(nextRoom);
        entrarEnHabitacion(nextRoom);
        //aqui con esta funcion vuelve a comprobar la probabilidad de que salga BOSS o  Mounstruo de la siguinte habitacion
        ProbAparacerJefe(nextRoom);
     
    } else {
        // Mostrar mensaje de que no se puede mover en esa dirección en la descripción de la habitación
      // document.querySelector(".messages").innerHTML += `<p style="color: red;">🚫 No puedes ir en esa dirección.</p>`;
        mostrarMensaje(`<p style="color: red;">🚫 No puedes ir en esa dirección.</p>`);
    }

}


// Función para actualizar la interfaz ira cambiando cada vez que vallamos a una direccion
function updateRoomUI(roomId , intentoMovimiento = null) {
    canSearch=true;
    //Busca la habitación actual (roomId) en el mapa.
    const room = defaultGameState.map.rooms.find(r => r.id === roomId);
   
    //si la encuentra ejecuta el IF
    if (room) {
        // Actualiza el nombre de la habitación
        document.querySelector(".room-name").innerHTML = "🐉Te encuentras en " + room.name;

        // Actualiza la descripción de la habitación con los párrafos
        document.querySelector(".messages").innerHTML += "<p>"+ room.description + "</p>";
       // mostrarMensaje( "<p>"+ room.description + "</p>");

        
        // Actualiza la imagen de la habitación
        document.querySelector(".background").src = room.img;
    
     
    // Determinar las direcciones disponibles en el array creado
     const exits = [];
    if (room.north !== 0) exits.push("norte");
    if (room.south !== 0) exits.push("Sur");
    if (room.east !== 0) exits.push("Este");
    if (room.west !== 0) exits.push("Oeste");

     // Mostrar las salidas disponibles en el DOM
     mostrarMensaje(`<p>Salidas disponibles: ${exits.length > 0 ? exits.join(", ") : "No hay salida"}</p>`) ;
     

     // Si el jugador intentó moverse a una dirección inválida, mostrar mensaje de advertencia
     if (intentoMovimiento && (!room[intentoMovimiento] || room[intentoMovimiento] === 0)) {
       mostrarMensaje( `<p "> No hay salida en esa dirección.</p>`);
    }

    
    }else {
     // Si por alguna razón la habitación no existe, simplemente mostramos un mensaje amigable
     mostrarMensaje(`<p >Error: No se pudo cargar la habitación.</p>`);
 }
}

 
// funcion para actualizar el oro y las pociones del jugador, por si encuentro oro o gasto dinero en la tienda en pociones
//IMPORTANTE ME QUEDA TODABIA INSERTAR LAS IMAGENES DE LA FUERZA DEFENSA Y SALUD SOLO SE VE LAS POTIS Y EL ORO 
function updatePlayer() {
    const player = defaultGameState.player;
    
    // Actualiza los valores de oro y pociones directamente
    document.getElementById('goldQuantity').innerText = player.gold;
    document.getElementById('potionQuan').innerText = player.potions;
  
    // mantener los demás datos y solo actualizar los valores
    const mostrar = document.getElementById('mostrar');

    
    mostrar.querySelector('.title').innerHTML=`<strong>Ficha del personaje</strong>`;
    mostrar.querySelector('.name').innerHTML = `<strong>Nombre:</strong> ${player.name}`;
    mostrar.querySelector('.strength').innerHTML = `<strong>Fuerza:</strong> ${player.strength}`;
    mostrar.querySelector('.defense').innerHTML = `<strong>Defensa:</strong> ${player.defense}`;
    mostrar.querySelector('.health').innerHTML = `<strong>Salud:</strong> ${player.health}`;

  }
  
 
//Funcion que genera un numero aleatorio para  una probabilidad (2% en este caso) de que salga el JEFE (Boss)
function ProbAparacerJefe(roomId) {
    //Busca la habitación actual (roomId) en el mapa.
    const room = defaultGameState.map.rooms.find(r => r.id === roomId);

    if (room) {
        // Probabilidad de aparición de un monstruo normal en esta sala
        const monsterProb = room.monsterProb;

        // Generamos un número aleatorio entre 0 y 10 para decidir si aparece un monstruo normal
        const randomNumber = Math.random() * 100;

        // Probabilidad de aparición del jefe (2%)
        const bossProb =2;//2% de probabilidad para el jefe

        if (randomNumber < bossProb) {
            // Si el número aleatorio es menor que 2%, aparece el jefe
            //llamamos a la funcion creada de monstrar el jefe
            showBoss();
        } else if (randomNumber < monsterProb) {
            // Si el número aleatorio es menor que monsterProb, aparece un monstruo normal y llamamos a la funcion que creamos
            //de generar un enemigo eleatoriamente
            showRandomEnemy();
        } else {
            // Si no aparece un monstruo
          mostrarMensaje( "<p>No hay monstruos en esta habitación.</p>");
        }
    } 
}


// Función para mostrar un enemigo aleatorio
function showRandomEnemy() {
    // Elegir un enemigo aleatorio del array de enemigos (sin los jefes)
    const normalEnemies = defaultGameState.map.enemies.filter(enemy => !enemy.isBoss);
    const randomEnemy = normalEnemies[Math.floor(Math.random() * normalEnemies.length)];

    // Mostrar el enemigo en la UI
    mostrarMensaje(` <p>¡Un enemigo ha aparecido!</p>
        <h3>${randomEnemy.name}</h3>
        <p>${randomEnemy.description}</p>
        <p>Vida: ${randomEnemy.health}</p>
        <p>Fuerza: ${randomEnemy.strength}</p>
        <p>Defensa: ${randomEnemy.defence}</p>
        `);
       

        
    // Insertar la imagen en un contenedor separado
    document.querySelector("#monsterSmall").src=randomEnemy.img;
    document.querySelector("#monsterSmall").alt=randomEnemy.name;

    iniciarCombate(randomEnemy);
}

// Función para mostrar el jefe
function showBoss() {
    // Buscar al jefe en el array de enemigos
    const boss = defaultGameState.map.enemies.find(enemy => enemy.isBoss);

    // Mostrar la información del jefe en la UI
    mostrarMensaje(`<p>¡Un jefe ha aparecido!</p>
        <h3>${boss.name}</h3>
        <p>${boss.description}</p>
        <p>${boss.health}</p>
        <p>${boss.strength}</p>
        <p>${boss.defence}</p>
        `) ;

        // Insertar la imagen en un contenedor separado
        document.querySelector("#monsterBig").src=boss.img;
        document.querySelector("#monsterBig").alt=boss.name;

        iniciarCombate(boss);
}

// Función para vaciar los mounstruos encontrados cuando nos movamos a las diferentes salas
function renewMonsters(){
    document.querySelector("#monsterSmall").src="";
    document.querySelector("#monsterSmall").alt="";
    document.querySelector("#monsterBig").src="";
    document.querySelector("#monsterBig").alt="";
}


//-----------------------------------FUNCIONES DE COMBATE DEL JUEGO--------------------------------------------------------------------------------------------------------------------

//funcion donde realizaremos todo el combate cuando nos encontremos con le mounstruo
//tambien aqui obtendremos mejoras de objetos e incluso porbabilidad de encontrar oro u pociones al derrotar al enemigo
function iniciarCombate(enemigo) {
    const player = defaultGameState.player;

    // Creamos una copia de la vida del enemigo para no modificar el original
    let vidaEnemigo = enemigo.health;


    // BUCLE del combate mientras el jugador y enemigo tengan vida
    while (vidaEnemigo>0 && player.health>0){

        //1-  ATAQUE DEL MOUNSTRUO

        // Cálculo del daño que el monstruo hace al héroe
        //este seria el daño del golpe que haria el mounstruo entre ese aleatorio que ponga
        const ataqueMonstruo = enemigo.strength + Math.floor(Math.random() * 10) + 1; // Aleatorio entre 1 y 10
        debug("El enemigo ataca:"+ataqueMonstruo);
        
        //aqui es la defensa que tiene el obkjeto de mi heroe
        const defensaHeroe = player.defense + player.defenseBonus;
        debug("La defensa del jugador es:"+defensaHeroe);

        //aqui ya es el daño real que me hace el mounstruo despues de haber realizado el aleatorio
        let dañoRecibido = ataqueMonstruo - defensaHeroe;
        debug("El daño hecho por el mounstruo"+dañoRecibido);

        // Asegurar que el daño no sea negativo
         dañoRecibido = Math.max(dañoRecibido,0);

        // Aplicar daño al héroe
        player.health -= dañoRecibido;

        mostrarMensaje(`¡Un ${enemigo.name} te ataca y te hace ${dañoRecibido} de daño!`);
        
        updatePlayer();

        // Si el jugar muere, salimos del bucle
        if (player.health <= 0) {
        break;
        }
    

        //2- ATAQUE DEL JUGADOR 
        
        //hacemos lo mismo que antes pero ahora ataque el jugador 

        //aqui seria el daño que hace el jugador calculado con aleatorio
        const ataqueHeroe = player.strength + player.strengthBonus + Math.floor(Math.random() * 10) + 1; // Aleatorio entre 1 y 10
        debug("El héroe ataca: " + ataqueHeroe);

        //la defensa que tiene la propiedad del objeto de enemigo
        const defensaMonstruo = enemigo.defence;
        debug("La defensa del monstruo es: " + defensaMonstruo);

        //el daño real ya causado
        let dañoCausado = ataqueHeroe - defensaMonstruo;
        debug("El daño hecho al monstruo: " + dañoCausado);

        // Asegurar que el daño no sea negativo
        dañoCausado = Math.max(dañoCausado, 0);

        // Aplicar daño al monstruo (a la copia la variable que hemos creado como copiA , no al original) para no tocar el objeto "REAL"
        vidaEnemigo -= dañoCausado;

        mostrarMensaje(`¡Atacas al ${enemigo.name} y le haces ${dañoCausado} de daño!`);
        
        // Si el monstruo muere, salimos del bucle
        if (vidaEnemigo <= 0) {
            break;
        }
    }



    // Verificar si el héroe muere
    if (player.health <= 0) {
        mostrarMensaje("¡Has sido derrotado! Pierdes todo tu oro, pociones y bonificadores.");
        
        // Reiniciar el estado del jugador
        player.gold = 0;
        player.potions = 0;
        player.defenseBonus = 0;
        player.strengthBonus = 0;
        player.health = 100;
        player.currentRoom = 1; // Volver a la sala inicial
        
        updatePlayer();
        entrarEnHabitacion(player.currentRoom);
        mostrarMensaje("Has vuelto a la sala 1 para intentarlo de nuevo.");
    } else {
        //SE ha muerto el monstruo
        //TODO Tengo que informar al usuario
        mostrarMensaje(`¡Has matado al ${enemigo.name}!`);

        //AQUI VENDRIAN LAS RECOMPENSAS POR DERROTAR AL ENEMIGO

        //recompensa oro -> generamos un numero aleatorio entre 5 y 15 monedas
        const oroGanado= 5 + Math.floor(Math.random() *11);
        actualizarOro(oroGanado);
        mostrarMensaje(`Has encontrado ${oroGanado} monedas de oro`);

        //hacemos la probabilidad de que encontremos pocion, que sea baja para que no sea facil y asi nunca ir a la tienda no tendria gracia
        if(Math.random() <0.2){
            actualizarPocion(1);
            mostrarMensaje(`¡Has encontrado una pocion !`);
        }

       
        // ahora vamos  crear el sistema de objetos para que exista una prob de encontrar un objeto (40%)
        if(Math.random() < 0.4){
            //aqui miramos si es espada o un escudo (50%)
            const espada=  Math.random() < 0.5;
            
            //tambien generamos una nueva variable para un nuevo numero aleatorio entre 1 y 10
            const nuevoBonificador= Math.floor(Math.random()*10 )+1;

            //si el enemigo nos da la espada realizamos esto
            if(espada){
                mostrarMensaje(`¡Has encontrado una espada con un bonificador de ataque de + ${nuevoBonificador}!`);

                //comprobar si el nuevo bonificador es mejor que el actual( osea si la espada que me salio es mejor que la que tengo ya equipàda)
                if(nuevoBonificador > player.strengthBonus){
                    mostrarMensaje(`Esta espada es mejor que la que tenias! tu bonificador de ataque ha aumentado de + ${player.strengthBonus} a + ${nuevoBonificador}.`);
                    player.strengthBonus=nuevoBonificador;
                }else{
                 mostrarMensaje(`pero esta espada es de peor calidad que la que tienes tu, asi que la dejas en el suelo`)   
                }

            }else{
                mostrarMensaje(`¡Has encontrado un escudo con un bonificador de defensa de + ${nuevoBonificador}! `);

                //acemos lo mismo que antes con la espada  vamos a comprobar si es mejor que el que tenemos o no (ESCUDO)
                if(nuevoBonificador > player.defenseBonus){
                    mostrarMensaje(`¡Este escudo es mejor que el que tenias tu! tu bonificador de defensa ha aumentado de + ${player.defenseBonus} a + ${nuevoBonificador}.`);
                    player.defenseBonus=nuevoBonificador;
                }else{
                    mostrarMensaje(`Pero este escudo es de peor calidad que el que tienes tu, asi que lo dejas en el suelo`)
                }
            }

            //actualizamos la interfaz del jugador para ver los nuevos bonificadores
            updatePlayer();

            //aqui ya habremos matado al mounstro asi que limpiamos la interfaz
            //renewMonsters();

        }
    }

     
}

//funcion para actualizar la nueva habitacion
function entrarEnHabitacion(nuevaHabitacion) {
    const player = defaultGameState.player;
    player.currentRoom = nuevaHabitacion;

    // Actualizamos el nombre de la habitación
    mostrarMensaje(`Has entrado en la sala ${nuevaHabitacion}.`);

    // Actualizar la UI de la habitación (nombre, descripción, imagen)
    updateRoomUI(nuevaHabitacion);
}

// funcion para comprobar errores  que declaro una variable "flag" arriba
function debug(mensaje){
    if (DEBUG){
        console.log(mensaje);
    }
}

}
