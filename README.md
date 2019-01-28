1. Crearse cuenta y proyecto en [firebase](https://firebase.google.com/)
2. Crear BD Realtime Database en firebase (Develop -> Database)
3. Activar autenticacion de google en firebase (Develop -> Authentication -> Método de inicio de sesión)
4. Bajarse repositorio del proyecto:

```
git clone git@github.com:ismaeliberal/functions-firebase.git
```

5. Entrar en la carpeta del proyecto y instalar el CLI de firebase

```
cd functions-firebase
npm install -g firebase-tools
```

6. Logearse con la cuenta de firebase y añadir el proyecto

```
firebase login
firebase use --add
```

7. Instalamos las dependencias del proyecto y de las funciones

```
npm install
cd functions
npm install
```

8. Crear un fichero con nombre `firebase-config.json` dentro de `src/configs/` con las credenciales de nuestro proyecto y el siguiente formato

```js
{
  "apiKey": "CAMBIAR",
  "authDomain": "CAMBIAR",
  "databaseURL": "CAMBIAR",
  "projectId": "CAMBIAR",
  "storageBucket": "CAMBIAR",
  "messagingSenderId": "CAMBIAR"
}
```

9. Deploy de las functions para probar los cambios

```
firebase deploy --only functions
```
