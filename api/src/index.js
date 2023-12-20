// _
// //\
// V  \
//  \  \_
//   \,'.`-.
//    |\ `. `.       
//    ( \  `. `-.                        _,.-:\
//     \ \   `.  `-._             __..--' ,-';/
//      \ `.   `-.   `-..___..---'   _.--' ,'/
//       `. `.    `-._        __..--'    ,' /
//         `.  `-_     ``--..''       _.-' ,'
//           `-_ `-.___        __,--'   ,'
//              `-.__  `----"""    __.-'
//                    `--..____..--'
// FUNCIONA PA 

import app from "./app.js";
import { sequelize } from "./db.js";


async function main(){
    try {
        await sequelize.sync({force:false});
        console.log('Connection has been established successfully.')
        app.listen(3000)
        console.log('Server is listening on port ', 3000)
    } catch (error) {
        console.log('Unable to connect to the database', error)
        
    }

}
main()