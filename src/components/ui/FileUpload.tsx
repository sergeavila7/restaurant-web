import { FC, useContext, useEffect, useState } from "react";
import { Button } from "../ui/index";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import FileUploader from "react-firebase-file-uploader";
import { FirebaseContext } from "../../firebase/index";

interface UploadFileProps {
  multiply?: boolean;
  isInline?: boolean;
  label?: string;
  disabled?: boolean;
  files?: File | FileList | string | null;
  urlImage: string;
  saveUrlImage: (url: string) => void;
}

export const UploadFile: FC<UploadFileProps> = ({
  multiply = false,
  isInline = false,
  label,
  disabled,
  files,
  urlImage,
  saveUrlImage,
}) => {
  const { firebaseApp } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (files !== undefined) {
      saveUrlImage(urlImage);
    }
  }, [files]);

  const handleUploadSuccess = async (name: string) => {
    setIsLoading(true);
    const url = await firebaseApp.storage
      .ref("products")
      .child(name)
      .getDownloadURL();
    saveUrlImage(url);
  };

  const handleUploadError = (error: any) => {
    console.error(error);
  };

  const handleProgress = (progress: any) => {
    setIsLoading(progress);
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer.files || !event.dataTransfer.files[0]) {
      return;
    }

    const file = event.dataTransfer.files[0];
    saveUrlImage(URL.createObjectURL(file));

    firebaseApp.storage
      .ref("products")
      .child(file.name)
      .put(file)
      .then(() => handleUploadSuccess(file.name))
      .catch(handleUploadError);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`block ${disabled && "bg-light-gray-50"} w-full`}
    >
      <FileUploader
        hidden
        accept="image/*"
        id="input-file"
        name="image"
        randomizeFileName
        storageRef={firebaseApp.storage.ref("products")}
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        onProgress={handleProgress}
      />

      <label
        htmlFor="input-file"
        className={`rounded-lg outline-dashed outline-1 outline-offset-0 outline-light-gray-400 p-4 ${
          isInline ? "flex flex-col md:flex-row md:justify-between" : "block"
        }  z-30`}
      >
        <div
          className={`${
            isInline
              ? "flex flex-col md:flex-row items-center md:justify-between mb-4 md:mb-0"
              : "block mx-auto text-center mb-4"
          } `}
        >
          {!urlImage && (
            <>
              <div
                className={`${
                  isInline ? "w-10 h-10 md:mr-4" : "w-16 h-16 mb-4"
                } rounded-full ${
                  disabled ? "bg-light-gray-200" : "bg-light-gray-600"
                } inline-flex`}
              >
                <ArrowUpTrayIcon
                  color="white"
                  className={`block mx-auto ${isInline ? "w-4" : "w-7"}`}
                />
              </div>
              <div>
                {label && (
                  <div className="text-primary-600 font-semibold">{label}</div>
                )}
                <p
                  className={`${
                    disabled ? "text-light-gray-200" : "text-light-gray-600"
                  } text-sm`}
                >
                  Arrastra y suelta {multiply ? "los archivos" : "el archivo"}{" "}
                </p>
              </div>
            </>
          )}
          {urlImage && (
            <>
              <img
                src={urlImage}
                alt="Imagen cargada"
                className="w-16 h-16 rounded-full object-cover"
              />
              <p
                className={`${
                  disabled ? "text-light-gray-200" : "text-light-gray-600"
                } text-sm ml-3`}
              >
                {!isLoading ? "Cargando..." : "Imagen cargada"}
              </p>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="border"
            color="primary"
            disabled={disabled}
            size={isInline ? "small" : "medium"}
            onClick={() => document.getElementById("input-file")?.click()}
          >
            Seleccionar archivo{multiply && "s"}
          </Button>
        </div>
      </label>
    </div>
  );
};
