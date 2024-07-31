import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

/**
 * having google provider info 
 *  1 search google cloud console 
 * 2 create new project shopnest  
 * 3 api and services  
 * 4 Oauth screen 
 * 5 external and click enter
 * 6 enter app info and email continue 
 *  7 add top three scopes and update
 * and skip and save 
 * 8 credentials option      create 0auth clientId
 * 9 add autherized redirect url localhost:3000/api/auth/callback/google and click create
 * */ 

const handler = NextAuth({
  providers:[
   GoogleProvider({
    clientId:process.env.GOOGLE_ID, 
    clientSecret:process.env.GOOGLE_SECRET
   })
  ],
  callbacks:{
    async session({session}){
      return session
    },
    async signIn({profile}){
      console.log(profile)
    }
  }

})

export {handler as GET , handler as POST}