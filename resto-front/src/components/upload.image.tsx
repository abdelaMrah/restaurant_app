import React, { useState } from 'react';
import axios from 'axios';
import menuService from '../pages/menu/services/menu.service';

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner une image');
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name','abdellah mrah')

    try {
        const response = await menuService.createMenu(formData)
    //   const response = await axios.post('/api/dish/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },

    //   });
      setUploadStatus('Image téléchargée avec succès');
      console.log('Réponse du serveur:', response);
    } catch (error) {
      setUploadStatus('Erreur lors du téléchargement de l\'image');
      console.error('Erreur:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Télécharger une image</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Aperçu" className="max-w-full h-auto rounded-lg" />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {uploading ? 'Téléchargement en cours...' : 'Télécharger l\'image'}
      </button>
      {uploadStatus && (
        <p className={`mt-4 text-center ${uploadStatus.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
}