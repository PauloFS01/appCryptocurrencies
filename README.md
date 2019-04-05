# appCryptocurrencies
Versão beta - do app Valor Atual
## Dev issues
To resolve problems with eslint-loader run:
>npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

And add the extends array line:
>extends: ['plugin:vue/essential','standard'],

## Run Dev mode in browser
> quasar dev

## Run Dev mode on the device
> quasar dev -m cordova -T [ios|android]

You need detects your machine's external ip address. Than It's starts up develop server in your machine.

## Building for production
> quasar build -m cordova -T [ios|android]

#
# Final release and deploy

For final release you need copy the "src/assets" folder and past to "src-cordova/www". Becouse a issure of quasar build this folder will not be automatic copied.

## release with cordova

So inside the "src-cordova" run folow command:
>cordova build [ios|android]

## asing the apk
 ### generate a private key using keytool
 >keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 20000

### sign .apk using jarsigner
>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore "path-to-unsigned-apk-file" alias_name

### aling .apk with zipaling

Optimize .apk with zipaling is a google's requirement.
>zipalign -v 4 "path-to-same-apk-file" HelloWorld.apk
