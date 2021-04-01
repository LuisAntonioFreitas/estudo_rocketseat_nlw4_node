import { app } from './app';

const identification = process.env.NODE_ENV?.trim().toLowerCase();
const port = process.env.PORT;
const url = process.env.URL;

app.listen(port, () => console.log(`Server '${identification}' on port ${port} is running!\n${url}`)); 
