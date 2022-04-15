import React from 'react';
import { Typo, TypoTypesList } from '../../components/form/Typo';

export default {
  title: 'Ui/Typo',
  component: Typo,
  parameters: {
    layout: 'padded',
  },
};

const Template = () =>
  TypoTypesList.map((type) => (
    <Typo type={type} className="mb-4 capitalize">
      {type}
    </Typo>
  ));

export const Default = Template.bind({});
