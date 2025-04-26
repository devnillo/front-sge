import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

export function InputComponent({name, title, type, placeholder}) {
  return <div>
    <Label htmlFor={name}>{title}</Label>
    <Input type={type} id={name} placeholder={placeholder} />
</div>
}
