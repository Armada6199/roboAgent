import Ajv from "ajv"

const ajv = new Ajv({ allErrors: true })

/*
import { JSONSchemaBridge } from "uniforms-bridge-json-schema"

const textFieldSchema = {
  title: "TextField",
  type: "object",
  properties: {
    type: { type: "string" },
    label: {
      type: "object"
    },
    name: { type: "string" },
    //size: { type: "integer" }
  },
  required: ["type", "label"]
}*/

export default function SchemaValidator(textFieldSchema, input) {
  try {
    const validate = ajv.compile(textFieldSchema)
    const isValid = validate(input)

    if (isValid) {
      return {valid:true,desc:"All good here"}
    }else {
      console.log('Schema Error ! ',validate.errors)
      return {valid:false,desc:validate.errors[0].message}
    }
  }catch (err) {
    console.log(err)
    return {valid:false,desc:err}
  }
  //return new JSONSchemaBridge(textFieldSchema, schemaValidator)

}
