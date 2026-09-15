import CartItem from "./CartItem"

export default function CartItemsList({ items }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  )
}