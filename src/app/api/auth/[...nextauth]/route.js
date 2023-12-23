import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import connectedToDB from "../../../../utils/database";
import User from "../../../../models/user";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret:process.env.SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectedToDB()
                const userExists = await User.findOne({
                   email:profile.email 
                })
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", " ").toLowerCase(),
                        image:profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})

export{ handler as GET ,handler as POST}