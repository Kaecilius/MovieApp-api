const app = require('./server/app.js');
const mongoose = require('mongoose');
const port = process.env.port || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/movieapp',
                {useNewurlParser:true,useUnifiedTopology:true , useFindAndModify: false },
                (err, res)=>{
                    if (err) throw err;

                    console.log('BD online')
                    
                    app.listen(port,()=>{
                        console.log(`app corriendo en el puerto: ${ port }`);
                    })

                    
                })
