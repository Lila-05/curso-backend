import 'module-alias/register';
import dotenv from 'dotenv';
import app from './server/server';
import "./config/mongodb";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});