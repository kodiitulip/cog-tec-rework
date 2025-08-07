import {
  Create,
  Datagrid,
  Edit,
  InfiniteList,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from 'react-admin';

export const LibraryContentCreate = () => {
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
        <ReferenceInput
          source='unitId'
          label='Unit ID'
          reference='units'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <TextInput
          source='markdown'
          label='Markdown'
          defaultValue=''
          multiline
        />
        <NumberInput source='order' />
      </SimpleForm>
    </Create>
  );
};
export const LibraryContentEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput
          source='id'
          label='ID'
          validate={[required()]}
        />
        <TextInput
          source='title'
          label='Title'
          validate={[required()]}
        />
        <ReferenceInput
          source='unitId'
          label='Unit ID'
          reference='units'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <TextInput
          source='markdown'
          label='Markdown'
          defaultValue=''
        />
        <NumberInput source='order' />
      </SimpleForm>
    </Edit>
  );
};
export const LibraryContentList = () => {
  return (
    <InfiniteList>
      <Datagrid rowClick='edit'>
        <NumberField
          source='id'
          label='ID'
        />
        <TextField
          source='title'
          label='Title'
        />
        <ReferenceField
          source='unitId'
          label='Unit ID'
          reference='units'
        />
        <TextField
          source='markdown'
          label='Markdown'
        />
        <NumberField source='order' />
      </Datagrid>
    </InfiniteList>
  );
};
