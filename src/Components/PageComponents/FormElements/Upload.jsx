import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { getData, uploadAsset } from "@/Connections/graphcsm";
import { publishAsset } from "@/Queries/Assets/publishAssetQuery";
import styles from "./styles/Upload.module.scss";

export default function Upload(props) {
  const [files, setFiles] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [editState, setEditState] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      const form = new FormData();
      form.append("fileUpload", acceptedFiles[0]);
      setFileToUpload(form);
    },
    [setFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  function uploadFile(file) {
    uploadAsset(file)
      .then((response) => response.json())
      .then((data) => {
        getData(publishAsset(data.id)).then(
          data => {
            props.uploadSumbit(data);
          }
        )
      });
    setEditState(false);
  }

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <div className={styles.uploadfile}>
      {props.editMode && editState === false ? (
        <div className={styles.upload__image__default}>
          <button
            onClick={() => setEditState(true)}
            className={styles.upload__image__edit}
          >
            <FaPencilAlt />
          </button>
          {props.children}
        </div>
      ) : (
        <>
          {fileToUpload ? (
            <aside className={styles.upload__edit_wrapper}>
              {props.editMode && editState === true && (
                <button
                  onClick={() => setEditState(false)}
                  className={styles.upload__image__edit}
                >
                  <FaTimes />
                </button>
              )}
              {files.map((file) => (
                <div key={file.name}>
                  <img
                    src={file.preview}
                    style={{ width: "200px", height: "200px" }}
                    alt=""
                  />
                </div>
              ))}
              <div className={styles.upload__action_buttons}>
                <button
                  onClick={() => setFileToUpload(null)}
                  className={"btn btn--edit"}
                >
                  Try agian
                </button>
                <button
                  onClick={() => uploadFile(fileToUpload)}
                  className={"btn btn--save"}
                  data-user-id={props.userId}
                >
                  Save
                </button>
              </div>
            </aside>
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className={styles.dropzone + " custom-dropzone"} >
                  <p>Drop or click to upload to GraphCMS</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
