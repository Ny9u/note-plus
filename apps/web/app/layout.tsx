import './globals.css'

export const metadata = {
  title: 'Note Plus',
  description: 'Knowledge Base with RAG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
