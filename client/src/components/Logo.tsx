import { Link } from 'react-router-dom';
import logo from '../assets/logo-nexuserp.jpg';
import { classNames } from '../utils/format';

interface LogoProps {
  className?: string;
  to?: string;
}

export function Logo({ className, to = '/' }: LogoProps) {
  return (
    <Link to={to} className={classNames('inline-flex items-center', className)}>
      <img
        src={logo}
        alt="NexusERP, innovación para crecer"
        className="h-10 w-auto md:h-12"
      />
    </Link>
  );
}
