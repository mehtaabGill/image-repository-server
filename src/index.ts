import app from './app';

const PORT = process.env.PORT ?? 3000;

if(process.env.NODE_ENV !== 'TESTING')
    app.listen(PORT, () => { console.log(`app listening at http://127.0.0.1:${PORT}`) })