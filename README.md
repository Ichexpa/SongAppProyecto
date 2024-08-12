
# Introducción:
## Proyecto SongApp CevlaRythm

CevlaRythm es un proyecto desarrollado con React que implementa un CRUD (Create, Read, Update, Delete) de la API brindada por CIMNEIBER, documentada en [SWAGGER](#https://sandbox.academiadevelopers.com/docs/). Proporciona una interfaz intuitiva y fácil de usar para que los usuarios puedan realizar y administrar sus reservas de servicios de manera eficiente.

## Enlace de la aplicación:

* [CevlaRythm](https://cevlarythm.netlify.app/)

## Tecnologias Útilizadas:

* [React](https://es.react.dev/)
* [Vite](https://vitejs.dev/)
* [TailwindCSS](https://tailwindcss.com/)

## Requisitos previos:

* [Node](https://nodejs.org/en)

# Características principales

## Usuarios

* Autenticación: En esta versión, solo aquellos usuarios que posean las credenciales podrán acceder a las funcionalidades del sitio.

* Perfil de usuario: Los usuarios pueden actualizar los datos que deseen desde su perfil, foto de perfil, nombre, apellido, etc.

## Canciones

* Crear canciones: Los usuarios pueden crear nuevas canciones proporcionando la información requerida, como nombre, año, el archivo de audio, y el álbum al cual pertenece, este podrá buscar dentro de la misma ventana.

* Ver canciones: Los usuarios pueden ver una lista de todas las canciones subidas hasta el momento, además de poder buscar canciones específicas, y filtrar sus canciones subidas.

* Actualizar canciones: Los usuarios tienen la capacidad de modificar los detalles de una canción existente, el mecanismo es similar a la creación.

* Eliminar canción: Los usuarios pueden eliminar una canción existente solo si ellos la subieron.

## PlayList

* Crear PlayList: Los usuarios pueden crear nuevas PlayList, agregándole un nombre estableciendo su visibilidad y descripción.

* Ver PlayList: Los usuarios pueden ver las PlayList de otros usuarios siempre y cuando sean públicas, sino también pueden filtrar solo sus PlayList.

* Edición/Eliminación PlayList: Los usuarios pueden cambiar el nombre, la visibilidad y la descripción de sus PlayLists si así lo desean, o también eliminarlas.

* PlayList específica: Si se selecciona una PlayList se mostrará en otra pantalla los detalles de la misma y sus canciones asociadas, las cuales se pueden reproducir o quitar de la PlayList.

## Álbumes

* Ver álbumes : Los usuarios pueden ver todos los álbumes subidos hasta el momento, o buscar el álbum deseado con la barra de búsqueda que se encuentra en la misma sección.

* Detalle de Álbum : Si se desea saber un álbum específico basta con apretar el botón representado a través de un ojo, el cual lo redireccionará a ver las canciones relacionadas de este.

# Configuración y ejecución

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu entorno local:
1. Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/Ichexpa/SongAppProyecto
```
2. Accede al directorio del proyecto.
```bash
cd SongAppProyecto
```
3. Instala las dependencias
 ```bash
npm install
  ```
4. Ejecuta la aplicación
 ```bash
npm run dev
 ```

5. Abre tu navegador y accede a [localhost](#) para comenzar a utilizar la aplicación.
## Autores

- **Nombre del Autor**: [Hector Mauricio Mamaní](https://github.com/tu-usuario)
- **Email**: maurobvx@gmail.com
