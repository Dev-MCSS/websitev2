import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./primary-button.module.css";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({ href, children, className }: PrimaryButtonProps) {
  return (
    <Link href={href} className={`${styles.button}${className ? ` ${className}` : ""}`}>
      <span>{children}</span>
      <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
