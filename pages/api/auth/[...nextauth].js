import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.445c52c78bd94f98b0f4332f707aaaf5,
      clientSecret: process.env.74309c52c03d4860bcb136c569475617,
      authorization: LOGIN_URL
    }),
  ],
})
