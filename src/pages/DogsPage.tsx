import React, { useState } from 'react';
import '../styles/DogsPage.scss';

// Предзагруженные ссылки на изображения собак (работают без VPN)
const DOG_IMAGES = [
  'https://images.dog.ceo/breeds/maltese/n02085936_1007.jpg',
  'https://images.dog.ceo/breeds/poodle-toy/n02113624_955.jpg',
  'https://images.dog.ceo/breeds/chihuahua/n02085620_10074.jpg',
  'https://images.dog.ceo/breeds/puggle/IMG_074816.jpg',
  'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6987.jpg',
  'https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg',
  'https://images.dog.ceo/breeds/dane-great/n02109047_15430.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg',
  'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
  'https://images.dog.ceo/breeds/collie-border/n02106166_1000.jpg',
  'https://placedog.net/500/280?id=1',
  'https://placedog.net/500/280?id=2',
  'https://placedog.net/500/280?id=3',
  'https://placedog.net/500/280?id=4',
  'https://placedog.net/500/280?id=5',
  'https://random.dog/4c32c30a-17a3-482e-80d0-9ee2d1d1aef3.jpg',
  'https://random.dog/6c77643e-cc5f-4a99-a2ca-8d8dd3a4a47c.jpg',
  'https://random.dog/8b2a8a02-e7f8-458c-b06c-598206ba83f1.jpg',
];

const DogsPage: React.FC = () => {
  const [dogImage, setDogImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getRandomDogImage = () => {
    const randomIndex = Math.floor(Math.random() * DOG_IMAGES.length);
    return DOG_IMAGES[randomIndex];
  };

  const loadDog = () => {
    setLoading(true);
    setError('');
    
    // Имитация загрузки для лучшего UX
    setTimeout(() => {
      try {
        const randomImage = getRandomDogImage();
        setDogImage(randomImage);
      } catch (err) {
        console.error('Error loading dog image:', err);
        setError('Не удалось загрузить изображение. Попробуйте еще раз.');
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  // Загрузить первую собаку при загрузке страницы
  React.useEffect(() => {
    loadDog();
  }, []);

  return (
    <div className="dogs-page">
      <h1>🐶 Случайные собачки</h1>
      
      <div className="dog-controls">
        <button 
          className="main-button"
          onClick={loadDog}
          disabled={loading}
        >
          {loading ? 'Загружаем...' : '🐕 Показать собачку'}
        </button>
      </div>
      
      <div className="dog-display">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Ищем самую милую собачку для вас...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={loadDog}>Попробовать снова</button>
          </div>
        ) : dogImage ? (
          <div className="dog-image-container">
            <img 
              src={dogImage} 
              alt="Случайная собака"
              className="dog-image"
              onError={(e) => {
                // Fallback на другое изображение если текущее не загрузилось
                e.currentTarget.src = getRandomDogImage();
              }}
            />
          </div>
        ) : (
          <div className="placeholder">
            <p>Нажмите кнопку, чтобы увидеть собачку!</p>
          </div>
        )}
      </div>
      
      <div className="dog-tips">
        <h3>💡 Советы:</h3>
        <ul>
          <li>Каждое нажатие кнопки покажет новую случайную собачку</li>
          <li>Все изображения реальных собак из открытых источников</li>
          <li>Для работы не требуется VPN или дополнительные API ключи</li>
          <li>Проект использует статически проверенные ссылки</li>
        </ul>
      </div>
    </div>
  );
};

export default DogsPage;