import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase();

  const specificOptions = await getConnectionOptions(NODE_ENV); 
  const defaultOptions = await getConnectionOptions(); 

  // console.log("NODE_ENV: " + NODE_ENV);
  // console.log("specificOptions: "); console.log(specificOptions);
  // console.log("defaultOptions: "); console.log(defaultOptions);

  return createConnection( 
    Object.assign(defaultOptions, {
      type: specificOptions.type 
          ? specificOptions.type
          : defaultOptions.type,
      database: specificOptions.database 
              ? specificOptions.database
              : defaultOptions.database,
      entities: specificOptions.entities 
              ? specificOptions.entities
              : defaultOptions.entities,
      migrations: specificOptions.migrations
                ? specificOptions.migrations
                : defaultOptions.migrations,
      logging: specificOptions.logging
             ? specificOptions.logging
             : defaultOptions.logging,
      cli: { 
        migrationsDir: specificOptions.cli.migrationsDir
                     ? specificOptions.cli.migrationsDir
                     : defaultOptions.cli.migrationsDir 
      }
    })
  );
};