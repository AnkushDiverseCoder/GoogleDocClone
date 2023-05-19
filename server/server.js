import  express  from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import { getDocument,saveDocument } from './controller/document-controller.js';


dotenv.config();
const PORT = process.env.PORT ;

const app = express();
Connection();

const httpServer = createServer(app);
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

const io = new Server(httpServer);

io.on('connection', (socket) => {    
    socket.on('get-document', async (documentId) => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);
        
        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
        
        socket.on('save-document', async (data) => {
           await saveDocument(documentId, data);
        })
    })
});