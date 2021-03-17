import { Wysiwyg } from '../../form';

const Third = ({ onChange, values = {} }) => (
  <>
    <div>
      <p>Pourquoi</p>
      <Wysiwyg name="why" label="why" value={values?.why} onChange={onChange('why')} />
    </div>
    <div>
      <p>Contenue</p>
      <Wysiwyg
        name="content"
        label="Contenue"
        value={values?.content}
        onChange={onChange('content')}
      />
    </div>
  </>
);

export default Third;
