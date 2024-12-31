interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt?: string;
  }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <img 
          key={index}
          src={image.src}
          alt={image.alt || ''}
          className="w-full h-auto"
        />
      ))}
    </div>
  );
} 