import { createServer } from 'http'
import app from './app'


const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`🤪 Server is running wild on http://localhost:${PORT}`);
});