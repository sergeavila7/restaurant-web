import { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from "react";
import { Button } from "../ui/index";
import { ArrowUpTrayIcon, PhotoIcon } from "@heroicons/react/24/outline";

export const MAX_FILE_SIZE = 10000000;
export interface IErrorFile {
  code: "MAX_FILE_SIZE" | string;
  message: string;
}
interface UploadFileProps {
  multiply?: boolean;
  isInline?: boolean;
  label?: string;
  maxFileSize?: number;
  isLoaded?: string | null;
  onFileSelected: (file: File | FileList) => void;
  onError: (error: IErrorFile) => void;
  isUploadCancel?: boolean;
  disabled?: boolean;
  fileUpload?: string;
  isUpload?: boolean;
  files?: File | FileList | string | null;
}

export const MAX_FILE_SIZE_CODE = "MAX_FILE_SIZE";

export const UploadFile: FC<UploadFileProps> = ({
  multiply = false,
  isLoaded,
  maxFileSize = MAX_FILE_SIZE,
  isInline = false,
  label,
  onFileSelected,
  onError,
  isUploadCancel,
  disabled,
  isUpload,
  files,
}) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | FileList | string | null>(null);

  useEffect(() => {
    if (files !== undefined) {
      setFile(files);
    }
  }, [files]);

  const errorFile = (files: File | FileList) => {
    const filesArray = Array.isArray(files) ? files : [files];

    for (const file of filesArray) {
      if (file?.size >= maxFileSize) {
        onError({
          code: MAX_FILE_SIZE_CODE,
          message:
            "El archivo es muy pesado para ser subido, el máximo es de 10Mb",
        });
        return;
      }
    }

    onError({ code: "", message: "" });
  };

  const fileSelected = (file: File | FileList) => {
    errorFile(file);
    setFile(file);
    onFileSelected(file);
  };

  const handleFileSelected = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    if (multiply) {
      fileSelected(event.target.files);
    } else {
      fileSelected(event.target.files[0]);
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.dataTransfer.files && !event.dataTransfer.files[0]) {
      return;
    }
    fileSelected(event.dataTransfer.files[0]);
  };

  useEffect(() => {
    if (isLoaded) {
      setFile(isLoaded);
    } else {
      setFile(null);
    }
  }, [isLoaded, isUploadCancel, isUpload]);

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`block ${disabled && "bg-light-gray-50"} w-full`}
    >
      <input
        hidden
        value=""
        type="file"
        id="input-file"
        ref={inputFile}
        multiple={multiply}
        disabled={disabled}
        onChange={handleChangeFile}
        accept="image/jpeg, image/png"
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
          {!file && (
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
          {file && (
            <>
              <PhotoIcon />
              <p
                className={`${
                  disabled ? "text-light-gray-200" : "text-light-gray-600"
                } text-sm ml-3`}
              >
                Archivo{multiply && "s"} cargado{multiply && "s"}
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
            onClick={handleFileSelected}
          >
            Seleccionar archivo{multiply && "s"}
          </Button>
        </div>
      </label>
    </div>
  );
};
