
>#Calculadora de Inversión
>###Prueba Técnica - Disruptive Studio

## Tecnologías usadas
- ###Front
  - VueJs
  - Javascipt
- ### Backend
  - NodeJS
  - NestJS
  - Jest
  - Typescript
- ### API Integrada
  - Coin Market Cap
  
## Descripción
1. Crear una aplicación para calcular una inversión es USD.
2. La aplicación tiene 2 monedas para proyectar: Bitcoin y Ethereum. Cada
   moneda tendrá un interés mensual:
   - BTC 5% interés
   - ETH 3% interés
3. Se debe obtener el precio en USD en tiempo real (API: COINMARKETCAP,
   BINANCE, MESSARI)
4. El usuario debe ingresar un monto en USD y la aplicación debe mostrarme una
   proyección mensual y anual, tomando en cuenta los valores de interés de cada
   moneda.
5. El resultado de la proyección debe mostrarse en una tabla y exportarse
   ACSV/JSON

| INVERSION | 500 USD |
|:---:|:---:|
|BTC| ETH|
|MES1 $$/BTC |MES1 $$/ETH|
|....| ...|
|MES12 $$| MES12 $$|

6. La aplicación debe mostrar en tiempo real, los precios de ambas monedas BTC
   y ETH (BTC: 59,000 USD / ETH: 4,462 USD)
7. Enviar repositorio en Github

## Instalación
```bash
$ cd client
$ npm install
$ cd ..
$ npm install

# O el siguiente comando desde la raiz en una linea
$ cd client && npm i && cd .. && npm i 
```

## Variables de entorno
Crear archivo `.env` en la raiz con la siguiente información:
```bash
COINMARKETCAP_URL=https://pro-api.coinmarketcap.com
COINMARKETCAP_APIKEY=11111111-2222-3333-4444-555555555555
```


## Corriendo la aplicación

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Rutas
```
# Pagina Inicial
http://localhost:3000/

# API
http://localhost:3000/api/coin-market-cap/
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


