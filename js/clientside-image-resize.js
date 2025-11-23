(function (Drupal, once) {
  Drupal.behaviors.profileImageResize = {
    attach(context) {
      // Target your image upload field
      const fileInputs = once(
        'profileImageResize',
        'input[type="file"][name="files[upload_an_display_image]"]',
        context
      );

      fileInputs.forEach((fileInput) => {
        fileInput.addEventListener('change', async function (event) {
          const file = event.target.files[0];
          if (!file) return;

          // Show temporary feedback
          const msg = document.createElement('div');
          msg.textContent = 'Optimizing image...';
          msg.style.fontSize = '13px';
          msg.style.color = '#666';
          msg.style.marginTop = '4px';
          fileInput.insertAdjacentElement('afterend', msg);

          const resizedFile = await resizeImage(file, 800, 800, 0.8);

          const dt = new DataTransfer();
          dt.items.add(resizedFile);
          fileInput.files = dt.files;

          msg.textContent = '✅ Image optimized';
          setTimeout(() => msg.remove(), 1500);
        });
      });

      function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Scale while maintaining aspect ratio
            if (width > maxWidth || height > maxHeight) {
              if (width > height) {
                height = Math.round(height * (maxWidth / width));
                width = maxWidth;
              } else {
                width = Math.round(width * (maxHeight / height));
                height = maxHeight;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => resolve(new File([blob], file.name, { type: file.type })),
              file.type,
              quality
            );
          };
        });
      }
    },
  };
})(Drupal, once);
