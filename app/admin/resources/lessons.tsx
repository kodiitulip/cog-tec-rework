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
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const LessonsCreate = () => {
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
          reference='units'
          label='Unit ID'
          source='unitId'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <NumberInput
          source='order'
          label='Order'
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export const LessonsEdit = () => {
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
          reference='units'
          label='Unit ID'
          source='unitId'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <NumberInput
          source='order'
          label='Order'
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const LessonsList = () => {
  return (
    <InfiniteList>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <ReferenceField
          reference='units'
          source='unitId'
        />
        <NumberField source='order' />
      </Datagrid>
    </InfiniteList>
  );
};
