// import type { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const options :NextAuthOptions= {
//     providers:[Credentials({
//         name:'credentials',
//         credentials:{
//             username:{
//                 label:'Username:',
//                 type:'text',
//                 placeholder:'Enter you username'
//             }, 
//             password:{
//                 label:'password', 
//                 type:"password", 
//                 placeholder:'enter your password'
//             },

//         },
//       //@ts-ignore
//         async authorize(credentials){
//             const user ={id:1 , name:'hussein', password:'testing'}
//             if(credentials.username === user.name && credentials.password === user.password){
//             return user
//             }else {
//                 return null
//             }
//         }
//     })]
// }