
import express, { Application } from 'express';

const server = (app: Application, port: number) => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });

  return app;
};

export default server;
