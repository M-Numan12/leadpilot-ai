import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  href = '/',
  className = ''
}) => {
  const dimensions = {
    sm: { img: 28, text: 'text-base' },
    md: { img: 36, text: 'text-xl' },
    lg: { img: 48, text: 'text-2xl' },
    xl: { img: 64, text: 'text-3xl' },
  }[size];

  const logoContent = (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-[2px] shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
        <div className="rounded-2xl bg-[#0f172a] p-1.5 flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="LeadPilot AI Logo"
            width={dimensions.img}
            height={dimensions.img}
            className="object-contain transform group-hover:scale-105 transition-transform duration-300 rounded-xl"
            priority
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-white ${dimensions.text} flex items-center gap-1.5`}>
            LeadPilot <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80 -mt-1">
              Autonomous Sales Engine
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
};

export default Logo;
