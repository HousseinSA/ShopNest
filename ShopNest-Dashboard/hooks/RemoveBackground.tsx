// Function to remove the background using ClipDrop API
export const RemoveBackground = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob(); // Convert the image URL to a Blob
    const form = new FormData();
    form.append('image_file', imageBlob);

    const result = await fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_CLIPDROP_API_KEY, 
         'accept': 'image/webp' 
      },
      body: form,
    });

    const buffer = await result.arrayBuffer(); // Get the processed image as a binary buffer
    const blob = new Blob([buffer]); // Convert buffer to Blob

    // Create a new image URL from the Blob (this is the image with the background removed)
    const removedBackgroundUrl = URL.createObjectURL(blob);
    return removedBackgroundUrl;
  } catch (error) {
    console.error('Error removing background:', error);
    return null;
  }
};
