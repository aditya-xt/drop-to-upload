import React from "react";
import "./drop-input.css";
import PropTypes from "prop-types";

// import {ImageConfig} from '../../config/ImageConfig'
import upload from "../../assets/upload.svg";
// import { ImageConfig } from "../../config/ImageConfig";
import { useRef } from "react";
import { useState } from "react";
import { ImageConfig } from "../../config/ImageConfig";

function DropFileInput(props) {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onDrop = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedArray = [...fileList, newFile];
      setFileList(updatedArray);
      props.onFileChange(updatedArray);
    }
  };

  const fileRemove = (file) => {
    console.log(file);
    const updatedArray = [...fileList];
    updatedArray.splice(fileList.indexOf(file), 1);
    setFileList(updatedArray);
    props.onFileChange(updatedArray);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__lable">
          <img src={upload} alt="upload-logo" />
          <p>Drop File to Upload.</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <div className="drop-file-preview__title">
            <p>Ready To Upload</p>
            {fileList.map((item, index) => (
              <div key={item.name} className="drop-file-preview__item">
                <img
                  alt="logoImage"
                  src={
                    ImageConfig[item.type.split("/")[1]] || ImageConfig["def"]
                  }
                />
                <div className="drop-file-preview__item-info">
                  <p>{item.name}</p>
                  <p>{item.size < 1024 && item.size + " B"}</p>
                  <p>
                    {1024 < item.size &&
                      item.size < 1024 * 1024 &&
                      Math.round(item.size / 1024) + " KB"}
                  </p>
                  <p>
                    {1024 * 1024 < item.size &&
                      item.size < 1024 * 1024 * 1024 &&
                      (item.size / (1024 * 1024)).toFixed(2) + " MB"}
                  </p>
                </div>
                <span
                  className="drop-file-preview__item-del"
                  onClick={() => fileRemove(item)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
            <button id="drop-file-preview__clear" onClick={() => {
              setFileList([]);
            }}>Clear List</button>
        </div>
      )}
    </>
  );
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
