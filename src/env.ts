// Define variáveis de ambiente
const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase();

// PRODUCTION
if (NODE_ENV === 'production') {
}

// DEVELOPMENT
if (NODE_ENV === 'development') {
  // Outros
  process.env.URL_MAIL = process.env.DEV_URL_MAIL;
}

// TESTE
if (NODE_ENV === 'test') {
  // Banco de Dados
  process.env.BD = process.env.TES_BD;
}

export default NODE_ENV;