import "./Avatar.css";

interface AvatarProps {
  image: string;
  alt: string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  image,
  alt,
  width,
  className,
  style,
}) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width, height: width }} />
    </div>
  );
};

export default Avatar;
