// 極簡靜態伺服器：node serve.cjs [port]  （未指定埠則用 8791）
const http=require('http'), fs=require('fs'), path=require('path');
const root=__dirname, PORT=parseInt(process.argv[2],10)||8791;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript',
  '.css':'text/css','.json':'application/json','.md':'text/markdown; charset=utf-8'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/') p='/index.html';
  const f=path.join(root,p);
  fs.readFile(f,(e,data)=>{
    if(e){ res.writeHead(404); res.end('404'); return; }
    res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream',
      'cache-control':'no-store'});
    res.end(data);
  });
}).listen(PORT,()=>console.log('Serving '+root+' at http://localhost:'+PORT));
