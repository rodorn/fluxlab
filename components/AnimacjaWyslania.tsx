export default function AnimacjaWyslania() {
  const css = `
.wys{position:relative;width:56px;height:56px}
.wys-plane{position:absolute;left:0;top:0;width:28px;height:28px;color:#4f46e5;opacity:0;animation:wys-fly 1.3s ease-in forwards}
.wys-ok{position:absolute;inset:0;transform:scale(0);animation:wys-pop .35s ease-out 1.25s forwards}
.wys-circle{stroke-dasharray:151;stroke-dashoffset:151;animation:wys-draw .5s ease-out 1.3s forwards}
.wys-tick{stroke-dasharray:30;stroke-dashoffset:30;animation:wys-draw .35s ease-out 1.75s forwards}
@keyframes wys-fly{0%{opacity:0;transform:translate(-40px,30px) rotate(-30deg)}15%{opacity:1}70%{opacity:1;transform:translate(30px,-40px) rotate(20deg)}100%{opacity:0;transform:translate(90px,-30px) rotate(50deg)}}
@keyframes wys-pop{to{transform:scale(1)}}
@keyframes wys-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.wys-plane{display:none}.wys-ok{animation:none;transform:none}.wys-circle,.wys-tick{animation:none;stroke-dashoffset:0}}
`;
  return (
    <div className="wys mb-6" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg className="wys-plane" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 11.2 21 3.3c.8-.3 1.6.5 1.3 1.3l-7.9 18.5c-.4.9-1.7.9-2 0l-2.3-6.9-6.9-2.3c-.9-.3-.9-1.6 0-1.7Zm8.9 2.2 1.4 4.2 4.9-11.5-9.6 4.1 3.3 1.1Z" />
      </svg>
      <svg className="wys-ok" viewBox="0 0 56 56" fill="none">
        <circle className="wys-circle" cx="28" cy="28" r="24" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" transform="rotate(-90 28 28)" />
        <path className="wys-tick" d="M17 29l8 8 14-16" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
