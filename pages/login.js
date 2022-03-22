import { getProviders, signIn } from 'next-auth/react'
function Login() {
  return (
    <div>
      <img />
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
