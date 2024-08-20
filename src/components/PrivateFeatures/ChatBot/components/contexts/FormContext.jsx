import React, {
  createContext,
  useState,
  useContext as _useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

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

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors([]);
    setSubmitting(false);
    errorsRefs.current = {};
    dirtyRefs.current = {};
  };

  const validateErrors = () => {
    return Object.entries(patternsRef.current)
      .map(([name, regex]) => {
        const isValid = (regex?.pattern || regex).exec(formValues[name]);
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
      })
      .filter(Boolean);
  };

  const register = (name, options) => {
    if (options.regex) {
      patternsRef.current[name] = options.regex;
    }
    return {
      ...options,
      name,
      onChange: (e) => {
        let value = "";
        if (options.type === "file") {
          value = e.target.file || e.target.files[0];
        } else {
          value = e.target.value;
        }
        updateForm({ [name]: value });
        refs.current[name] = e.currentTarget;
        dirtyRefs.current[name] = true;
        options.onChange?.(value);
      },
    };
  };

  const setError = (name, value) => {
    errorsRefs.current[name] = value;
  };

  const isDirty = () => {
    return Object.values(dirtyRefs.current).some((value) => value);
  };

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
    setSubmitting(false);
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
  const { formValues, updateForm, errors, register } = useContext(FormContext);
  const [value, setValue] = useState(formValues[name]);

  const error = useMemo(() => errors.find((e) => e.name === name)?.message, [
    errors,
    name,
  ]);

  const changeValue = (value) => {
    updateForm({ [name]: value });
  };

  useEffect(() => {
    setValue(formValues[name]);
  }, [formValues[name], name]);

  const registerField = () => {
    return register(name);
  };

  return {
    value,
    changeValue,
    error,
    registerField,
  };
};

export default FormContextProvider;
