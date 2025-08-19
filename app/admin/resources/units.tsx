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

export const UnitsCreate = () => {
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
          source='description'
          label='Description'
          validate={[required()]}
        />
        <ReferenceInput
          reference='courses'
          label='Course ID'
          source='courseId'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <BooleanInput
          source='hidden'
          label='Hidden'
          defaultValue={false}
        />
        <NumberInput
          source='order'
          label='Order'
          defaultValue={0}
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
        <TextInput
          source='description'
          label='Description'
          validate={[required()]}
        />
        <ReferenceInput
          reference='courses'
          label='Course ID'
          source='courseId'
        >
          <SelectInput validate={[required()]} />
        </ReferenceInput>
        <BooleanInput
          source='hidden'
          label='Hidden'
          defaultValue={false}
        />
        <NumberInput
          source='order'
          label='Order'
          defaultValue={0}
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
    <InfiniteList>
      <Datagrid rowClick='edit'>
        <NumberField source='id' />
        <TextField source='title' />
        <TextField source='description' />
        <ReferenceField
          reference='courses'
          source='courseId'
        />
        <BooleanField source='hidden' />
        <NumberField source='order' />
        <TextField source='imageSrc' />
      </Datagrid>
    </InfiniteList>
  );
};
