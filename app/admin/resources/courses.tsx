import { Create, Datagrid, Edit, List, NumberField, SimpleForm, TextField, TextInput, required } from 'react-admin';

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
        />
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
export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source='id'
          label='Id'
          validate={[required()]}
          type='number'
        />
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
    </Edit>
  );
};
export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <TextField source='imageSrc' />
      </Datagrid>
    </List>
  );
};
