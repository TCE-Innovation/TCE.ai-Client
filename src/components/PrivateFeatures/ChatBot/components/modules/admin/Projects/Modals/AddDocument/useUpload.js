import { useEffect, useMemo, useState } from "react";

import { useAdmin, queries } from "../../../../../../hooks";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";

import { getFileName } from "../../../../../../utils/file";
import { useDocument } from "../../../Documents/hooks";

const { useGetProjectsQuery } = queries;

const useUploadFile = ({ name }) => {
  const { uploadDocument } = useAdmin();
  const { value: projectId } = useFieldValue("projectId");
  const { isDuplicateDocument, loadingDocuments, documents } = useDocument(
    projectId
  );
  const { data: projects } = useGetProjectsQuery({
    disableRunOnMount: projectId === null,
  });
  const { mutate, loading: isSubmitting } = uploadDocument;

  const project = useMemo(() => {
    if (!projects) return null;
    return projects.data.find(
      (project) => project.id.toString() === projectId.toString()
    );
  }, [projects, projectId]);

  const { resetForm } = useContext();

  const {
    value: documentFiles,
    setError: setDocumentsError,
    error: documentsError,
  } = useFieldValue("documents");
  const { value: directoryFiles, error: directoryError } = useFieldValue(
    "directory"
  );

  const error = documentsError || directoryError;
  const files = [...documentFiles, ...directoryFiles];

  const { value: formStep, changeValue: changeFormStep } = useFieldValue(
    "step"
  );

  const [docIndex, setDocIndex] = useState(0);

  useEffect(() => {
    changeFormStep("upload");
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (values) => {
    if (loadingDocuments || isSubmitting) return;

    if (!files.length) {
      setDocumentsError("Please select documents or a directory");
      return;
    }

    for (const index in Object.keys(files)) {
      const _isDuplicate = isDuplicateDocument(values.documentNames[+index]);
      if (_isDuplicate) {
        setDocIndex(+index);
        changeFormStep("alert");
        return;
      }
    }

    const formData = [].concat(files).reduce((formData, doc, i) => {
      formData.append("doc", doc);

      // Handle directory structure by preserving relative path
      if (doc.webkitRelativePath) {
        formData.append(
          "file_path",
          doc.webkitRelativePath
            .split("/")
            .slice(0, -1)
            .join("/")
        );
      } else {
        formData.append("file_path", "");
      }

      formData.append("file_name", getFileName(values.documentNames[i]));
      return formData;
    }, new FormData());

    mutate({ formData, projectId });
    resetForm();
    setDocIndex(0);
    return true;
  };

  return {
    handleSubmit,
    error,
    docIndex,
    formStep,
    changeFormStep,
    project,
    documents,
    isSubmitting,
    files,
    isloading: loadingDocuments,
  };
};

export default useUploadFile;
