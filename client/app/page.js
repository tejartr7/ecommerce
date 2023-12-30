import Image from 'next/image'
import Header from './header/page'
export default function Home() {
  return (
    <div>
      <Header />
      <a href='/api/auth/login'>
        Login
      </a>
      <a href='/api/auth/logout'>
        logout
      </a>
      <a href='/api/auth/me'>
        profile
      </a>
    </div>
  )
}
