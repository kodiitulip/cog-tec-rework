import {
  BooleanField,
  BooleanInput,
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

export const ChallengeOptionsCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
        />
        <ReferenceInput
          reference='challenges'
          label='Challenge ID'
          source='challengeId'
        />
        <TextInput
          source='text'
          label='Text'
          validate={[required()]}
        />
        <BooleanInput
          source='correct'
          label='Correct'
          validate={[required()]}
        />
        <TextInput
          source='imageScr'
          label='Image Src'
        />
      </SimpleForm>
    </Create>
  );
};

export const ChallengeOptionsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source='id'
          label='ID'
          type='number'
          validate={[required()]}
        />
        <ReferenceInput
          reference='challenges'
          label='Challenge ID'
          source='challengeId'
        />
        <TextInput
          source='text'
          label='Text'
          validate={[required()]}
        />
        <BooleanInput
          source='correct'
          label='Correct'
          validate={[required()]}
        />
        <TextInput
          source='imageScr'
          label='Image Src'
        />
      </SimpleForm>
    </Edit>
  );
};

export const ChallengeOptionsList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <ReferenceField
          reference='challenges'
          source='challengeId'
        />
        <TextField source='text' />
        <BooleanField source='correct' />
        <TextField source='imageSrc' />
      </Datagrid>
    </List>
  );
};
