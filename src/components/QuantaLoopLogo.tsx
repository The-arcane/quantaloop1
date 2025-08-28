import { cn } from '@/lib/utils';
import Image from 'next/image';

export function QuantaLoopLogo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src="https://i.postimg.cc/DwPVdLMX/Screenshot-14-removebg-preview.png"
      alt="QuantaLoop Logo"
      width={100}
      height={100}
      className={cn(className)}
      {...props}
    />
  );
}
