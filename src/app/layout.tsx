import './globals.css'
import { Inter, Goudy_Bookletter_1911 } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const goudy = Goudy_Bookletter_1911({
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'Lorem Ipsum',
  description: 'Sit dolor amet vincit!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={goudy.className}>{children}</body>
    </html>
  )
}
