import React from 'react';
import { Typo } from '../../components/form/Typo';

export const Page = () => {
  const [user, setUser] = React.useState();

  return (
    <div className="relative">
      <div className="w-[341px] h-[104px]">
        <p className="w-[341px] left-[17px] top-[75px] text-[28px] font-bold text-center">
          <span className="w-[341px] text-[28px] font-bold text-center text-[#113eb6]">
            Devenir propriétaire devient plus{' '}
          </span>
          <span className="w-[341px] text-[28px] font-bold text-center text-[#3679ff]">
            accessible.
          </span>
        </p>
        <Typo className="text-base font-normal" color="tertiary">
          Réalisez votre premier achat immobilier pour seulement 700€ par mois
          !*
        </Typo>
      </div>
    </div>
  );
};
