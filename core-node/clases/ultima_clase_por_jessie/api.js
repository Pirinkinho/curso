// metodo para controlar mi api
const api = (req, res) => {
    // res.end('Hello, world!');
    // res.end('<h1>Hello, hola!</h1>');
  
    console.log(req.url, req.method);
    let html = 'Pagina no encontrada';
    
   
  
    // API
      if(req.url === '/api' && req.method === 'POST'){
          // por aqui el navegador no puede hacer peticiones POST
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'API response' }));
      }else if(req.url === '/api/posts' && req.method === 'GET'){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ posts:[{postid:1,title:'post 1'},{postid:1,title:'post 1'},{postid:1,title:'post 1'}] }));
      }
  
      res.end(html);
  };

// metodo para controlar mi web
const web =  (req,res) => {
  if(req.url === '/'){
     html = fs.readFileSync('./index.html', { encoding: 'utf-8' });
    }else{
        // pagina de contacto
        if(req.url === '/contacto'){
            html = fs.readFileSync('./contacto.html', { encoding: 'utf-8' });
        }
    }}

  
module.exports = { api, web };