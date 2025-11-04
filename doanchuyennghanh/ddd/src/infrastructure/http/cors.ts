import cors from "cors";

export const corsMiddleware = cors(
  {
  origin: "http://localhost:5173", // frontend dev

  credentials: true,
} , 
{
  origin: "http://localhost:3001", //
  Credential : true ,   
}
);
