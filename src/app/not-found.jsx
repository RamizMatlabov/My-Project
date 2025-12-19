import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">Страница не найдена</h1>
      <p className="mt-3 text-gray-600">Проверьте ссылку или вернитесь на главную.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          На главную
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
        >
          Товары
        </Link>
      </div>
    </div>
  )
}

