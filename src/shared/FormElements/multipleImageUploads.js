import React, { useRef, useState } from "react";

import Button from "./Button";

import "./multipleImageUpload.css";

// props
// id
// onInput
// center
// errorText

function MultipleImageUpload(props) {
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

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
      pickedFile = { imgCollection: event.target.files };
      // setFile(pickedFile);
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
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        multiple
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        {/* <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick relevant images</p>
          )}
        </div> */}
        <Button type="button" onClick={pickImageHandler}>
          Pick Images
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default MultipleImageUpload;
