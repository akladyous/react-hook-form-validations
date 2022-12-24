import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { TextField } from "./TextField.jsx";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: schema.initialValues,
    resolver: schema.validation,
    mode: "onBlur",
  });
  const onSubmit = () => {
    debugger;
  };
  return (
    <form
      name={schema.name}
      onSubmit={handleSubmit(onSubmit)}
      className='mt-6 grid grid-cols-1 gap-y-6 sm:gap-x-8 md:grid-cols-3'
    >
      <TextField
        label={schema.fields.name.label}
        input={schema.fields.name.attributes}
        classes={schema.classes}
        error={errors.name}
        register={register}
      />
      <TextField
        label={schema.fields.breed.label}
        input={schema.fields.breed.attributes}
        classes={schema.classes}
        register={register}
        error={errors.breed}
      />
      <button>sunmit</button>
    </form>
  );
}
