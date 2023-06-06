import Modal from '@/components/Modal'
import './globals.css'

export const metadata = {
  title: 'Taskmaster',
  description: 'Organization at your fingertips',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#222222]'>
        {children}

        <Modal />

      </body>
    </html>
  )
}
