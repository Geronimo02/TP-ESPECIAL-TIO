/*/ Tabla precargada /*/ 
document.addEventListener("DOMContentLoaded", cargarTabla);

const url = 'https://62c4815c7d83a75e39fb6f72.mockapi.io/Personajes/contenidoTabla';
let tabla = [];

async function cargarTabla() {
  try {
    let res = await fetch(url);
    tabla = await res.json();
    if (res.status === 200){
      mostrarTabla();
      console.log(tabla);
    }
  }
  catch (error){
    console.log(error);
  }
}


function mostrarTabla() {
  document.getElementById("contenidoTabla").innerHTML = "";
  var condicion;
  for (const item of tabla) {
    condicion = comprobarForm(item.faccion, item.raza, item.clase);
      document.getElementById("contenidoTabla").innerHTML +=  "<tr>" +
                                                              "<td class='"+condicion+"'>" + item.nombre + "</td>"
                                                            + "<td class='"+condicion+"'>" + item.faccion + "</td>"
                                                            + "<td class='"+condicion+"'>" + item.raza + "</td>"
                                                            + "<td class='"+condicion+"'>" + item.clase + "</td>"
                                                            + "<td class='"+condicion+"'>" + item.nivel + "</td>"
                                                            + "<td class='"+condicion+"'>" + item.valor + "</td>"
                                                            + "</tr>"
    }
    borrar_Personaje();
    editar_Personaje();
  }

let botonAgrega = document.querySelector(".btn")
botonAgrega.addEventListener("click", function (e) {
})


let form = document.querySelector("#tablaid");
form.addEventListener("submit", UsuarioAgrege);

async function agregar_personaje(NuevoPersonaje) {
  try {
    let res = await fetch(url, {
      "method": "POST",
      "headers": { "Content-type": "application/json" },
      "body": JSON.stringify(NuevoPersonaje)
    });
       
    if (res.status == 201) {
      console.log("Exito");
      cargarTabla();
    }
    } catch (error) {
        console.log(error);
    }   
}


function borrar_Personaje() {
  let tabla_contenido = document.getElementById("contenidoTabla");
  let fila =0;
  for (const item of tabla) {
    let borrar = document.createElement("button");
    borrar.name = item.id;
    borrar.innerHTML = "borrar";
    borrar.addEventListener('click', async function(){
      try {
        let res = await fetch(url+"/"+item.id, {
          "method":"DELETE"
        })
      cargarTabla();
      } catch (error) {
        console.log(error);
      }
    });
    tabla_contenido.rows[fila].appendChild(borrar);
    fila +=1;
  }
}

function UsuarioAgrege(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let nombre = formData.get("nombre");
  let faccion = formData.get("faccion");
  let raza = formData.get("raza");
  let clase = formData.get("clase");
  let nivel = formData.get("nivel");
  let valor = formData.get("valor");
  let NuevoPersonaje = {
    nombre: nombre,
    faccion: faccion,
    raza: raza,
    clase: clase,
    nivel: nivel,
    valor: valor,
  }

  agregar_personaje(NuevoPersonaje);
  mostrarTabla();
  console.log(tabla);
}

function editar_Personaje(){
  let tabla_contenido = document.getElementById("contenidoTabla")
  let fila =0;
  for (const item of tabla) {
    let editar = document.createElement("button");
    editar.name = item.id;
    editar.innerHTML = "editar";
    editar.addEventListener('click', function(){
      let personajeEditar = item.id;
      edicion_Personaje(personajeEditar);
    });
    tabla_contenido.rows[fila].appendChild(editar);
    fila +=1;
  }
}

async function edicion_Personaje(personajeEditar){
  let formData = new FormData(form);
  let nombre = formData.get("nombre");
  let faccion = formData.get("faccion");
  let raza = formData.get("raza");
  let clase = formData.get("clase");
  let nivel = formData.get("nivel");
  let valor = formData.get("valor");
  let personajeEditado = {
    nombre: nombre,
    faccion: faccion,
    raza: raza,
    clase: clase,
    nivel: nivel,
    valor: valor,
  }
  try {
    let res = await fetch(url+"/"+personajeEditar, {
      "method":"PUT",
      "headers":{"content-type":"application/json"},
      "body":JSON.stringify(personajeEditado)
    })
    cargarTabla();
  } catch (error) {
    console.log(error);
  }
}


function comprobarForm(faccion, raza, clase) { //Comprueba si es erroneo el uso de Alianza / Horda con sus respectivas Razas
  var condicion = " ";
  if ((faccion == "Alianza") && (raza == "Orc" || raza == "Troll" || raza == "Undead" || raza == "Tauren" || raza == "Blood Elf")) {
    condicion = "Incorrecto";
  } else if ((faccion == "Horda") && (raza == "Human" || raza == "Dwarf" || raza == "Gnome" || raza == "Night Elf" || raza == "Draenei")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Orc") && (clase == "Paladin" || clase == "Priest" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Troll") && (clase == "Paladin" || clase == "Mage" || clase == "Warlock" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Tauren") && (clase == "Paladin" || clase == "Rogue" || clase == "Priest" || clase == "Mage" || clase == "Warlock")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Udead") && (clase == "Paladin" || clase == "Hunter" || clase == "Shaman" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Blood Elf") && (clase == "Warrior" || clase == "Shaman" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Human") && (clase == "Hunter" || clase == "Shaman" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Dwarf") && (clase == "Mage" || clase == "Warlock" || clase == "Shaman" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Gnome") && (clase == "Paladin" || clase == "Hunter" || clase == "Priest" || clase == "Shaman" || clase == "Druid")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Night Elf") && (clase == "Paladin" || clase == "Mage" || clase == "Warlock" || clase == "Shaman")) {
    condicion = "Incorrecto";
  }
  if ((raza == "Draenei") && (clase == "Rogue" || clase == "Warlock" || clase == "Druid")) {
    condicion = "Incorrecto";
  }

  return condicion;
}

