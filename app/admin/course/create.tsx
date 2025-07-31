import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source='title'
          label='Title'
          validate={[required()]}
        />
        <TextInput
          source='imageSrc'
          label='ImageSrc'
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
