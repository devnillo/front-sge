
export default function ButtomComponent({title, type}) {


  return (
    <button type={type} className="bg-medium p-2 text-white cursor-pointer">{title}</button>
  )
}