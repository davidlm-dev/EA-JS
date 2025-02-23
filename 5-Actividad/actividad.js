console.log("Inicio");

// Función para obtener un usuario de la API
const obtenerUsuario = (userId) => 
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });

// Función para obtener los posts de un usuario
const obtenerPosts = (userId) => 
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });

// Función para obtener los comentarios de un post
const obtenerComentarios = (postId) => 
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los comentarios");
      return response.json();
    });

// Función para filtrar comentarios con ID mayor a 3
const filtrarComentarios = (comentarios) => 
  comentarios.filter(comentario => comentario.id > 3);

// Función para contar el total de palabras en los comentarios
const contarPalabrasComentarios = (comentarios) => 
  comentarios.reduce((total, comentario) => total + comentario.body.split(' ').length, 0);

// Función para obtener los emails de los comentaristas (usando map)
const obtenerEmails = (comentarios) => 
  comentarios.map(comentario => comentario.email);

// Función principal que maneja la lógica de los datos de manera funcional
const obtenerDatos = async (userId) => {
  try {
    // Obtiene el usuario
    const usuario = await obtenerUsuario(userId);
    console.log("Usuario:", usuario);

    // Obtiene los posts del usuario
    const posts = await obtenerPosts(usuario.id);
    console.log("Posts del usuario:", posts);

    // Obtiene los comentarios del primer post
    const comentarios = await obtenerComentarios(posts[0].id);
    console.log("Comentarios del primer post:", comentarios);

    // Usamos map, filter y reduce para manipular los datos
    const comentariosFiltrados = filtrarComentarios(comentarios);
    console.log("Comentarios filtrados (ID > 3):", comentariosFiltrados);

    const totalPalabrasComentarios = contarPalabrasComentarios(comentarios);
    console.log("Total de palabras en los comentarios:", totalPalabrasComentarios);

    // Usamos map para obtener los emails de los comentaristas
    const emailsComentaristas = obtenerEmails(comentarios);
    console.log("Emails de los comentaristas:", emailsComentaristas);

  } catch (error) {
    console.error("Error:", error);
  }
};

// Ejecutamos la función principal para un usuario con ID 2
obtenerDatos(2);
