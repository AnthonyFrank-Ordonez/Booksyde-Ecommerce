import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/manga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/manga/"!</div>
}
