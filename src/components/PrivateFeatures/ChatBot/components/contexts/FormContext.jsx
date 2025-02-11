import React, {
  createContext,
  useState,
  useContext as _useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { nullableRegex, minMaxRegex } from "../../utils/form";
import { getDirectFiles } from "../../utils/file";

const FormContext = createContext();

export const useContext = () => _useContext(FormContext);

const FormContextProvider = ({ children, ...props }) => {
  const { initialValues } = props;
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const refs = useRef({});
  const errorsRefs = useRef({});
  const dirtyRefs = useRef({});
  const patternsRef = useRef({});

  const updateForm = useCallback((newValues) => {
    setFormValues((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  const resetErrors = () => {
    setErrors([]);
    errorsRefs.current = {};
  };

  const resetForm = (...fields) => {
    if (!fields.length) setFormValues({ ...initialValues });
    else {
      setFormValues((prev) => {
        return fields.reduce(
          (acc, field) => {
            acc[field] = initialValues[field];
            return acc;
          },
          { ...prev }
        );
      });
    }
    resetErrors();
    setSubmitting(false);
    dirtyRefs.current = {};
  };

  const validateError = (name, value = formValues[name]) => {
    const regex = patternsRef.current[name];
    if (!regex || typeof value === "object") return null;
    const isValid = (regex?.pattern || regex).test(value);
    if (!isValid) {
      const obj = {
        name,
        message: regex?.message || `${name} is invalid!`,
      };
      errorsRefs[name] = {
        message: obj.message,
      };
      return obj;
    } else {
      errorsRefs[name] = null;
      return null;
    }
  };

  const validateErrors = () => {
    return Object.keys(patternsRef.current)
      .flatMap((name) => validateError(name))
      .filter(Boolean);
  };

  const register = (name, options) => {
    if (!options.isNullable) {
      patternsRef.current[name] = {
        pattern: nullableRegex(),
        message: `${name} should be not be empty!`,
      };
    }
    if (options.min || options.max) {
      const pattern = minMaxRegex(options.min, options.max);
      let prefix = options.min
        ? options.max
          ? ""
          : "at least"
        : options.max
        ? options.min
          ? ""
          : "at most"
        : "";
      patternsRef.current[name] = {
        pattern: pattern,
        message:
          options?.regex?.message ||
          `${name} should be ${prefix} ${[options.min, options.max]
            .filter(Boolean)
            .join("-")} characters long!`,
      };
    }
    if (options.regex) {
      patternsRef.current[name] = options.regex;
    }

    return {
      ...options,
      name,
      onChange: (e) => {
        let value = "";
        if (options.type === "file") {
          e.preventDefault();
          value = getDirectFiles(e);
        } else {
          value = e.target.value;
        }
        updateForm({ [name]: value });
        refs.current[name] = e.currentTarget;
        dirtyRefs.current[name] = true;
        options.onChange?.(value);
        if (submitting) {
          const { message } = validateError(name, value) || {};
          setError(name, message);
        }
      },
    };
  };

  const setError = (name, message) => {
    if (!message)
      setErrors((prev) => prev.filter((error) => error.name !== name));
    else setErrors((prev) => [...prev, { name, message }]);
    errorsRefs.current[name] = message;
  };

  const resetError = (name) => {
    setErrors((prev) => prev.filter((error) => error.name !== name));
    errorsRefs[name] = null;
  };

  const isDirty = () => {
    return Object.values(dirtyRefs.current).some((value) => value);
  };

  const isValid = useMemo(() => {
    return errors.length === 0;
  }, [errors]);

  const submitHandler = (callback) => async (e) => {
    setSubmitting(true);
    const _errors = validateErrors();
    setErrors(_errors);
    if (_errors && _errors.length) {
      const { name: field } = _errors[0];
      refs.current[field]?.focus?.();
      return;
    }
    await callback(formValues, e);
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        updateForm,
        register,
        submitHandler,
        resetForm,
        setError,
        isDirty,
        submitting,
        errors,
        resetError,
        resetErrors,
        validateError,
        isValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFieldArray = (name) => {
  const { formValues } = useContext(FormContext);
  const [value, setValue] = useState(formValues[name]);

  const push = (newValue) => {
    setValue((prev) => [...prev, newValue]);
  };

  const pop = () => {
    setValue((prev) => {
      const copy = prev.slice();
      copy.pop();
      return copy;
    });
  };

  const remove = (obj) => {
    setValue((prev) => prev.filter((item) => item !== obj));
  };

  return {
    value,
    push,
    pop,
    remove,
  };
};

export const useFieldValue = (name) => {
  const {
    formValues,
    updateForm,
    errors,
    register,
    resetError: _resetError,
    setError: _setError,
    validateError: _validateError,
  } = useContext(FormContext);
  const [value, setValue] = useState(formValues[name]);

  const error = useMemo(
    () => errors.find((e) => e.name === name)?.message || null,
    [errors, name]
  );

  const setError = (value) => {
    _setError(name, value);
  };

  const resetError = () => {
    _resetError(name);
  };

  const validateError = () => {
    _validateError(name);
  };

  const changeValue = (value) => {
    updateForm({ [name]: value });
  };

  useEffect(() => {
    setValue(formValues[name]);
    // eslint-disable-next-line
  }, [formValues[name], name]);

  const registerField = () => {
    return register(name);
  };

  return {
    value,
    changeValue,
    error,
    setError,
    resetError,
    registerField,
    validateError,
  };
};

export default FormContextProvider;
