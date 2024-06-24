import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ...props me sirve para no tener que colocar el resto de las props en la importación.

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, className, ...props }: props) {
  return (
    <button
      className={twMerge(
        clsx(
          "bg-gray-500 hover:bg-gray-500/80 px-4 py-2 rounded font-light",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
