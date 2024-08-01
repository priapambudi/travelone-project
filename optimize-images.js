import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";

(async () => {
  await imagemin(["public/*.{jpg,jpeg,png}"], {
    destination: "public/optimized-images",
    plugins: [
      imageminMozjpeg({
        quality: 55, // Adjust the quality as needed (0-100)
      }),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  console.log("Images optimized");
})();
