import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mx-auto w-full max-w-[1180px] py-8">
      <Link href="/">
        <Image
          src="/ignite-logo.svg"
          alt="Logotipo da Anuntech"
          height={52}
          width={130}
        />
      </Link>
    </header>
  )
}
