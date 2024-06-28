import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.id

  const response = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = response.default_price as Stripe.Price

  const product = {
    id: response.id,
    name: response.name,
    description: response.description,
    imageUrl: response.images[0],
    price:
      price.unit_amount &&
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
  }

  return (
    <main className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="flex h-[656px] w-full max-w-xl items-center justify-center rounded-lg bg-gradient-to-b from-emerald-500 to-indigo-500 p-1">
        <Image src={product.imageUrl} alt="" width={520} height={480} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[32px] text-zinc-300">{product.name}</h1>
        <span className="mt-4 block text-[32px] text-green-300">
          {product.price}
        </span>
        <p className="mt-10 text-lg leading-relaxed text-zinc-300">
          {product.description}
        </p>
        <button className="mt-auto rounded-lg bg-green-600 p-5 text-lg font-bold transition-colors hover:bg-green-500">
          Comprar agora
        </button>
      </div>
    </main>
  )
}
