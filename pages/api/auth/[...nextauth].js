import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { refreshAccessToken } from 'spotify-web-api-node/src/server-methods'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
 try {
  spotifyApi.setAccessToken(token.accessToken)
  spotifyApi.setRefreshToken(token.refreshToken)

  const {body: refreshedToken} = await spotifyApi.refreshAccessToken()
  console.log("REFRESHED TOKEN IS: ", refreshedToken)

  return {
   ...token,
   accessToken: refreshedToken.access_token,
   accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600 is returned from api
   refreshToken: refreshedToken.refresh_token ?? token.refreshToken
  }

 } catch(error) {
  console.error(error)

  return {
   ...token,
   error: "RefreshAccessTokenError"
  }
 }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.445c52c78bd94f98b0f4332f707aaaf5,
      clientSecret: process.env.74309c52c03d4860bcb136c569475617,
      authorization: LOGIN_URL
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
   signIn: '/login'
  },
  callbacks: {
   async jwt({ token, account, user}) {
    // initial sign in
    if (account && user) {
     return {
      ...token,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      username: account.providerAccountId,
      accessTokenExpires: account.expires_at * 1000
     }
    }

    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpires) {
     console.log("EXISTING ACCESS TOKEN IS VALID")
     return token;
    }

    // Access token has expired, so we need to refresh it ...
    console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING ...")
    return await refreshAccessToken(token)
   },

   async session({session, token}) {
    session.user.accessToken = token.accessToken;
    session.user.refreshToken = token.refreshToken;
    session.user.username = token.username;
    return session;
   }


  }
})
