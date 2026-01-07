import { useState, useRef } from "react";

interface Props {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-blue-600 font-medium"
      >
        Click to upload image
      </button>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-3 mx-auto max-h-40 rounded-md shadow"
        />
      )}
    </div>
  );
}
