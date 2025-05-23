# bindeo-app

bindeo-app es una aplicación de gestión de contactos personales, donde cada usuario puede registrar y administrar sus propios contactos asociados a su correo electrónico. El propósito principal de este proyecto es explorar y experimentar con **VueFire** y **Firebase**, evaluando su integración, facilidad de uso y capacidades dentro de un entorno real de Vue 3.

## Objetivos del Proyecto

- Explorar la integración de [VueFire](https://vuefire.vuejs.org/) con [Firebase](https://firebase.google.com/).
- Probar funcionalidades de autenticación y base de datos en tiempo real.
- Recoger sensaciones y aprendizajes sobre el uso de estas tecnologías en un proyecto Vue.

## Tecnologías Utilizadas

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [VueFire](https://vuefire.vuejs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn-vue](https://ui.shadcn.com/)
- [vue-sonner](https://sonner.emilkowal.ski/vue)
- [vee-validate](https://vee-validate.logaretm.com/)
- [zod](https://zod.dev/)

## Características

- Registro y autenticación de usuarios mediante correo electrónico.
- Gestión de contactos personales (crear, editar, eliminar, listar).
- Sincronización en tiempo real de los datos usando Firestore.
- Interfaz moderna y responsiva construida con Vue 3 y Vite.

## Demo

Puedes probar la aplicación en el siguiente enlace:

[Ver demo en Netlify](https://bindeo-app.netlify.app)

## Instalación

```sh
pnpm install
```

### Desarrollo (Hot-Reload)

```sh
pnpm run dev
```

### Compilación y Minificación para Producción

```sh
pnpm run build
```

### Linting con [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## Notas

Este proyecto es experimental y su objetivo principal es la exploración tecnológica, no la producción. Se recomienda revisar y ajustar las reglas de seguridad de Firebase antes de desplegar en un entorno real.
