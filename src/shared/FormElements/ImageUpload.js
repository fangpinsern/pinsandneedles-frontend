import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import "./ImageUpload.css";

// props
// id
// onInput
// center
// errorText
function ImageUpload(props) {
  
  // for image preview
  // const [file, setFile] = useState({
  //   imgCollection: ''
  // });
  // const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  //for having image preview.
  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };

  //   fileReader.readAsDataURL(file);
  // }, [file]);

  const pickedHandler = (event) => {
    // console.log(event.target);
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length >= 1) {
      pickedFile = {imgCollection: event.target.files};
      // setFile({imgCollection: event.target.files})
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        multiple
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        {/* <div className="image-upload__preview">
          {previewUrl ? (
            <p>Images chosen</p>
          ) : (
            <p>Please pick an image</p>
          )}
        </div> */}
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
