const {server_port}=require('./secret.js');
const connectDB=require('/data/data/com.termux/files/home/backend-express-village-project/config/db.js');
const app=require('./app.js')
app.listen(server_port, async()=>{
  console.log(`This my village Project server at http://localhost:${server_port}`);
  await connectDB();
})