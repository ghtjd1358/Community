"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';

export default function UploadButton() {
  return (
    <>
    <CldUploadWidget uploadPreset="Unsigned Preset">
  {({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>

<CldImage
      src="solowvsoqutya4s690hs"
      width={500}
      height={500}
      alt="Uploaded Image"
    />
</>
  );
}
