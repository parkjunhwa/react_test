import React from 'react';
import { Card as AntCard } from 'antd';
import styles from './Card.module.scss';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <AntCard className={styles.card} hoverable>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </AntCard>
  );
};

export default Card; 