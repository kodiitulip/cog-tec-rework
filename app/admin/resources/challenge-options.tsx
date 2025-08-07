import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const ChallengeOptionsCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <NumberInput
          source='id'
          label='ID'
        />
        <ReferenceInput
          reference='challenges'
          label='Challenge ID'
          source='challengeId'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
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
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
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
    <InfiniteList>
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
    </InfiniteList>
  );
};
