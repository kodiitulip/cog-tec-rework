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

export const LessonsCreate = () => {
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
        <ReferenceInput
          reference='units'
          label='Unit ID'
          source='unitId'
        />
        <TextInput
          source='order'
          label='Order'
          validate={[required()]}
          type='number'
        />
      </SimpleForm>
    </Create>
  );
};

export const LessonsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
          validate={[required()]}
        />
        <TextInput
          source='title'
          label='Title'
          validate={[required()]}
        />
        <ReferenceInput
          reference='units'
          label='Unit ID'
          source='unitId'
        />
        <TextInput
          source='order'
          label='Order'
          validate={[required()]}
          type='number'
        />
      </SimpleForm>
    </Edit>
  );
};

export const LessonsList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <ReferenceField
          reference='units'
          source='unitId'
        />
        <NumberField source='order' />
      </Datagrid>
    </List>
  );
};
