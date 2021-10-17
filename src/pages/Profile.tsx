import React, { FC, useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Typography, Button, Input } from "antd";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase/fb";
import { toast } from "react-toastify";
const { Text } = Typography;

const Profile: FC = () => {
  const user = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState<FileReader["result"]>(null);

  const [displayName, setDisplayName] = useState(
    user?.displayName !== null ? user?.displayName : ""
  );
  const handleNameChange = useCallback((e) => {
    setDisplayName(e.target.value);
  }, []);

  const handleChange = useCallback(
    async (e) => {
      console.log(e.target.files[0]);
      const path = `${user?.uid}/${e.target.files[0].name}`;
      const userProfileRef = ref(storage, path);
      await uploadBytes(userProfileRef, e.target.files[0]).then((snapshot) => {
        console.log("업로드 완료!");
        console.log(snapshot);
      });
      await getDownloadURL(ref(storage, path))
        .then((url) => {
          console.log(url);
          setImageUrl(url);
        })
        .catch((error) => {
          // Handle any errors
          toast(error.message);
        });

      setFile(e.target.files[0]);
      //console.log(res);
      // if (info.file.status === "uploading") {
      //   setLoading(true);
      //   return;
      // }
      // if (info.file.status === "done") {
      //   // Get this url from response in real world.
      //   // getBase64(info.file.originFileObj, (imageUrl) => {
      //   //   setImageUrl(imageUrl);
      //   //   setLoading(false);
      //   // });
      //   const storageRef = ref(storage);
      //   const res = await uploadBytes(storageRef, info.file.originFileObj);
      // }
    },
    [user?.uid]
  );
  const handleSubmit = useCallback(() => {
    const curr = auth.currentUser;
    if (!curr || typeof imageUrl !== "string") return false;
    return updateProfile(curr, {
      displayName,
      photoURL: imageUrl,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        toast(error.message);
      });
  }, [displayName, imageUrl]);
  if (!user) return null;
  return (
    <>
      <input type="file" value={file} onChange={handleChange} />
      {!!imageUrl && <img src={imageUrl as string} alt="프로필이름" />}
      {/*<Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl as string}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>*/}
      <Input
        value={displayName}
        onChange={handleNameChange}
        size="large"
        placeholder="Name"
      />
      <Button type="primary" onClick={handleSubmit}>
        저장
      </Button>
      <Text>{user.displayName}</Text>
    </>
  );
};

export default Profile;
