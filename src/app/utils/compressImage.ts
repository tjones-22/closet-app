// utils/compressImage.ts
export const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = Math.min(maxWidth / img.width, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
  
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const reader2 = new FileReader();
                reader2.onloadend = () => resolve(reader2.result as string);
                reader2.onerror = reject;
                reader2.readAsDataURL(blob);
              } else {
                reject("Compression failed");
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };