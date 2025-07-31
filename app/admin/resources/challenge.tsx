import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  required,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
        />
        <ReferenceInput
          reference='lessons'
          label='Lesson ID'
          source='lessonId'
        />
        <SelectInput
          source='type'
          label='Type'
          choices={[
            {
              id: 'SELECT',
              name: 'SELECT',
            },
            {
              id: 'ASSIST',
              name: 'ASSIST',
            },
          ]}
          validate={[required()]}
        />
        <TextInput
          source='question'
          label='Question'
          validate={[required()]}
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

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
        />
        <ReferenceInput
          reference='lessons'
          label='Lesson ID'
          source='lessonId'
        />
        <SelectInput
          source='type'
          label='Type'
          choices={[
            {
              id: 'SELECT',
              name: 'SELECT',
            },
            {
              id: 'ASSIST',
              name: 'ASSIST',
            },
          ]}
          validate={[required()]}
        />
        <TextInput
          source='question'
          label='Question'
          validate={[required()]}
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

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <ReferenceField
          reference='lessons'
          source='lessonId'
        />
        <SelectField
          source='type'
          choices={[
            {
              id: 'SELECT',
              name: 'SELECT',
            },
            {
              id: 'ASSIST',
              name: 'ASSIST',
            },
          ]}
        />
        <TextField source='question' />
        <NumberField source='order' />
      </Datagrid>
    </List>
  );
};
