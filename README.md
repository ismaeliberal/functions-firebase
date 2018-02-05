1. Crearse cuenta y proyecto en [firebase](https://firebase.google.com/)
2. Crear BD Realtime Database en firebase (Develop -> Database)
3. Activar autenticacion de google en firebase (Develop -> Authentication -> Método de inicio de sesión)
4. Bajarse repositorio del proyecto:

```
git clone git@github.com:ismaeliberal/functions-firebase-4v.git
```

5. Entrar en la carpeta del proyecto y instalar el CLI de firebase

```
cd functions-firebase-4v
npm install -g firebase-tools
```

6. Logearse con la cuenta de firebase y añadir el proyecto

```
firebase login
firebase use --add
```

7. Instalamos las dependencias del proyecto y de las funciones

```
yarn install
cd functions
npm install
```

8. Deploy de las functions para probar los cambios

```
firebase deploy --only functions
```
