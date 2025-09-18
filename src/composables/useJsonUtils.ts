// Native browser download function - no external dependencies needed!

export function downloadJSON (data: any, filename: string) {
  // Create a Blob with the JSON data
  const blob = new Blob([data], { type: 'application/json' });

  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  // Append to body, click, and remove (required for Firefox)
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL to free memory
  URL.revokeObjectURL(url);
};

export function loadJSONFromFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string;
        const formData = JSON.parse(jsonContent);
        resolve(formData);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}