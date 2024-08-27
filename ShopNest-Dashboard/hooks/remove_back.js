
async function handleRemoveBg(image) {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onloadend = async () => {
    const base64Image = reader.result.split(',')[1];
    const response = await fetch('/api/remove-bg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64: base64Image, filename: image.name }),
    });

    const data = await response.json();
    if (response.ok) {
      // console.log('Background removed image available at:', data.filePath);
    } else {
      console.error('Error:', data.error);
    }
  };
}
