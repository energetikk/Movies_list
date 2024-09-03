import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials';
import { users } from '../utils/users';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),

        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const currentUser = users.find(user => user.email === credentials.email)

                if (currentUser && currentUser.password === credentials.password) {
                    const { password, ...userWithoutPass } = currentUser;

                    // return userWithoutPass as User;
                    return userWithoutPass;
                }

                return null
            }
        })
    ],

    callbacks: {
        async authorized({ auth }) {
            // Проверка аутентификации пользователя
            return !!auth;
        }
    },



    // ],



    // pages: {
    //     signIn: '/signin'
    // }
}
)
