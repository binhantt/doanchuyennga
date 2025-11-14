import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3001"
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // cho phép
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
});
