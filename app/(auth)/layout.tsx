import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-orange-200 w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col items-center my-4">
        <Image
          src="/oxxo-logo.svg"
          alt="oxxo"
          width={100}
          height={40}
          style={{ height: 'auto' }}
          priority
        />
      </div>
      {children}
    </div>
  )
}
