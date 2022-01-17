import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from "vee-validate";
import { required, min, max } from "@vee-validate/rules";

export default {
  install(app) {
    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The field "${context.field}" is required.`,
          min: `The field "${context.field}" is too short.`,
          max: `The field "${context.field}" is too long.`,
          unique: `The field "${context.field}" must be unique.`
        };
        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `The field ${context.field} is invalid`;
        return message;
      },
      validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
      validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
      validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
      validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
    });

    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);

    defineRule("min", min);

    defineRule("max", max);

    defineRule("unique", (value, [existingValues]) => {
      if (!value || !value.length) {
        return true;
      }

      if (existingValues.includes(value.trim())) {
        return false;
      }
      return true;
    });
  }
};
