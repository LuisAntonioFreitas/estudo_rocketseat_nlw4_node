// Define variáveis de ambiente
const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase();
const PORT = process.env.PORT?.trim().toLowerCase();

// PRODUCTION
if (NODE_ENV === 'production') {
  // Outros
  if ( PORT != undefined) {
    process.env.URL = String(process.env.URL_MAIL).replace("{PORT}", process.env.PORT);
    process.env.URL_MAIL = String(process.env.URL_MAIL).replace("{PORT}", process.env.PORT);
  }
  process.env.URL = String(process.env.URL_MAIL)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
  process.env.URL_MAIL = String(process.env.URL_MAIL)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
}

// PRODUCTION | PROD
if (NODE_ENV === 'prod') {
  process.env.PORT = process.env.PROD_PORT;
  // Outros
  process.env.URL = String(process.env.PROD_URL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
  process.env.URL_MAIL = String(process.env.PROD_URL_MAIL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
}

// DEVELOPMENT | DEV
if (NODE_ENV === 'dev') {
  process.env.PORT = process.env.DEV_PORT;

  // Banco de Dados
  process.env.BD = process.env.DEV_BD;
  // Outros
  process.env.URL = String(process.env.DEV_URL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
  process.env.URL_MAIL = String(process.env.DEV_URL_MAIL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
}

// TESTE
if (NODE_ENV === 'test') {
  process.env.PORT = process.env.TES_PORT;

  // Banco de Dados
  process.env.BD = process.env.TES_BD;
  // Outros
  process.env.URL = String(process.env.TES_URL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
  process.env.URL_MAIL = String(process.env.TES_URL_MAIL)
    .replace("{PORT}", process.env.PORT)
    .replace("{PATH}", process.env.PATH)
    .replace("{VERSION}", process.env.VERSION);
}

// console.log('NODE_ENV : ' + NODE_ENV);
// console.log('PORT     : ' + process.env.PORT);
// console.log('BD       : ' + process.env.BD);
// console.log('URL      : ' + process.env.URL);
// console.log('URL_MAIL : ' + process.env.URL_MAIL);

export default NODE_ENV;