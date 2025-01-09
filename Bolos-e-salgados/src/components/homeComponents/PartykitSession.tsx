import React from 'react';
import { Title } from '../../styles/styles';
import { KitsForParty } from './styles';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Button from '../Forms/Button';
import { Ikit } from '../../Types/Interfaces';

const notify = () =>
  toast.warn('KIT ainda nao esta disponivel', {
    icon: '🚀',
  });

const PartykitSession = ({ kit }: { kit: Ikit }) => (
  <KitsForParty>
    <main>
      <div>
        <Image
          src={kit.image.url}
          alt={kit.image.name}
          width={300}
          height={300}
        />
      </div>
      <section>
        <Title>{kit.title}</Title>
        <p>{kit.description}</p>
        <Button onClick={notify}>Ver mais</Button>
      </section>
    </main>
  </KitsForParty>
);

export default PartykitSession;
