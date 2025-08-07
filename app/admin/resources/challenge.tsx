import {
  Create,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  NumberInput,
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
        <NumberInput
          source='id'
          label='ID'
        />
        <ReferenceInput
          reference='lessons'
          label='Lesson ID'
          source='lessonId'
        >
          <SelectInput validate={[required()]}></SelectInput>
        </ReferenceInput>
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
        <NumberInput
          source='order'
          label='Order'
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput
          source='id'
          label='ID'
        />
        <ReferenceInput
          reference='lessons'
          label='Lesson ID'
          source='lessonId'
        >
          <SelectInput validate={[required()]}></SelectInput>
        </ReferenceInput>
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
        <NumberInput
          source='order'
          label='Order'
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const ChallengeList = () => {
  return (
    <InfiniteList>
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
    </InfiniteList>
  );
};
