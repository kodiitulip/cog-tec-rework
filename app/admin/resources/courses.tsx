import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from 'react-admin';

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <NumberInput
          source='id'
          label='ID'
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
        <BooleanInput
          source='hidden'
          label='Hidden'
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
        <NumberInput
          source='id'
          label='Id'
          validate={[required()]}
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
        <BooleanInput
          source='hidden'
          label='Hidden'
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
export const CourseList = () => {
  return (
    <InfiniteList>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <TextField source='imageSrc' />
        <BooleanField source='hidden' />
      </Datagrid>
    </InfiniteList>
  );
};
