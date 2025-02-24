import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BookCoverProps {
  children: ReactNode
  className?: string
}

export function BookCover({ children, className }: BookCoverProps) {
  return (
    <div className={cn(
      "h-full aspect-[3/4.25] bg-white rounded-lg shadow-xl overflow-hidden",
      "border-[clamp(8px,2vh,16px)] border-white",
      className
    )}>
      {children}
    </div>
  )
}

export function BrandBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "w-[90%] bg-red-600 text-white h-[clamp(2rem,6vh,3.5rem)] px-[clamp(1rem,2vw,2rem)] rounded-full",
      "flex items-center justify-between",
      "border-[1px] border-white",
      className
    )}>
      <span 
        className="text-[clamp(1rem,2.5vh,2.25rem)] font-black tracking-tight leading-none mt-[0.4em]" 
        style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
      >
        CHOOSE YOUR OWN ADVENTURE
      </span>
      <span 
        className="text-white font-bold text-[clamp(0.875rem,2vh,1.75rem)] ml-4 mt-[0.4em]"
        style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
      >
        404
      </span>
    </div>
  )
}

export function IllustrationFrame({ children, className }: BookCoverProps) {
  return (
    <div className={cn(
      "relative overflow-hidden",
      "rounded-t-[3rem]",
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-8 after:bg-white after:rounded-tr-xl",
      "before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-8 before:h-8 before:bg-white before:rounded-tl-xl",
      "border-8 border-red-600",
      "bg-gradient-to-br from-red-500 to-red-700",
      className
    )}>
      {children}
    </div>
  )
}

export function BookTitle({ children, className }: BookCoverProps) {
  return (
    <div className="space-y-[0.5em]">
      <h1 className={cn(
        "text-[clamp(1.5rem,3.5vh,3.5rem)]",
        "leading-[0.85] text-purple-700 -tracking-wide",
        className
      )}
      style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
        {children}
      </h1>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </div>
  )
}

export function Subtitle({ children, className }: BookCoverProps) {
  return (
    <div className="space-y-[0.5em] mb-[clamp(0.5rem,2vh,1.5rem)]">
      <div className={cn(
        "text-[clamp(1rem,2vh,1.75rem)] tracking-tight text-gray-800 leading-[0.85]",
        className
      )}
      style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
        {children}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </div>
  )
}

export function AuthorByline({ children, className }: BookCoverProps) {
  return (
    <p className={cn(
      "text-[clamp(1rem,2vh,1.75rem)] text-gray-700 mt-[0.5em] leading-[0.85] tracking-tight",
      className
    )}
    style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
      {children}
    </p>
  )
}

export function CreditLine({ children, className }: BookCoverProps) {
  return (
    <p className={cn(
      "text-[clamp(0.5rem,1vh,0.875rem)] text-gray-500 font-serif italic text-center mt-[0.5em] leading-[0.95]",
      className
    )}>
      {children}
    </p>
  )
} 