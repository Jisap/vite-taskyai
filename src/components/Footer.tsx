import { SOCIAL_LINKS } from "@/constants"
import { Separator } from "./ui/separator"




const Footer = () => {
  return (
    <div>
      <div className="container min-h-16 py-4 bg-background border border-b-0 rounded-t-xl flex flex-col gap-3 items-center lg:flex-row lg:justify-between">
        <p className="text-center text-sm">
          &copy; 2025 codewithsadee
        </p>
        <ul className="flex flex-wrap items-center">
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li 
              key={index}
              className="flex items-center"  
            >
              <a 
                href={href} 
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground"  
              >
                {label}
              </a>
              {index !== SOCIAL_LINKS.length - 1 && <Separator  orientation="vertical" className="h-3 mx-3"/>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Footer