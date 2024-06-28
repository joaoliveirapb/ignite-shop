'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

interface ProductsProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string | number | null
  }[]
}

export function Products({ products }: ProductsProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <main
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-custom"
      ref={sliderRef}
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`product/${product.id}`}
          className="keen-slider__slide group relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-emerald-500 to-indigo-500"
        >
          <Image
            src={product.imageUrl}
            alt=""
            width={520}
            height={480}
            className="object-cover"
          />
          <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
            <strong className="text-xl">{product.name}</strong>
            <span className="text-2xl font-bold text-green-300">
              {product.price}
            </span>
          </footer>
        </Link>
      ))}
    </main>
  )
}
