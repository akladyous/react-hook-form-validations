import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export const schema = {
  name: "pet",
  fields: {
    name: {
      attributes: { type: "text", name: "name" },
      label: { content: "pet name" },
    },
    breed: {
      attributes: { type: "text", required: true, name: "breed" },
      label: { content: "breed" },
    },
    species: {
      attributes: {
        type: "select",
        name: "species",
        required: true,
      },
      options: [
        { value: "dog", label: "dog" },
        { value: "cat", label: "cat" },
      ],
      label: { content: "species" },
    },
    description: {
      attributes: {
        type: "textaerea",
        required: true,
        name: "description",
      },
      label: { content: "description", caption: "Max. 500 characters" },
    },
  },
  classes: {
    label: "block text-sm font-medium text-gray-900 capitalize",
    input:
      "peer mt-1 block w-full rounded-md border-gray-300 py-3 px-4 h-12 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm",
    textarea:
      "peer block mt-1 w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Pet name equired").min(4),
    breed: Yup.string().required("Breed required").min(5),
    species: Yup.string().required("Species Required").oneOf(["dog", "cat"]),
    description: Yup.string()
      .required("pet description is equired")
      .min(5)
      .max(255),
  }),
  get initialValues() {
    const defaultValues = {};
    for (let field in this.fields) {
      defaultValues[field] =
        this.fields[field].attributes.type === "file" ? null : "";
    }
    return defaultValues;
  },
  get validation() {
    return yupResolver(this.validationSchema);
  },
};

const handler = {
  get(target, prop, receiver) {
    const objKeys = Object.keys(target.fields);
    switch (true) {
      case prop === "initialValues":
        return objKeys.reduce((acc, val) => {
          acc[val] = "";
          return acc;
        }, {});
      case prop === "columnsName":
        return Object.keys(target.fields);
      default:
        return Reflect.get(...arguments);
    }
  },
};
export const schemaProxy = new Proxy(schema, handler);
