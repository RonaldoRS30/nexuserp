import { classNames } from '../utils/format';

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CoverImage({ src, alt, className }: CoverImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={classNames('h-full w-full object-cover [image-rendering:auto]', className)}
    />
  );
}
