import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './PreviewImage.module.css';

const PreviewImage = ({imageSrc, onClose}) => {

  return (
    <div className={styles.imageBackdrop} onClick={onClose}>
      <FontAwesomeIcon icon={faXmark} onClick={onClose} />
      <div className={styles.imagePreviewContainer}>
        <img src={imageSrc} alt="Preview Image" />
      </div>
    </div>
  );
}

export default PreviewImage;