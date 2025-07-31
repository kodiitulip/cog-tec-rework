import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  required,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const UnitsCreate = () => {
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
          source='description'
          label='Description'
          validate={[required()]}
        />
        <ReferenceInput
          reference='courses'
          label='Course ID'
          source='courseId'
        />
        <TextInput
          source='order'
          label='Order'
          validate={[required()]}
          type='number'
        />
        <TextInput
          source='imageSrc'
          label='ImageSrc'
        />
      </SimpleForm>
    </Create>
  );
};

export const UnitsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          validate={[required()]}
          type='number'
        />
        <TextInput
          source='title'
          label='Title'
          validate={[required()]}
        />
        <TextInput
          source='description'
          label='Description'
          validate={[required()]}
        />
        <ReferenceInput
          reference='courses'
          label='Course ID'
          source='courseId'
        />
        <TextInput
          source='order'
          label='Order'
          validate={[required()]}
          type='number'
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

export const UnitsList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <TextField source='description' />
        <ReferenceField
          reference='courses'
          source='courseId'
        />
        <NumberField source='order' />
        <TextField source='imageSrc' />
      </Datagrid>
    </List>
  );
};
