const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Store all selected files in the array
    setmessage("");
    setError(false);
};
const base64Images = await Promise.all(images.map(image => convertToBase64(image)));
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
<label htmlFor='photo'>UPLOAD PHOTO OF PRODUCT</label>
                <input ref={fileInputRef} id='photo' accept='image/*' type='file' multiple onChange={handleImageChange} required />