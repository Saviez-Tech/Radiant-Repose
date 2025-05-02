import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
export default function NormalSelect({ options, value }: { options: { value: string; label: string }[], value?: string }) {
    return (
        <Select value={value}>
      <SelectTrigger className=" w-[432px] border border-primary-dark_slate focus:ring-primary-darkRed focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent bg-[#F8F8F8] h-12 px-3 py-4 text-primary-dark_gray">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger >
      <SelectContent >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
      </SelectContent>
    </Select>
    );
}
